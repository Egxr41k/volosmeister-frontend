import { DataService } from '@/services/data.service'

const ExportDataButton = () => {
	const handleExport = async () => {
		try {
			const result = await DataService.export()
			const url = URL.createObjectURL(result.data)

			const a = document.createElement('a')
			a.href = url
			a.download = 'backup.zip'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)

			URL.revokeObjectURL(url)
		} catch (err) {
			console.error('Ошибка при экспорте данных', err)
		}
	}

	return (
		<button
			onClick={handleExport}
			className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
		>
			Экспортировать данные
		</button>
	)
}

export default ExportDataButton
