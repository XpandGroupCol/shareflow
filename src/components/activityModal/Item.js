import Typography from 'components/typography'
import styles from './activityModal.module.css'

const Item = ({ name, value }) => {
  return (
    <div className={styles.item} style={{ marginLeft: '20px' }}>
      <Typography fontSize='16px' fontWeight='bold'>{name}:</Typography>
      <Typography fontSize='16px'>{value}</Typography>
    </div>
  )
}

export default Item
