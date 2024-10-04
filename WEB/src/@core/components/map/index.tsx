import { useState, useEffect, useMemo } from 'react'
import { MapContainer, LayersControl, useMap, TileLayer } from 'react-leaflet'

import { BingLayer } from 'src/@core/components/bingmap'
import ReactLeafletKml from 'react-leaflet-kml'
import { Box } from '@mui/material'
import BoxLoading from '../box-loading'

import 'leaflet/dist/leaflet.css'
import 'node_modules/leaflet/dist/leaflet.css'
import 'node_modules/leaflet-draw/dist/leaflet.draw.css'
import { fetchAndParseKML } from './utils'
import KmlLabels from './KmlLabels'

const { BaseLayer } = LayersControl

const SetViewOnClick = ({ coords, zoom }: any) => {
  const map = useMap()
  map.flyTo(coords, zoom, {
    duration: 1
  })

  return null
}

// Create icon for map marker
// const createIcon = (url: any) => {
//   return new L.Icon({
//     iconUrl: url,
//     iconSize: [18, 18],
//     iconAnchor: [18, 18],
//     popupAnchor: [-9, -18]
//   })
// }

export default function Map({ center, zoom, loading, type = null, industrialZoneKmlFiles }: any) {
  console.log(industrialZoneKmlFiles);
  
  const [bing_key] = useState('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L')
  const [defaultKmls, setDefaultKmls] = useState<(Document | null)[]>([])

  const [industrialZoneKmls, setIndustrialZoneKmls] = useState<(Document | null)[]>([])

  const kmlKey = useMemo(() => `kml-${Date.now()}`, [])
  useEffect(() => {
    const kmlFiles = ['/kml/tinh-ninh-binh.kml']
    const loadKmlFiles = async () => {
      const loadedKmls = await Promise.all(kmlFiles.map(async file => await fetchAndParseKML(file)))
      setDefaultKmls(loadedKmls.filter(kml => kml !== null))
    }
    loadKmlFiles()
  }, [])



  useEffect(() => {
    const loadIndustrialZoneKmlFiles = async () => {
      if (industrialZoneKmlFiles && industrialZoneKmlFiles.length > 0) {
        const loadedKmls = await Promise.all(
          industrialZoneKmlFiles.map(async (file: string) => {
            const kmlDoc = await fetchAndParseKML(file)
            if (kmlDoc) editLineStyleColor(kmlDoc, 'FFFF00')

            return kmlDoc
          })
        )
        setIndustrialZoneKmls(loadedKmls.filter(kml => kml !== null))
      } else {
        setIndustrialZoneKmls([])
      }
    }
    loadIndustrialZoneKmlFiles()
  }, [industrialZoneKmlFiles])
  const editLineStyleColor = (kmlDocument: Document, newColor: string) => {
    const lineStyles = kmlDocument != null ? kmlDocument.getElementsByTagName('LineStyle') : []
    for (let i = 0; i < lineStyles.length; i++) {
      const colorElement = lineStyles[i].getElementsByTagName('color')[0]
      if (colorElement) {
        colorElement.textContent = newColor
      }
    }
  }
  
  return loading ? (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BoxLoading />
    </Box>
  ) : (
    <Box sx={{ height: '100%' }}>
      <MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: '100%' }} key={kmlKey}>
        <LayersControl position='bottomright'>
          <BaseLayer name='Bản đồ hành chính'>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          </BaseLayer>
          <BaseLayer checked={!type ? true : false} name='Bản đồ đường'>
            <BingLayer bingkey={bing_key} type='Road' />
          </BaseLayer>
          <BaseLayer name='Bản đồ vệ tinh 1'>
            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' />
          </BaseLayer>
          <BaseLayer checked={type == 'vetinh' ? true : false} name='Bản đồ vệ tinh 2'>
            <BingLayer bingkey={bing_key} type='AerialWithLabels' />
          </BaseLayer>
        </LayersControl>

        <SetViewOnClick coords={center} zoom={zoom} />
        {defaultKmls?.map(
          (kml, index) =>
            kml && (
              <>
                <ReactLeafletKml key={`default-${index}`} kml={kml} />
                <KmlLabels key={`labels-${index}`} kml={kml} />
              </>
            )
        )}

        {industrialZoneKmls?.map(
          (kml, index) =>
            kml && (
              <>
                <ReactLeafletKml key={`industrial-kml-${Date.now()}`} kml={kml} />
                <KmlLabels key={`labels-${index}`} kml={kml} />
              </>
            )
        )}
      </MapContainer>
    </Box>
  )
}
