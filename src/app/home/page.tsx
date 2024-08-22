export default function Home() {
	return (
		<div className="relative">
			<img
				src="https://static.tildacdn.com/tild3461-3062-4839-a133-623333343030/kak-vibrat-mebel-dly.jpg"
				alt=""
				className="h-[90vh] w-full object-cover"
			/>
			<div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-2/4 -translate-y-2/4 items-center justify-center bg-fuchsia-950 bg-opacity-80">
				<div className="text-center text-white">
					<p className="mb-16 text-sm font-bold">
						РОБИМО ВСЕ ДЛЯ ВАШОГО КОМФОРТУ
					</p>
					<h2 className="my-4 text-6xl font-semibold">The Blooming Home</h2>
					<p className="white-space: pre-wrap my-6 font-light">
						Безліч товарів, щоб полегшити Ваше життя!
						<br />
						Постійні акції та знижки!
						<br />
						Тільки якісний продукт, перевірений часом та нами особисто!
					</p>
				</div>
			</div>
		</div>
	)
}
