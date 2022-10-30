// ** React Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Rating from '@mui/material/Rating'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Global Values
import { ASCOUT_KEYVALUE } from 'src/globalValues'

const TableHighestInspecturoScoreOwners = ({ rows }) => {
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
      headerName: 'Rating',
      renderCell: params => (
        <Rating
          sx={{ color: '#593CFB' }}
          defaultValue={Number(params.row.driverRating)}
          precision={0.1}
          name='half-rating'
          readOnly
        />
      )
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

export default TableHighestInspecturoScoreOwners
