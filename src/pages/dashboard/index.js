// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import CardImgTop from 'src/views/ui/cards/basic/CardImgTop'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import TableColumns from 'src/views/table/data-grid/TableColumns'

import CardMostPopularCar from 'src/views/ui/cards/advanced/CardMostPopularCar'
import CardHighestRevenueCar from 'src/views/ui/cards/advanced/CardHighestRevenueCar'
import CardMostPopularOwner from 'src/views/ui/cards/advanced/CardMostPopularOwner'

const CardWidgets = () => {
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
          <TableColumns />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CardUser />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CardWidgets
