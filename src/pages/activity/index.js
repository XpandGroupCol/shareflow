import ActivityCard from 'components/activityCard'
import Button from 'components/button'
import Typography from 'components/typography'
import { useGetActivity } from 'hooks/useGetActivity'
import styles from './activity.module.css'

const ActivityPage = () => {
  const { data, isLoading, isError, isFetching } = useGetActivity()

  console.log({ data, isLoading, isError, isFetching })

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
