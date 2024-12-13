export interface CountryCurrencyInfo {
  currencies: CurrencyInfo[]
  nameEs: string
  nameEn: string
}

interface CurrencyInfo {
  symbol: string
  name: string
}

/* ----- */

export interface RestCountry {
  name: RestName
  currencies: Currencies
}

interface RestName {
  common: string
  official: string
  nativeName: RestNativeName
}

interface RestNativeName {
  [key: string]: RestTranslation
}

interface Currencies {
  [key: string]: RestCurrency
}

interface RestCurrency {
  name: string
  symbol: string
}

interface RestTranslation {
  official: string
  common: string
}

export async function getCountryInfo(nameToSeach: string): Promise<CountryCurrencyInfo[]> {
  const r = await fetch(`https://restcountries.com/v3.1/name/${nameToSeach}`)
  const json = (await r.json()) as RestCountry[]

  return json.map(countryInfo => {
    return {
      nameEn: countryInfo.name.common,
      nameEs: countryInfo.name.nativeName['spa'] ? countryInfo.name.nativeName['spa'].common : countryInfo.name.common,
      currencies: Object.keys(countryInfo.currencies).map(cur => {
        return {
          name: cur,
          symbol: countryInfo.currencies[cur].symbol,
        }
      }),
    }
  })
}
