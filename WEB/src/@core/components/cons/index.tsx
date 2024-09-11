import { ConstructionState } from 'src/views/construction/form/construction-interface'

export const createConsCode = (inputObject: ConstructionState): string => {
  // Function to get the type of construction
  const consType = (idLoaiCT: any): string => {
    switch (idLoaiCT) {
      case 4:
        return 'TD'
      case 5:
        return 'TL'
      case 6:
        return 'TB'
      case 7:
        return 'KTNDD'
      case 8:
        return 'TDNDD'
      case 9:
        return 'HNK'
      case 10:
        return 'TCN'
      case 11:
        return 'HTTL'
      case 12:
        return 'CLN'
      case 13:
        return 'NMN'
      case 16:
        return 'XT'
      case 17:
        return 'XT'
      case 18:
        return 'XT'
      case 19:
        return 'XT'
      case 20:
        return 'XT'
      case 21:
        return 'XT'
      case 22:
        return 'XT'
      default:
        return ''
    }
  }

  // Array of prefixes to remove
  const prefixesToRemove = ['NHAMAYTHUYDIEN', 'CONGTRINHTHUYDIEN', 'THUYDIEN', 'HOCHUANUOC', 'TRAMBOM', 'CTXT']

  // Convert and remove prefixes, diacritics, punctuation, and spaces
  const consNameWithoutPrefix = inputObject.tenCT?.toUpperCase() || ''

  const consNameWithoutPunctuation = consNameWithoutPrefix
    .replace(/[.,\s]/g, '')
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Include Đđ in the regular expression for diacritics
    .replace(/Đ/g, 'D') // Replace Đ with D

  // Create ConsCode by combining construction type and modified construction name
  const consCode = prefixesToRemove.reduce(
    (acc, prefix) => acc.replace(new RegExp(prefix, 'i'), ''),
    consType(inputObject?.idLoaiCT) + consNameWithoutPunctuation || ''
  )

  return consCode
}

export const createConsUser = (inputObject: ConstructionState): string => {
  // Function to get the type of construction
  const consType = (idLoaiCT: any): string => {
    switch (idLoaiCT) {
      case 4:
        return 'TD'
      case 5:
        return 'HCN'
      case 6:
        return 'TB'
      case 7:
        return 'KTNDD'
      case 8:
        return 'TDNDD'
      case 9:
        return 'HNK'
      case 10:
        return 'TCN'
      case 11:
        return 'HTTL'
      case 12:
        return 'CLN'
      case 13:
        return 'NMN'
      case 16:
        return 'XT'
      case 17:
        return 'XT'
      case 18:
        return 'XT'
      case 19:
        return 'XT'
      case 20:
        return 'XT'
      case 21:
        return 'XT'
      case 22:
        return 'XT'
      default:
        return ''
    }
  }

  // Array of prefixes to remove
  const prefixesToRemove = ['NHAMAYTHUYDIEN', 'CONGTRINHTHUYDIEN', 'THUYDIEN', 'HOCHUANUOC', 'TRAMBOM', 'CTXT']

  // Convert and remove prefixes, diacritics, punctuation, and spaces
  const consNameWithoutPrefix = inputObject.tenCT?.toLowerCase() || ''

  const consNameWithoutPunctuation = consNameWithoutPrefix
    .replace(/[.,\s]/g, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Include Đđ in the regular expression for diacritics
    .replace(/Đ/g, 'D') // Replace Đ with D

  // Create ConsCode by combining construction type and modified construction name
  const consCode = prefixesToRemove.reduce(
    (acc, prefix) => acc.replace(new RegExp(prefix.toLowerCase(), 'i'), ''),
    `${consType(inputObject?.idLoaiCT).toLowerCase()}.${consNameWithoutPunctuation}` || ''
  )

  return consCode
}
