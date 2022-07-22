
import classNames from 'classnames'
import { Button } from '@mui/material'
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

const CampaignCard = (campaign) => {
  const { _id, logo, brand, name, status, startDate, endDate, summary, publishers } = campaign

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
      notify.error('Algo salio mal por favor intente nuevamente')
    }
  }

  const emptyFiles = publishers.some(({ imageUrl }) => !imageUrl)

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
        <Typography className={styles.title}>{brand}</Typography>
        <Typography className={styles.subtitle}>{name}</Typography>
        <div className={styles.date}>
          <Typography>{parseDate(startDate)}</Typography>
          <Typography> - </Typography>
          <Typography>{parseDate(endDate)}</Typography>
        </div>
        <Typography component='span' className={classNames(styles.status, { [styles[status]]: Boolean(styles[status]) })}>
          {status}
        </Typography>

      </header>
      <div className={styles.body}>
        <div className={styles.row}>
          <Typography color='black'>Impresiones</Typography>
          <Typography color='black'>{getFormatedNumber(summary?.prints) || 0}</Typography>
        </div>
        <div className={styles.row}>
          <Typography color='black'>Reproducciones</Typography>
          <Typography color='black'>{getFormatedNumber(summary?.reproductions) || 0}</Typography>
        </div>
        <div className={styles.row}>
          <Typography color='black'>Clicks</Typography>
          <Typography color='black'>{getFormatedNumber(summary?.clicks) || 0}</Typography>
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
          : ['draft', 'pending', 'cancel', 'paid'].includes(status) && (
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
