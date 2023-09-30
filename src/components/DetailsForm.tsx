import React, {useEffect} from "react";
import {IProductDetails} from "../types/IProductDetails";
import {IFeature} from "../types/IFeature";
import {BorderedBtn} from "./Btns";
import {IProperty} from "../types/IProperty";

interface IDetailsFormProps {
    details: IProductDetails,
    setDetails: React.Dispatch<React.SetStateAction<IProductDetails>>
    images: (File | undefined) [],
    setImages: React.Dispatch<React.SetStateAction<(File | undefined) []>>
}

const DetailsForm = ({details, setDetails, images, setImages}: IDetailsFormProps) => {


    useEffect(() => {
        console.log(images)
    }, []);
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

    return <div>
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

                    <input className="w-48 my-2" placeholder="назва" type="text"
                           onChange={event =>
                               setPropertyName(event.target.value, index)
                           } value={property.name}/>
                    <input className="w-48 my-2" placeholder="значення" type="text"
                           onChange={event =>
                               setPropertyValue(event.target.value, index)
                           } value={property.value}/>

                </div>})
            }
        </div>
    </div>
}
export default DetailsForm