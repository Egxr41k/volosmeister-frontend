const Home = () => {
	return (
		<div className="h-[90vh]">
			<div className="flex h-full w-full items-center bg-white md:pl-48">
				<div className="text-black">
					<p className="mb-16 text-5xl">
						Doing everything
						<br /> for your
						<span className="font-bold text-violet-500">comfort</span>
					</p>
					<p className="my-6 font-light">
						Many products to make your life easier! <br />
						Regular promotions and discounts!
						<br /> Only a quality product, tested by time and us personally!
					</p>
					<button
						className={
							'rounded-md border-0 bg-violet-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-violet-600 focus:bg-violet-700'
						}
					>
						View products
					</button>
				</div>
				<img src="" alt="" />
			</div>
		</div>
	)
}

export default Home
