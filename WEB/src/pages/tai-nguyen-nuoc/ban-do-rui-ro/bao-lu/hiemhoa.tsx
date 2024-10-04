import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import HomeMap from "src/pages/home/map";


export default function Danger() {
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
            <Tab label='Bản đồ Google' value='1' />
            <Tab label='Thống kê' value='2' />
            <Tab label='Bản đồ PDF' value='3' />
          </TabList>
        </Box>

        <TabPanel value='1'>
         <HomeMap/>
        </TabPanel>
       
      </TabContext>
    </Grid>
  </Grid>
  );
}

