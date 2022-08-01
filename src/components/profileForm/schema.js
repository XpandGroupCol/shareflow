import * as yup from 'yup'

export const defaultValues = {
  email: '',
  name: '',
  lastName: '',
  company: '',
  nit: '',
  phonePrefixed: '',
  phone: '',
  address: '',
  companyEmail: '',
  rut: null,
  avatar: null
}

export const schema = yup.object({
  email: yup.string().required(),
  name: yup.string().required(),
  lastName: yup.string().required(),
  company: yup.string(),
  nit: yup.string().when({
    is: value => value.length > 0,
    then: yup.string().min(10, 'El Nit debe tener 10 digitos').max(10, 'El Nit debe tener 10 digitos')
  }),
  phonePrefixed: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  companyEmail: yup.string()
}).required()

export const adminDefaultValues = {
  email: '',
  name: '',
  lastName: '',
  password: '',
  role: ''
}

export const adminSchema = yup.object({
  email: yup.string().required('Correo electronico es requerido').email('Ingrese un correo electronico valido'),
  name: yup.string().required('Nombres es requerido'),
  lastName: yup.string().required('Apellidos es requerido'),
  password: yup.string().required('Contraseña es requerido'),
  role: yup.string().required('Rol es requerido')
}).required()
