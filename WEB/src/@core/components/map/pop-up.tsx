import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { formatDate } from 'src/@core/components/formater'
import ShowFilePDF from 'src/@core/components/show-file-pdf'

const MapPopup = ({ popupData }: any) => {

  const router = useRouter()
  const pathSegments = router.pathname.split('/')
  const section = pathSegments[2]
  const sectionChild = pathSegments[3]
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // const checkNullData = (data: any) => {
  //     return data ? data : <Typography sx={{ fontSize: 12, my: '5px !important', textAlign: 'center' }}>-</Typography>
  // }

  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const date = today.getDate()
  const hour = today.getHours()
  const min = today.getMinutes()
  const currentDate = date + '/' + month + '/' + year + ' ' + hour + ':' + min

  // random 2 to 15
  const genRand = (min: any, max: any, decimalPlaces: any) => {
    const rand = Math.random() * (max - min) + min
    const power = Math.pow(10, decimalPlaces)

    return Math.floor(rand * power) / power
  }

  // Hien thi thong tin theo loai cong trinh
  const showTableRow = (data: any) => {
    const idDischargeCons = [16, 17, 18, 19, 20, 21, 22]
    if (idDischargeCons.includes(data.idLoaiCT)) {
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Vị trí xả thải</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.viTriXT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Nguồn nước tiếp nhận nước thải</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.nguonNuocXT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Phương thức xả thải</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.phuongThucXT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chế độ xả thải</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.cheDoXT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Lưu lượng xả thải MAX(m<sub>3</sub>/ngày đêm)
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qMaxXaThai}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Lưu lượng xả trung bình(m<sub>3</sub>/ngày đêm)
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qXaThaiTB}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chất lượng nước thải hệ số Kq và Kf</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.kqKf}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Loại hình nước thải</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>-</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    }

    // Thuy dien & Ho chua
    else if (data.idLoaiCT == 4 || data.idLoaiCT == 5) {
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chế độ KT</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.cheDoKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Q <sub>max khai thác</sub>
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qMaxKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Q <sub>tối thiểu</sub>
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qtt}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Q <sub>max qua NM</sub>
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qmaxNM}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Nguồn nước khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.nguonNuocKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Phương thức khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.phuongThucKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Công suất lắp máy</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.congSuatLM}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chiều cao đập</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.chieuCaoDap}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chiều dài đập</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.chieuDaiDap}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước dâng bình thường</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.mndbt}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước chết</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.mnc}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước lớn nhất trước lũ</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qLonNhatTruocLu}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước đón lũ</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>-</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước thượng lưu</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.hThuongLuu}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước hạ lưu</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.hHaLuu}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước lũ thiết kế</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.mnltk}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước lũ kiểm tra</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.mnlkt}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Dung tích hữu ích</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.dungTichHuuIch}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Dung tích toàn bộ</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.dungTichToanBo}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    } else if (data.idLoaiCT == 6) {
      // Tram bom
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Nguồn nước khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.nguonNuocKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Số máy bơm</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.soLuongMayBom}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Q <sub>thiết kế</sub>
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qThietKe}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước bể hút</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.hBeHut}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    } else if (data.idLoaiCT == 7) {
      // Khai thac nuoc duoi dat
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Thời hạn khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thoiGianKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mục đích khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.mucDichKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mực nước trong giếng khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.hGiengKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Tầng chứa nước khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>-</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Số giếng khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.soLuongGiengKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Tổng lượng nước khai thác (m<sub>3</sub>/ngày đêm)
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qKhaiThac}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chiều sâu đoạn thu nước (m)</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                {data.thongso?.chieuSauDoanThuNuocDen}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Lưu lượng khai thác thiết kế (m<sub>3</sub>/ngày đêm)
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qThietKe}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Lưu lượng khai thác thực tế (m<sub>3</sub>/ngày đêm)
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qThucTe}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chiều sâu mực nước tĩnh (m)</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.hTinh}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chiều sâu mực nước động lớn nhất (m)</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.hDong}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    } else if (data.idLoaiCT == 8) {
      // Tham do nuoc duoi dat
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Quy mô khoan thăm dò</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.quyMoHNK}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Tầng chứa nước thăm dò</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>-</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mục đích thăm dò</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.mucDichTD}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Khối lượng các hạng mục thăm dò</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>-</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    } else if (data.idLoaiCT == 9) {
      // Hanh nghe khoan nuoc duoi dat
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Thời gian hành nghề khoan</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thoiGianHNK}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Mục đích khoan KT</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.mucDichHNK}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    } else if (data.idLoaiCT == 10 || data.idLoaiCT == 13 || data.idLoaiCT == 11 || data.idLoaiCT == 14) {
      // Tram cap nuoc, nha may nuoc, dap
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Lưu lượng khai thác (m<sub>3</sub>/ngày đêm)
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.qKhaiThac}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Nguồn nước khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.nguonNuocKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Phương thức khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.phuongThucKT}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Thời hạn khai thác</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thoiGianKT}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    } else if (data.idLoaiCT == 12) {
      return (
        <TableBody>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Cao trình cống</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.caoTrinhCong}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Chiều dài cống</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.chieuDaiCong}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>Đường kính cống</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.duongKinhCong}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                Kích thước miệng cống (chiều rộng - chiều cao)
              </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }} colSpan={2}>
              <Typography sx={{ fontSize: 12, my: '5px !important' }}>{data.thongso?.kichThuocCong}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    }
  }

  const showLicenseRow = (data: any) => {
    if (data.giayphep.length > 0) {
      return (
        <TableBody className='table-license'>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important', fontWeight: 500 }}>Số giấy phép</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important', fontWeight: 500 }}>Ngày ký</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important', fontWeight: 500 }}>Ngày hết hiệu lực</Typography>
            </TableCell>
          </TableRow>
          {data.giayphep.map((row: any, rowIndex: any) => (
            <TableRow key={rowIndex}>
              <TableCell
                align='center'
                sx={{ fontSize: 11, my: '5px !important', padding: '0 !important', color: '#087eba !important' }}>
                <ShowFilePDF name={row?.soGP} src={row?.fileGiayPhep} />
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 12, my: '5px !important', padding: '0 !important' }}>
                {formatDate(row?.ngayKy)}
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 12, my: '5px !important', padding: '0 !important' }}>
                {formatDate(row?.ngayHetHieuLuc)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    }
  }

  const showCategoryRow = (data: any) => {
    if (data.hangmuc.length > 0) {
      return (
        <TableBody className='table-license'>
          <TableRow>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important', fontWeight: 500 }}>Hạng mục công trình</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important', fontWeight: 500 }}>X(Vn2000)</Typography>
            </TableCell>
            <TableCell align='center' sx={{ p: '0 !important' }}>
              <Typography sx={{ fontSize: 12, my: '5px !important', fontWeight: 500 }}>Y(Vn2000)</Typography>
            </TableCell>
          </TableRow>
          {data.hangmuc.map((row: any, rowIndex: any) => (
            <TableRow key={rowIndex}>
              <TableCell align='center' sx={{ fontSize: 12, my: '5px !important', padding: '0 !important' }}>
                {row?.tenHangMuc}
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 12, my: '5px !important', padding: '0 !important' }}>
                {row?.x}
              </TableCell>
              <TableCell align='center' sx={{ fontSize: 12, my: '5px !important', padding: '0 !important' }}>
                {row?.y}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    }
  }

  return (
    <Box>
      {sectionChild == 'cong-trinh' ||
      section == 'cap-phep' ||
      section == 'kn-tiep-nhan-nuoc-thai' ||
      section == 'van-hanh-ho-chua' ? (
        // Popup content for construction & license */
        <TableContainer component={Paper} sx={{ height: 200, overFlowY: 'scroll' }}>
          <Table aria-label='simple table'>
            {showLicenseRow(popupData)}
            {showTableRow(popupData)}
            {showCategoryRow(popupData)}
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography sx={{ fontSize: 12, my: '5px !important', fontStyle: 'italic' }}>
            Cập nhật: {currentDate}
          </Typography>

          {/* Popup content for monitoring data */}
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='monitoring data tabs'>
                <Tab sx={{ fontSize: 12 }} label='Thông tin' value='1' />
                <Tab sx={{ fontSize: 12 }} label='Số liệu vận hành' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <TableContainer component={Paper} sx={{ height: 200, overFlowY: 'scroll' }}>
                <Table aria-label='simple table'>
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' sx={{ p: '0 !important', background: '#15538f' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important', color: '#fff' }}>
                          H<sub>hồ</sub>
                        </Typography>
                      </TableCell>
                      <TableCell align='center' sx={{ p: '0 !important', background: '#15538f' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important', color: '#fff' }}>
                          Q<sub>xả TT</sub>
                        </Typography>
                      </TableCell>
                      <TableCell align='center' sx={{ p: '0 !important', background: '#15538f' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important', color: '#fff' }}>
                          Q<sub>xả NM</sub>
                        </Typography>
                      </TableCell>
                      <TableCell align='center' sx={{ p: '0 !important', background: '#15538f' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important', color: '#fff' }}>
                          Q<sub>xả tràn</sub>
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='center' sx={{ p: '0 !important' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important', fontStyle: 'italic' }}>
                          {genRand(0, 10, 1)}(m)
                        </Typography>
                      </TableCell>
                      <TableCell align='center' sx={{ p: '0 !important' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                          {genRand(0, 10, 1)}(m<sup>3</sup>/s)
                        </Typography>
                      </TableCell>
                      <TableCell align='center' sx={{ p: '0 !important' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                          {genRand(0, 10, 1)}(m<sup>3</sup>/s)
                        </Typography>
                      </TableCell>
                      <TableCell align='center' sx={{ p: '0 !important' }}>
                        <Typography sx={{ fontSize: 12, my: '5px !important' }}>
                          {genRand(0, 10, 1)}(m<sup>3</sup>/s)
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
           
          </TabContext>
        </Box>
      )}
    </Box>
  )
}

export default MapPopup
