export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',

  forgotPasswordEndpoint: '/forgotPassword',

  // User Data
  storageTokenKeyName: 'accessToken',
  storageUserEmail: 'userEmail',
  storageUserName: 'userName',
  storageUserRegionIds: 'userRegionsIds',
  storageUserRegionTexts: 'userRegionTexts',
  storageUserStatus: 'userStatus',
  storageUserAddons: 'userAddons',

  storageCurrentRegion: 'currentRegion',

  // API Data
  storageSearchRanking: 'searchRankingData',
  storageMostPopularCars: 'mostPopularCars',
  storageHighestRevenueCars: 'highestRevenueCars',
  storageHighestInspecturoCars: 'highestInspecturoCars',

  storageMostPopularOwners: 'mostPopularOwners',
  storageHighestEarningOwners: 'highestEarningOwners',
  storageHighestInspecturoScoreOwners: 'highestInspecturoScoreOwners'
}
