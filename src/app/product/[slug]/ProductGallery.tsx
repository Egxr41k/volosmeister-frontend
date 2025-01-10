import cn from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

interface IProductGallery {
	images: string[]
}

export function ProductGallery({ images }: IProductGallery) {
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<div>
			<Image
				src={images[activeIndex]}
				alt=""
				width={500}
				height={500}
				className="overflow-hidden rounded-lg"
				priority
				draggable={false}
			/>
			<div
				className="mt-6"
				style={{ width: '500px', overflowX: 'auto', whiteSpace: 'nowrap' }}
			>
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={cn(
							'owerflow-hidden mr-5 inline rounded-lg border-b-2 border-solid transition-all duration-300 last:mr-0 hover:shadow-md',
							{
								'border-primary shadow-md': index === activeIndex,
								'border-transparent': index !== activeIndex
							}
						)}
					>
						<Image
							src={image}
							alt=""
							width={100}
							height={100}
							priority
							draggable={false}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
