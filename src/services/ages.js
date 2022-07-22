import { axiosFetcher } from './fetcher'

export const getAges = async (params) => {
  try {
    const { data } = await axiosFetcher(`/ages${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createAge = async (payload) => {
  try {
    const { data } = await axiosFetcher('/ages',
      { method: 'POST', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateAge = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/ages/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteAge = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/ages/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
