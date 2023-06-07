export default function deepCopyObject<T>(obj: T): T {
  const newObj: any = {}

  for (const key in obj) {
    const value = obj[key]

    if (typeof value === 'object' && value !== null) {
      newObj[key] = deepCopyObject(value)
    } else {
      newObj[key] = value
    }
  }

  return newObj
}
