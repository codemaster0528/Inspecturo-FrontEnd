import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop = () => {
  const [dataFromAPI, setDataFromAPI] = useState([
    {
      stateHeatmapsId: 1,
      regionId: 1,
      stateHeatmapsImage: 'https://picsum.photos/536/354',
      dateTimeAdded: '2022-09-15 17:41:08'
    },
    {
      stateHeatmapsId: 2,
      regionId: 2,
      stateHeatmapsImage: 'https://picsum.photos/536/354',
      dateTimeAdded: '2022-09-15 17:41:08'
    }
  ])

  useEffect(() => {
    if (dataFromAPI.length != 2) return
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

    fetch('http://161.35.118.186/mkulima/ramani', requestOptions)
      .then(response => response.json())
      .then(result => {
        setDataFromAPI(result.data)
      })
      .catch(error => console.log('error', error))
  }

  return (
    <Card sx={{ height: 350 }}>
      <CardContent sx={{ pt: 4 }}>
        <Typography variant='h6'>HEATMAP OF TURO CARS IN YOUR STATE</Typography>
      </CardContent>
      <CardMedia sx={{ height: 280 }} image={dataFromAPI[0].stateHeatmapsImage} />
    </Card>
  )
}

export default CardImgTop
