import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TableSearchRanking from 'src/views/table/data-grid/TableSearchRanking'
import authConfig from 'src/configs/auth'

const CardBasic = () => {
  const [dataFromAPI, setDataFromAPI] = useState([])

  useEffect(() => {
    if (dataFromAPI.length != 0) return

    const searchRankingData = JSON.parse(window.localStorage.getItem(authConfig.storageSearchRanking))

    if (searchRankingData) setDataFromAPI(searchRankingData)
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

    fetch('http://161.35.118.186/mkulima/gari/mkaguzi', requestOptions)
      .then(response => response.json())
      .then(result => {
        window.localStorage.setItem(authConfig.storageSearchRanking, JSON.stringify(result.data))
        setDataFromAPI(result.data)
      })
      .catch(error => console.log('error', error))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12}>
        <TableSearchRanking rows={dataFromAPI} />
      </Grid>
    </Grid>
  )
}

export default CardBasic
