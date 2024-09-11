import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const DiemQuanTracPopup = ({ popupData }: any) => {

  return (
    <Box>
      <TableContainer component={Paper}>
      <Table aria-label='table B'>
        <TableHead className='tableHead'>
          <TableRow>
          <TableCell rowSpan={2} align='center'>
                Ký hiệu NM
              </TableCell>
              <TableCell rowSpan={2} align='center'>
                Đợt
              </TableCell>
              <TableCell colSpan={13} align='center'>
                Thông số
              </TableCell>
          </TableRow>
          <TableRow>
              <TableCell align='center'>PH</TableCell>
              <TableCell align='center'>DO(mg/l)</TableCell>
              <TableCell align='center'>TSS(mg/l)</TableCell>
              <TableCell align='center'>BOD5 (mg/l)</TableCell>
              <TableCell align='center'>COD (mg/l)</TableCell>
              <TableCell align='center'>
                NO<sub>3</sub>- <sup>- </sup>N (mg/l)
              </TableCell>
              <TableCell align='center'>
                NO<sub>2</sub>- <sup>- </sup>N (mg/l)
              </TableCell>
              <TableCell align='center'>
                PO<sub>4</sub>3- <sub>- </sub>N (mg/l)
              </TableCell>
              <TableCell align='center'>
                NH<sub>4</sub>+ <sup>- </sup>N (mg/l)
              </TableCell>
              <TableCell align='center'>Cl- (mg/l)</TableCell>
              <TableCell align='center'>Fe(mg/l)</TableCell>
              <TableCell align='center'>Coliform (MPN/100ml) </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        <TableRow >
                <TableCell align='center'>{popupData.diemQuanTrac.tenDiemDo}</TableCell>
                <TableCell align='center'>{popupData.dot}</TableCell>
                <TableCell align='center'>{popupData.ph}</TableCell>
                <TableCell align='center'>{popupData.do}</TableCell>
                <TableCell align='center'>{popupData.tss}</TableCell>
                <TableCell align='center'>{popupData.bod}</TableCell>
                <TableCell align='center'>{popupData.cod}</TableCell>
                <TableCell align='center'>{popupData.nO3}</TableCell>
                <TableCell align='center'>{popupData.nO2}</TableCell>
                <TableCell align='center'>{popupData.pO4}</TableCell>
                <TableCell align='center'>{popupData.nH4}</TableCell>
                <TableCell align='center'>{popupData.cl}</TableCell>
                <TableCell align='center'>{popupData.fe}</TableCell>
                <TableCell align='center'>{popupData.coliform}</TableCell>
              </TableRow>
          </TableBody>
      </Table>
    </TableContainer>

      
    </Box>
  )
}

export default DiemQuanTracPopup
