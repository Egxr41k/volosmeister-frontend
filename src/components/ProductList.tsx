import React, { useState, useEffect } from 'react';

export function MyComponent() {
    const [data, setData] = useState([]);
    let cards: React.JSX.Element[];
    useEffect(() => {
        //console.log(0)
        fetch('https://localhost:7128/api/Products')
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.log(data);
            })
            .catch(error => console.error(error))

    }, []);
    return <div className="bg-fuchsia-200 h-screen p-10">
        {
            data.map((element: any) => {
                return(<div className="h-3/4 w-3/4 bg-fuchsia-50 mx-auto">
                    <img src="https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt={element.name} className="w-full h-3/5"/>
                    <div className="mx-6 h-2/5">
                        <h2 className="text-lg font-semibold h-8">{element.name}</h2>
                        <p className="h-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis... </p>
                        <p className="text-fuchsia-600 h-8">199 грн. <span className="line-through text-gray-500">329 грн.</span></p>
                        <div className="flex justify-between">
                            <button className="font-semibold border border-black bg-black text-white rounded-md px-4 py-2 hover:border-fuchsia-600 hover:bg-fuchsia-600">ЗАМОВИТИ</button>
                            <button className="border border-black text-black rounded-md px-4 py-2 hover:border-fuchsia-600 hover:text-fuchsia-600" >Детальніше</button>
                        </div>
                    </div>
                </div>)
            })
        }
    </div>;
}