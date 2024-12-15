<script setup lang="ts">
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { ref, useId, watch } from 'vue'
import { CountryCurrencyInfo, getCountryInfo } from '../services/restCountry.repository'
import { useDebounceFn } from '@vueuse/core'
import { useTranslation } from 'i18next-vue'

const model = defineModel<CountryCurrencyInfo>('modelValue')

const emits = defineEmits<{
  (e: 'update', value: CountryCurrencyInfo | null | undefined): void
}>()

const options = ref<CountryCurrencyInfo[]>([])

const country = ref<string>('')

const getCountryFn = useDebounceFn(async (countryName: string) => {
  try {
    options.value = await getCountryInfo(countryName)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    options.value = []
  }
}, 1200)

watch(country, () => {
  getCountryFn(country.value)
})

watch(model, () => {
  emits('update', model.value)
})

const { t } = useTranslation()

const idControl = useId()
</script>

<template>
  <Combobox v-model="model">
    <div class="form_control flow autocomplete">
      <label :for="idControl">{{ t('selectACountry') }}:</label>
      <ComboboxInput
        :id="idControl"
        class="text-input"
        autocomplete="off"
        @change="country = $event.target.value"
        :displayValue="option => (option as CountryCurrencyInfo).nameEs"
      />
      <ComboboxOptions class="autocomplete_list flow">
        <ComboboxOption v-for="option in options" :key="option.nameEn" :value="option" v-slot="{ active }">
          <li
            class="autocomplete_option p_4"
            :class="{
              active: active,
            }"
          >
            {{ option.nameEs }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<style lang="scss">
.autocomplete {
  position: relative;
}

.autocomplete_list {
  position: absolute;
  width: 100%;
  overflow-y: auto;
  max-height: 40dvh;
  border-radius: var(--radius-standard);
  background-color: var(--background-secondary);
  top: calc(100% + 0.5em);
  box-shadow: 0 0 2em -1em rgba($color: #000000, $alpha: 0.5);
}

.autocomplete_option {
  cursor: default;
  color: var(--foreground-secondary);
  &.active {
    color: var(--foreground-primary);
    background-color: var(--accent-tertiary);
  }
}
</style>
