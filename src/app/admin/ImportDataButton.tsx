'use client'

import { DataService } from '@/services/data.service'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function ImportDataButton() {
	const inputRef = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)

	const { push } = useRouter()

	const handleClick = () => {
		inputRef.current?.click()
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)

		setLoading(true)
		setMessage(null)

		try {
			const result = await DataService.import(file)
			//if (result.status === 200) {
			setMessage('Импорт завершён успешно!')
			//push('/explorer')
			//}
		} catch (err) {
			setMessage(`Ошибка при импорте: ${err}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="space-y-2">
			<button
				onClick={handleClick}
				className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
				disabled={loading}
			>
				{loading ? 'Импорт...' : 'Импортировать данные'}
			</button>
			<input
				type="file"
				accept=".zip,application/zip"
				hidden
				ref={inputRef}
				onChange={handleFileChange}
			/>
			{message && <p className="text-sm text-gray-700">{message}</p>}
		</div>
	)
}
