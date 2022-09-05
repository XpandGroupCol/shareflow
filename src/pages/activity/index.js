import ActivityCard from 'components/activityCard'
import Button from 'components/button'
import Typography from 'components/typography'
import styles from './activity.module.css'

const ActivityPage = () => {
  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Actividad</Typography>
      </section>
      <section className='contentSection'>
        <div className={styles.activityContent}>
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <Button variant='contained' color='secondary'>
            Ver mas
          </Button>
        </div>
      </section>
    </>
  )
}

export default ActivityPage
