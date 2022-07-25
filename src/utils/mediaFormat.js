export const compareFiles = (publishers = [], files = []) => {
  const _publishers = publishers.filter(({ media }) => Boolean(media?.url))
  const _files = files.filter(({ media }) => Boolean(media?.url))

  return _publishers.length === _files.length
}
