import { Box } from '@mui/material'
import BackButton from 'components/backButton'
import MediaForm from 'components/campaigns/media'
import Typography from 'components/typography'
import { useGlobalCampaigns } from 'providers/CampaignProvider'

const MediaPage = () => {
  const { globalCampaign } = useGlobalCampaigns()
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
