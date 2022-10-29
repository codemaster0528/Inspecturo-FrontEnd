// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import { DataGridPro } from '@mui/x-data-grid-pro'
import Rating from '@mui/material/Rating'
import SwiperLoop from 'src/views/components/swiper/SwiperLoop'
import CardSnippet from 'src/@core/components/card-snippet'
import { useKeenSlider } from 'keen-slider/react'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import CarDetailInfo from 'src/views/table/TableCarDetailInfo'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const TableMostPopularOwners = ({ rows }) => {
  // ** States
  const [pageSize, setPageSize] = useState(50)
  const [hideNameColumn, setHideNameColumn] = useState(false)

  const columns = [
    {
      flex: 0.2,
      headerName: 'Name',
      field: 'Name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.driverName}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'Trips',
      headerName: 'Trips',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.driverTrips}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'Revenue',
      headerName: 'Revenue',
      renderCell: params => {
        let color = 'success'

        return (
          <CustomChip
            size='small'
            skin='light'
            color={color}
            label={params.row.driverRevenue}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.2,
      field: 'Rating',
      minWidth: 140,
      headerName: 'Rating',
      renderCell: params => (
        <Rating
          sx={{ color: '#593CFB' }}
          defaultValue={params.row.driverRating}
          precision={0.1}
          name='half-rating'
          readOnly
        />
      )
    },
    {
      flex: 0.2,
      field: 'InspecturoScore',
      headerName: 'Inspecturo Score',
      renderCell: params => {
        let color = 'success'
        if (params.row.driverInspecturoScore < 30) color = 'error'
        else if (params.row.driverInspecturoScore < 50) color = 'warning'

        return (
          <CustomChip
            size='small'
            skin='light'
            color={color}
            label={params.row.driverInspecturoScore}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    }
  ]

  return (
    <Card>
      <DataGrid
        autoHeight
        rows={rows}
        getRowId={row => row.driverId}
        columns={columns}
        rowThreshold={0}
        pageSize={pageSize}
        pagination
      />
    </Card>
  )
}

export default TableMostPopularOwners
