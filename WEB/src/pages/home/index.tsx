import React from 'react'
import Grid from '@mui/material/Grid'

import HomeMap from '../home/map'

const Home = () => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <HomeMap />
      </Grid>
    </Grid>
  )
}

export default Home
