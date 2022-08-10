import PublisherForm from 'components/campaigns/publishers'
import { GLOBAL_ERROR, MAX_SHARE_VALUE } from 'configs'
import { useNotify } from 'hooks/useNotify'
import { useGlobalCampaigns } from 'providers/CampaignProvider'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { createCampaign } from 'services/campaigns'
import { getFormatedNumber } from 'utils/normalizeData'
import { createPayload, getTotalShare, getValidateMinBudget } from 'utils/publishersFormat'

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

    const validateMinbudget = getValidateMinBudget(publishers)

    if (Object.keys(validateMinbudget).length) {
      let message = ''
      Object.entries(validateMinbudget).forEach(([key, { sum, miniBudget }]) => {
        if (sum < miniBudget) {
          message = `${key} tiene una inversión minima de $${getFormatedNumber(miniBudget)} y el valor intertido hasta el momento es de $${getFormatedNumber(sum)} por favor ajuste el share a invertir.`
        }
      })

      if (message) return notify.info(message)
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
