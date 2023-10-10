import {useEffect, useState} from "react";
import IProductInfo, {emptyInfo} from "../types/IProductInfo";
import HttpClient from "../services/HttpClient";
import IFeature from "../types/IFeature";
import IProperty from "../types/IProperty";
import IProduct from "../types/IProduct";
import IProductDetails, {emptyDetails} from "../types/IProductDetails";

const useProductInfo = (initialValue?: IProductInfo) => {
    const [productInfo, setProductInfo] = useState(initialValue ?? emptyInfo)
    const [images, setImages] = useState<(File | undefined)[]>([])

    const getProductInfo = async (id: number) => {
        const productResult =  await HttpClient().getProduct(id)
        const detailsResult = await HttpClient().getDetails(id)

        SetInfo(productResult, detailsResult);
    }
    const updateProductInfo = async ()  => {
        await setImagesSrc()

        console.log(productInfo, initialValue)
        if (productInfo !== initialValue){
            const productResult = await HttpClient().updateProduct(productInfo.product)
            const detailsResult = await HttpClient().updateDetails(productInfo.details)

            SetInfo(productResult, detailsResult);

            alert("продукт успішно доданий")
        }
    }
    const createProductInfo = async ()  => {
        await setImagesSrc()

        if (productInfo !== initialValue){
            const productResult = await HttpClient().createProduct(productInfo.product)
            const detailsResult = await HttpClient().createDetails(productInfo.details)

            SetInfo(productResult, detailsResult);
            alert("продукт успішно доданий")
        }
    }
    function SetInfo(productResult: IProduct | undefined, detailsResult: IProductDetails | undefined) {
        setProductInfo(prevState => ({
            product: productResult ?? prevState.product,
            details: detailsResult ?? prevState.details,
        }))
    }

    const setImagesSrc = async () => {
        const imagesSrc = await initImagesSrc()
        setProductInfo(prevState => ({
            ...prevState, product: {
                ...prevState.product, imageSrc: imagesSrc[0]
            }, details: {
                ...prevState.details,
                features: prevState.details.features.map((feature: IFeature, index: number) => {
                    if (index < imagesSrc.length) {
                        return { ...feature, imageSrc: imagesSrc[index + 1] }
                    }
                    return feature
                })
            }
        }))
    }


    const initImagesSrc = async () => {
        let imagesSrc: string[] = [];
        let isProductImageExist = await HttpClient().checkImageExisting(productInfo.product.imageSrc)
        if (isProductImageExist) imagesSrc.push(productInfo.product.imageSrc)
        for (let image of images) {
            if (image) {
                const response = await HttpClient().saveImage(image!)
                console.log(response)
                imagesSrc.push(response as string)
            }
        }
        return imagesSrc
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
        },
    }
}

export default useProductInfo;