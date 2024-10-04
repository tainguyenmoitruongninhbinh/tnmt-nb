//React Imports

import { Box, Grid, Paper } from "@mui/material"
import { useRef, useState } from "react"
import MapLegend from "./MapLegend"
import dynamic from "next/dynamic"

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })
const StormMap = () => {
    const [mapCenter] = useState([20.246403, 105.967898])
  const [mapZoom] = useState(10)
  const [showLabel] = useState(false)
  const [industrialZoneKmlFiles, setIndustrialZoneKmlFiles] = useState<string[]>([])
  
  // Tạo ref cho container chứa bản đồ
  const mapRef = useRef<HTMLDivElement>(null)

  const handleConsTypeChange = (selectedTypes: string[]) => {
    const kmlFiles = selectedTypes.includes('ruirocap1')
      ? ['/kml/RUIRO_NANG_CAP1.kml']
      : []
    setIndustrialZoneKmlFiles(kmlFiles)
  }
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} ref={mapRef} sx={{ height: '80vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className='map-legend' sx={{ background: 'white', px: 2, zIndex: 999, height: 'auto', top: '15px' }}>
            <MapLegend onChange={handleConsTypeChange} />
          </Box>
          <Map
                center={mapCenter}
                zoom={mapZoom}
                showLabel={showLabel}
                loading={false}
                industrialZoneKmlFiles={industrialZoneKmlFiles}
              />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default StormMap
