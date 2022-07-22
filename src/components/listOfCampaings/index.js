
import CampaignCard from 'components/campaignCard'
import CardSkeleton from 'components/campaignCard/cardSkeleton'
import PageSection from 'components/pageSection'
import Typography from 'components/typography'
import { useGetCampaigns } from 'hooks/useGetCampaigns'
import { useQueryParams } from 'providers/QueryParamsProvider'
import styles from './listOfCampaings.module.css'

const ListOfCampaings = () => {
  const { queryString, queryParams, setQueryParams } = useQueryParams()

  const { data = {}, isLoading, isError } = useGetCampaigns(queryString)

  const { data: campaigns = [], pages = 0 } = data

  const handleSetPage = (_, page) => {
    setQueryParams({ page })
  }

  if (isLoading) {
    return (
      <div className={styles.listOfCards}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((campaign, index) => (
          <div className={styles.card} key={campaign.id || index}>
            <CardSkeleton />
          </div>
        ))}
      </div>
    )
  }

  if (isError) return <h1>Error page</h1>

  if (!campaigns?.length) {
    return (
      <div className={styles.empty}>
        <Typography>Aun no se han creado campañas</Typography>
      </div>
    )
  }

  return (
    <>
      <div className={styles.listOfCards}>
        {campaigns.map((campaign, index) => (
          <div className={styles.card} key={campaign.id || index}>
            <CampaignCard {...campaign} />
          </div>
        ))}
      </div>
      {pages > 1 && (
        <PageSection
          page={queryParams?.page ?? 1}
          onChange={handleSetPage}
          count={pages}
        />)}
    </>
  )
}

export default ListOfCampaings
