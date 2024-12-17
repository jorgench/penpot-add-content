<script setup lang="ts">
import CInput from '@/components/CInput.vue'
import DetailLayout from '@/components/DetailLayout.vue'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import { computed, ref } from 'vue'
import { getEmail, type EmailConfigOptions } from './email.feature'
import { option } from '@/utils/Option'
import PreviewTexts from '@/components/PreviewTexts.vue'
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation()

const { sendCommand } = useCommandToPenpot<EmailConfigOptions>()
const newDomain = ref<string>('')

const emailList = ['charlot.gonzales', 'mia.rodriguez']

const previews = computed<string[]>(() => {
  const optionalDomain = option(newDomain.value)
  return emailList.map(email => {
    return optionalDomain.map(e => `${email}@${e}`).getOrElse(`${email}@dummyjson.com`)
  })
})

function generateEmail() {
  sendCommand({
    eventType: 'text',
    handler: getEmail,
    options: {
      domain: newDomain.value,
    },
  })
}
</script>

<template>
  <DetailLayout>
    <template #default>
      <section class="flow gap_8">
        <CInput :label="t('domain')" v-model:modelValue="newDomain" />
      </section>
    </template>

    <template #bottomSticky>
      <div class="flow gap_8">
        <span>{{ t('dataFrom') }}<a href="https://dummyjson.com/" target="_blank">JSONDummy</a> </span>
        <PreviewTexts :preview-texts="previews" />
        <button data-appearance="primary" @click="generateEmail">{{ t('apply') }}</button>
      </div>
    </template>
  </DetailLayout>
</template>
