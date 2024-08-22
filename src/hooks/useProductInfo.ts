import { checkImageExisting } from '@/services/InageService'
import { ProductService } from '@/services/product/product.service'
import IFeature from '@/types/data/IFeature'
import IProduct from '@/types/data/IProduct'
import { useEffect, useState } from 'react'

const useProductInfo = (id: number = 0) => {
	const [product, setProduct] = useState<IProduct>()
	const [images, setImages] = useState<(File | undefined)[]>([])
	const [isImagesExist, setIsImagesExist] = useState([false])

	useEffect(() => {
		id != 0 &&
			getProductInfo(id!).then(data => {
				if (data) {
					setProduct(data)
					checkImagesExist(data).catch(error => console.log(error))
				}
			})
	}, [])

	const checkImagesExist = async (product: IProduct) => {
		const isProductImageExist = await checkImageExisting(product.imageSrc)
		const isFeaturesImagesExist = await Promise.all(
			product.features.map(async (feature: IFeature, index: number) => {
				return await checkImageExisting(feature.imageSrc)
			})
		)
		setIsImagesExist([isProductImageExist, ...isFeaturesImagesExist])
	}

	const getProductInfo = async (id: number) => {
		const product = await ProductService.getById(id)

		return product.data
	}

	const updateProductInfo = async () => {
		const infoToSent = await setImagesSrc()

		if (infoToSent !== product) {
			const productResult = await ProductService.update(infoToSent.product)
			const detailsResult = await updateDetails(infoToSent.details)

			if (productResult && detailsResult) {
				setProduct(prevState => ({
					product: productResult,
					details: detailsResult
				}))
			}
		}
	}
	const createProductInfo = async () => {
		const infoToSent = await setImagesSrc()

		if (infoToSent !== productInfo) {
			const productResult = await createProduct(infoToSent.product)
			const detailsResult = await createDetails(infoToSent.details)

			if (productResult && detailsResult) {
				setProduct(prevState => ({
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
		setProduct(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				description: value
			}
		}))
	}
	const setOldPrice = (value: number) => {
		setProduct(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				oldPrice: value,
				isSale: value > prevState.product.newPrice
			}
		}))
	}
	const setNewPrice = (value: number) => {
		setProduct(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				newPrice: value
			}
		}))
	}
	const setCount = (value: number) => {
		setProduct(prevState => ({
			...prevState,
			product: {
				...prevState.product,
				count: value,
				isAvailable: value > 0
			}
		}))
	}
	const setName = (value: string) => {
		setProduct(prevState => ({
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
		setProduct(prevState => ({
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
		setProduct(prevState => ({
			...prevState,
			details: {
				...prevState.details,
				stats: newStats
			}
		}))
	}

	const addFeature = () => {
		setProduct(prevState => ({
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
		setProduct(prevState => ({
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
		setProduct(prevState => ({
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
		setProduct(prevState => ({
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
