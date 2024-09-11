import React, { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ReactLeafletKml from 'react-leaflet-kml'
import { BingLayer } from '../bingmap'
import { fetchAndParseKML } from './utils'
import { Typography } from '@mui/material'
import { ConverterCood } from './convert-coord'

const { BaseLayer } = LayersControl

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
      case 'Y tế':
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
export default function MapVHHC({
  center,
  zoom,
  selectedKmlFile,
  mapData,
  type = null,
  dischargeData,
  selectedFilter,
}: any) {
  const [bing_key] = useState('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L')
  const [defaultKmls, setDefaultKmls] = useState<(Document | null)[]>([])
  const [selectedKmlData, setSelectedKmlData] = useState<Document | null>(null)
  const [filteredKmls, setFilteredKmls] = useState<(Document | null)[]>([])

  //const [markers, setMarkers] = useState<{ position: [number, number]; id: string; phanDoan: string;}[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const kmlKey = useMemo(() => `kml-${Date.now()}`, [selectedKmlFile, selectedFilter])

  useEffect(() => {
    const kmlFiles = ['/kml/tinh-quangngai.kml', '/kml/doansong/phandoansong79song_QN.kml']
    const loadKmlFiles = async () => {
      const loadedKmls = await Promise.all(kmlFiles.map(async file => await fetchAndParseKML(file)))
      setDefaultKmls(loadedKmls.filter(kml => kml !== null))
    }
    loadKmlFiles()
  }, [])

  useEffect(() => {
    if (selectedKmlFile) {
      const loadSelectedKml = async () => {
        const kmlDoc = await fetchAndParseKML(selectedKmlFile)
        if (kmlDoc) editLineStyleColor(kmlDoc, 'FFFF00') // Example color: yellow
        setSelectedKmlData(kmlDoc)
      }
      loadSelectedKml()
    }
  }, [selectedKmlFile])

  useEffect(() => {
    const fetchFilteredKmls = async () => {
      if (selectedFilter && dischargeData) {
        const kmlFiles = dischargeData.map((data: any) => data.fileKML) // Use fileKML field from dischargeData
        const loadedKmls: any = await Promise.all(kmlFiles.map((file: string) => fetchAndParseKML(file)))

        loadedKmls.forEach((kml: any, index: any) => {
          if (kml) {
            const data = dischargeData[index]
            const color = data[selectedFilter] < 0 ? 'ff0000ff' : 'FFFF00'
            editLineStyleColor(kml, color)
          }
        })

        setFilteredKmls(loadedKmls.filter((kml: any) => kml !== null))

        //setMarkers(newMarkers);
      }
    }
    fetchFilteredKmls()
  }, [selectedFilter, dischargeData])

  const editLineStyleColor = (kmlDocument: Document, newColor: string) => {
    const lineStyles = kmlDocument != null ? kmlDocument.getElementsByTagName('LineStyle') : []
    for (let i = 0; i < lineStyles.length; i++) {
      const colorElement = lineStyles[i].getElementsByTagName('color')[0]
      if (colorElement) {
        colorElement.textContent = newColor
      }
    }
  }

  return (
    <MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: '100%' }} key={kmlKey}>
      <LayersControl position='bottomright'>
        <BaseLayer name='Bản đồ hành chính'>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        </BaseLayer>
        <BaseLayer checked={type == 'road' ? true : false} name='Bản đồ đường'>
          <BingLayer bingkey={bing_key} type='Road' />
        </BaseLayer>
        <BaseLayer checked={!type ? true : false} name='Bản đồ vệ tinh 2'>
          <BingLayer bingkey={bing_key} type='AerialWithLabels' />
        </BaseLayer>
      </LayersControl>

      {mapData &&
        mapData?.map((data: any) => {
          if (data.cT_ThongTin.x !== null || data.cT_ThongTin.y !== null) {
            return (
              <Marker
                icon={getIcon('thuydien')}
                key={data.id}
                position={[ConverterCood(data?.cT_ThongTin.y, data?.cT_ThongTin.x)[0], ConverterCood(data.cT_ThongTin.y, data.cT_ThongTin.x)[1]]}>
                <Popup>
                  <Typography
                    sx={{ color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '0 !important' }}>
                    {data.cT_ThongTin.tenCT}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important', fontStyle: 'italic' }}>
                    {data.cT_ThongTin.viTriCT}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 12, margin: '0 !important' }}>
                    Kinh độ (X):{data.cT_ThongTin.x} &nbsp; Vĩ độ (Y):{data.cT_ThongTin.y}
                  </Typography>
                </Popup>
              </Marker>
            )
          } else return null
        })}      

      {defaultKmls?.map((kml, index) => kml && <ReactLeafletKml key={`default-${index}`} kml={kml} />)}
      {selectedKmlData && <ReactLeafletKml kml={selectedKmlData} key={`selected-${Date.now()}`} />}
      {filteredKmls?.map(kml => kml && <ReactLeafletKml key={`filtered-${Date.now()}`} kml={kml} />)}
    </MapContainer>
  )
}
