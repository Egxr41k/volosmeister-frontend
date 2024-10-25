import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import Admin from './components/screens/Admin'
import Catalog from './components/screens/Catalog'
import Home from './components/screens/Home'
import ProductDetails from './components/screens/ProductDetails'
import ProductForm from './components/screens/ProductForm'
import Footer from './components/ui/Footer'
import Header from './components/ui/Header'
import { persistor, store } from './store/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<Header />
						<Routes>
							{/* <Route path="/TheBloomingHome.UI" element={<Home />} /> */}
							<Route path="/" element={<Home />} />
							<Route path="/catalog" element={<Catalog />} />
							<Route path="/product/:id" element={<ProductDetails />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/product-form/:id" element={<ProductForm />} />
						</Routes>
						<Footer />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

export default App
