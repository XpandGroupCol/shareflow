import { axiosFetcher } from './fetcher'

export const getPublishers = async (params) => {
  try {
    const { data } = await axiosFetcher(`/publishers${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deletePublisher = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/publishers/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCSVPublishers = async (params) => {
  try {
    const { data } = await axiosFetcher(`/publishers/download${params}`,
      { method: 'GET', responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.setAttribute('download', 'publishers.csv')
    link.href = url
    document.body.appendChild(link)
    link.click()
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
