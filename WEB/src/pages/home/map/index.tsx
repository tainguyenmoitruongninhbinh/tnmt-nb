import { Paper, Typography, Button, } from '@mui/material'
import React, { useState, } from 'react'
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'



import dynamic from 'next/dynamic'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

const HomeMap = () => {
  const [mapCenter] = useState([ 20.246403, 105.967898 ])
  const [mapZoom] = useState(10)
  const [showLabel, ] = useState(false)
  const [dataFiltered, ] = useState([])
  const [selected, setSelected] = React.useState(true)

  return (
    <Paper elevation={3} sx={{ position: 'relative', height: 'calc(100vh - 170px)' }}>
      <Paper elevation={3} sx={{ py: 0.5, BorderRadius: 0, textAlign: 'center' }}>
        <Typography variant='overline' sx={{ fontWeight: 'bold' }}>
          Bản đồ trạng thái công trình
        </Typography>
      </Paper>
     
      <Button
        className='toggle-legend'
        variant='outlined'
        onClick={() => {
          setSelected(!selected)
        }}>
        {selected ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
      </Button>
      <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapData={dataFiltered}/>
    </Paper>
  )
}
export default HomeMap
