import { axiosFetcher } from './fetcher'

export const getCampaigns = async (params) => {
  try {
    const { data } = await axiosFetcher(`/campaigns${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCampaignById = async (id) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/${id}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getPublishersByTarget = async ({ target, ages, amount, sex }) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/publishers-by-target?target=${target}&miniBudget=${amount}&sex=${sex}&ages=${ages}`,
      { method: 'GET' })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const createCampaign = async (campaign) => {
  try {
    const { data } = await axiosFetcher('/campaigns', {
      method: 'POST',
      data: campaign
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const deleteCampaign = async (id) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/${id}`, {
      method: 'DELETE'
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const uploadCampaignfile = async ({ payload, id }) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/upload-file/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateCampaign = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/${id}`, {
      method: 'PUT',
      data: payload
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const validatorFile = async (payload) => {
  try {
    const { data } = await axiosFetcher('/campaigns/validateFiles', {
      method: 'POST',
      data: payload
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const downloadPDF = async ({ _id, name }) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/pdf/${_id}`,
      { method: 'GET', responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.setAttribute('download', `${name}.pdf`)
    link.href = url
    document.body.appendChild(link)
    link.click()
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
