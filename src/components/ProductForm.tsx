import React, {useEffect, useState} from "react";
import {emptyProduct, IProduct} from "../types/IProduct";
import {emptyDetails, IProductDetails} from "../types/IProductDetails";
import HttpClient from "../services/HttpClient";
import {BorderedBtn, FilledBtn} from "./Btns";
import {IFeature} from "../types/IFeature";
import {IProperty} from "../types/IProperty";

const ProductForm = ({productToUpdate, detailsToUpdate}: {
    productToUpdate?: IProduct, detailsToUpdate?: IProductDetails}) => {

    const [product, setProduct] = useState(productToUpdate ?? emptyProduct)
    const [details, setDetails] = useState(detailsToUpdate ?? emptyDetails)
    const [images, setImages] = useState<(File | undefined)[]>([]);
    const [isProductImageExist, setIsProductImageExist] = useState(false)

    useEffect(() => {
        setProduct(productToUpdate ?? emptyProduct)
        setDetails(detailsToUpdate ??
            {features: [], id: 0, stats: []})
    }, [productToUpdate, detailsToUpdate]);

    useEffect(() => {
        const checkIsImageExist = async () => {
            const result = await HttpClient().checkImageExisting(product.imageSrc);
            setIsProductImageExist(result);
            console.log(product.imageSrc)
            console.log(result)
            console.log(isProductImageExist)
        };

        if(product.imageSrc != "") checkIsImageExist();
        const response = HttpClient().updateProduct(product)
        response.then(product =>{
            if(product) setProduct(product)
        })
    }, [product.imageSrc]);

    const createProduct = async (e:any)  => {
        e.preventDefault()
        await setImagesSrc()
        const result = await HttpClient().createProduct(product)
        alert("продукт успішно доданий")
        setProduct(emptyProduct)
    }
    const updateProduct = async (e:any)  => {
        e.preventDefault()
        await setImagesSrc()
        if (productToUpdate != product){
            let response = HttpClient().updateProduct(product)
            response.then(product =>{
                if(product) setProduct(product)
            })
        }
    }

    const setImagesSrc = async () => {
        const imagesSrc = await initImagesSrc()
        console.log(imagesSrc)
        setProduct(prevState => ({
            ...prevState, imageSrc: imagesSrc[0]
        }))
        console.log(product);
    }

    const initImagesSrc = async () => {
        let imagesSrc: string[] = [];
        if (isProductImageExist) imagesSrc.push(product.imageSrc)
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
        const newFeatures = [...details.features];
        newFeatures[i].title = value;
        setFeatures(newFeatures)
    }
    const setFeatureDescription = (value: string, i: number) => {
        const newFeatures = [...details.features];
        newFeatures[i].description = value;
        setFeatures(newFeatures)
    }
    const setFeatures = (newFeatures: IFeature[]) => {
        setDetails(prevState => ({
            ...prevState, features: newFeatures
        }))
    }

    const setPropertyName = (value: string, i: number) => {
        const newStats = [...details.stats];
        newStats[i].name = value;
        setStats(newStats)
    }
    const setPropertyValue = (value: string, i: number) => {
        const newStats = [...details.stats];
        newStats[i].value = value;
        setStats(newStats)
    }
    const setStats = (newStats: IProperty[]) => {
        setDetails(prevState => ({
            ...prevState, stats: newStats
        }))
    }


    const addFeature = () => {
        setDetails(prevState => ({
            ...prevState, features: [...prevState.features,
                {
                    description: "",
                    id: 0,
                    imageSrc: "",
                    productId: 0,
                    title: ""
                }
            ]
        }))
        setImages([...images, undefined])
    }
    const deleteFeature = () => {
        setDetails(prevState => ({
            ...prevState, features: prevState.features.filter(
                (_, i) =>
                    i !== prevState.features.length -1
            )
        }))

        setImages(
            images.filter(
                (_, i) =>
                    i !== images.length -1
            )
        );
    }

    const addProperty = () => {
        setDetails(prevState => ({
            ...prevState, stats: [...prevState.stats,
                {
                    id: 0,
                    productId: 0,
                    name: "",
                    value: ""
                }
            ]
        }))
    }
    const deleteProperty = () => {
        setDetails(prevState => ({
            ...prevState, stats: prevState.stats.filter(
                (_, i) =>
                    i !== prevState.stats.length -1
            )
        }))
    }

    return <div className="w-80 h-[80vh] overflow-y-auto bg-fuchsia-50 mx-10 my-5">
        <img src={images[0] ?
                URL.createObjectURL(images[0]!):
                isProductImageExist ?
                    product.imageSrc:
                        "/NO_PHOTO_YET.png"}

             alt="Selected image"
             className="w-full h-72 object-cover"/>
        <form className="h-64 p-5" encType="multipart/form-data" method="post"
              onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-xl font-semibold">{ productToUpdate ? "Оновити товар" : "Додати товар" }</h2>
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
                           setProduct(prevState => ({
                               ...prevState, name: event.target.value
                           }))
                       }} value={product.name} maxLength={25}/>
                <input className="w-16 my-2" placeholder="кількість" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  count: parseInt(event.target.value), isAvailable: true
                           }))
                       }} value={product.count}/>

                <input className="w-32 my-2" placeholder="стара ціна" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  oldPrice: parseInt(event.target.value), isSale: true
                           }))
                       }} value={product.oldPrice}/>

                <input className="w-32 my-2" placeholder="нова ціна" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  newPrice: parseInt(event.target.value)
                           }))
                       }} value={product.newPrice}/>
            </div>
            <textarea className="w-full h-20 my-2" placeholder="опис"
                      onChange={event => {
                          setProduct(prevState => ({
                              ...prevState, description: event.target.value
                          }))
                      }} value={product.description} maxLength={120}/>
            {productToUpdate && <>
                <div className="my-2">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold my-auto">
                            { details.features.length != 0 ? "Оновити cекції" : "Додати cекції" }
                        </h2>
                        <BorderedBtn handleClick={addFeature}>
                            +
                        </BorderedBtn>
                    </div>

                    { details.features.map((feature: IFeature, index: number) => {
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
                            { details.stats.length != 0 ? "Оновити характеристики" : "Додати характеристики" }
                        </h2>
                        <BorderedBtn handleClick={addProperty}>
                            +
                        </BorderedBtn>
                    </div>

                    { details.stats.map((property: IProperty, index: number) => {
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
            <FilledBtn handleClick={ productToUpdate ?
                async (event) => updateProduct(event) :
                async (event) => createProduct(event)}>
                { productToUpdate ? "Оновити" : "Додати"}
            </FilledBtn>
        </form>
    </div>
}
export default ProductForm