import React, {useEffect, useState} from "react";
import {IProductDetails} from "../types/IProductDetails";
import {IFeature} from "../types/IFeature";
import {BorderedBtn} from "./Btns";

const DetailsForm = ({details, setDetails}: {details: IProductDetails,
    setDetails: React.Dispatch<React.SetStateAction<IProductDetails>>}) => {
    const [featureImages, setFeatureImages] = useState<(File | undefined)[]>([])
    const [features, setFeatures] = useState<IFeature[]>([
        {
            description: "",
            id: 0,
            imagesSrc: "",
            productId: 0,
            title: ""
        }
    ])
    const setFeatureTitle = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const newFeatures = [...details.features];
        newFeatures[i].title = e.target.value;
        setDetails(prevState => ({
            ...prevState, features: newFeatures
        }))
    }
    const setFeatureDescription = (e: React.ChangeEvent<HTMLTextAreaElement>, i: number) => {
        const newFeatures = [...details.features];
        newFeatures[i].description = e.target.value;
        setDetails(prevState => ({
            ...prevState, features: newFeatures
        }))
    }

    const addSection = () => {
        //setDetails(prevState => {...prevState, feature)
    }
    return <div className="">
        <div>
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold">
                    { details.features.length != 0 ? "Оновити cекції" : "Додати cекції" }
                </h2>
                <BorderedBtn handleClick={addSection}>
                    +
                </BorderedBtn>
            </div>

            { details.features.length != 0 ? details.features.map((feature: IFeature, index: number) => {
                return <div>
                    <input className="w-48 my-2" placeholder="назва" type="text"
                           onChange={event =>
                               setFeatureTitle(event, index)
                           } value={feature.title}/>
                    <input type="file" id="fileInput" accept=".jpg"
                           className="block w-full my-2 text-sm text-gray-500
                       file:ease-in-out file:duration-300
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600 "
                           onChange={event => {
                               setFeatureImages(prevState => [
                                   ...prevState, event.target.files?.[0]
                               ])
                           }}/>
                    <textarea className="w-full h-20 my-2" placeholder="опис"
                              onChange={event =>
                                  setFeatureDescription(event, index)
                              } value={feature.description} />
                </div>}) :
                <CreateDetails/>
            }
        </div>
    </div>
}

const CreateDetails = () => {
    const [features, setFeatures] = useState<IFeature[]>([
        {
            description: "",
            id: 0,
            imagesSrc: "",
            productId: 0,
            title: ""
        }
    ])
    const [featureImages, setFeatureImages] = useState<(File | undefined)[]>([])

    return <div>
        <input type="file" id="fileInput" accept=".jpg"
               className="block w-full my-2 text-sm text-gray-500
                       file:ease-in-out file:duration-300
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600 "
               onChange={event => {
                   setFeatureImages(prevState => [
                       ...prevState, event.target.files?.[0]
                   ])
               }}/>
        <input className="w-48 my-2" placeholder="назва" type="text"
               onChange={event =>
                   setFeatures(prevState => [])
               } value={features[features.length - 1].title}/>

        <textarea className="w-full h-20 my-2" placeholder="опис"
                  onChange={event =>
                      setFeatures(prevState => [])
                  } value={features[features.length - 1].description} />
    </div>
}
export default DetailsForm