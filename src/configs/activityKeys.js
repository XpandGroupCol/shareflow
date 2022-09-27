import { getFormatedNumber, getSex, getTotal, parseDate } from 'utils/normalizeData'

export const ACTIVITY_KEYS = {
  brand: 'Marca',
  name: 'Nombre',
  startDate: 'Fecha Inicio',
  endDate: 'Fecha Final',
  target: '',
  sector: 'Sector economico',
  locations: 'Ubicaciones',
  ages: 'Edades',
  url: 'Url',
  amount: 'Valor',
  status: 'Estado',
  user: 'Usuario',
  publishers: 'Medios',
  sex: 'Sexo',
  payments: 'Pagos',
  isDelete: 'Eliminado',
  createdAt: 'Fecha de creación',
  updatedAt: 'Fecha de actualización',
  formatId: '',
  publisherId: '',
  publisher: 'Medio',
  objectiveGoal: 'Objetivo Global',
  pricePerUnit: 'Precio por Unidad',
  biddingModel: 'Modelo de compra',
  device: 'Dispositvo',
  label: 'Medio',
  publisherCategory: 'Categoria',
  share: '% de implementación',
  value: 'Valor',
  media: 'Archivo',
  logo: 'Logo',
  width: 'Ancho',
  height: 'Alto',
  isVideo: 'Es video',
  _id: '',
  summary: 'Resumen de compra',
  prints: 'Impresiones',
  clicks: 'Clicks',
  medium: 'Medios',
  platform: 'Plataformas',
  miniBudget: 'Inversion minima',
  currency: 'Moneda',
  discount: 'Descuento',
  grossValue: 'Valor bruto a invertir',
  serviceFee: 'Tarifa de servicio',
  userPercentage: 'Porcetaje de usuario'
}

export const ACTIVITY_VALUES = (prop, value) => {
  if (prop === 'startDate' || prop === 'endDate') return parseDate(value)

  if (prop === 'isVideo') return value ? 'Si' : 'No'

  if (prop === 'sex') return getSex(value) || value

  if (prop === 'prints' || prop === 'clicks' || prop === 'medium' || prop === 'objectiveGoal') return getFormatedNumber(+value)

  if (prop === 'amount') return `$${getFormatedNumber(getTotal(+value)?.total) || 0}`

  if (prop === 'publisherCategory') return value === 'medium' ? 'Medio' : 'Plataforma'

  if (prop === 'value' || prop === 'pricePerUnit') return `$${getFormatedNumber(+value) || 0}`

  return value
}
