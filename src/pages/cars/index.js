// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import CardMostPopularCar from 'src/views/ui/cards/advanced/CardMostPopularCar'
import CardHighestRevenueCar from 'src/views/ui/cards/advanced/CardHighestRevenueCar'
import CardHighestInspecturoScoreCar from 'src/views/ui/cards/advanced/CardHighestInspecturoScoreCar'
import CarsTable3 from 'src/views/ui/cards/basic/CarsTable3'

const CardWidgets = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={4}>
          <CardMostPopularCar />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CardHighestRevenueCar />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CardHighestInspecturoScoreCar />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CarsTable3 />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CardWidgets
