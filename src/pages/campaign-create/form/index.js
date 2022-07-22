import { Box } from '@mui/material'
import BackButton from 'components/backButton'
import CampaignForm from 'components/campaigns/form'
import Typography from 'components/typography'
import UploadAvatar from 'components/uploadAvatar'
import { useGetLists } from 'hooks/useGetLists'
import { useGetPublishersByTarget } from 'hooks/useGetPublishersByTarget'
import { useNotify } from 'hooks/useNotify'
import { useGlobalCampaigns } from 'providers/CampaignProvider'
import { useNavigate } from 'react-router-dom'

const CampaignFormPage = () => {
  const navigate = useNavigate()
  const notify = useNotify()

  const { loading, getPublushers } = useGetPublishersByTarget()

  const { globalCampaign, setCampaign, setLogo } = useGlobalCampaigns()

  const { data } = useGetLists()

  const onSubmit = ({ logo, ...values }) => {
    const { amount, target } = globalCampaign

    if (amount === values.amount && target?.id === values.target?.id) {
      return navigate('/campaigns/create/publishers')
    }

    getPublushers(values.target?.value, values.amount).then(({ listOffPublishers, percentage }) => {
      if (listOffPublishers?.length) {
        setCampaign(prev => ({
          ...prev,
          ...values,
          listOffPublishers,
          rows: [],
          publishers: [],
          userPercentage: percentage
        }))
        return navigate('/campaigns/create/publishers')
      }

      notify.info('No se encontraron medios para con el objetivo y el valor ingresa, por favor prueba modificaion estos campos.')
    })
  }

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
          <Typography fontSize='24px' component='h2' fontWeight='bold'>Crear campaña</Typography>
        </Box>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >
        <UploadAvatar value={globalCampaign?.logo} onChange={setLogo} />
        <CampaignForm
          loading={loading}
          onSubmit={onSubmit}
          initValues={globalCampaign}
          {...data}
        />
      </Box>
    </>
  )
}

export default CampaignFormPage
