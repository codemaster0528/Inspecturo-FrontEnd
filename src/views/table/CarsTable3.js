// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'

import TableMostPopularCars from './TableMostPopularCars'
import TableHighestEarningCars from './TableHighestEarningCars'
import TableHighestInspecturoScore from './TableHighestInspecturoScore'
import authConfig from 'src/configs/auth'

// ** Global Values
import setCache, { getCache } from 'src/cache'
import { ASCOUT_KEYVALUE } from 'src/globalValues'

const CarsTable3 = () => {
  // ** State
  const [value, setValue] = useState('1')
  const [dataFromAPI1, setDataFromAPI1] = useState([])
  const [dataFromAPI2, setDataFromAPI2] = useState([])
  const [dataFromAPI3, setDataFromAPI3] = useState([])

  useEffect(() => {
    const API = async () => {
      await getDataFromAPI('http://161.35.118.186/mkulima/gari/safari', setDataFromAPI1, 'MostPopularCar')
      await getDataFromAPI('http://161.35.118.186/mkulima/gari/pesa', setDataFromAPI2, 'HighestRevenueCar')
      await getDataFromAPI('http://161.35.118.186/mkulima/gari/mkaguzi', setDataFromAPI3, 'HighestInspecturoScoreCar')
    }

    const getCacheData = async () => {
      const cacheData1 = await getCache('MostPopularCar')
      const cacheData2 = await getCache('HighestRevenueCar')
      const cacheData3 = await getCache('HighestInspecturoScoreCar')

      if (!cacheData1 || Object.keys(cacheData1).length == 0) {
        API()
      } else {
        setDataFromAPI1(cacheData1)
        setDataFromAPI2(cacheData2)
        setDataFromAPI3(cacheData3)
      }
    }
    getCacheData()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getDataFromAPI = async (url, func, cacheName) => {
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

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        func(result.data)
        setCache(cacheName, result.data)
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
