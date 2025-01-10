import Image from 'next/image'

interface IImageInput {
	image: string
	onChange: (value: string) => void
	file: File | undefined
	onFileChange: (file: File | undefined) => void
}

const ImageInput = ({ image, onChange, file, onFileChange }: IImageInput) => {
	return (
		<div className="w-[500px]">
			<Image
				src={file ? URL.createObjectURL(file) : image}
				alt={''}
				width={500}
				height={500}
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

			<input
				className="my-2 w-full"
				placeholder="Посилання на зображення"
				type="text"
				onChange={event => {
					onChange(event.target.value)
				}}
				value={file ? URL.createObjectURL(file) : image}
			/>
		</div>
	)
}

export default ImageInput
