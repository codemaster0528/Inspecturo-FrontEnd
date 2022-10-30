import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import CardImgTop from 'src/views/cards/CardImgTop'
import BottomCard from 'src/views/cards/CardBottom'
import TableStateGrowth from 'src/views/table/TableStateGrowth'

import CardMostPopularCar from 'src/views/cards/CardMostPopularCar'
import CardHighestRevenueCar from 'src/views/cards/CardHighestRevenueCar'
import authConfig from 'src/configs/auth'
import CardMostPopularOwner from 'src/views/cards/CardMostPopularOwner'

const CardWidgets = () => {
  useEffect(() => {
    var url = window.location.href
    if (!url.includes('?')) return
    var splitUrl = url.split('?')
    const currentRegion = splitUrl[splitUrl.length - 1]
    window.localStorage.setItem(authConfig.storageCurrentRegion, currentRegion)
    if (url.includes('?')) window.location.href = '/dashboard'
  })

  return (
    <ApexChartWrapper repaint>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={4}>
          <CardMostPopularCar />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CardHighestRevenueCar />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CardMostPopularOwner />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardImgTop />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableStateGrowth />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BottomCard />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CardWidgets
