import {IProduct} from "../../types/IProduct";
import {IProductDetails} from "../../types/IProductDetails";
import {useEffect, useState} from "react";
import {RequestHandler} from "../../services/RequestHandler";
export const ProductDetails = ({id}:{id:number}) => {

    const [details, setDetails] = useState<IProductDetails>()
    const getDetails = async () =>{
        let response = await RequestHandler().fetchById(id)
        console.log(response)
        setDetails(prevState => ({
            ...prevState,   id: response.id,
                            stats: response.stats,
                            features: response.features}))
        console.log(details)
    }

    useEffect(() => {
        getDetails()
        //3. используя контексты, получать все данные по id
    }, []);

    return <>{id}</>
}