import { Box } from '@mui/material'
import BackButton from 'components/backButton'
import MediaForm from 'components/campaigns/media'
import Typography from 'components/typography'
import { useGlobalCampaigns } from 'providers/CampaignProvider'
import { Navigate } from 'react-router-dom'

const MediaPage = () => {
  const { globalCampaign } = useGlobalCampaigns()

  if (!globalCampaign?.publishers?.length) return <Navigate to='/campaigns/create' />
  return (
    <>
      <section className='headerSection'>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
        >
          <BackButton href='/campaigns' />
          <Typography fontSize='24px' component='h2' fontWeight='bold'>Agregar multimedia</Typography>
        </Box>
      </section>
      <MediaForm campaign={globalCampaign} />
    </>
  )
}

export default MediaPage
