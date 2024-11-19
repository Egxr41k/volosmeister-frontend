import Catalog from '../products/Catalog'

const Admin = () => {
	const AddProduct = () => {
		//sent "post" query to backend
		//redirect to /admin/products/{createdProductId} (productForm)
	}

	return (
		<div>
			<Catalog />
			<button
				onClick={AddProduct}
				className="rounded-md border-0 bg-violet-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out"
			>
				Add product
			</button>
		</div>
	)
}

export default Admin
