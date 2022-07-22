import QueryParamsProvider from 'providers/QueryParamsProvider'
import { Link } from 'react-router-dom'
import Button from 'components/button'
import ListOfCampaings from 'components/listOfCampaings'
import Filters from 'components/campaigns/filters'

const CampaignsPage = () => {
  return (
    <QueryParamsProvider allowValues={['page', 'search', 'status']}>
      <section className='headerSection'>
        <Filters />
        <section>
          <Link to='/campaigns/create'>
            <Button component='span' size='small' variant='contained'>
              Nueva Campaña
            </Button>
          </Link>
        </section>
      </section>
      <section className='contentSection'>
        <ListOfCampaings />
      </section>

    </QueryParamsProvider>
  )
}

export default CampaignsPage
