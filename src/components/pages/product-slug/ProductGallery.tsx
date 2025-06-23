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
				className="h-[500px] w-[500px] rounded-lg bg-white object-contain"
				priority
				draggable={false}
				unoptimized
			/>
			<div
				className="mt-6"
				style={{ width: '500px', overflowX: 'auto', whiteSpace: 'nowrap' }}
			>
				{images.map((image, index) => (
					<button key={index} onClick={() => setActiveIndex(index)}>
						<Image
							src={image}
							alt=""
							width={100}
							height={100}
							className={[
								'owerflow-hidden mr-5 inline h-[100px] w-[100px] rounded-lg border-b-2 border-solid bg-white object-contain transition-all duration-300 last:mr-0',
								index === activeIndex
									? 'border-emerald-500'
									: 'border-transparent'
							].join(' ')}
							priority
							draggable={false}
							unoptimized
						/>
					</button>
				))}
			</div>
		</div>
	)
}
