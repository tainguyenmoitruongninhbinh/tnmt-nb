import { TableCell, TableRow, TableBody } from '@mui/material'
import { Data, TableColumn } from '.'
import React from 'react'

function renderTableCell(
  column: TableColumn,
  row: any,
  rowIndex: number,
  colIndex: number,
  currentPage: number,
  rowsPerPage: number,
  actions: ((row: Data) => React.ReactNode) | null
) {
  // Recursive rendering of columns
  const renderCellContent = (currentColumn: any, rowData: any, key: any) => {
    if (currentColumn.children) {
      return currentColumn.children.map((childColumn: any, childIndex: any) =>
        renderTableCell(childColumn, rowData, rowIndex, childIndex, currentPage, rowsPerPage, actions)
      )
    } else {
      return (
        <TableCell
          className={`${currentColumn.pinned ? 'sticky-col' : ''} ${
            currentColumn.pinned === 'left' ? 'start-col' : ''
          } ${currentColumn.pinned === 'right' ? 'end-col' : ''}`}
          sx={{ py: 0, minWidth: currentColumn.minWidth }}
          key={key}
          align={currentColumn.align}
          size='small'>
          {currentColumn.id === 'actions' ? (
            actions && actions(rowData)
          ) : currentColumn.id === 'stt' ? (
            currentPage * rowsPerPage + rowIndex + 1
          ) : typeof currentColumn.elm === 'function' ? (
            currentColumn.elm(rowData)
          ) : currentColumn.format ? (
            currentColumn.format(rowData[currentColumn.id])
          ) : rowData['id'] !== -1 ? (
            rowData[currentColumn.id]
          ) : (
            <span style={{ fontWeight: 700 }}>{rowData[currentColumn.id]}</span>
          )}
        </TableCell>
      )
    }
  }

  return renderCellContent(column, row, `${colIndex}-${rowIndex}`)
}

function renderTableBody(
  columns: TableColumn[],
  data: any,
  actions: ((row: Data) => React.ReactNode) | null,
  page: number,
  rowsPerPage: number
) {
  return (
    <TableBody>
      {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dataItem: any, rowIndex: any) => (
        <TableRow key={rowIndex}>
          {columns.map((column, colIndex) =>
            renderTableCell(column, dataItem, rowIndex, colIndex, page, rowsPerPage, actions)
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default renderTableBody
