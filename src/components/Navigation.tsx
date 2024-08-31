import Link from 'next/link'

const Navigation = () => {
	return (
		<ul className="flex flex-wrap">
			<Link href="/home"> Головна</Link>
			<Link href="/products"> Каталог</Link>
		</ul>
	)
}

export default Navigation
