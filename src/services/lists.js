import { axiosFetcher } from './fetcher'

export const getLists = async () => {
  const lists = [
    axiosFetcher('/lists/locations', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/targets', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/sectors', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/ages', { method: 'GET' }).then(({ data }) => data?.data).catch(() => [])
  ]

  try {
    const [locations, targets, sectors, ages] = await Promise.allSettled(lists)

    return ({
      sectors: sectors?.value || [],
      targets: targets?.value || [],
      ages: ages?.value || [],
      locations: locations.value.slice(0, 10) || []
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
