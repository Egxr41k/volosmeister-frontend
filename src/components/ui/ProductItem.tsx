import { Link } from 'react-router-dom'
import { textFormatter } from '../../services/StringService'
import IProduct from '../../types/IProduct'
import AddToCartButton from './AddToCartButton'
import { BorderedBtn } from './Buttons'
import ServerImage from './ServerImage'

const ProductItem = ({ item }: { item: IProduct }) => {
	return (
		<div key={item.id} className="w-80 h-160 bg-fuchsia-50 mx-10 my-5">
			<ServerImage src={item.imageSrc} />
			<div className="p-5 h-64">
				<h2 className="text-xl font-semibold">
					{textFormatter(item.name, 30)}
				</h2>
				<p className="font-extralight h-24 my-2">
					{textFormatter(item.description, 120)}{' '}
				</p>
				<div className="flex justify-between my-2">
					<div className="flex gap-1">
						<p className="text-fuchsia-600 w-fit">{item.newPrice} грн.</p>
						<p className="line-through text-gray-500 w-fit">
							{item.oldPrice} грн.
						</p>
					</div>
					{item.isAvailable ? (
						<p className="text-fuchsia-600 w-fit">в наявності</p>
					) : (
						<p className="text-gray-500 w-fit">немає в наявності </p>
					)}
				</div>
				<div className="flex justify-between align-bottom">
					<AddToCartButton product={item} />

					<BorderedBtn onClick={() => {}}>
						<Link to={`/ProductDetails/${item.id}`}>Детальніше</Link>
					</BorderedBtn>
				</div>
			</div>
		</div>
	)
}
export default ProductItem
