import { useNotify } from 'hooks/useNotify'
import { useCallback, useState } from 'react'
import { validatorFile } from 'services/campaigns'

const emptyMedia = { name: '', url: '' }

const useValidatorFile = (initValues = []) => {
  const [files, setFiles] = useState(() => [...initValues])
  const notify = useNotify()

  const validator = useCallback(async (index, payload) => {
    try {
      setFiles(prev => {
        const files = [...prev]
        const currentFile = files[index]

        if (currentFile) {
          currentFile.loading = true
          currentFile.media = emptyMedia
        }
        return files
      })
      const { data } = await validatorFile(payload)
      const [file = {}] = data
      setFiles(prev => {
        const files = [...prev]
        const currentFile = files[index]
        if (currentFile) {
          currentFile.loading = false
          currentFile.media = file
        }
        return files
      })

      notify.success('El archivo ha sido cargado correctamente')
    } catch ({ response }) {
      const message = response?.data?.message

      setFiles(prev => {
        const files = [...prev]
        const currentFile = files[index]
        if (currentFile) {
          currentFile.loading = false
          currentFile.media = emptyMedia
        }
        return files
      })

      notify.error(message && message === 'The dimensions sent are not allowed'
        ? 'Las dimensiones del archivo no son validas.'
        : 'Verifique las dimension y formato del archivo')
    }
  }, [notify])

  const removeFile = useCallback((index) => {
    setFiles(prev => {
      const files = [...prev]
      const currentFile = files[index]
      if (currentFile) {
        currentFile.loading = false
        currentFile.media = emptyMedia
      }
      return files
    })
  }, [])

  return {
    validator,
    files,
    setFiles,
    removeFile
  }
}

export default useValidatorFile
