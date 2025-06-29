'use client'

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { TransitionGroup } from 'react-transition-group'
import CSSTransition from '../CSSTransitionGroup'
import CarouselNavigation from './CarouselNavigation'
import { ICarouselItem } from './carousel.interface'
import styles from './carousel.module.scss'

interface ICarousel {
	items: ICarouselItem[]
	className?: string
}

const Carousel = ({ items, className = '' }: ICarousel) => {
	const t = useTranslations('carousel')

	const { selectedItemIndex } = useTypedSelector(state => state.carousel)
	const selectedItem = items[selectedItemIndex]

	return (
		<section className={[className, 'relative'].join(' ')}>
			<TransitionGroup className="relative h-56">
				<CSSTransition
					key={selectedItem.title}
					timeout={500}
					classNames={{
						enter: styles['item-enter'],
						enterActive: styles['item-enter-active'],
						exit: styles['item-exit'],
						exitActive: styles['item-exit-active']
					}}
					unmountOnExit
					mountOnEnter
				>
					<div
						className={styles.item}
						style={
							selectedItem.image
								? {
										backgroundImage: `url(${selectedItem.image})`
									}
								: {}
						}
					>
						<h2>{selectedItem.title}</h2>
						<p>{selectedItem.description}</p>
						{selectedItem.link ? (
							<Link href={selectedItem.link} className="btn btn-white">
								{t('readMore')}
							</Link>
						) : (
							<Link href="/explorer" className="btn btn-white">
								{t('browseProducts')}
							</Link>
						)}
					</div>
				</CSSTransition>
			</TransitionGroup>
			<CarouselNavigation />
		</section>
	)
}

export default Carousel
