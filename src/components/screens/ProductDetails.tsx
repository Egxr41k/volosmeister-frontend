import React, {useEffect} from "react";
import useAdmin from "../../hooks/useAdmin";
import useProductInfo from "../../hooks/useProductInfo";
import {emptyInfo} from "../../types/IProductInfo";
import BorderedBtn from "../btns/BorderedBtn";
import IProperty from "../../types/IProperty";
import IFeature from "../../types/IFeature";
import FilledBtn from "../btns/FilledBtn";
import {navigateTo} from "../Navigation";
import Spinner from "../Spinner";
import {Link, useParams} from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams()
    const intId = parseInt(id ?? "")

    const { isAdmin} = useAdmin()
    const {productInfo} = useProductInfo(intId)

    useEffect(() => {
        console.log("ProductDetails component mount", productInfo)
    }, []);

    return productInfo == emptyInfo ? <Spinner/> :
        <div>
            <div className="relative">
                <img src="https://static.tildacdn.com/tild3461-3062-4839-a133-623333343030/kak-vibrat-mebel-dly.jpg"
                     alt="" className="w-full object-cover h-[93vh]"/>
                <div className="absolute flex -translate-x-2/4 -translate-y-2/4 bg-opacity-80 bg-fuchsia-950
                                left-1/2 top-1/2 w-full h-full justify-center items-center">

                    <div className="text-center text-white">
                        <img src={productInfo.product.imageSrc} alt="ProductImage"
                             className="mx-auto h-72"/>
                        <h2 className="font-semibold text-5xl my-6">
                            {productInfo.product.name}!
                        </h2>
                        <p className="font-light whitespace-pre-line my-6">
                            {productInfo.product.description}
                        </p>
                        { productInfo.product.isSale &&
                            <h2 className="text-4xl my-6">
                                АКЦІЙНА ЦІНА<br/>
                                <span className="font-semibold text-red-500">
                                    {" " + productInfo.product.newPrice + " ГРН!"}
                                </span>
                            </h2> }

                        {
                            isAdmin ?
                                <BorderedBtn color="white" handleClick={() => {} }>
                                    <Link to={`/ProductForm/${id}`}>Редагувати</Link>
                                </BorderedBtn>
                                :
                                <BorderedBtn color="white" handleClick={() => {}}>
                                    Замовити
                                </BorderedBtn>
                        }
                    </div>
                </div>
            </div>

            <div className="py-16">
                <h2 className="font-semibold text-3xl my-12 text-center">
                    ЧОМУ ВАРТО ОБРАТИ {productInfo.product.name.toUpperCase()}?
                </h2>
                { productInfo.details.features.map((feature: IFeature, index: number) => {
                    return <div key={feature.title} className="my-12">
                        <div className="w-96 mx-auto">
                            <img src={feature.imageSrc} alt="ProductImage"
                                 className=" h-72 w-full object-cover"/>
                            <h3 className="font-semibold text-xl my-3">
                                {feature.title}
                            </h3>
                            <p className="font-light whitespace-pre-line">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                })}
            </div>

            <div className="py-24 bg-fuchsia-50">
                <h2 className="font-semibold text-3xl my-12 text-center">
                    ХАРАКТЕРИСТИКИ
                </h2>
                <div className="flex">
                    <ul className="list-disc mx-auto">
                        { productInfo.details.stats.map((property: IProperty) => {
                            return property.name == "" ?
                                <li>{property.value}</li> :
                                <li>{property.name + ": " + property.value}</li>
                        })}
                    </ul>
                </div>
            </div>

            {/*Todo: create a image Slider*/}

            <div className="py-10 bg-fuchsia-50">
                <img src={productInfo.product.imageSrc} alt="ProductImage"
                     className="mx-auto h-96 my-5"/>

                <h3 className="font-bold text-center my-5">
                    {productInfo.product.name}
                </h3>
                <p className="text-center my-5">
                        <span className="text-fuchsia-600">
                            {productInfo.product.newPrice} грн. {"  "}
                        </span>
                    <span className="line-through text-gray-400">
                            {productInfo.product.oldPrice} грн.
                        </span>
                </p>
                <div className="mx-auto w-fit my-5">
                    <FilledBtn handleClick={() => {}}>
                        Замовити зараз
                    </FilledBtn>
                </div>
            </div>

            {/*Todo: create a "Recent viewed" section*/}

        </div>
}

export default ProductDetails