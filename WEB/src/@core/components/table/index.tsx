// ** React Imports
import { FC, useState, ChangeEvent } from 'react'

// ** MUI Imports
import { Table, TableContainer, Paper, TablePagination } from '@mui/material'
import BoxLoading from '../box-loading'
import renderTableHead from './table-head'
import renderTableBody from './table-body'

export interface TableColumn {
  id: string
  label?: string | React.ReactNode
  colspan?: number
  rowspan?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined
  children?: TableColumn[]
  format?: (value: any) => string | React.ReactNode
  elm?: React.ReactNode
  pinned?: 'left' | 'right' | undefined
}

export interface Data {
  [key: string]: any
}

export interface TableProps {
  columns: TableColumn[]
  rows: Data[]
  columnVisibility?: string[]
  pagination?: boolean
  loading?: boolean
  id?: string
  actions?: ((row: Data) => React.ReactNode) | null
}

const TableComponent: FC<TableProps> = (props: TableProps) => {
  const { columns, rows, columnVisibility, pagination, loading, id, actions } = props

  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const tableColumns: TableColumn[] = []
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]

    // Check if the column is in the columnVisibility array, and hide it if needed
    if (!columnVisibility || (columnVisibility && !columnVisibility.includes(column.id))) {
      const updatedColumn: TableColumn = { ...column }
      if (column.children) {
        const updatedChildrenColumns: TableColumn[] = []
        for (let j = 0; j < column.children.length; j++) {
          const childColumn = column.children[j]

          // Check visibility for child columns
          if (!columnVisibility || (columnVisibility && !columnVisibility.includes(childColumn.id))) {
            updatedChildrenColumns.push({ ...childColumn })
          }
        }
        updatedColumn.children = updatedChildrenColumns
      }
      tableColumns.push(updatedColumn)
    }
  }

  return loading ? (
    <BoxLoading />
  ) : (
    <Paper>
      <TableContainer style={{ borderRadius: 4 }}>
        <Table className={`mainTable`} id={id}>
          {renderTableHead(tableColumns)}
          {renderTableBody(tableColumns, rows, actions || null, page, pagination ? rowsPerPage : rows?.length)}
        </Table>
      </TableContainer>
      {pagination ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, rows?.length]}
          component='div'
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ''
      )}
    </Paper>
  )
}

export default TableComponent
