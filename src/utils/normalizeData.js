import { SEX_LIST } from 'configs/lists'
import { format } from 'date-fns'

export const getAges = (ageRange = []) => {
  return ageRange.map(({ name }) => name).join(' / ')
}

export const getSex = (sex) => {
  return SEX_LIST.find(({ value }) => value === sex)?.label ?? ''
}

export const getFormatedNumber = (number) => number ? number?.toLocaleString() : ''

export const parseDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : ''

export const normalizeCampaign = ({ startDate, endDate, publishers, ...rest }) => ({
  ...rest,
  endDate: new Date(endDate),
  startDate: new Date(startDate),
  publishers: publishers?.map(({ publisherId, formatId, ...rest }) => ({ rowId: `${publisherId}-${formatId}`, publisherId, formatId, ...rest }))
})

export const equalAges = (arr1 = [], arr2 = []) => {
  console.log(arr1, arr2)
  if (arr1.length !== arr2.length) return false
  const _arr2 = arr2.map(({ value }) => value)
  return arr1.every(({ value }) => _arr2.includes(value))
}
