import { IVA } from 'configs'
import { DEVICE, SEX_LIST } from 'configs/lists'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const getAges = (ageRange = []) => {
  return ageRange.map(({ name }) => name).join(' / ')
}

export const getSex = (sex) => {
  return SEX_LIST.find(({ value }) => value === sex)?.label ?? ''
}

export const getFormatedNumber = (number) => number ? number?.toLocaleString() : number

export const normalizeCampaign = ({ startDate, endDate, publishers, ...rest }) => ({
  ...rest,
  endDate: new Date(endDate),
  startDate: new Date(startDate),
  publishers: publishers?.map(({ publisherId, formatId, ...rest }) => ({ rowId: `${publisherId}-${formatId}`, publisherId, formatId, ...rest }))
})

export const equalAges = (arr1 = [], arr2 = []) => {
  if (arr1.length !== arr2.length) return false
  const _arr2 = arr2.map(({ value }) => value)
  return arr1.every(({ value }) => _arr2.includes(value))
}

export const getDevice = (id) => DEVICE[id] || ''

export const getTotal = (amount) => {
  if (typeof amount !== 'number') return { iva: 0, total: 0 }
  const iva = (IVA * amount) / 100

  return {
    iva,
    total: iva + amount
  }
}

export const parseDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : ''

export const parseUTCDate = (date, dateFormat = 'DD/MM/YYYY') => date ? dayjs(new Date(date)).utc().local().format(dateFormat) : ''

export const getUserInitValues = ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  checkRut,
  rut,
  _id
}) => ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  checkRut,
  rut,
  _id
})
