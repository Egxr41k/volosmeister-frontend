import { ProductService } from '@/services/product.service'
import { TypeProductData } from '@/types/product.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

export const useUpdateProductMutation = (productId: number) => {
	const { isSuccess, mutate } = useMutation({
		mutationFn: (data: TypeProductData) =>
			ProductService.update(productId, data),
		onSuccess: updated => {
			if (!updated) return
			//router.push(`/admin/products/edit/${updated.slug}`)
			queryClient.invalidateQueries({
				queryKey: ['products', updated.data.id]
			})
		}
	})
	return { mutate, isSuccess }
}

export const useCreateProductMutation = () => {
	const { isSuccess, mutate } = useMutation({
		mutationFn: (data: TypeProductData) => ProductService.create(data),
		onSuccess: created => {
			if (!created) return
			queryClient.invalidateQueries({
				queryKey: ['products', created.data.id]
			})
		}
	})
	return { mutate, isSuccess }
}
