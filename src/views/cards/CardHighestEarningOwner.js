import { useState, useEffect } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Car from 'mdi-material-ui/Car'
import Star from 'mdi-material-ui/Star'
import Calendar from 'mdi-material-ui/Calendar'

// ** Custom Components Imports
import authConfig from 'src/configs/auth'

// ** Global Values
import setCache, { getCache } from 'src/cache'
import { ASCOUT_KEYVALUE } from 'src/globalValues'

const CardHighestEarningOwner = () => {
  const [dataFromAPI, setDataFromAPI] = useState([
    {
      driverId: 2519,
      regionId: 1,
      driverKey: '722440',
      driverName: 'András S.',
      driverLat: '33.94457886026851',
      driverLong: '-118.37280606827956',
      driverState: 'CA',
      driverTrips: 13911,
      driverJoinDate: '2015-01-07',
      driverRating: '4.80',
      driverListingUrl: 'https://turo.com/drivers/722440',
      dateTimeModified: '2022-09-26 14:28:17',
      dateTimeAdded: '2022-09-12 12:48:34',
      driverInspecturoScore: 96.53320967443882,
      driverRevenue: '4740.12'
    }
  ])

  useEffect(() => {
    const getCacheData = async () => {
      const cacheData = await getCache('HighestEarningOwner')
      if (!cacheData || Object.keys(cacheData).length == 0) {
        if (dataFromAPI.length != 1) return
        else getDataFromAPI()
      } else {
        setDataFromAPI(cacheData)
      }
    }
    getCacheData()
  }, [])

  const getDataFromAPI = async () => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    var urlencoded = new URLSearchParams()
    urlencoded.append('ascout_keyValue', ASCOUT_KEYVALUE)
    urlencoded.append('regionId', window.localStorage.getItem(authConfig.storageCurrentRegion))

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }

    fetch('http://161.35.118.186/mkulima/dereva/pesa', requestOptions)
      .then(response => response.json())
      .then(result => {
        result.data.sort(function (b, a) {
          return a.driverTrips - b.driverTrips
        })
        setCache('HighestEarningOwner', result.data)

        setDataFromAPI(result.data)
      })
      .catch(error => console.log('error', error))
  }

  return (
    <Card sx={{ height: 500 }}>
      <CardMedia
        sx={{ height: 150, width: 150, borderRadius: 40, margin: 'auto', mt: 5 }}
        image='/images/svgs/highest-earning-owner.svg'
      />
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          {dataFromAPI[0].driverName.substr(0, 20)}
        </Typography>
        <Typography variant='body2' sx={{ mb: 4, fontWeight: 600 }}>
          Hightest Earning Owner
        </Typography>
        <Typography variant='body2' sx={{ mb: 1, fontWeight: 600 }}>
          {dataFromAPI[0].driverRevenue}
        </Typography>
        <Typography variant='body2' sx={{ mb: 4, fontWeight: 600 }}>
          Estimated Revenue
        </Typography>
        <Typography variant='h6' sx={{ mb: 1 }}>
          <p style={{ visibility: 'hidden', height: 0, marginTop: 0 }}> {dataFromAPI[0].driverName.substr(0, 20)}</p>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex', alignItems: 'center' }}>
            <Car sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>{dataFromAPI[0].driverTrips}</Typography>
          </Box>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex', alignItems: 'center' }}>
            <Star sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>{dataFromAPI[0].driverRating}</Typography>
          </Box>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex', alignItems: 'center' }}>
            <Star sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>{dataFromAPI[0].driverInspecturoScore}</Typography>
          </Box>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex', alignItems: 'center' }}>
            <Calendar sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>{dataFromAPI[0].driverJoinDate}</Typography>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardHighestEarningOwner
