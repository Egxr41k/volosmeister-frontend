import { ImageService } from '@/services/image.service'
import { IFeature } from '@/types/feature.interface'
import { IProduct } from '@/types/product.interface'
import { useState } from 'react'

export const useImageFiles = () => {
	const [productImageFiles, setProductImageFiles] = useState(
		[] as (File | undefined)[]
	)

	const [featureImageFiles, setFeatureImageFiles] = useState(
		[] as (File | undefined)[]
	)

	const setImagesToProduct = async (product: IProduct): Promise<IProduct> => {
		const productImagesSrc = await initProductImageSrc(
			product,
			productImageFiles
		)
		const featureImagesSrc = await initFeatureImageSrc(
			product,
			featureImageFiles
		)

		setProductImageFiles([])
		setFeatureImageFiles([])

		return {
			...product,
			images: productImagesSrc,
			features: setImagesSrcToFeature(product.features, featureImagesSrc)
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
						return await ImageService.saveImage(productImageFiles[index]!)
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
				(image: File | undefined) => image !== undefined
			)
			return await Promise.all(
				filteredImages.map(async (image: File) => {
					return await ImageService.saveImage(image)
				})
			)
		}
	}

	const initFeatureImageSrc = async (
		product: IProduct,
		featureImageFiles: (File | undefined)[]
	): Promise<string[]> => {
		if (product.features) {
			return await Promise.all(
				product.features.map(async (feature: IFeature, index: number) => {
					if (featureImageFiles[index]) {
						return await ImageService.saveImage(featureImageFiles[index]!)
					} else {
						return feature.image
					}
				})
			)
		} else {
			if (featureImageFiles.length === 0) {
				return []
			}
			const filteredImages = featureImageFiles.filter(
				(image: File | undefined) => image !== undefined
			)
			return await Promise.all(
				filteredImages.map(async (image: File) => {
					return await ImageService.saveImage(image)
				})
			)
		}
	}

	const setImagesSrcToFeature = (
		features: IFeature[],
		featureImagesSrc: string[]
	) => {
		return featureImagesSrc.length === 0
			? features
			: features.map((feature: IFeature, index: number) => {
					if (index < featureImagesSrc.length) {
						return { ...feature, imageSrc: featureImagesSrc[index] }
					} else return feature
				})
	}

	return {
		productImageFiles,
		setProductImageFiles,
		featureImageFiles,
		setFeatureImageFiles,
		setImagesToProduct
	}
}
