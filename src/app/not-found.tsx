import Link from 'next/link'

export default function NotFound() {
	return (
		<>
			<h1 className="text-3xl font-semibold">NotFound</h1>
			<p>Could not find requested rsource</p>
			<p>
				View{' '}
				<Link href="/explorer" className="text-primary">
					all products
				</Link>
			</p>
		</>
	)
}
