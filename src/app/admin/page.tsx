import BorderedBtn from '../../components/btns/BorderedBtn'
import useAdmin from '../../hooks/useAdmin'

const Admin = () => {
	const { isAdmin, setAdmin } = useAdmin()

	return (
		<div className="flex h-[90vh] items-center justify-center">
			<div className="text-center">
				<BorderedBtn handleClick={setAdmin}>Enable admin mode</BorderedBtn>
				{isAdmin && (
					<div className="mt-5 flex">
						<p className="mr-1.5">
							ви тепер адміністратор, це означає що ви можете
						</p>
						<a href="/ProductList" className="text-fuchsia-500 underline">
							редагувати
						</a>
						<p className="ml-1.5">цей сайт</p>
					</div>
				)}
			</div>
		</div>
	)
}
export default Admin
