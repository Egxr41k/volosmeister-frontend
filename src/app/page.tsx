import { NextPage } from 'next'
import homeBg from '../../public/home-bg.png'
import Image from 'next/image'

const HomePage: NextPage = () => {
	return (
		<div className="flex h-[90vh] w-1/2 items-center justify-between bg-gradient-radial">
			<div>
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
					href="/main"
					className={
						'rounded-md border-0 bg-violet-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-violet-600 focus:bg-violet-700'
					}
				>
					View products
				</a>
			</div>
			<div className="absolute right-0 flex">
				<div className="absolute z-10 h-1/2 w-full bg-gradient-to-b from-white to-transparent"></div>
				<Image src={homeBg} alt="home-bg" className="h-[90vh] w-fit" />
			</div>
		</div>
	)
}

export default HomePage
