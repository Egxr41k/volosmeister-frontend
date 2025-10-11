import { ImageService } from '@/services/image.service'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IServerImage {
	src: string
	alt?: string
	className?: string
	width?: number
	height?: number
}

const ServerImage = ({ src, alt, className, width, height }: IServerImage) => {
	const [isImageValid, setIsImageValid] = useState(false)

	useEffect(() => {
		ImageService.checkExisting(src).then(result => setIsImageValid(result))
	}, [src])

	if (!src)
		return (
			<div
				style={
					width && height ? { width: `${width}px`, height: `${height}px` } : {}
				}
				className="flex items-center justify-center rounded-md border border-solid border-gray-300 bg-white"
			>
				<p className="uppercase text-black">no image yet</p>
			</div>
		)

	return isImageValid ? (
		<Image
			src={src}
			alt={alt ?? ''}
			className={[className, 'object-contain'].join(' ')}
			width={width ?? 0}
			height={height ?? 0}
			unoptimized
		/>
	) : (
		<div
			style={
				width && height ? { width: `${width}px`, height: `${height}px` } : {}
			}
			className="bg-whiterounded-md flex items-center justify-center border border-solid border-gray-300"
		>
			<p className="uppercase text-black">invalid image path</p>
		</div>
	)
}

export default ServerImage
