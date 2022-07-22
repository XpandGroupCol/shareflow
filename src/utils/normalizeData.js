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
