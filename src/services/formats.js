import { axiosFetcher } from './fetcher'

export const getFormats = async (params) => {
  try {
    const { data } = await axiosFetcher(`/formats${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createFormat = async (payload) => {
  try {
    const { data } = await axiosFetcher('/formats',
      { method: 'POST', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateFormat = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/formats/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteFormat = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/formats/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
