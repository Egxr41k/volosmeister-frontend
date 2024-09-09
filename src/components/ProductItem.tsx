'use client'
import { useCart } from '@/hooks/useCart'
import IProduct from '@/types/data/IProduct'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ImageService } from '../services/image.service'
import BorderedBtn from './btns/BorderedBtn'
import FilledBtn from './btns/FilledBtn'

const ProductItem = ({ item }: { item: IProduct }) => {
	const { items } = useCart()

	const [isImageExist, setIsImageExist] = useState(false)

	useEffect(() => {
		console.log('ProductItem component mount')
		ImageService.checkImageExisting(item.imageSrc).then(result =>
			setIsImageExist(result)
		)
	}, [])

	return (
		<div key={item.id} className="h-160 mx-10 my-5 w-80 bg-fuchsia-50">
			<img
				src={isImageExist ? item.imageSrc : '/NO_PHOTO_YET.png'}
				alt=""
				className="h-96 w-full object-cover"
			/>
			<div className="h-64 p-5">
				<h2 className="text-xl font-semibold text-black">{item.name}</h2>
				<p className="my-2 h-24 font-extralight text-black">
					{item.description}{' '}
				</p>
				<div className="my-2 flex justify-between">
					<div className="flex gap-1">
						<p className="w-fit text-fuchsia-600">{item.newPrice} грн.</p>
						<p className="w-fit text-gray-500 line-through">
							{item.oldPrice} грн.
						</p>
					</div>
					{item.isAvailable ? (
						<p className="w-fit text-fuchsia-600">в наявності</p>
					) : (
						<p className="w-fit text-gray-500">немає в наявності </p>
					)}
				</div>
				<div className="flex justify-between align-bottom">
					<FilledBtn handleClick={() => {}}>В кошик</FilledBtn>
					<BorderedBtn handleClick={() => {}}>
						<Link href={`products/${item.id}`}>Детальніше</Link>
					</BorderedBtn>
				</div>
			</div>
		</div>
	)
}
export default ProductItem
