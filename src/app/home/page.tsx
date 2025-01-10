import { NextPage } from 'next'

const HomePage: NextPage = () => {
	return (
		<div className="h-[90vh]">
			<div className="flex h-full w-full items-center bg-white pl-48">
				<div className="text-black">
					<p className="mb-16 text-5xl">
						Doing everything
						<br /> for your
						<span className="text-violet-500 font-bold">comfort</span>
					</p>
					<p className="my-6 font-light">
						Many products to make your life easier! <br />
						Regular promotions and discounts!
						<br /> Only a quality product, tested by time and us personally!
					</p>
					<a
						href="/explorer"
						className={
							'bg-violet-500 hover:bg-violet-600 focus:bg-violet-700 rounded-md border-0 px-4 py-2 font-semibold text-white duration-300 ease-in-out'
						}
					>
						View products
					</a>
				</div>
				<img src="" alt="" />
			</div>
		</div>
	)
}

export default HomePage
