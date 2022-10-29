// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'

const CardBottom = () => {
  return (
    <Card sx={{ position: 'relative', height: 'auto' }}>
      <CardContent>
        <Box>
          <Box sx={{ mr: 2, mb: 6, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>ROBERT MAYER</Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <iframe src='https://www.example.com/' frameBorder='0' />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardBottom
