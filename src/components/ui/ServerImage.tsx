import { useEffect, useState } from 'react'
import { ImageService } from '../../services/ImageService'

interface IServerImage {
	src: string
	alt?: string
}

const ServerImage = ({ src, alt = '' }: IServerImage) => {
	const [isImageValid, setIsImageValid] = useState(false)

	useEffect(() => {
		ImageService.checkImageExisting(src).then(result => setIsImageValid(result))
	}, [isImageValid, src])

	if (!src)
		return (
			<div className="flex h-full w-full items-center justify-center bg-black">
				<p className="uppercase text-white">no image yet</p>
			</div>
		)

	return isImageValid ? (
		<img src={src} alt={alt} className="h-full w-full object-cover" />
	) : (
		<div className="flex h-full w-full items-center justify-center bg-black">
			<p className="uppercase text-white">invalid image path</p>
		</div>
	)
}

export default ServerImage
