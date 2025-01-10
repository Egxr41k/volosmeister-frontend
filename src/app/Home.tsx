import { FC } from 'react'

import homeBg from 'assets/home-bg.png'
import Image from 'next/image'

import Carousel from '@/ui/carousel/Carousel'
import Catalog from '@/ui/catalog/Catalog'

import { TypePaginationProducts } from '@/types/product.interface'

import { carouselItems } from './carousel.data'

const Home: FC<TypePaginationProducts> = ({ products }) => {
	return (
		<>
			<div className="h-[90vh]">
				<div className="flex h-full w-full items-center justify-between bg-white pl-48">
					<div className="">
						<p className="mb-6 text-5xl">
							Doing everything
							<br /> for your
							<span className="font-bold text-violet-500"> comfort</span>
						</p>
						<p className="my-6 font-light">
							Many products to make your life easier! <br />
							Regular promotions and discounts!
							<br /> Only a quality product, tested by time and us personally!
						</p>
						<a
							href="#main"
							className={
								'rounded-md border-0 bg-violet-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-violet-600 focus:bg-violet-700'
							}
						>
							View products
						</a>
					</div>
					<div className="flex">
						<div className="absolute z-10 h-1/2 w-full bg-gradient-to-b from-white to-transparent"></div>
						<Image
							src={homeBg}
							alt="home-bg"
							className="z-0 h-full w-fit object-contain"
						/>
					</div>
				</div>
			</div>
			<div className="px-48" id="main">
				<Carousel items={carouselItems} className="mb-10" />
				<Catalog title="Freshed products" products={products} />
			</div>
		</>
	)
}

export default Home
