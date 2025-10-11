import { ImageService } from '@/services/image.service'
import { IProduct } from '@/types/product.interface'
import { useState } from 'react'

export const useImageFiles = () => {
	const [productImageFiles, setProductImageFiles] = useState([undefined] as (
		| File
		| undefined
	)[])

	const setImagesToProduct = async (product: IProduct): Promise<IProduct> => {
		const productImagesSrc = await initProductImageSrc(
			product,
			productImageFiles
		)

		setProductImageFiles([])

		return {
			...product,
			images: productImagesSrc
		}
	}

	const initProductImageSrc = async (
		product: IProduct,
		productImageFiles: (File | undefined)[]
	): Promise<string[]> => {
		if (product.images) {
			return await Promise.all(
				product.images.map(async (image: string, index: number) => {
					if (productImageFiles[index]) {
						return await ImageService.save(productImageFiles[index]!)
					} else {
						return image
					}
				})
			)
		} else {
			if (productImageFiles.length === 0) {
				return []
			}
			const filteredImages = productImageFiles.filter(
				(image: File | undefined): image is File => image !== undefined
			)
			return await Promise.all(
				filteredImages.map(async image => {
					return await ImageService.save(image)
				})
			)
		}
	}

	return {
		productImageFiles,
		setProductImageFiles,
		setImagesToProduct
	}
}
