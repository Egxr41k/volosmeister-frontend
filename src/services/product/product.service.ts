import { axiosClassic, instance } from '@/api/api.interceptor'
import IProduct from '../../types/data/IProduct'
import { PRODUCTS, TypeProductDataFilters } from './product.types'

export const ProductService = {
	async getMocks(): Promise<IProduct[]> {
		return [
			{
				id: 1,
				name: 'Wireless Headphones',
				imageSrc: 'https://example.com/images/headphones.jpg',
				description:
					'High-quality wireless headphones with noise cancellation.',
				category: 'Audio',
				count: 50,
				isAvailable: true,
				newPrice: 99.99,
				oldPrice: 149.99,
				isSale: true,
				features: [],
				properies: []
			},
			{
				id: 2,
				name: 'Smartwatch',
				imageSrc: 'https://example.com/images/smartwatch.jpg',
				description: 'A smartwatch with fitness tracking and notifications.',
				category: 'Wearables',
				count: 30,
				isAvailable: true,
				newPrice: 199.99,
				oldPrice: 249.99,
				isSale: false,
				features: [],
				properies: []
			},
			{
				id: 3,
				name: '4K Ultra HD TV',
				imageSrc: 'https://example.com/images/tv.jpg',
				description: 'Experience stunning visuals with our 4K Ultra HD TV.',
				category: 'Electronics',
				count: 20,
				isAvailable: true,
				newPrice: 799.99,
				oldPrice: 999.99,
				isSale: false,
				features: [],
				properies: []
			},
			{
				id: 4,
				name: 'Gaming Laptop',
				imageSrc: 'https://example.com/images/laptop.jpg',
				description: 'Powerful gaming laptop with high-performance graphics.',
				category: 'Computers',
				count: 15,
				isAvailable: true,
				newPrice: 1299.99,
				oldPrice: 1499.99,
				isSale: true,
				features: [],
				properies: []
			},
			{
				id: 5,
				name: 'Bluetooth Speaker',
				imageSrc: 'https://example.com/images/speaker.jpg',
				description: 'Portable Bluetooth speaker with rich sound quality.',
				category: 'Audio',
				count: 100,
				isAvailable: true,
				newPrice: 49.99,
				oldPrice: 69.99,
				isSale: true,
				features: [],
				properies: []
			},
			{
				id: 6,
				name: 'Digital Camera',
				imageSrc: 'https://example.com/images/camera.jpg',
				description:
					'Capture stunning photos with our advanced digital camera.',
				category: 'Photography',
				count: 25,
				isAvailable: true,
				newPrice: 499.99,
				oldPrice: 599.99,
				isSale: false,
				features: [],
				properies: []
			},
			{
				id: 7,
				name: 'Fitness Tracker',
				imageSrc: 'https://example.com/images/tracker.jpg',
				description:
					'Monitor your fitness goals with our sleek fitness tracker.',
				category: 'Wearables',
				count: 80,
				isAvailable: true,
				newPrice: 39.99,
				oldPrice: 59.99,
				isSale: true,
				features: [],
				properies: []
			},
			{
				id: 8,
				name: 'Electric Toothbrush',
				imageSrc: 'https://example.com/images/toothbrush.jpg',
				description: 'Achieve a superior clean with our electric toothbrush.',
				category: 'Health & Beauty',
				count: 60,
				isAvailable: true,
				newPrice: 89.99,
				oldPrice: 109.99,
				isSale: false,
				features: [],
				properies: []
			},
			{
				id: 9,
				name: 'Smart Home Assistant',
				imageSrc: 'https://example.com/images/assistant.jpg',
				description: 'Control your smart home devices with voice commands.',
				category: 'Home Automation',
				count: 40,
				isAvailable: true,
				newPrice: 129.99,
				oldPrice: 149.99,
				isSale: false,
				features: [],
				properies: []
			},
			{
				id: 10,
				name: 'Portable Charger',
				imageSrc: 'https://example.com/images/charger.jpg',
				description:
					'Keep your devices powered on the go with our portable charger.',
				category: 'Accessories',
				count: 200,
				isAvailable: true,
				newPrice: 29.99,
				oldPrice: 39.99,
				isSale: true,
				features: [],
				properies: []
			}
		]
	},

	async getAll(queryData = {} as TypeProductDataFilters) {
		const { data } = await axiosClassic<IProduct[]>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		})

		return data
	},

	async getSimilar(productId: string | number) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${productId}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async getByCategory(categorySlug: string) {
		return instance<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getById(productId: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${productId}`,
			method: 'GET'
		})
	},

	async update(productId: string | number, data: IProduct) {
		return instance<IProduct>({
			url: `${PRODUCTS}/update/${productId}`,
			method: 'PUT',
			data
		})
	},

	async create() {
		return instance<IProduct>({
			url: `${PRODUCTS}/create`,
			method: 'POST'
		})
	},

	async delete(productId: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/delete/${productId}`,
			method: 'DELETE'
		})
	}
}
