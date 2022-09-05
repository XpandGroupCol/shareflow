import Avatar from 'components/avatar'
import Typography from 'components/typography'
import styles from './activityCard.module.css'

const ActivityCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <Avatar label='Di' sx={{ width: '30px', height: '30px' }} />
        <div>
          <Typography sx={{ fontSize: '14px', lineHeight: '13px', fontWeight: 'bold' }}>
            Diego Contreras
          </Typography>
          <Typography sx={{ fontSize: '13px', fontStyle: 'italic' }}>
            fecha: 07-002-2022
          </Typography>
        </div>
      </div>

      <div>
        <div className={styles.cardRow}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>campaña: </Typography>
          <Typography sx={{ fontSize: '14px' }}>Nike</Typography>
        </div>
        <div className={styles.cardRow}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>campaña: </Typography>
          <Typography sx={{ fontSize: '14px' }}>Nike</Typography>
        </div>
        <div className={styles.cardRow}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>campaña: </Typography>
          <Typography sx={{ fontSize: '14px' }}>Nike</Typography>
        </div>
        <div className={styles.cardRow}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>campaña: </Typography>
          <Typography sx={{ fontSize: '14px' }}>Nike</Typography>
        </div>
        <div className={styles.cardRow}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>campaña: </Typography>
          <Typography sx={{ fontSize: '14px' }}>Nike</Typography>
        </div>
      </div>

    </div>
  )
}

export default ActivityCard
