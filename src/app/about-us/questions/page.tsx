import React, { useState } from 'react'
import ArrowDown from '../../icons/arrow_down.svg'
import ArrowUp from '../../icons/arrow_up.svg'
import logo from '../../imgs/logo.png'

const Questions = () => {
	return (
		<div className="relative">
			<img
				src={logo}
				alt=""
				className="mx-auto h-[90vh] object-cover opacity-10"
			/>

			<div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-2/4 -translate-y-2/4 bg-opacity-80 px-12 md:px-40">
				<div className="">
					<h2 className="my-5 text-2xl font-semibold">
						Найпоширеніші питанння:
					</h2>

					<QuestionSection title={'1. Замовлення'}>
						<div className="my-2.5 flex">
							<p className="h-7 w-7 rounded-full bg-fuchsia-500 text-center font-semibold text-white">
								1
							</p>
							<p className="mx-2 my-auto">Залиште свої дані</p>
						</div>

						<div className="my-2.5 flex">
							<p className="h-7 w-7 rounded-full bg-fuchsia-500 text-center font-semibold text-white">
								2
							</p>
							<p className="mx-2 my-auto">Замовте потрібний колір</p>
						</div>

						<div className="my-2.5 flex">
							<p className="h-7 w-7 rounded-full bg-fuchsia-500 text-center font-semibold text-white">
								3
							</p>
							<p className="mx-2 my-auto">Оберіть зручний спосіб доставки</p>
						</div>

						<div className="my-2.5 flex">
							<p className="h-7 w-7 rounded-full bg-fuchsia-500 text-center font-semibold text-white">
								4
							</p>
							<p className="mx-2 my-auto">
								отримайте на пошті, оглядайте і оплчуєте
							</p>
						</div>
					</QuestionSection>

					<QuestionSection title={'2. Доставка'}>
						<p className="whitespace-pre-line">
							Відправка Новою Поштою 1-3 дні. Оплата при отриманні.
							<br />
							Відправка Укрпоштою 4-7 днів. Оплата при отриманні.
							<br />
							Вартість доставки згідно тарифів обраної пошти.
							<br />
						</p>
					</QuestionSection>
				</div>
			</div>
		</div>
	)
}

const QuestionSection = ({
	title,
	children
}: {
	title: string
	children: React.ReactNode
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="my-5">
			<div className="inline-flex">
				<h3 className="text-1xl font-semibold">{title}</h3>
				<button onClick={() => setIsOpen(!isOpen)}>
					<img src={isOpen ? ArrowDown : ArrowUp} alt="" className="h-6 w-6" />
				</button>
			</div>

			<div className={['ml-5 gap-2', isOpen ? 'block' : 'hidden'].join(' ')}>
				{children}
			</div>
		</div>
	)
}
export default Questions
