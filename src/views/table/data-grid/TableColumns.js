// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row.carImage.length) {
    return (
      <CustomAvatar src={`/images/avatars/${row.carImage}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
    )
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

// ** Full Name Getter
const getFullName = params =>
  toast(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {params.row.full_name}
        </Typography>
      </Box>
    </Box>
  )

const TableColumns = () => {
  // ** States
  const [pageSize, setPageSize] = useState(3)
  const [hideNameColumn, setHideNameColumn] = useState(false)

  const [dataFromAPI, setDataFromAPI] = useState([
    {
      regionLogId: 141,
      regionId: 1,
      regionTripValueOld: 6801,
      regionTripValueChange: -721,
      regionTripValueNew: 6080,
      dateTimeAdded: '2022-10-23 17:58:42'
    }
  ])

  useEffect(() => {
    if (dataFromAPI.length != 1) return
    else getDataFromAPI()
  }, [])

  const getDataFromAPI = async () => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    var urlencoded = new URLSearchParams()
    urlencoded.append('ascout_keyValue', 'zD3BVPtyimdhrNBX5')
    urlencoded.append('regionId', '1')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }

    fetch('http://161.35.118.186/mkulima/ukuaji', requestOptions)
      .then(response => response.json())
      .then(result => {
        setDataFromAPI(result.data)
      })
      .catch(error => console.log('error', error))
  }

  const columns = [
    {
      flex: 0.2,
      field: 'State',
      headerName: 'State',
      hide: hideNameColumn,
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.regionId}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.35,
      headerName: 'Previous Tips',
      field: 'PreviousTips',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.regionTripValueOld}
        </Typography>
      )
    },
    {
      flex: 0.25,
      field: 'NewTips',
      headerName: 'New Tips',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.regionTripValueOld}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'Growth',
      headerName: 'Growth',
      renderCell: params => {
        let color = 'success'
        if (params.row.regionTripValueChange * params.row.regionTripValueOld < 0) color = 'error'

        return (
          <CustomChip
            size='small'
            skin='light'
            color={color}
            label={
              params.row.growth > 0
                ? (params.row.regionTripValueChange / params.row.regionTripValueOld) * 100 + '%'
                : (params.row.regionTripValueChange / params.row.regionTripValueOld) * 100 + '%'
            }
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    }
  ]

  return (
    <Card sx={{ height: 350 }}>
      <CardHeader title='STATE-BY-STATE GROWTH' />
      <DataGrid
        autoHeight
        rows={dataFromAPI}
        columns={columns}
        pageSize={pageSize}
        getRowId={row => row.regionLogId}
        disableSelectionOnClick
        rowsPerPageOptions={[3, 7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
    </Card>
  )
}

export default TableColumns
