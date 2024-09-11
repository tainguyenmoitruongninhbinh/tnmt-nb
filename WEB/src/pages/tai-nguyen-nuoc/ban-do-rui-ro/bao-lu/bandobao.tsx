//React Imports

import React, { SyntheticEvent } from 'react'
import { useState } from 'react'

import { Box, Tab } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import Danger from './hiemhoa'

// eslint-disable-next-line react-hooks/rules-of-hooks
const StormMap = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='ground water reserve'>
              <Tab label='Hiểm họa' value='1' />
              <Tab label='Phơi bày' value='2' />
              <Tab label='Nhạy cảm' value='3' />
              <Tab label='Rủi ro' value='4' />
            </TabList>
          </Box>

          <TabPanel value='1'>
            <Danger />
          </TabPanel>
         
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default StormMap
