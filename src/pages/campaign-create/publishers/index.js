import PublisherForm from 'components/campaigns/publishers'
import { GLOBAL_ERROR, MAX_SHARE_VALUE } from 'configs'
import { useNotify } from 'hooks/useNotify'
import { useGlobalCampaigns } from 'providers/CampaignProvider'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { createCampaign } from 'services/campaigns'
import { createPayload, getTotalShare } from 'utils/publishersFormat'

const PublishersPage = () => {
  const { globalCampaign, setCampaign } = useGlobalCampaigns()

  const { mutateAsync, isLoading } = useMutation(createCampaign)

  const notify = useNotify()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { publishers } = values

    if (publishers.length === 0) return notify.error('Debes seleccionar almenos un medio')
    const share = getTotalShare(publishers)
    if (share < MAX_SHARE_VALUE) {
      return notify.error(`La sumatoria total del share entre todos los medios es de ${share}% y debe ser igual ${MAX_SHARE_VALUE}%`)
    }

    try {
      const { data } = await mutateAsync(createPayload({ ...values, logo: globalCampaign?.logo }))
      notify.success('Su campaña ha sido creada correctamente')
      setCampaign(prev => ({ ...prev, publishers: data?.publishers ?? [] }))
      navigate('/campaigns/create/media')
    } catch (error) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onBack = ({ publishers, rows }) => {
    setCampaign(prev => ({ ...prev, publishers, rows }))
  }

  if (globalCampaign.listOffPublishers.length === 0) {
    return <Navigate to='/campaigns/create' />
  }

  return (
    <PublisherForm
      initValues={globalCampaign}
      onBack={onBack}
      onSubmit={onSubmit} href='/campaigns/create'
      loading={isLoading}
    />
  )
}

export default PublishersPage
