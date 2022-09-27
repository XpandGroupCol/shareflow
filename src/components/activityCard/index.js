
import Avatar from 'components/avatar'
import Button from 'components/button'
import Skeleton from 'components/skeleton'
import Typography from 'components/typography'
import { parseUTCDate } from 'utils/normalizeData'
import styles from './activityCard.module.css'

const mapState = {
  create: 'Creado',
  update: 'Actualizado',
  delete: 'Eliminado'
}

const ActivityCard = ({ item = {}, loading, showModal = undefined }) => {
  const { campaign, createBy, updateBy, updatedAt, type, createByAvatar, updateByAvatar, data } = item

  const handleSetModal = () => {
    showModal && showModal(data)
  }
  return (
    <div className={styles.card}>
      <div className={styles.user}>
        {loading ? <Skeleton sx={{ width: '40px', height: '40px', borderRadius: '100%' }} /> : <Avatar src={updateByAvatar} label={updateBy} />}
        <div>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Actualizado  por</Typography>
          {loading ? <Skeleton sx={{ width: '150px', height: '14px' }} /> : <Typography sx={{ fontSize: '14px' }}>{updateBy}</Typography>}
        </div>
      </div>
      <div className={styles.user}>
        {loading ? <Skeleton sx={{ width: '40px', height: '40px', borderRadius: '100%' }} /> : <Avatar src={createByAvatar} label={createBy} />}
        <div>
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Creado por</Typography>
          {loading ? <Skeleton sx={{ width: '150px', height: '14px' }} /> : <Typography sx={{ fontSize: '14px' }}>{createBy}</Typography>}

        </div>
      </div>
      <div className={styles.information}>
        {loading ? <Skeleton sx={{ width: '80px', height: '13px', marginBottom: '5px' }} /> : <span className={`${styles.type} ${styles[type]}`}>{mapState[type]}</span>}
        {loading ? <Skeleton sx={{ width: '180px', height: '16px', marginBottom: '5px' }} /> : <Typography sx={{ fontWeight: 'bold' }}>{campaign}</Typography>}
        {loading ? <Skeleton sx={{ width: '120px', height: '13px', marginBottom: '5px' }} /> : <Typography sx={{ fontSize: '13px' }}>{parseUTCDate(updatedAt, 'DD/MM/YYYY hh:mm A')}</Typography>}
      </div>
      <div className={styles.viewMore}>
        {loading
          ? <Skeleton sx={{ width: '70px', height: '40px' }} />
          : (
            <Button onClick={handleSetModal} disabled={!Object.values(data).length}>
              Detalle
            </Button>)}
      </div>
    </div>
  )
}

export default ActivityCard
