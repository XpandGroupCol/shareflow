export const compareFiles = (publishers = [], files = []) => {
  const _publishers = publishers.filter((i) => Boolean(i?.imageUrl))
  const _files = files.filter((i) => Boolean(i?.imageUrl))

  console.log({ publishers, files })

  return _publishers.length === _files.length
}
