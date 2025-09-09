import { DataService } from '@/services/data.service'
import { getArchiveName } from '@/utils/get-archive-name'
import { saveAs } from 'file-saver'

const ExportDataButton = () => {
	const handleExport = async () => {
		try {
			const result = await DataService.export()
			saveAs(result.data, getArchiveName())
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
