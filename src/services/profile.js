import { axiosFetcher } from './fetcher'

export const getProfile = async () => {
  try {
    const { data } = await axiosFetcher('/users/me',
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateProfile = async (payload) => {
  try {
    const { data } = await axiosFetcher('/users/me',
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const changeProfilePassword = async (payload) => {
  try {
    const { data } = await axiosFetcher('/users/change-password',
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const uploadAvater = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/users/upload-avatar/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const uploadRut = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/users/upload-rut/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateCompany = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/users/update-company/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
