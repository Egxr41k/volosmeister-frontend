import OrderDetails from '@/components/pages/admin/orders/OrderDetails'
import { OrderService } from '@/services/order.service'
import { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
	const response = await getOrders()
	if (!response) return []

	return response.map(order => ({
		id: order.id.toString()
	}))
}

export async function generateMetadata({
	params
}: {
	params: { id: string }
}): Promise<Metadata> {
	if (!params?.id) return {}

	const order = await getOrder(params.id)

	if (!order) {
		return {
			title: 'Order not found',
			description: 'No order found'
		}
	}

	return {
		title: `Order #${order.id}`,
		description: `Details for order #${order.id}`,
		openGraph: {
			description: `Details for order #${order.id}`
		}
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	if (!params?.id) return <div>Order not found</div>

	const order = await getOrder(params.id)
	return <OrderDetails initialOrder={order} id={params.id} />
}

async function getOrder(id: string) {
	try {
		return await OrderService.getById(id)
	} catch (error) {
		console.error('Error fetching order:', error)
		return undefined
	}
}

async function getOrders() {
	try {
		return await OrderService.getAll()
	} catch (error) {
		console.error('Error fetching orders:', error)
		return undefined
	}
}
