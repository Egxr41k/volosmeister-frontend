import { IFeature } from '@/types/feature.interface'
import Heading from '@/ui/Heading'

interface IProductFeatures {
	features: IFeature[]
}

const ProductFeatures = ({ features }: IProductFeatures) => {
	return (
		<div className="mt-20">
			<Heading className="mt-20">Features:</Heading>
			{features.length ? (
				features.map((feature: IFeature) => {
					return (
						<div key={feature.title} className="my-12">
							<div className="mx-auto w-96">
								<img
									src={feature.image}
									alt="ProductImage"
									className="h-72 w-full object-cover"
								/>
								<h3 className="my-3 text-xl font-semibold">{feature.title}</h3>
								<p className="whitespace-pre-line font-light">
									{feature.description}
								</p>
							</div>
						</div>
					)
				})
			) : (
				<div>There are no Features</div>
			)}
		</div>
	)
}

export default ProductFeatures
