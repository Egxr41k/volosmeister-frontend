'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IImageInput {
	image: string
	onChange: (value: string) => void
	file: File | undefined
	onFileChange: (file: File | undefined) => void
}

const ImageInput = ({
	image: initialImage,
	onChange,
	file,
	onFileChange
}: IImageInput) => {
	const [image, setImage] = useState(initialImage)

	useEffect(() => {
		if (initialImage) {
			setImage(initialImage)
		}
	}, [initialImage])

	useEffect(() => {
		const timeOutId = setTimeout(() => onChange(image), 500)
		return () => clearTimeout(timeOutId)
	}, [image])

	return (
		<div className="w-[500px]">
			<Image
				src={file ? URL.createObjectURL(file) : image}
				alt={''}
				width={500}
				height={500}
				unoptimized
			/>
			<input
				type="file"
				id="fileInput"
				accept=".jpg"
				className="my-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:duration-300 file:ease-in-out hover:file:bg-violet-600"
				onChange={event => {
					onFileChange(event.target.files?.[0])
				}}
			/>

			<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
				<input
					className="w-full px-4 py-2 outline-none"
					placeholder="Image URL"
					type="text"
					onChange={event => {
						setImage(event.target.value)
					}}
					value={file ? URL.createObjectURL(file) : image}
				/>
			</div>
		</div>
	)
}

export default ImageInput
