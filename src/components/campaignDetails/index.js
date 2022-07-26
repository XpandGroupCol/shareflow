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
import { getFormatedNumber, parseDate } from 'utils/normalizeData'
import styles from './details.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CampaignDetails = ({ campaing, updateCampaign }) => {
  const localState = TAG_COLOR[campaing?.status] || {}

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
          <div>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Número de orden:</Typography>
              <Typography>{campaing?.orderNumber?.toString()?.padStart(7, '0') || ''}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Campaña:</Typography>
              <Typography>{campaing?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Marca:</Typography>
              <Typography>{campaing?.brand}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Fechas:</Typography>
              <Typography>{parseDate(campaing?.startDate)} - {parseDate(campaing?.endDate)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Estado:</Typography>
              {localState?.label ? <StatusTag label={localState?.label} color={localState?.color} /> : ''}
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Impresiones:</Typography>
              <Typography>{getFormatedNumber(campaing?.summary?.prints)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Reproducciones:</Typography>
              <Typography>{campaing?.summary?.reproductions}</Typography>

            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography fontSize='16px' fontWeight='bold'>Clicks:</Typography>
              <Typography>{campaing?.summary?.clicks}</Typography>

            </Box>
          </div>
          <Box>
            <Avatar sx={{ width: 80, height: 80 }} src={campaing?.logo?.url || ''} label={campaing?.brand} />
          </Box>
        </section>
        <Divider sx={{ margin: '20px 0' }} />
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Segmentación de la campaña</Typography>
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
