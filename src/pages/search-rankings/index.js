import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardUser from 'src/views/ui/cards/basic/CardUser'
import CardImgTop from 'src/views/ui/cards/basic/CardImgTop'
import CardMobile from 'src/views/ui/cards/basic/CardMobile'
import CardSupport from 'src/views/ui/cards/basic/CardSupport'
import CardTwitter from 'src/views/ui/cards/basic/CardTwitter'
import CardFacebook from 'src/views/ui/cards/basic/CardFacebook'
import CardLinkedIn from 'src/views/ui/cards/basic/CardLinkedIn'
import CardAppleWatch from 'src/views/ui/cards/basic/CardAppleWatch'
import CardMembership from 'src/views/ui/cards/basic/CardMembership'
import CardInfluencer from 'src/views/ui/cards/basic/CardInfluencer'
import CardNavigation from 'src/views/ui/cards/basic/CarsTable3'
import CardWithCollapse from 'src/views/ui/cards/basic/CardWithCollapse'
import CardVerticalRatings from 'src/views/ui/cards/basic/CardVerticalRatings'
import CardNavigationCenter from 'src/views/ui/cards/basic/CardNavigationCenter'
import TableSearchRanking from 'src/views/table/data-grid/TableSearchRanking'
import authConfig from 'src/configs/auth'
import CardHorizontalRatings from 'src/views/ui/cards/basic/CardHorizontalRatings'

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
