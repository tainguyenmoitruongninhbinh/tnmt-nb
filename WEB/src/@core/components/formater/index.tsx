// Exporting functions as named exports
export const formatNum = (num: number): string => {
  if (num != null) {
    return num.toLocaleString('en-US')
  }

  return ''
}

export const formatDate = (d: any): string => {
  if (d != null) {
    const date = new Date(d)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  return ''
}
