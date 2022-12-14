// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { DataGridPro } from '@mui/x-data-grid-pro'
import Rating from '@mui/material/Rating'
import SwiperLoop from 'src/views/components/swiper/SwiperLoop'
import { useKeenSlider } from 'keen-slider/react'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import CarDetailInfo from 'src/views/table/TableCarDetailInfo'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Global Values
import { ASCOUT_KEYVALUE } from 'src/globalValues'

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row.carId) {
    const carImage = row.carPhoto1

    return <CustomAvatar src={carImage} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.carName ? row.carName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

function DetailPanelContent({ row: rowProp }) {
  const [ref] = useKeenSlider({
    loop: true,
    rtl: 'rtl'
  })

  var detailImages = [rowProp.carPhoto1, rowProp.carPhoto2, rowProp.carPhoto3, rowProp.carPhoto4, rowProp.carPhoto5]

  var detailInfo = [
    { id: 1, carFuelType: rowProp.carFuelType, carDoors: rowProp.carDoors, carDescription: rowProp.carDescription }
  ]

  return (
    <KeenSliderWrapper>
      <Grid container className='match-height'>
        <Grid item xs={12} sm={6}>
          <SwiperLoop direction='rtl' images={detailImages} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CarDetailInfo info={detailInfo} />
        </Grid>
      </Grid>
    </KeenSliderWrapper>
  )
}

const TableHighestEarningCars = ({ rows }) => {
  // ** States
  const [pageSize, setPageSize] = useState(50)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [dataFromAPI, setDataFromAPI] = useState([])

  const getDetailPanelContent = React.useCallback(({ row }) => <DetailPanelContent row={row} />, [])

  const getDetailPanelHeight = React.useCallback(() => 'auto', [])

  const columns = [
    {
      flex: 0.15,
      minWidth: 150,
      field: 'CarName',
      headerName: '',
      hide: hideNameColumn,
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.carMake + ', ' + row.carModel}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.carYear}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 110,
      field: 'Est.Revenue',
      headerName: 'Est.Revenue',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.carRevenue}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'Price',
      headerName: 'Price',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.carCurrency + ' ' + params.row.carPrice}
        </Typography>
      )
    },
    {
      flex: 0.05,
      field: 'Trips',
      minWidth: 80,
      headerName: 'Trips',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.carTrips}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'Rating',
      minWidth: 140,
      headerName: 'Rating',
      renderCell: params => (
        <Rating
          sx={{ color: '#593CFB' }}
          defaultValue={Number(params.row.carRating)}
          precision={0.1}
          name='half-rating'
          readOnly
        />
      )
    },
    {
      flex: 0.1,
      field: 'InspecturoScore',
      headerName: 'Inspecturo Score',
      renderCell: params => {
        let color = 'primany'
        if (params.row.carInspecturoScore <= 30) color = 'error'
        else if (params.row.carInspecturoScore <= 50) color = 'warning'
        else color = 'success'

        return (
          <CustomChip
            size='small'
            skin='light'
            color={color}
            label={params.row.carInspecturoScore.toFixed(2)}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      field: 'Owner',
      headerName: 'Owner',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.DriverName}
        </Typography>
      )
    },
    {
      flex: 0.05,
      field: 'OwnerTrips',
      headerName: 'Owner Trips',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.DriverTrips}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'OwnerRating',
      minWidth: 140,
      headerName: 'Owner Rating',
      renderCell: params => (
        <Rating
          sx={{ color: '#593CFB' }}
          defaultValue={Number(params.row.DriverRating)}
          precision={0.1}
          name='half-rating'
          readOnly
        />
      )
    }
  ]

  return (
    <Card>
      <DataGridPro
        autoHeight
        rows={rows}
        columns={columns}
        getRowId={row => row.carId}
        rowThreshold={0}
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight} // Optional, default is 500px.
        pageSize={pageSize}
        pagination
      />
    </Card>
  )
}

export default TableHighestEarningCars
