import { DataService } from '@/services/data.service'
import { getArchiveName } from '@/utils/get-archive-name'

const ExportDataButton = () => {
	const handleExport = async () => {
		try {
			const result = await DataService.export()
			const url = URL.createObjectURL(result.data)

			const a = document.createElement('a')
			a.href = url
			a.download = getArchiveName()
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)

			URL.revokeObjectURL(url)
		} catch (err) {
			console.error('Export error:', err)
		}
	}

	return (
		<button
			onClick={handleExport}
			className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
		>
			Export data
		</button>
	)
}

export default ExportDataButton
