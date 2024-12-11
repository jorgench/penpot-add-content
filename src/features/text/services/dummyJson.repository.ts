import { EmailRepository, FullNameRepository, LastNameRepository, NameRepository } from '../fullname/fullname.domain'

export interface UsersDummyJson {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  ip: string
  address: Address
  macAddress: string
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto
  role: string
}

export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates
  country: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address
}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}

export interface Hair {
  color: string
  type: string
}

function getRandomPositionsToUse(size: number) {
  console.log(size)
  const totalUsersInApi = 208
  const limitMax = totalUsersInApi - size
  const skip = Math.round(Math.random() * limitMax)

  return {
    size,
    skip,
  }
}

async function getDataFromApi({ size, skip, select }: { size: number; skip: number; select: string }) {
  const r = await fetch(`https://dummyjson.com/users?limit=${size}&skip=${skip}&select=${select}`)
  return (await r.json()) as UsersDummyJson
}

export const fullNameRepository: FullNameRepository = async (opt: number) => {
  const { size, skip } = getRandomPositionsToUse(opt)
  const json = await getDataFromApi({ size, skip, select: 'firstName,lastName' })
  return json.users.map(r => ({
    name: r.firstName,
    lastName: r.lastName,
  }))
}

export const nameRepository: NameRepository = async (opt: number) => {
  const { size, skip } = getRandomPositionsToUse(opt)
  const json = await getDataFromApi({ size, skip, select: 'firstName' })
  return json.users.map(r => r.firstName)
}

export const lastNameRepository: LastNameRepository = async (opt: number) => {
  const { size, skip } = getRandomPositionsToUse(opt)
  const json = await getDataFromApi({ size, skip, select: 'lastName' })
  return json.users.map(r => r.lastName)
}

export const emailRepository: EmailRepository = async (opt: number) => {
  const { size, skip } = getRandomPositionsToUse(opt)
  const json = await getDataFromApi({ size, skip, select: 'email' })
  return json.users.map(r => r.email)
}
