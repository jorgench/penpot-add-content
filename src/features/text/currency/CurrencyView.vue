<script setup lang="ts">
import DetailLayout from '@/components/DetailLayout.vue'
import PreviewTexts from '@/components/PreviewTexts.vue'
import { computed, ref, watch } from 'vue'
import { currencyDefaultOption, CurrencyOptions, getCurrencyClean, getCurrencyValues } from './currency.feature'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import CRadio from '@/components/CRadio.vue'
import CountrySearch from './CountrySearch.vue'
import { CountryCurrencyInfo } from '../services/restCountry.repository'
import { option } from '@/utils/Option'
import { useTranslation } from 'i18next-vue'

const props = defineProps<{
  options?: CurrencyOptions
}>()

const { t } = useTranslation()

const currentOption = ref<CurrencyOptions>(props.options ?? currencyDefaultOption)
const isCommaSeparator = ref<boolean>(currentOption.value.decimalSeparator === ',')

watch(isCommaSeparator, newValue => {
  if (newValue) {
    currentOption.value.decimalSeparator = ','
    currentOption.value.thousandsSeparator = '.'
  } else {
    currentOption.value.decimalSeparator = '.'
    currentOption.value.thousandsSeparator = ','
  }
})

const currenciesOfCountry = ref<CountryCurrencyInfo['currencies']>([])

const selectedCurrency = ref<CountryCurrencyInfo['currencies'][0] | null>()

function updateCountry(newCountry: CountryCurrencyInfo | null | undefined) {
  option(newCountry).map(country => {
    currenciesOfCountry.value = country.currencies
    selectedCurrency.value = country.currencies[0]
  })
}

watch(selectedCurrency, n => {
  option(n).map(cur => {
    currentOption.value.currencySymbol = cur.symbol
    currentOption.value.currency = cur.name
  })
})

const previews = computed(() => {
  return getCurrencyClean(2, currentOption.value)
})

const { sendCommand } = useCommandToPenpot<CurrencyOptions>()
function generateCurrency() {
  sendCommand({
    eventType: 'text',
    handler: getCurrencyValues,
    options: currentOption.value,
  })
}
</script>

<template>
  <DetailLayout>
    <template #default>
      <section class="flow gap_8">
        <CountrySearch @update="updateCountry" />

        <div v-if="currenciesOfCountry.length" class="flow gap_4">
          <strong>Monedas:</strong>
          <CRadio
            v-for="currency in currenciesOfCountry"
            v-model="selectedCurrency"
            :key="currency.name"
            :value="currency"
            name="currency"
            :label="currency.name"
          />
        </div>

        <div class="flow gap_4">
          <strong>{{ t('separators') }}:</strong>
          <CRadio :label="t('commaToSeparateDecimal')" name="type" :value="true" v-model="isCommaSeparator" />
          <CRadio :label="t('pointToSeparateDecimal')" name="type" :value="false" v-model="isCommaSeparator" />
        </div>
      </section>
    </template>
    <template #bottomSticky>
      <div class="flow gap_8">
        <PreviewTexts :preview-texts="previews" />
        <button data-appearance="primary" @click="generateCurrency">{{ t('apply') }}</button>
      </div>
    </template>
  </DetailLayout>
</template>
