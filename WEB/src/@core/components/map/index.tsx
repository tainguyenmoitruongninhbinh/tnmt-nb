import { useState, useEffect } from 'react'
import { MapContainer,  LayersControl, useMap, Marker, Popup, Tooltip, FeatureGroup, TileLayer } from 'react-leaflet'

import { BingLayer } from 'src/@core/components/bingmap'
import ReactLeafletKml from 'react-leaflet-kml'
import MapPopup from './pop-up'
import { Box, Typography } from '@mui/material'
import { ConverterCood } from './convert-coord'
import { EditControl } from 'react-leaflet-draw'
import { useRouter } from 'next/router'
import BoxLoading from '../box-loading'

import 'leaflet/dist/leaflet.css'
import 'node_modules/leaflet/dist/leaflet.css'
import 'node_modules/leaflet-draw/dist/leaflet.draw.css'
import AoHoPopup from './popup-lake'

const { BaseLayer } = LayersControl

const SetViewOnClick = ({ coords, zoom }: any) => {
  const map = useMap()
  map.flyTo(coords, zoom, {
    duration: 1
  })

  return null
}

// Create icon for map marker
const createIcon = (url: any) => {
  return new L.Icon({
    iconUrl: url,
    iconSize: [18, 18],
    iconAnchor: [18, 18],
    popupAnchor: [-9, -18]
  })
}

// Set icon for cons type
const getIcon = (type: any) => {
  if (type || type !== null) {
    switch (type) {
      case 'thuydien':
        return createIcon('/images/icon/thuydien.png')
        break
      case 'hochua':
        return createIcon('/images/icon/hochua.png')
        break
      case 'trambom':
        return createIcon('/images/icon/trambom.png')
        break
      case 'tramcapnuoc':
        return createIcon('/images/icon/tramcapnuoc.png')
        break
      case 'cong':
        return createIcon('/images/icon/cong.png')
        break
      case 'nhamaynuoc':
        return createIcon('/images/icon/nhamaynuoc.png')
        break
      case 'giengkhoan':
        return createIcon('/images/icon/giengkhoan.png')
        break
      case 'giengdao':
        return createIcon('/images/icon/giengdao.png')
        break
      case 'thamdo':
        return createIcon('/images/icon/thamdo.png')
        break
      case 'congtrinh_nuocduoidatkhac':
        return createIcon('/images/icon/congtrinh_nuocduoidatkhac.png')
        break
      case 'khu_cumcn_taptrung':
        return createIcon('/images/icon/khu_cumcn_taptrung.png')
        break
      case 'cs_benhvien':
        return createIcon('/images/icon/cs_benhvien.png')
        break
      case 'sx_tieuthu_cn':
        return createIcon('/images/icon/sx_tieuthu_cn.png')
        break
      case 'sx_kd_dichvu':
        return createIcon('/images/icon/sx_kd_dichvu.png')
        break
      case 'khudancu_langnghe':
        return createIcon('/images/icon/khudancu_langnghe.png')
        break
      case 'channuoi_ntts':
        return createIcon('/images/icon/channuoi_ntts.png')
        break
      case 'congtrinhkhac_xt':
        return createIcon('/images/icon/congtrinhkhac_xt.png')
        break
      case 'khaithac_nuocbien':
        return createIcon('/images/icon/khaithac_nuocbien.png')
        break
      default:
        return createIcon('/images/icon/marker.png')
        break
    }
  }
}

export default function Map({ center, zoom, showLabel, mapData, lakeData, loading, type = null }: any) {
  const [bing_key, setBingKey] = useState('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L')
  const [kml, setKml] = useState<any>(null)

  const router = useRouter()
  const pathSegments = router.pathname.split('/')
  const section = pathSegments[3]
  const section2 = pathSegments[4]

  useEffect(() => {
    setBingKey('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L')
    fetch('/kml/tinh-ninh-binh.kml')
      .then(res => res.text())
      .then(kmlText => {
        const parser = new DOMParser()
        const kml = parser.parseFromString(kmlText, 'text/xml')
        setKml(kml)
      })
  }, [])

  return loading ? (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BoxLoading />
    </Box>
  ) : (
    <Box sx={{ height: '100%' }}>
      <MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: '100%' }}>
        <LayersControl position='bottomright'>
          <BaseLayer name='Bản đồ hành chính'>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          </BaseLayer>
          <BaseLayer  checked={!type ? true : false}name='Bản đồ đường'>
            <BingLayer bingkey={bing_key} type='Road' />
          </BaseLayer>
          <BaseLayer name='Bản đồ vệ tinh 1'>
            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' />
          </BaseLayer>
          <BaseLayer checked={type == 'vetinh' ? true : false} name='Bản đồ vệ tinh 2'>
            <BingLayer bingkey={bing_key} type='AerialWithLabels' />
          </BaseLayer>
        </LayersControl>

        {mapData &&
          mapData?.map((data: any) => {
            if (data.x !== null || data.y !== null) {
              return (
                <Marker
                  icon={getIcon(data.loaiCT?.maLoaiCT || '')}
                  key={data.id}
                  position={[ConverterCood(data?.y, data?.x)[0], ConverterCood(data.y, data.x)[1]]}>
                  {showLabel === true && (
                    <Tooltip direction='top' offset={[-10, -18]} opacity={1} permanent>
                      {data.tenCT}
                    </Tooltip>
                  )}
                  <Popup>
                    <Typography
                      sx={{ color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '0 !important' }}>
                      {data.tenCT}
                    </Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important', fontStyle: 'italic' }}>
                      {data.viTriCT}
                    </Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important' }}>
                      Kinh độ (X):{data.x} &nbsp; Vĩ độ (Y):{data.y}
                    </Typography>
                    <MapPopup popupData={data} />
                  </Popup>
                </Marker>
              )
            } else return null
          })}

        {lakeData &&
          lakeData?.map((data: any) => {
            if (data.cT_ThongTin.x !== null || data.cT_ThongTin.y !== null) {
              return (
                <Marker
                  icon={createIcon('/images/icon/hochua.png')}
                  key={data.id}
                  position={[
                    ConverterCood(data?.cT_ThongTin.y, data?.cT_ThongTin.x)[0],
                    ConverterCood(data.cT_ThongTin.y, data.cT_ThongTin.x)[1]
                  ]}>
                  <Popup>
                    <Typography
                      sx={{ color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '0 !important' }}>
                      {data.cT_ThongTin.tenCT}
                    </Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important' }}>
                      Kinh độ (X):{data.cT_ThongTin.x} &nbsp; Vĩ độ (Y):{data.cT_ThongTin.y}
                    </Typography>
                    <AoHoPopup popupData={data} />
                  </Popup>
                </Marker>
              )
            } else return null
          })}

        {section == 'cong-trinh' && section2 == undefined && (
          <FeatureGroup>
            <EditControl
              position='topleft'
              draw={{
                rectangle: false
              }}
            />
          </FeatureGroup>
        )}
        <SetViewOnClick coords={center} zoom={zoom} />
        {kml && <ReactLeafletKml kml={kml} />}
      </MapContainer>
    </Box>
  )
}
