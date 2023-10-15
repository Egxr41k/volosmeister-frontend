import {useEffect, useState} from "react";
import IProductInfo, {emptyInfo} from "../types/IProductInfo";
import HttpClient from "../services/HttpClient";
import IFeature from "../types/IFeature";
import IProperty from "../types/IProperty";
import {getIdFromUrl} from "../services/StringService";
import IProduct from "../types/IProduct";
import IProductDetails from "../types/IProductDetails";


const useProductInfo = (initialValue?: IProductInfo) => {
    const [productInfo, setProductInfo] = useState(initialValue ?? emptyInfo)
    const [images, setImages] = useState<(File | undefined)[]>([])

    const setInfo = (productResult: IProduct, detailsResult: IProductDetails) => {
        setProductInfo(prevState => ({
            product: productResult,
            details: detailsResult,
        }))
    }
    const getProductInfo = async (id: number) => {
        const productResult = await HttpClient().getProduct(id)
        const detailsResult = await HttpClient().getDetails(id)

        if (productResult && detailsResult){

            alert("продукт успішно отриманий")
            return {
                product: productResult,
                details: detailsResult,
            } as IProductInfo
        }
    }
    const updateProductInfo = async ()  => {
        const infoToSent = await setImagesSrc()

        if (infoToSent !== initialValue){
            const productResult = await HttpClient().updateProduct(infoToSent.product)
            const detailsResult = await HttpClient().updateDetails(infoToSent.details)

            if (productResult && detailsResult){
                setInfo( productResult, detailsResult)
                alert("продукт успішно оновлений")
            }
        }
    }
    const createProductInfo = async ()  => {
        const infoToSent = await setImagesSrc()

        if (infoToSent !== initialValue){
            const productResult = await HttpClient().createProduct(infoToSent.product)
            const detailsResult = await HttpClient().createDetails(infoToSent.details)

            if (productResult && detailsResult){
                setInfo( productResult, detailsResult)
                alert("продукт успішно доданий")
            }
        }
    }
    const deleteProductInfo = async (id: number) => {
        const tempInfo = await getProductInfo(id)

        const imageResults = await deleteImages(getImagesSrc(tempInfo!));
        const productResult = await HttpClient().deleteProduct(id)
        const detailsResult =  await HttpClient().deleteDetails(id)

        let results = [productResult, detailsResult, ...imageResults]
        alert(results)
    }

    const deleteImages = async (imagesSrc: string[]) => {
        console.log(imagesSrc)
        return await Promise.all(
            imagesSrc.map(async (imageSrc: string) => {
                if (imageSrc != ""){
                    let imageId = getIdFromUrl(imageSrc)
                    return await HttpClient().deleteImage(imageId)
                }
            })
        )
    }
    const getImagesSrc = (tempInfo: IProductInfo) => {
        const featureImagesSrc = tempInfo.details.features.map(
            (feature: IFeature, index: number) => {
                return feature.imageSrc
            }
        )
        return [tempInfo.product.imageSrc, ...featureImagesSrc]
    }

    const setImagesSrc = async () => {
        const [productImagesSrc, ...featureImagesSrc] = await initImagesSrc()

        return {
            product: {
                ...productInfo.product, imageSrc: productImagesSrc
            },
            details: {
                ...productInfo.details, features: setImagesSrcToFeature(featureImagesSrc)
            }
        } as IProductInfo
    }

    const setImagesSrcToFeature = (featureImagesSrc: string[]) => {
        return productInfo.details.features.map((feature: IFeature, index: number) => {
            if (index < featureImagesSrc.length) {
                return {...feature, imageSrc: featureImagesSrc[index]}
            } else return feature
        })
    }
    const initImagesSrc = async () => {
        const [productImageFile, ...featureImageFiles] = images

        let productImagesSrc = await initProductImageSrc(productImageFile)
        console.log(productImagesSrc)

        let featureImagesSrc = await initFeatureImageSrc(featureImageFiles)
        console.log(featureImagesSrc)
        
        setImages([])
        return [productImagesSrc, ...featureImagesSrc]
    }

    const initProductImageSrc = async(productImgFile: File | undefined) => {
        if (productImgFile) {
            return await HttpClient().saveImage(productImgFile) as string
        } else { 
            return productInfo.product.imageSrc
        }
    }

    const initFeatureImageSrc = async (featureImageFiles: (File | undefined)[]) => {
        return await Promise.all(
            productInfo.details.features.map(async (feature: IFeature, index: number) => {
                if (featureImageFiles[index]) {
                    return await HttpClient().saveImage(featureImageFiles[index]!) as string
                } else {
                    return feature.imageSrc
                }
            })
        )
    }

    const setImageToPos = (image: File | undefined, i: number) => {
        const newImages = [...images];
        if (image) newImages[i] = image;
        else return
        setImages(newImages);
    }

    const setDescription = (value: string) => {
        setProductInfo(prevState => ({
            ...prevState, product: {
                ...prevState.product,
                description: value
            }
        }))
    }
    const setOldPrice = (value: number) => {
        setProductInfo(prevState => ({
            ...prevState, product: {
                ...prevState.product,
                oldPrice: value,
                isSale: value > prevState.product.newPrice
            }
        }))
    }
    const setNewPrice = (value: number) => {
        setProductInfo(prevState => ({
            ...prevState, product: {
                ...prevState.product,
                newPrice: value
            }
        }))
    }
    const setCount = (value: number) => {
        setProductInfo(prevState => ({
            ...prevState, product: {
                ...prevState.product,
                count: value,
                isAvailable: value > 0
            }
        }))
    }
    const setName = (value: string) => {
        setProductInfo(prevState => ({
            ...prevState, product: {
                ...prevState.product,
                name: value
            }
        }))
    }

    const setFeatureTitle = (value: string, i: number) => {
        const newFeatures = [...productInfo.details.features];
        newFeatures[i].title = value;
        setFeatures(newFeatures)
    }
    const setFeatureDescription = (value: string, i: number) => {
        const newFeatures = [...productInfo.details.features];
        newFeatures[i].description = value;
        setFeatures(newFeatures)
    }
    const setFeatures = (newFeatures: IFeature[]) => {
        setProductInfo(prevState => ({
            ...prevState, details: {
                ...prevState.details, features: newFeatures
            }
        }))
    }

    const setPropertyName = (value: string, i: number) => {
        const newStats = [...productInfo.details.stats];
        newStats[i].name = value;
        setStats(newStats)
    }
    const setPropertyValue = (value: string, i: number) => {
        const newStats = [...productInfo.details.stats];
        newStats[i].value = value;
        setStats(newStats)
    }
    const setStats = (newStats: IProperty[]) => {
        setProductInfo(prevState => ({
            ...prevState, details: {
                ...prevState.details, stats: newStats
            }
        }))
    }

    const addFeature = () => {
        setProductInfo(prevState => ({
            ...prevState, details: {
                ...prevState.details, features:[
                    ...prevState.details.features, {
                        description: "",
                        id: 0,
                        imageSrc: "",
                        productId: productInfo.product.id,
                        title: ""
                    }
                ]
            }
        }))
        setImages([...images, undefined])
    }
    const deleteFeature = () => {
        setProductInfo(prevState => ({
            ...prevState, details: {
                ...prevState.details, features: [
                    ...prevState.details.features.filter(
                        (_, i) =>
                            i !== prevState.details.features.length -1
                    )
                ]
            }
        }))

        setImages(
            images.filter(
                (_, i) =>
                    i !== images.length -1
            )
        );
    }

    const addProperty = () => {
        setProductInfo(prevState => ({
            ...prevState, details: {
                ...prevState.details, stats:[
                    ...prevState.details.stats, {
                        id: 0,
                        productId: productInfo.product.id,
                        name: "",
                        value: ""
                    }
                ]
            }
        }))
    }
    const deleteProperty = () => {
        setProductInfo(prevState => ({
            ...prevState, details: {
                ...prevState.details, stats: [
                    ...prevState.details.stats.filter(
                        (_, i) =>
                            i !== prevState.details.stats.length -1
                    )
                ]
            }
        }))
    }


    return {
        productInfo,
        setInfo,
        setProductValues: {
            setName,
            setCount,
            setNewPrice,
            setOldPrice,
            setDescription,
        },
        images,
        setImageToPos,
        setFeaturesValue: {
            setFeatureTitle,
            setFeatureDescription,
        },
        setStatsValue: {
            setPropertyName,
            setPropertyValue,
        },
        editDetails: {
            addFeature,
            addProperty,
            deleteFeature,
            deleteProperty
        },
        request: {
            getProductInfo,
            createProductInfo,
            updateProductInfo,
            deleteProductInfo
        },
    }
}

export default useProductInfo;