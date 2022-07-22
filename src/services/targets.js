import { axiosFetcher } from './fetcher'

export const getTagets = async (params) => {
  try {
    const { data } = await axiosFetcher(`/targets${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createTaget = async (payload) => {
  try {
    const { data } = await axiosFetcher('/targets',
      { method: 'POST', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateTaget = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/targets/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteTaget = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/targets/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
