// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import FrameOnLearn from 'src/views/cards/iFrameOnLearnPage'

const CardWidgets = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12}>
          <FrameOnLearn />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CardWidgets
