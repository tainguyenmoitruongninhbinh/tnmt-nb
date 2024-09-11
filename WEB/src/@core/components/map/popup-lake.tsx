import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import FormatCellValue from '../calculate-data-river'
import { useRouter } from 'next/router'

const AoHoPopup = ({ popupData }: any) => {
  console.log(popupData)

  const router = useRouter()
  const pathSegments = router.pathname.split('/')

  const section = pathSegments[4]

  const TableKhaNangTiepNhan = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>KNTN BoD</TableCell>
            <TableCell align='center'>KNTN COD</TableCell>
            <TableCell align='center'>KNTN Amoni</TableCell>
            <TableCell align='center'>KNTN Tổng N</TableCell>
            <TableCell align='center'>KNTN Tổng P</TableCell>
            <TableCell align='center'>KNTN TSS </TableCell>
            <TableCell align='center'>KNTN Coliform </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align='center'>{FormatCellValue(popupData.mtnBOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.mtnCOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.mtnAmoni)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.mtnTongN)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.mtnTongP)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.mtnTSS)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.mtnColiform)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )

  const tableB = (
    <TableContainer component={Paper}>
      <Table aria-label='table B'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Diện tích lưu vực</TableCell>
            <TableCell align='center'>Dung tích toàn bộ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align='center'>{popupData.cT_ThongTin.thongso.dienTichLuuVuc}</TableCell>
          <TableCell align='center'>{popupData.cT_ThongTin.thongso.dungTichToanBo}</TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Box>
    
      {section == 'kha-nang-tiep-nhan-ao-ho'
        ? TableKhaNangTiepNhan
        : section == 'thong-tin-ao-ho'
        ? tableB
        : null}
    </Box>
  )
}

export default AoHoPopup
