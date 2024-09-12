'use client'
import IProduct from '@/types/data/IProduct'
import { useEffect, useState } from 'react'
import { ImageService } from '../services/image.service'

const ProductItem = ({ item }: { item: IProduct }) => {
	const [isImageExist, setIsImageExist] = useState(false)

	useEffect(() => {
		console.log('ProductItem component mount')
		ImageService.checkImageExisting(item.imageSrc).then(result =>
			setIsImageExist(result)
		)
	}, [])

	return (
		<div className="m-2.5 w-60 rounded-lg border border-solid border-gray-300">
			<img
				src={isImageExist ? item.imageSrc : '/NO_PHOTO_YET.png'}
				alt=""
				className="h-60 w-full object-cover"
			/>
			<div className="p-2.5">
				<h2 className="text-xl font-semibold text-black">{item.name}</h2>
				<div className="my-2 flex justify-between">
					<div className="">
						<p className="text-sm text-gray-400 line-through">
							{item.oldPrice} ₴
						</p>
						<p className="text-sm text-violet-500">{item.newPrice} ₴</p>
					</div>
					<div className="flex gap-3">
						<img src="/icons/favorite.svg" alt="" width={24} height={24} />
						<img src="/icons/cart.svg" alt="" width={24} height={24} />
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProductItem
