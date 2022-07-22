import { axiosFetcher } from './fetcher'

export const createInvitation = async (payload) => {
  try {
    const { data } = await axiosFetcher('/invitation',
      { method: 'POST', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
