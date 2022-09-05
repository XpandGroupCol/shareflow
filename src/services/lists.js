import { axiosFetcher } from './fetcher'

export const getLists = async () => {
  const lists = [
    axiosFetcher('/lists/targets', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/ages', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/sectors', { method: 'GET' }).then(({ data }) => data?.data).catch(() => [])
  ]

  try {
    const [targets, ages, sectors] = await Promise.allSettled(lists)

    return ({
      targets: targets?.value || [],
      ages: ages?.value || [],
      sectors: sectors?.value || []
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getLocations = async (search) => {
  try {
    const { data } = await axiosFetcher(`/lists/locations?search=${search}`,
      { method: 'GET' })
    return data
  } catch (err) {
    return []
  }
}
