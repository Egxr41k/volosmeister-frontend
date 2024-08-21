import { useEffect, useState } from 'react'
import {
	createDetails,
	deleteDetails,
	getDetails,
	updateDetails
} from '../services/ HttpClient/DetailsRequests'
import {
	checkImageExisting,
	deleteImage,
	saveImage
} from '../services/ HttpClient/ImageRequests'
import {
	createProduct,
	deleteProduct,
	getProduct,
	updateProduct
} from '../services/ HttpClient/ProductRequests'
import { getIdFromUrl } from '../services/StringService'
import IFeature from '../types/IFeature'
import IProductInfo, { emptyInfo } from '../types/IProductInfo'
import IProperty from '../types/IProperty'

const useProductInfo = (id: number = 0) => {
	const [productInfo, setProductInfo] = useState(emptyInfo)
	const [images, setImages] = useState<(File | undefined)[]>([])
	const [isImagesExist, setIsImagesExist] = useState([false])

	useEffect(() => {
		id != 0 &&
			getProductInfo(id!).then(data => {
				if (data) {
					setProductInfo(data)
					checkImagesExist(data).catch(error => console.log(error))
				}
			})
	}, [])

	const checkImagesExist = async (productInfo: IProductInfo) => {
		const isProductImageExist = await checkImageExisting(
			productInfo.product.imageSrc
		)
		const isFeaturesImagesExist = await Promise.all(
			productInfo.details.features.map(
				async (feature: IFeature, index: number) => {
					return await checkImageExisting(feature.imageSrc)
				}
			)
		)
		setIsImagesExist([isProductImageExist, ...isFeaturesImagesExist])
	}

	const getProductInfo = async (id: number) => {
		const productResult = await getProduct(id)
		const detailsResult = await getDetails(id)

		if (productResult && detailsResult) {
			return {
				product: productResult,
				details: detailsResult
			} as IProductInfo
		}
	}
	const updateProductInfo = async () => {
		const infoToSent = await setImagesSrc()

		if (infoToSent !== productInfo) {
			const productResult = await updateProduct(infoToSent.product)
			const detailsResult = await updateDetails(infoToSent.details)

			if (productResult && detailsResult) {
				setProductInfo(prevState => ({
					product: productResult,
					details: detailsResult
				}))
				alert('продукт успішно оновлений')
			}
		}
	}
	const createProductInfo = async () => {
		const infoToSent = await setImagesSrc()

		if (infoToSent !== productInfo) {
			const productResult = await createProduct(infoToSent.product)
			const detailsResult = await createDetails(infoToSent.details)

			if (productResult && detailsResult) {
				setProductInfo(prevState => ({
					product: productResult,
					details: detailsResult
				}))
				alert('продукт успішно доданий')
			}
		}
	}
	const deleteProductInfo = async (id: number) => {
		const tempInfo = await getProductInfo(id)

		const imageResults = await deleteImages(getImagesSrc(tempInfo!))
		const productResult = await deleteProduct(id)
		const detailsResult = await deleteDetails(id)

		let results = [productResult, detailsResult, ...imageResults]
		alert(results)
	}

	const deleteImages = async (imagesSrc: string[]) => {
		console.log(imagesSrc)
		return await Promise.all(
			imagesSrc.map(async (imageSrc: string) => {
				if (imageSrc != '') {
					let imageId = getIdFromUrl(imageSrc)
					return await deleteImage(imageId!)
				}
			})
		)
	}
	const getImagesSrc = (tempInfo: IProductInfo) => {
		const featureImagesSrc = tempInfo.details.features.map(
			(feature: IFeature, index: number) => {
				return feature.imageSrc
			}
		)
		return [tempInfo.product.imageSrc, ...featureImagesSrc]
	}

	const setImagesSrc = async () => {
		const [productImagesSrc, ...featureImagesSrc] = await initImagesSrc()

		return {
			product: {
				...productInfo.product,
				imageSrc: productImagesSrc
			},
			details: {
				...productInfo.details,
				features: setImagesSrcToFeature(featureImagesSrc)
			}
		} as IProductInfo
	}

	const setImagesSrcToFeature = (featureImagesSrc: string[]) => {
		return productInfo.details.features.map(
			(feature: IFeature, index: number) => {
				if (index < featureImagesSrc.length) {
					return { ...feature, imageSrc: featureImagesSrc[index] }
				} else return feature
			}
		)
	}
	const initImagesSrc = async () => {
		const [productImageFile, ...featureImageFiles] = images

		let productImagesSrc = await initProductImageSrc(productImageFile)
		console.log(productImagesSrc)

		let featureImagesSrc = await initFeatureImageSrc(featureImageFiles)
		console.log(featureImagesSrc)

		setImages([])
		return [productImagesSrc, ...featureImagesSrc]
	}

	const initProductImageSrc = async (productImgFile: File | undefined) => {
		if (productImgFile) {
			return (await saveImage(productImgFile)) as string
		} else {
			return productInfo.product.imageSrc
		}
	}

	const initFeatureImageSrc = async (
		featureImageFiles: (File | undefined)[]
	) => {
		return await Promise.all(
			productInfo.details.features.map(
				async (feature: IFeature, index: number) => {
					if (featureImageFiles[index]) {
						return (await saveImage(featureImageFiles[index]!)) as string
					} else {
						return feature.imageSrc
					}
				}
			)
		)
	}

	const setImageToPos = (image: File | undefined, i: number) => {
		const newImages = [...images]
		if (image) newImages[i] = image
		else return
		setImages(newImages)
	}

	const setDescription = (value: string) => {
		setProductInfo(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				description: value
			}
		}))
	}
	const setOldPrice = (value: number) => {
		setProductInfo(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				oldPrice: value,
				isSale: value > prevState.product.newPrice
			}
		}))
	}
	const setNewPrice = (value: number) => {
		setProductInfo(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				newPrice: value
			}
		}))
	}
	const setCount = (value: number) => {
		setProductInfo(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				count: value,
				isAvailable: value > 0
			}
		}))
	}
	const setName = (value: string) => {
		setProductInfo(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				name: value
			}
		}))
	}

	const setFeatureTitle = (value: string, i: number) => {
		const newFeatures = [...productInfo.details.features]
		newFeatures[i].title = value
		setFeatures(newFeatures)
	}
	const setFeatureDescription = (value: string, i: number) => {
		const newFeatures = [...productInfo.details.features]
		newFeatures[i].description = value
		setFeatures(newFeatures)
	}
	const setFeatures = (newFeatures: IFeature[]) => {
		setProductInfo(prevState => ({
			...prevState,
			details: {
				...prevState.details,
				features: newFeatures
			}
		}))
	}

	const setPropertyName = (value: string, i: number) => {
		const newStats = [...productInfo.details.stats]
		newStats[i].name = value
		setStats(newStats)
	}
	const setPropertyValue = (value: string, i: number) => {
		const newStats = [...productInfo.details.stats]
		newStats[i].value = value
		setStats(newStats)
	}
	const setStats = (newStats: IProperty[]) => {
		setProductInfo(prevState => ({
			...prevState,
			details: {
				...prevState.details,
				stats: newStats
			}
		}))
	}

	const addFeature = () => {
		setProductInfo(prevState => ({
			...prevState,
			details: {
				...prevState.details,
				features: [
					...prevState.details.features,
					{
						description: '',
						id: 0,
						imageSrc: '',
						productId: productInfo.product.id,
						title: ''
					}
				]
			}
		}))
		setImages([...images, undefined])
	}
	const deleteFeature = () => {
		setProductInfo(prevState => ({
			...prevState,
			details: {
				...prevState.details,
				features: [
					...prevState.details.features.filter(
						(_, i) => i !== prevState.details.features.length - 1
					)
				]
			}
		}))

		setImages(images.filter((_, i) => i !== images.length - 1))
	}

	const addProperty = () => {
		setProductInfo(prevState => ({
			...prevState,
			details: {
				...prevState.details,
				stats: [
					...prevState.details.stats,
					{
						id: 0,
						productId: productInfo.product.id,
						name: '',
						value: ''
					}
				]
			}
		}))
	}
	const deleteProperty = () => {
		setProductInfo(prevState => ({
			...prevState,
			details: {
				...prevState.details,
				stats: [
					...prevState.details.stats.filter(
						(_, i) => i !== prevState.details.stats.length - 1
					)
				]
			}
		}))
	}

	return {
		productInfo,
		setProductValues: {
			setName,
			setCount,
			setNewPrice,
			setOldPrice,
			setDescription
		},
		images,
		isImagesExist,
		setImageToPos,
		setFeaturesValue: {
			setFeatureTitle,
			setFeatureDescription
		},
		setStatsValue: {
			setPropertyName,
			setPropertyValue
		},
		editDetails: {
			addFeature,
			addProperty,
			deleteFeature,
			deleteProperty
		},
		request: {
			getProductInfo,
			createProductInfo,
			updateProductInfo,
			deleteProductInfo
		}
	}
}

export default useProductInfo
