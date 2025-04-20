import { PropsWithChildren, useRef } from 'react'
import ReactDOM from 'react-dom'
import { RiCloseFill } from 'react-icons/ri'
import styles from './Modal.module.scss'

interface IModal {
	isOpen: boolean
	closeModal: () => void
}

const Modal = ({ children, isOpen, closeModal }: PropsWithChildren<IModal>) => {
	const modalRef = useRef<HTMLElement | null>(document.getElementById('modal'))

	if (!isOpen || !modalRef.current) {
		return null
	}

	return ReactDOM.createPortal(
		<div className={styles.overlay}>
			<div className={styles.window}>
				<button onClick={closeModal}>
					<RiCloseFill />
				</button>
			</div>
		</div>,
		modalRef.current
	)
}

export default Modal
