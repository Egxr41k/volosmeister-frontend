import Admin from '@/components/screens/Admin'
import { NextPageAuth, Role } from '@/providers/auth-provider/auth-pages.types'

const AdminPage: NextPageAuth = () => {
	return <Admin />
}

AdminPage.isOnlyFor = Role.Admin

export default AdminPage
