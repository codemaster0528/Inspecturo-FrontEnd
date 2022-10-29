// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import CardHighestInspecturoScoreOwner from 'src/views/cards/CardHighestInspecturoScoreOwner'
import CardMostPopularOwner from 'src/views/cards/CardMostPopularOwner'
import CardHighestEarningOwner from 'src/views/cards/CardHighestEarningOwner'
import OwnersTable3 from 'src/views/table/OwnersTable3'

const CardWidgets = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={4}>
          <CardMostPopularOwner />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CardHighestEarningOwner />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CardHighestInspecturoScoreOwner />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <OwnersTable3 />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CardWidgets
