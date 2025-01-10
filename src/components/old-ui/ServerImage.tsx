import { ImageService } from '@/services/image.service'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ServerImage = ({ src }: { src: string }) => {
	const [isImageValid, setIsImageValid] = useState(false)

	useEffect(() => {
		ImageService.checkImageExisting(src).then(result => setIsImageValid(result))
	}, [isImageValid])

	if (!src)
		return (
			<div className="flex h-full w-full items-center justify-center bg-black">
				<p className="uppercase text-white">no image yet</p>
			</div>
		)

	return isImageValid ? (
		<Image src={src} alt="" className="h-full w-full object-cover" />
	) : (
		<div className="flex h-full w-full items-center justify-center bg-black">
			<p className="uppercase text-white">invalid image path</p>
		</div>
	)
}

export default ServerImage
