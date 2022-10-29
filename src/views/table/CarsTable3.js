// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import TableMostPopularCars from './TableMostPopularCars'
import TableHighestEarningCars from './TableHighestEarningCars'
import TableHighestInspecturoScore from './TableHighestInspecturoScore'
import authConfig from 'src/configs/auth'

const CarsTable3 = () => {
  // ** State
  const [value, setValue] = useState('1')
  const [dataFromAPI1, setDataFromAPI1] = useState([])
  const [dataFromAPI2, setDataFromAPI2] = useState([])
  const [dataFromAPI3, setDataFromAPI3] = useState([])

  useEffect(() => {
    const API = async () => {
      await getDataFromAPI('http://161.35.118.186/mkulima/gari/safari', setDataFromAPI1)
      await getDataFromAPI('http://161.35.118.186/mkulima/gari/pesa', setDataFromAPI2)
      await getDataFromAPI('http://161.35.118.186/mkulima/gari/mkaguzi', setDataFromAPI3)
    }

    // const mostPopularCars = JSON.parse(window.localStorage.getItem(authConfig.storageMostPopularCars))
    // const highestRevenueCars = JSON.parse(window.localStorage.getItem(authConfig.storageHighestRevenueCars))
    // const highestInspecturoCars = JSON.parse(window.localStorage.getItem(authConfig.storageHighestInspecturoCars))
    // setDataFromAPI1(mostPopularCars)
    // setDataFromAPI2(highestRevenueCars)
    // setDataFromAPI3(highestInspecturoCars)

    // if (mostPopularCars && highestRevenueCars && highestInspecturoCars) return
    API()
    console.log('*********************')
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getDataFromAPI = async (url, func) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    var urlencoded = new URLSearchParams()
    urlencoded.append('ascout_keyValue', 'zD3BVPtyimdhrNBX5')
    urlencoded.append('regionId', window.localStorage.getItem(authConfig.storageCurrentRegion))

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        func(result.data)
      })
      .catch(error => console.log('error', error))
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Most Popular Cars' />
          <Tab value='2' label='Highest Earning Cars' />
          <Tab value='3' label='Highest Inspecturo Score' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <TableMostPopularCars rows={dataFromAPI1} />
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <TableHighestEarningCars rows={dataFromAPI2} />
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <TableHighestInspecturoScore rows={dataFromAPI3} />
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CarsTable3
