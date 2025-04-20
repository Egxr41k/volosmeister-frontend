import { NextPage } from 'next'

const HomePage: NextPage = () => {
	return (
		<div className="h-[90vh]">
			<div className="flex h-full w-full items-center justify-between bg-white">
				<div className="">
					<p className="mb-6 text-5xl">
						Doing everything
						<br /> for your
						<span className="font-bold text-emerald-500"> comfort</span>
					</p>
					<p className="my-6 font-light">
						Many products to make your life easier! <br />
						Regular promotions and discounts!
						<br /> Only a quality product, tested by time and us personally!
					</p>
					<a
						href="/main"
						className={
							'rounded-md border-0 bg-emerald-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-emerald-600 focus:bg-emerald-700'
						}
					>
						View products
					</a>
				</div>
			</div>
		</div>
	)
}

export default HomePage
