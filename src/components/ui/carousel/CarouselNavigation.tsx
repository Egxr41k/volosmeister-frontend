import { useActions } from '@/hooks/useActions'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import styles from './carousel.module.scss'

const CarouselNavigation = () => {
	const { nextSlide, prevSlide } = useActions()

	return (
		<div className={styles.nav}>
			<button onClick={() => prevSlide({ carouselLength: 2 })}>
				<HiChevronLeft />
			</button>
			<button onClick={() => nextSlide({ carouselLength: 2 })}>
				<HiChevronRight />
			</button>
		</div>
	)
}

export default CarouselNavigation
