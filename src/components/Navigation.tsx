import Link from 'next/link'

const Navigation = () => {
	return (
		<ul className="flex flex-wrap">
			<Link href="/home"> Головна</Link>
			<Link href="/products"> Каталог</Link>
			<Link href="/about-us"> Про нас</Link>
			<Link href="about-us/questions"> Питання</Link>
			<Link href="about-us/contacts"> Контакти</Link>
		</ul>
	)
}

export default Navigation
