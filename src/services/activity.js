import { axiosFetcher } from './fetcher'

export const getActivity = async (page) => {
  try {
    const { data } = await axiosFetcher(`/activity?page=${page}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
