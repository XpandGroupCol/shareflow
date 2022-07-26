import { Box, Divider } from '@mui/material'
import Avatar from 'components/avatar'
import Button from 'components/button'
import OrderDraftButtons from 'components/orderDraftButtons'
import OrderMedia from 'components/orderMedia'
import OrderPaidButtons from 'components/orderPaidButtons'
import OrderTable from 'components/orderTable'
import StatusTag from 'components/statusTag'
import Typography from 'components/typography'
import { TAG_COLOR } from 'configs/campaigns'
import { Link } from 'react-router-dom'
import { getFormatedNumber, getSex, parseDate } from 'utils/normalizeData'
import styles from './details.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDownloadPDF } from 'hooks/useDownloadPDF'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

const CampaignDetails = ({ campaing, updateCampaign }) => {
  const localState = TAG_COLOR[campaing?.status] || {}

  const { getPDF, loading } = useDownloadPDF()

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Detalle de la campaña</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >
        <section className={styles.header}>
          <div className={styles.information}>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Número de orden:</Typography>
              <Typography>{campaing?.orderNumber?.toString()?.padStart(7, '0') || ''}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Campaña:</Typography>
              <Typography>{campaing?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Marca:</Typography>
              <Typography>{campaing?.brand}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Url:</Typography>
              <Typography>{campaing?.url}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Periodo:</Typography>
              <Typography>{parseDate(campaing?.startDate)} - {parseDate(campaing?.endDate)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Estado:</Typography>
              {localState?.label ? <StatusTag label={localState?.label} color={localState?.color} /> : ''}
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Impresiones:</Typography>
              <Typography>{getFormatedNumber(campaing?.summary?.prints || 0)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Reproducciones:</Typography>
              <Typography>{getFormatedNumber(campaing?.summary?.reproductions || 0)}</Typography>

            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Clicks:</Typography>
              <Typography>{getFormatedNumber(campaing?.summary?.clicks || 0)}</Typography>
            </Box>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Avatar sx={{ width: 100, height: 100 }} src={campaing?.logo?.url || ''} label={campaing?.brand} />
            <Button loading={loading} size='small' variant='contained' color='secondary' onClick={() => getPDF(campaing)}>
              <PictureAsPdfIcon sx={{ marginRight: '10px' }} />
              Descargar Orden
            </Button>
          </Box>
        </section>
        <Divider sx={{ margin: '20px 0' }} />
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>Segmentación de la campaña</Typography>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Sexo:</Typography>
          <Typography>{getSex(campaing?.sex)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Sector: </Typography>
          <Typography>{campaing?.sector?.label}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Edades: </Typography>
          <Typography>{campaing?.ages.map(({ label }) => label).join(', ')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Ubicaciones: </Typography>
          <Typography>{campaing?.locations.map(({ label }) => label).join(' - ')}</Typography>
        </Box>

        <OrderTable
          data={campaing?.publishers || []}
          target={campaing?.target?.label}
          summary={campaing?.summary || {}}
        />
        <Box sx={{ margin: '30px 0' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Multimedia</Typography>
          <OrderMedia data={campaing?.publishers || []} />
        </Box>
        {campaing?.status === 'paid' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to='/campaigns'>
              <Button component='span' variant='outlined'>
                <ArrowBackIcon sx={{ marginRight: '10px' }} />
                Salir
              </Button>
            </Link>
          </Box>)}
        {(campaing?.status === 'draft' || campaing?.status === 'cancel') &&
          <OrderDraftButtons
            campaign={campaing}
            setCampaignState={updateCampaign}
          />}

        {campaing?.status === 'pending' && (
          <div>
            <OrderPaidButtons
              campaign={campaing}
              setCampaignState={updateCampaign}
            />
          </div>
        )}
      </Box>
    </>
  )
}

export default CampaignDetails
