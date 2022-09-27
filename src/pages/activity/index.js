import ActivityCard from 'components/activityCard'
import ActivityModal from 'components/activityModal'
import Button from 'components/button'
import Typography from 'components/typography'
import { useGetActivity } from 'hooks/useGetActivity'
import { useState } from 'react'
import styles from './activity.module.css'

const placeholders = [1, 2, 3, 4]

const ActivityPage = () => {
  const { data, isLoading, isFetching, getMore, noMore, page, getPrevius } = useGetActivity()

  const [openModal, setOpenModal] = useState(null)

  const showModal = (data) => setOpenModal(data)

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Actividad</Typography>
      </section>
      <section className='contentSection'>
        <div className={styles.activityContent}>
          {
            isLoading ? placeholders.map((key) => <ActivityCard key={key} loading={isLoading} />) : data?.data.map((item) => <ActivityCard key={item?._id} item={item} showModal={showModal} />)
           }
          {!isFetching
            ? (
              <div className={styles.buttons}>
                <Button variant='outlined' color='primary' onClick={getMore} disabled={noMore}>
                  Cargar mas ...
                </Button>
                <Button variant='outlined' color='secondary' onClick={getPrevius} disabled={page <= 1}>
                  Ver anterior
                </Button>
              </div>)
            : <p>Cargando ... </p>}
        </div>
      </section>
      <ActivityModal data={openModal} open={Boolean(openModal)} onClose={() => setOpenModal(null)} />
    </>
  )
}

export default ActivityPage
