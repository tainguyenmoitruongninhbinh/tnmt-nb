import { Button } from '@mui/material'
import * as XLSX from 'xlsx'

function exportTableToExcel(tableId: string, filename: string) {
  const table: any = document.getElementById(tableId)
  const ws = XLSX.utils.table_to_sheet(table)

  // Tracks merged cells
  const merges: any[] = []
  const rowspan: any[] = []
  for (let ri = 0; ri < table.rows.length; ++ri) {
    const row = table.rows[ri]
    for (let ci = 0; ci < row.cells.length; ++ci) {
      const cell = row.cells[ci]
      let colspan = cell.getAttribute('colspan')
      let rs = cell.getAttribute('rowspan')

      colspan = colspan ? parseInt(colspan, 10) : 1
      rs = rs ? parseInt(rs, 10) : 1

      // If cell has colspan or rowspan, add it to merge array
      if (colspan > 1 || rs > 1) {
        merges.push({ s: { r: ri, c: ci }, e: { r: ri + rs - 1, c: ci + colspan - 1 } })
      }

      // Adjust for skipped cells due to rowspan in previous rows
      if (rowspan[ci] > 0) {
        --rowspan[ci]
        --ci
      }
    }

    // Adjust rowspan array for next row
    for (let ci = 0; ci < row.cells.length; ++ci) {
      const cell = row.cells[ci]
      let rs = cell.getAttribute('rowspan')
      rs = rs ? parseInt(rs, 10) : 1
      if (rs > 1) {
        rowspan[ci] = rs - 1
      }
    }
  }

  // Apply merges to the worksheet
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    ws['!merges'].push(...merges)
  }

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, `${filename}.xls`)
}

interface ExportTableToExcelProps {
  tableId: string
  filename: string
}
const ExportTableToExcel = ({ tableId, filename }: ExportTableToExcelProps) => {
  const handleExport = () => {
    exportTableToExcel(tableId, filename)
  }

  return (
    <Button onClick={handleExport} variant='outlined' size='small' fullWidth color='primary'>
      Xuất Excel
    </Button>
  )
}
export default ExportTableToExcel
