// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'

import TableMostPopularOwners from './TableMostPopularOwners'
import TableHighestEarningOwners from './TableHighestEarningOwners'
import TableHighestInspecturoScoreOwners from './TableHighestInspecturoScoreOwners'
import authConfig from 'src/configs/auth'

// ** Global Values
import { ASCOUT_KEYVALUE } from 'src/globalValues'
import setCache, { getCache } from 'src/cache'

const OwnersTable3 = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [dataFromAPI1, setDataFromAPI1] = useState([])
  const [dataFromAPI2, setDataFromAPI2] = useState([])
  const [dataFromAPI3, setDataFromAPI3] = useState([])

  useEffect(() => {
    const API = async () => {
      await getDataFromAPI('http://161.35.118.186/mkulima/dereva/safari', setDataFromAPI1, 'MostPopularOwner')
      await getDataFromAPI('http://161.35.118.186/mkulima/dereva/pesa', setDataFromAPI2, 'HighestEarningOwner')
      await getDataFromAPI(
        'http://161.35.118.186/mkulima/dereva/mkaguzi',
        setDataFromAPI3,
        'HighestInspecturoScoreOwner'
      )
    }

    const getCacheData = async () => {
      const cacheData1 = await getCache('MostPopularOwner')
      const cacheData2 = await getCache('HighestEarningOwner')
      const cacheData3 = await getCache('HighestInspecturoScoreOwner')

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
        const data = result.data.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj.driverId).indexOf(obj.driverId) == pos
        })
        func(data)
        setCache(cacheName, data)
      })
      .catch(error => console.log('error', error))
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Most Popular Owners' />
          <Tab value='2' label='Highest Earning Owners' />
          <Tab value='3' label='Highest Inspecturo Score' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <TableMostPopularOwners rows={dataFromAPI1} />
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <TableHighestEarningOwners rows={dataFromAPI2} />
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <TableHighestInspecturoScoreOwners rows={dataFromAPI3} />
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default OwnersTable3
