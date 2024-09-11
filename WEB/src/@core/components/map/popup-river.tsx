import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import FormatCellValue from '../calculate-data-river'
import { useRouter } from 'next/router'

const DoanSongPopup = ({ popupData }: any) => {
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
            <TableCell align='center'>{FormatCellValue(popupData.ltnBod)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltnCod)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltnAmoni)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltnTongN)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltnTongP)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltnTSS)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltnColiform)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )

  const TableDuLieuNguonNhan = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={7}>
              Tải lượng ô nhiễm nguồn nước hiện có
            </TableCell>
            <TableCell align='center' colSpan={7}>
              Tải lượng tối đa của thông số chất lượng nước mặt
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center'>Lnn BOD</TableCell>
            <TableCell align='center'>Lnn COD</TableCell>
            <TableCell align='center'>Lnn Amoni</TableCell>
            <TableCell align='center'>Lnn Tổng N</TableCell>
            <TableCell align='center'>Lnn Tổng P</TableCell>
            <TableCell align='center'>Lnn TSS </TableCell>
            <TableCell align='center'>Lnn Coliform </TableCell>
            <TableCell align='center'>Ltd BOD</TableCell>
            <TableCell align='center'>Ltd COD</TableCell>
            <TableCell align='center'>Ltd Amoni</TableCell>
            <TableCell align='center'>Ltd Tổng N</TableCell>
            <TableCell align='center'>Ltd Tổng P</TableCell>
            <TableCell align='center'>Ltd TSS </TableCell>
            <TableCell align='center'>Ltd Coliform </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align='center'>{FormatCellValue(popupData.lnnBOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.lnnCOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.lnnAmoni)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.lnnTongN)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.lnnTongP)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.lnnTSS)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.lnnColiform)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdBOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdCOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdAmoni)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdTongN)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdTongP)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdTSS)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdColiform)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )

  const TableDuLieuNguonThai = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Lt_diem BOD</TableCell>
            <TableCell align='center'>Lt_diem COD</TableCell>
            <TableCell align='center'>Lt_diem Amoni</TableCell>
            <TableCell align='center'>Lt_diem Tổng N</TableCell>
            <TableCell align='center'>Lt_diem Tổng P</TableCell>
            <TableCell align='center'>Lt_diem TSS </TableCell>
            <TableCell align='center'>Lt_diem Coliform </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align='center'>{FormatCellValue(popupData.ltdiemBOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdiemCOD)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdiemAmoni)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdiemTongN)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdiemTongP)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdiemTSS)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltdiemColiform)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )

  const TableTaiLuong = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableCell align='center' colSpan={7}>TỔNG TẢI LƯỢNG Ô NHIỄM CỦA NGUỒN NƯỚC THẢI</TableCell>
          <TableRow>
            <TableCell align='center'>Lt BOD</TableCell>
            <TableCell align='center'>Lt COD</TableCell>
            <TableCell align='center'>Lt Amoni</TableCell>
            <TableCell align='center'>Lt Tổng N</TableCell>
            <TableCell align='center'>Lt Tổng P</TableCell>
            <TableCell align='center'>Lt TSS </TableCell>
            <TableCell align='center'>Lt Coliform </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align='center'>{FormatCellValue(popupData.ltBod)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltCod)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltAmoni)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltTongN)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltTongP)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltTSS)}</TableCell>
            <TableCell align='center'>{FormatCellValue(popupData.ltColiform)}</TableCell>
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
            <TableCell align='center'>Phân đoạn sông</TableCell>
            <TableCell align='center'>Chiều dài đoạn sông</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align='center'>{popupData.phanDoan}</TableCell>
          <TableCell align='center'>{popupData.chieuDai}</TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Box>
      <Typography className='text-table' sx={{ textAlign: 'center' }}>
        {popupData.tenDoanSong}
      </Typography>

      {section == 'kha-nang-tiep-nhan-nuoc-thai-song'
        ? TableKhaNangTiepNhan
        : section == 'phan-doan-song'
        ? tableB
        : section == 'du-lieu-nguon-nhan'
        ? TableDuLieuNguonNhan
        : section == 'du-lieu-nguon-thai'
        ? TableDuLieuNguonThai
        : section == 'tai-luong-o-nhiem'
        ? TableTaiLuong
        : null}
    </Box>
  )
}

export default DoanSongPopup
