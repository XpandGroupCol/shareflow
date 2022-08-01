import * as yup from 'yup'

export const defaultValues = {
  name: '',
  lastName: ''
}

export const schema = yup.object({
  company: yup.string().required('El nombre de la empresa es requerido'),
  nit: yup.string().when({
    is: value => value.length > 0,
    then: yup.string().min(10, 'El Nit debe tener minimo 10 digitos').max(12, 'El Nit debe tener maximo 10 digitos')
  }),
  phonePrefixed: yup.string(),
  phone: yup.string().required('El telefono de la empresa es requerido'),
  address: yup.string().required('La dirección de la empresa es requerido'),
  companyEmail: yup.string().required('El correo corporativo de la empresa es requerido')
}).required()
