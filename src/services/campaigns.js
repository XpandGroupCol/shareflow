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

export const getPublishersByTarget = async (target, miniBudget) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/publishers-by-target?target=${target}&miniBudget=${miniBudget}`, {
      method: 'GET'
    })
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

export const uploadCampaignfile = async (payload) => {
  try {
    const { data } = await axiosFetcher('/campaigns/upload-file',
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
