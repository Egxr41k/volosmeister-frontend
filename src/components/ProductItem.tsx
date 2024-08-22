'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAdmin from '../hooks/useAdmin'
import useCart from '../hooks/useCart'
import useProductInfo from '../hooks/useProductInfo'
import { checkImageExisting } from '../services/ImageService'
import { textFormatter } from '../services/StringService'
import IProduct from '../types/data/IProduct'
import BorderedBtn from './btns/BorderedBtn'
import FilledBtn from './btns/FilledBtn'

const ProductItem = ({ item }: { item: IProduct }) => {
	const { increaseCartQuantity } = useCart()
	const { isAdmin } = useAdmin()

	const { request } = useProductInfo()

	const [isImageExist, setIsImageExist] = useState(false)

	useEffect(() => {
		console.log('ProductItem component mount')
		checkImageExisting(item.imageSrc).then(result => setIsImageExist(result))
	}, [])

	return (
		<div key={item.id} className="mx-10 my-5 h-160 w-80 bg-fuchsia-50">
			<img
				src={isImageExist ? item.imageSrc : '/NO_PHOTO_YET.png'}
				alt=""
				className="h-96 w-full object-cover"
			/>
			<div className="h-64 p-5">
				<h2 className="text-xl font-semibold">
					{textFormatter(item.name, 30)}
				</h2>
				<p className="my-2 h-24 font-extralight">
					{textFormatter(item.description, 120)}{' '}
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
					<FilledBtn
						handleClick={
							isAdmin
								? async () => {
										const isSuccesses = window.confirm(
											'вибраний вами товар буде виделанний'
										)
										if (isSuccesses) await request.deleteProductInfo(item.id)
									}
								: () => increaseCartQuantity(item.id)
						}
					>
						{isAdmin ? 'Видалити' : 'В кошик'}
					</FilledBtn>

					<BorderedBtn handleClick={() => {}}>
						<Link href={`products/${item.id}`}>Детальніше</Link>
					</BorderedBtn>
				</div>
			</div>
		</div>
	)
}
export default ProductItem
