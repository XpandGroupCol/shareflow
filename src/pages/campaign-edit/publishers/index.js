import PublisherForm from 'components/campaigns/publishers'
import LoadingPage from 'components/loadingPage'
import { MAX_SHARE_VALUE } from 'configs'
import { useNotify } from 'hooks/useNotify'

import { useEditGlobalCampaigns } from 'providers/EditCampaingProvider'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateCampaign as setCampaign } from 'services/campaigns'
import { getFormatedNumber } from 'utils/normalizeData'
import { clearCampaign, getSummaryInformation, getTotalShare, getValidateMinBudget } from 'utils/publishersFormat'

const PublishersEditPage = () => {
  const { globalCampaign, updateCampaign, loading } = useEditGlobalCampaigns()

  const { mutateAsync, isLoading } = useMutation(setCampaign)

  const notify = useNotify()
  const navigate = useNavigate()

  const onSubmit = (values) => {
    const { publishers, _id, ...restOfValues } = values

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
          message = `${key} tiene una inversión minima de $${getFormatedNumber(miniBudget)} y el valor intertido hasta el momento es de $${getFormatedNumber(sum)}, por favor ajuste el share a invertir.`
        }
      })

      if (message) return notify.info(message)
    }

    const data = clearCampaign({ ...restOfValues, publishers })

    const summary = getSummaryInformation(values)

    const payload = { ...data, summary }

    mutateAsync({ id: _id, payload }).then(({ data }) => {
      if (data) {
        const hasAllFiles = data.publishers.some(({ media }) => !media?.url)
        const path = hasAllFiles ? `/campaigns/${_id}/media` : '/campaigns'
        updateCampaign(prev => ({ ...prev, publishers: data?.publishers ?? [] }))
        return navigate(path)
      }
    })
  }

  const onBack = ({ publishers, rows }) => {
    updateCampaign(prev => ({ ...prev, publishers, rows }))
  }

  if (loading) return <LoadingPage text='Buscando campaña ...' />

  if (!globalCampaign?.listOffPublishers?.length) {
    return <Navigate to={`/campaigns/${globalCampaign?._id}/edit`} />
  }

  return (
    <PublisherForm
      initValues={globalCampaign}
      onBack={onBack}
      onSubmit={onSubmit} href={`/campaigns/${globalCampaign?._id}/edit`}
      loading={isLoading}
    />
  )
}

export default PublishersEditPage
