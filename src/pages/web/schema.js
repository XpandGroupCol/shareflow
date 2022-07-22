import * as yup from 'yup'

export const invitationValues = {
  name: '',
  email: '',
  phone: '',
  lastName: ''
}

export const invitationSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido.'),
  lastName: yup.string().required('El apellido es requerido.'),
  email: yup.string().email('Ingrese un correo electrónico valido.').required('El correo electrónico es requerido.'),
  phone: yup.string().required('El whatsapp es requerido.').min(10, 'El whatsapp debe tener 10 digitos.').max(14, 'El whatsapp debe tener 10 digitos.')
}).required()
