import Paper from '@mui/material/Paper'
import { Box,  Typography } from '@mui/material'

import { useEffect, useRef, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import { getData } from 'src/api/axios'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import ShowFilePDF from 'src/@core/components/show-file-pdf'
import formatDate from 'src/@core/components/format-date'
import ConstructionToolBar from 'src/views/construction/tool-bar'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'


const TraKhucBasin = () => {
  const [postSuccess, setPostSuccess] = useState(false)

  const [columnVisibility, setColumnVisibility] = useState<string[]>()


  const [resData, setResData] = useState([])
  console.log(resData);
  
  const [loading, setLoading] = useState(false)

    const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    {
      id: 'tenCT',
      label: 'Tên công trình',
      pinned: 'left',
      minWidth: 350,
      elm: (row: any) => (
        <Typography className='btnShowFilePdf' >
          {row?.tenCT}
        </Typography>
      )
    },
    {
      id: '#',
      label: 'Chủ giấy phép',
      pinned: 'left',
      minWidth: 350,
      elm: (row: any) => (
        <Typography >
          {row?.giayphep[0]?.tochuc_canhan?.tenTCCN}
        </Typography>
      )
    },
    {
      id: 'viTriCT',
      label: 'Địa điểm',
      align: 'left',
      minWidth: 300
    },
    {
      id: '#',
      label: (
        <Box>
          Toạ độ đập chính
          <br /> (VN2000)
        </Box>
      ),
      minWidth: 150,
      rowspan: 2,
      elm: (row: any) => (
        <span>
          X: {row?.x}
          <br /> Y: {row?.y}
        </span>
      )
    },
    {
      id: '#',
      label: 'Hạng mục giếng',
      pinned: 'left',
      minWidth: 350,
      elm: (row: any) => (
        <div style={{ width: '100%' }}>
          {row.hangmuc.map((e: any) => (
            <div key={e.id}>
             {e.tenHangMuc}: X: {e.x}, Y: {e.y}
            </div>
          ))}
        </div>
      )
    },
    //license
    {
      id: 'giayphep',
      label: 'Giấy phép',
      align: 'left',
      children: [
        {
          id: 'soGP',
          label: 'Số GP',
          align: 'left',
          minWidth: 200,
          elm: (row: any) => (
            <div style={{ width: '100%' }}>
              {row.giayphep.map((e: any) => (
                <div key={e.id}>
                  <ShowFilePDF name={e?.soGP} src={e?.fileGiayPhep} />
                </div>
              ))}
            </div>
          )
        },
        {
          id: 'thoihan',
          label: 'Thời hạn',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => (
            <div style={{ width: '100%' }}>
              {row.giayphep?.map((e: any) => (
                <div key={e.id}>{formatDate(e.ngayKy)}</div>
              ))}
            </div>
          )
        }
      ]
    },
  ]


  const [paramsFilter, setParamsFilter] = useState({
    tenct: null,
    loai_ct: 7,
    huyen: 0,
    xa: 0,
    song: 0,
    luuvuc: 0,
    tieu_luuvuc: 0,
    tang_chuanuoc: 0,
    tochuc_canhan: 0,
    nguonnuoc_kt: null
  })


  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    switch (paramsFilter.loai_ct) {
      case 1:
        setColumnVisibility([])
        break
      case 4:
        setColumnVisibility([
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      case 5:
        setColumnVisibility([
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      case 6:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'qThietKe',
          'qThucTe'
        ])
        break
      case 10:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'soLuongMayBom',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      default:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatLM',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
    }

    const getDataConstructions = async () => {
      setLoading(true)
      getData('cong-trinh/danh-sach', paramsFilter)
        .then(data => {
          if (isMounted.current) {
            setResData(data)
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getDataConstructions()
  }, [postSuccess, paramsFilter])


  const handleFilterChange = (data: any, postSuccess: boolean | undefined) => {
    setParamsFilter(data)
    if (postSuccess !== undefined) {
      setPostSuccess(postSuccess)
    }
  }


  return (
    <Paper sx={{ p: 8 }}>
      {loading ? (
        <BoxLoading />
      ) : (
        <>
         <ConstructionToolBar onChange={handleFilterChange} />
         <ExportTableToExcel tableId='nuoc-duoi-dat' filename='nuocduoidat' />
        <TableComponent
        columns={columnsTable}
        rows={resData}
         id='nuoc-duoi-dat'
        loading={loading}
        columnVisibility={columnVisibility}
        pagination
        
      /></>
       
      )}
    </Paper>
  )
}

export default TraKhucBasin
