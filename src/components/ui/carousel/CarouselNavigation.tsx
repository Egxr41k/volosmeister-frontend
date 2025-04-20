import { useActions } from '@/hooks/useActions'
import { BsCaretLeftSquare, BsCaretRightSquare } from 'react-icons/bs'
import styles from './carousel.module.scss'

const CarouselNavigation = () => {
	const { nextSlide, prevSlide } = useActions()

	return (
		<div className={styles.nav}>
			<button onClick={() => prevSlide()}>
				<BsCaretLeftSquare />
			</button>
			<button onClick={() => nextSlide({ carouselLength: 2 })}>
				<BsCaretRightSquare />
			</button>
		</div>
	)
}

export default CarouselNavigation
