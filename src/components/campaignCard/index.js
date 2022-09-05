
import { Button, Divider } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import Typography from 'components/typography'
import Avatar from 'components/avatar'
import Menu from './menu'

import { getFormatedNumber, parseDate } from 'utils/normalizeData'

import styles from './campaigns.module.css'
import { Link } from 'react-router-dom'
import { useMutate } from 'hooks/useMutate'
import { deleteCampaign } from 'services/campaigns'
import { useNotify } from 'hooks/useNotify'
import { useQueryClient } from 'react-query'
import { CAMPAINGS } from 'configs/queryKeys'
import { TAG_COLOR } from 'configs/campaigns'
import StatusTag from 'components/statusTag'
import { GLOBAL_ERROR } from 'configs'

const CampaignCard = (campaign) => {
  const { _id, logo, brand, name, status, startDate, endDate, summary, publishers } = campaign

  const localState = TAG_COLOR[status] || {}

  const { mutateAsync, isLoading } = useMutate(deleteCampaign)
  const queryClient = useQueryClient()

  const notify = useNotify()

  const handleSetCampaign = (onClose) => () => {
    onClose()
  }

  const handleDeleteCampaign = async () => {
    try {
      await mutateAsync(_id)
      queryClient.invalidateQueries([CAMPAINGS])
      notify.success('Su campaña ha sido creada correctamente')
    } catch (error) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const emptyFiles = publishers.some(({ media }) => !media?.url)

  return (
    <div className={styles.card} key={_id}>
      <header className={styles.header}>
        <Avatar src={logo?.url} label={brand} sx={{ width: 80, height: 80 }} />
        {['draft', 'pending', 'cancel'].includes(status) && (
          <div className={styles.menu}>
            <Menu>
              {
              (({ onClose }) => (
                <div>
                  <Link to={`/campaigns/${_id}/edit`}>
                    <MenuItem
                      component='span'
                      onClick={handleSetCampaign(onClose)}
                    >
                      <EditIcon fontSize='small' sx={{ marginRight: '10px' }} /> Editar
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={handleDeleteCampaign}>
                    {!isLoading && <DeleteIcon fontSize='small' sx={{ marginRight: '10px' }} />}
                    {isLoading ? 'Eliminando...' : 'Eliminar'}
                  </MenuItem>
                </div>
              ))
            }
            </Menu>
          </div>)}
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', margin: '15px 0 0', lineHeight: '1' }}>{brand}</Typography>
        <Typography sx={{ fontSize: '14px', lineHeigth: '1', marginBottom: '10px' }}>{name}</Typography>
        <div className={styles.date}>
          <Typography fontSize='13px'>{parseDate(startDate)}</Typography>
          <Typography> - </Typography>
          <Typography fontSize='13px'>{parseDate(endDate)}</Typography>
        </div>
        {localState?.label ? <StatusTag label={localState?.label} color={localState?.color} /> : ''}
      </header>
      <Divider sx={{ margin: '20px 0' }} />
      <div className={styles.body}>
        <div className={styles.row}>
          <Typography fontSize='14px' fontWeight='bold'>Impresiones</Typography>
          <Typography fontSize='13px'>{getFormatedNumber(summary?.prints) || 0}</Typography>
        </div>
        <div className={styles.row}>
          <Typography fontSize='14px' fontWeight='bold'>Reproducciones</Typography>
          <Typography fontSize='13px'>{getFormatedNumber(summary?.reproductions) || 0}</Typography>
        </div>
        <div className={styles.row}>
          <Typography fontSize='14px' fontWeight='bold'>Clicks</Typography>
          <Typography fontSize='13px'>{getFormatedNumber(summary?.clicks) || 0}</Typography>
        </div>

      </div>
      <footer className={styles.footer}>
        {emptyFiles
          ? (
            <Link to={`/campaigns/${_id}/media`}>
              <Button color='secondary'>
                Agregar multimedia
              </Button>
            </Link>)
          : ['draft', 'pending', 'cancel', 'paid', 'inProgress', 'completed'].includes(status) && (
            <Link to={`/campaigns/${_id}/order`}>
              <Button>
                Ver order
              </Button>
            </Link>
            )}

      </footer>
    </div>
  )
}

export default CampaignCard
