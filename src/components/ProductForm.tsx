import React, {useEffect, useState} from "react";
import HttpClient from "../services/HttpClient";
import {BorderedBtn, FilledBtn} from "./Btns";
import {IFeature} from "../types/IFeature";
import {IProperty} from "../types/IProperty";
import {emptyInfo, IProductInfo} from "../types/IProductInfo";

const ProductForm = ({existingProductInfo}: {existingProductInfo: IProductInfo}) => {
    const [productInfo, setProductInfo] = useState<IProductInfo>(existingProductInfo)
    const [images, setImages] = useState<(File | undefined)[]>([])
    const [isProductImageExist, setIsProductImageExist] = useState(false)
    const [isProductExist, setIsProductExist] = useState(productInfo.product.id != 0)

    useEffect(() => {
        console.log("ProductForm component mount")
        if (isProductExist) checkProductImageExist()
    }, []);

    const checkProductImageExist = () => {
        HttpClient().checkImageExisting(productInfo.product.imageSrc)
            .then(result => setIsProductImageExist(result));

    };

    const createProductInfo = async (e:any)  => {
        e.preventDefault()
        await setImagesSrc()

        if (productInfo != emptyInfo){
            const productResult = await HttpClient().createProduct(productInfo.product)
            const detailsResult = await HttpClient().createDetails(productInfo.details)

            setProductInfo(prevState => ({
                product: productResult ?? prevState.product,
                details: detailsResult ?? prevState.details,
            }))
            alert("продукт успішно доданий")
        }
    }
    const updateProductInfo = async (e:any)  => {
        e.preventDefault()
        await setImagesSrc()

        if (productInfo != emptyInfo){
            const productResult = await HttpClient().updateProduct(productInfo.product)
            const detailsResult = await HttpClient().updateDetails(productInfo.details)

            setProductInfo(prevState => ({
                product: productResult ?? prevState.product,
                details: detailsResult ?? prevState.details,
            }))
            alert("продукт успішно доданий")
        }
    }

    const setImagesSrc = async () => {
        const imagesSrc = await initImagesSrc()
        console.log(imagesSrc)
        setProductInfo(prevState => ({
            ...prevState, product: {
                ...prevState.product, imageSrc: imagesSrc[0]
            }
        }))
        console.log(productInfo.product);
    }

    const initImagesSrc = async () => {
        let imagesSrc: string[] = [];
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

    const addImage = (image: File | undefined) => {
        if (image) {
            setImages(prevState => [
                image, ...prevState
            ])
        } else return
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
                        productId: 0,
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
                ...prevState.details, features: {
                    ...prevState.details.features.filter(
                        (_, i) =>
                            i !== prevState.details.features.length -1
                    )
                }
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
                        productId: 0,
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
                ...prevState.details, stats: {
                    ...prevState.details.stats.filter(
                        (_, i) =>
                            i !== prevState.details.stats.length -1
                    )
                }
            }
        }))
    }

    return <div className="w-80 h-[80vh] overflow-y-auto bg-fuchsia-50 mx-10 my-5">
        <img src={images[0] ?
                URL.createObjectURL(images[0]!):
                isProductImageExist ?
                    productInfo.product.imageSrc:
                        "/NO_PHOTO_YET.png"}

             alt="Selected image"
             className="w-full h-72 object-cover"/>
        <form className="h-64 p-5" encType="multipart/form-data" method="post"
              onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-xl font-semibold">{ isProductExist ? "Оновити товар" : "Додати товар" }</h2>
            <input type="file" id="fileInput" accept=".jpg"
                   className="block w-full my-2 text-sm text-gray-500
                       file:ease-in-out file:duration-300
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600 "
                   onChange={event => {
                       addImage(event.target.files?.[0])
                   }}/>

            <div className="flex flex-wrap justify-between">
                <input className="w-48 my-2" placeholder="назва" type="text"
                       onChange={event => {
                           setProductInfo(prevState => ({
                               ...prevState, product: {
                                   ...prevState.product, name: event.target.value
                               }
                           }))
                       }} value={productInfo.product.name} maxLength={25}/>
                <input className="w-16 my-2" placeholder="кількість" type="number"
                       onChange={event => {
                           setProductInfo(prevState => ({
                               ...prevState, product: {
                                   ...prevState.product,
                                   count: parseInt(event.target.value),
                                   isAvailable: parseInt(event.target.value) > 0
                               }
                           }))
                       }} value={productInfo.product.count}/>

                <input className="w-32 my-2" placeholder="стара ціна" type="number"
                       onChange={event => {
                           setProductInfo(prevState => ({
                               ...prevState, product: {
                                   ...prevState.product,
                                   oldPrice: parseInt(event.target.value),
                                   isSale: parseInt(event.target.value) > prevState.product.newPrice
                               }
                           }))
                       }} value={productInfo.product.oldPrice}/>

                <input className="w-32 my-2" placeholder="нова ціна" type="number"
                       onChange={event => {
                           setProductInfo(prevState => ({
                               ...prevState, product: {
                                   ...prevState.product,
                                   newPrice: parseInt(event.target.value)
                               }
                           }))
                       }} value={productInfo.product.newPrice}/>
            </div>
            <textarea className="w-full h-20 my-2" placeholder="опис"
                      onChange={event => {
                          setProductInfo(prevState => ({
                              ...prevState, product: {
                                  ...prevState.product,
                                  description: event.target.value
                              }
                          }))
                      }} value={productInfo.product.description} maxLength={120}/>
            {isProductExist && <>
                <div className="my-2">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold my-auto">
                            { productInfo.details.features.length != 0 ? "Оновити cекції" : "Додати cекції" }
                        </h2>
                        <BorderedBtn handleClick={addFeature}>
                            +
                        </BorderedBtn>
                    </div>

                    { productInfo.details.features.map((feature: IFeature, index: number) => {
                        return <div key={index } className="my-2">
                            <div className="flex justify-between my-2">
                                <h4 className="font-medium">
                                    Ceкція {index+1}
                                </h4>
                                <BorderedBtn handleClick={deleteFeature}>
                                    -
                                </BorderedBtn>
                            </div>
                            <img src={images[index + 1] ? URL.createObjectURL(images[index + 1]!) :
                                "/NO_PHOTO_YET.png"}
                                 alt="Selected image" className="w-full h-72 object-cover"/>
                            <input type="file" id="fileInput" accept=".jpg"
                                   className="block w-full my-2 text-sm text-gray-500
                       file:ease-in-out file:duration-300
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600"
                                   onChange={event => {
                                       const newImages = [...images]; // создаем копию массива, чтобы не мутировать исходный
                                       newImages[index + 1] = event.target.files?.[0];
                                       setImages(newImages);
                                       console.log(images)
                                   }}/>
                            <input className="w-48 my-2" placeholder="назва" type="text"
                                   onChange={event =>
                                       setFeatureTitle(event.target.value, index)
                                   } value={feature.title}/>
                            <textarea className="w-full h-20 my-2" placeholder="опис"
                                      onChange={event =>
                                          setFeatureDescription(event.target.value, index)
                                      } value={feature.description} />
                        </div>})
                    }
                </div>
                <div className="my-2">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold my-auto">
                            { productInfo.details.stats.length != 0 ? "Оновити характеристики" : "Додати характеристики" }
                        </h2>
                        <BorderedBtn handleClick={addProperty}>
                            +
                        </BorderedBtn>
                    </div>

                    { productInfo.details.stats.map((property: IProperty, index: number) => {
                        return <div key={index} className="my-2">
                            <div className="flex justify-between my-2">
                                <h4 className="font-medium">
                                    Характеристика {index+1}
                                </h4>
                                <BorderedBtn handleClick={deleteProperty}>
                                    -
                                </BorderedBtn>
                            </div>

                            <input className="w-32 my-2" placeholder="назва" type="text"
                                   onChange={event =>
                                       setPropertyName(event.target.value, index)
                                   } value={property.name}/>
                            <input className="w-32 my-2" placeholder="значення" type="text"
                                   onChange={event =>
                                       setPropertyValue(event.target.value, index)
                                   } value={property.value}/>

                        </div>})
                    }
                </div>
            </>}
            <FilledBtn handleClick={ isProductExist ?
                async (event) => updateProductInfo(event) :
                async (event) => createProductInfo(event)}>
                { isProductExist ? "Оновити" : "Додати"}
            </FilledBtn>
        </form>
    </div>
}
export default ProductForm