import { ImageService } from '@/services/image.service'
import { useEffect, useState } from 'react'

const ServerImage = ({ imageSrc }: { imageSrc: string }) => {
	const [isImageValid, setIsImageValid] = useState(false)

	useEffect(() => {
		ImageService.checkImageExisting(imageSrc).then(result =>
			setIsImageValid(result)
		)
		console.log(isImageValid)
	}, [isImageValid])

	if (!imageSrc)
		return (
			<div className="flex h-full w-full items-center justify-center bg-black">
				<p className="uppercase text-white">no image yet</p>
			</div>
		)

	return isImageValid ? (
		<img src={imageSrc} alt="" className="h-full w-full object-cover" />
	) : (
		<div className="flex h-full w-full items-center justify-center bg-black">
			<p className="uppercase text-white">invalid image path</p>
		</div>
	)
}

export default ServerImage
