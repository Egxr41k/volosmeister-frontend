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
	) => {
		return await Promise.all(
			product.images.map(async (image: string, index: number) => {
				if (productImageFiles[index]) {
					return (await ImageService.saveImage(
						productImageFiles[index]!
					)) as string
				} else {
					return image
				}
			})
		)
	}

	const initFeatureImageSrc = async (
		product: IProduct,
		featureImageFiles: (File | undefined)[]
	) => {
		return await Promise.all(
			product.features.map(async (feature: IFeature, index: number) => {
				if (featureImageFiles[index]) {
					return (await ImageService.saveImage(
						featureImageFiles[index]!
					)) as string
				} else {
					return feature.image
				}
			})
		)
	}

	const setImagesSrcToFeature = (
		features: IFeature[],
		featureImagesSrc: string[]
	) => {
		return features.map((feature: IFeature, index: number) => {
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
