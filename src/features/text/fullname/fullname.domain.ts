export type FullNameRepository = (count: number) => Promise<{ name: string; lastName: string }[]>
export type NameRepository = (count: number) => Promise<string[]>
export type LastNameRepository = (count: number) => Promise<string[]>
export type AddressRepository = (count: number) => Promise<string[]>
export type EmailRepository = (count: number) => Promise<string[]>
export type DateRepository = (count: number) => Promise<string[]>
export type HourRepository = (count: number) => Promise<string[]>
