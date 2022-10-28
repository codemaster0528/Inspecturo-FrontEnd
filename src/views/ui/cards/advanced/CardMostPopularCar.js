import React, { useState, useEffect } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import Paperclip from 'mdi-material-ui/Paperclip'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CheckCircleOutline from 'mdi-material-ui/CheckCircleOutline'
import PiggyBank from 'mdi-material-ui/PiggyBank'
import Star from 'mdi-material-ui/Star'
import Calendar from 'mdi-material-ui/Calendar'
import Account from 'mdi-material-ui/Account'

import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import authConfig from 'src/configs/auth'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `0px solid ${theme.palette.divider}`
  }
}))

const CardMostPopularCar = () => {
  const [dataFromAPI, setDataFromAPI] = useState([
    {
      carId: 117,
      carInspecturoScore: 88.39040552180462,
      regionId: 1,
      carKey: '563077',
      driverKey: '8599815',
      carMake: 'Kia',
      carModel: 'Optima',
      carYear: '2019',
      carPrice: '36.00',
      carCurrency: 'USD',
      carTrips: 384,
      carRating: '4.85',
      carPhoto1: 'https://images.turo.com/media/vehicle/images/Cyn9BMMtTh6kjUFmrbssVA.jpg',
      carPhoto2: 'https://images.turo.com/media/vehicle/images/N7jJR0WcRrKG4E8CSHcatA.jpg',
      carPhoto3: 'https://images.turo.com/media/vehicle/images/huL1QjP5TEyfwyxHTe_alw.jpg',
      carPhoto4: 'https://images.turo.com/media/vehicle/images/6m68tF0UQhuj141qGuWWWQ.jpg',
      carPhoto5: 'https://images.turo.com/media/vehicle/images/wn75ymBhTImz7FxzSJi0jg.jpg',
      carLatitude: '34.099142909254375',
      carLongitude: '-118.30637482663951',
      carFuelType: 'GASOLINE',
      carDoors: 4,
      carColor: '',
      carPlan: '75 plan',
      carTakeRate: '0.8',
      carDescription:
        'I have a brand new 2019 Kia Optima. Its is a fuel efficient vehicle that has a really smooth ride to it. It is a low engine sound for more comfort to  the driver’s ears. This vehicle includes Bluetooth backup camera, apple car play/android auto. Please no smoking allowed in the vehicle. And please return the car with the same level of gas and keep it clean please.',
      carListingUrl: 'https://turo.com/gb/en/car-rental/united-states/los-angeles-ca/kia/optima/563077',
      DriverUrl: 'https://turo.com/drivers/8599815',
      DriverName: 'Arthur K.',
      DriverTrips: 875,
      DriverRating: '4.90',
      DriverJoined: '2018-01-11',
      dateTimeModified: '2022-10-11 00:09:22',
      dateTimeAdded: '2022-09-12 12:19:05',
      carRevenue: '13824.00'
    }
  ])

  useEffect(() => {
    if (dataFromAPI.length != 1) return
    const mostPopularCars = JSON.parse(window.localStorage.getItem(authConfig.storageMostPopularCars))
    if (mostPopularCars) setDataFromAPI(mostPopularCars)
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

    fetch('http://161.35.118.186/mkulima/gari/safari', requestOptions)
      .then(response => response.json())
      .then(result => {
        result.data.sort(function (b, a) {
          return a.carTrips - b.carTrips
        })
        console.log('FINISHED')

        // window.localStorage.setItem(authConfig.storageMostPopularCars, JSON.stringify(result.data))
        setDataFromAPI(result.data)
      })
      .catch(error => console.log('error', error))
  }

  return (
    <Card sx={{ height: 500 }}>
      <CardMedia sx={{ height: 150, width: 150, borderRadius: 40, margin: 'auto', mt: 5 }} image='/images/cars/1.png' />
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          {dataFromAPI[0].carMake} {dataFromAPI[0].carModel} {dataFromAPI[0].carYear}
        </Typography>
        <Typography variant='body2' sx={{ mb: 4, fontWeight: 600 }}>
          Most Popular Car
        </Typography>
        <Typography variant='body2' sx={{ mb: 1, fontWeight: 600 }}>
          {dataFromAPI[0].carTrips}
        </Typography>
        <Typography variant='body2' sx={{ mb: 4, fontWeight: 600 }}>
          Total Trips
        </Typography>
        <Typography variant='h6' sx={{ mb: 1 }}>
          <p style={{ visibility: 'hidden', height: 0, marginTop: 0 }}>
            {dataFromAPI[0].carMake} {dataFromAPI[0].carModel} {dataFromAPI[0].carYear}
          </p>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <PiggyBank sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>
              {dataFromAPI[0].carCurrency} {dataFromAPI[0].carRevenue}
            </Typography>
          </Box>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex' }}>
            <Star sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>{dataFromAPI[0].carRating}</Typography>
          </Box>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex' }}>
            <Account sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>{dataFromAPI[0].DriverName}</Typography>
          </Box>
          <Box sx={{ py: 1.25, mb: 1, display: 'flex' }}>
            <Star sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
            <Typography variant='body2'>{dataFromAPI[0].DriverRating}</Typography>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardMostPopularCar
