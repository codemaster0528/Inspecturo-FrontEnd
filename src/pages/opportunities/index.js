// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import FrameOnLocation from 'src/views/cards/iFrameOnLocationPage'

const CardWidgets = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12}>
          <FrameOnLocation />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CardWidgets
