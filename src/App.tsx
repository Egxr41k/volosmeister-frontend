import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { CurrentScreen } from './components/Navigation'
import { AdminProvider } from './context/AdminContext'
import { CartProvider } from './context/CartContext'

function App() {
	return (
		<BrowserRouter basename="/TheBloomingHome.UI">
			<CartProvider>
				<AdminProvider>
					<Header />
					<main className="min-h-[90vh] bg-fuchsia-200">
						<CurrentScreen />
					</main>
					<Footer />
				</AdminProvider>
			</CartProvider>
		</BrowserRouter>
	)
}

export default App
