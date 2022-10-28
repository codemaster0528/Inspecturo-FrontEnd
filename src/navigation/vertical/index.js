import React, { useState, useEffect } from 'react'

// ** Icon imports
import Table from 'mdi-material-ui/Table'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import FormSelect from 'mdi-material-ui/FormSelect'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'
import Paperclip from 'mdi-material-ui/Paperclip'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CheckCircleOutline from 'mdi-material-ui/CheckCircleOutline'
import PiggyBank from 'mdi-material-ui/PiggyBank'
import LibraryOutline from 'mdi-material-ui/Library'
import LogOut from 'mdi-material-ui/ExitToApp'
import Car from 'mdi-material-ui/Car'
import Star from 'mdi-material-ui/Star'
import Calendar from 'mdi-material-ui/Calendar'
import ChartLine from 'mdi-material-ui/ChartLine'
import Account from 'mdi-material-ui/Account'
import AccountCircleOutline from 'mdi-material-ui/AccountCircleOutline'
import MapMarkerOutline from 'mdi-material-ui/MapMarkerOutline'
import LightbulbOutLine from 'mdi-material-ui/LightbulbOutline'

// ** Config
import authConfig from 'src/configs/auth'

import { useSettings } from 'src/@core/hooks/useSettings'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import { set } from 'nprogress'

const Navigation = () => {
  const [regionTree, setRegionTree] = useState([])
  const { settings, saveSettings } = useSettings()

  useEffect(() => {
    const userRegionTexts = JSON.parse(window.localStorage.getItem(authConfig.storageUserRegionTexts))
    const userRegionIds = JSON.parse(window.localStorage.getItem(authConfig.storageUserRegionIds))

    let tmpRegionTree = []
    for (let i = 0; i < userRegionTexts.length; i++) {
      tmpRegionTree.push({
        title: userRegionTexts[i].inspecturo_regionValue,
        path: '/dashboard?' + userRegionIds[i * 2]
      })
    }
    setRegionTree(tmpRegionTree)
    saveSettings({ ...settings, ['mode']: 'light' })
  }, [])

  return [
    {
      title: 'Select States',
      icon: MapMarkerOutline,
      children: regionTree
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Cars',
      icon: Car,
      path: '/cars'
    },
    {
      title: 'Owners',
      icon: AccountCircleOutline,
      path: '/owners'
    },
    {
      title: 'Search Rankings',
      icon: ChartLine,
      path: '/search-rankings'
    },
    {
      title: 'Opportunities',
      icon: LightbulbOutLine,
      path: '/opportunities'
    },
    {
      title: 'Learn',
      icon: LibraryOutline,
      path: '/learn'
    },

    {
      title: 'LogOut',
      icon: LogOut,
      path: '/logout'
    }
  ]
}

export default Navigation
