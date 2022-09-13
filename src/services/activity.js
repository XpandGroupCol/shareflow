import { axiosFetcher } from './fetcher'

export const getActivity = async (page, user) => {
  try {
    const { data } = await axiosFetcher(`/activity?page=${page}&createBy=${user}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
