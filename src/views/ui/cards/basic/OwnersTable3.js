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

import TableMostPopularOwners from 'src/views/table/data-grid/TableMostPopularOwners'
import TableHighestEarningOwners from 'src/views/table/data-grid/TableHighestEarningOwners'
import TableHighestInspecturoScoreOwners from 'src/views/table/data-grid/TableHighestInspecturoScoreOwners'
import authConfig from 'src/configs/auth'

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
      await getDataFromAPI('http://161.35.118.186/mkulima/dereva/safari', setDataFromAPI1)
      await getDataFromAPI('http://161.35.118.186/mkulima/dereva/pesa', setDataFromAPI2)
      await getDataFromAPI('http://161.35.118.186/mkulima/dereva/mkaguzi', setDataFromAPI3)
    }

    // const mostPopularOwners = JSON.parse(window.localStorage.getItem(authConfig.storageMostPopularOwners))
    // const highestEarningOwners = JSON.parse(window.localStorage.getItem(authConfig.storageHighestEarningOwners))

    // const highestInspecturoScoreOwners = JSON.parse(
    //   window.localStorage.getItem(authConfig.storageHighestInspecturoScoreOwners)
    // )
    // setDataFromAPI1(mostPopularOwners)
    // setDataFromAPI2(highestEarningOwners)
    // setDataFromAPI3(highestInspecturoScoreOwners)

    // if (mostPopularOwners && highestEarningOwners && highestInspecturoScoreOwners) return
    API()
    console.log('owners')
  }, [])

  const getDataFromAPI = async (url, func) => {
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
