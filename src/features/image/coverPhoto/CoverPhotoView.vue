<script setup lang="ts">
import CCheckbox from '@/components/CCheckbox.vue'
import CInput from '@/components/CInput.vue'
import DetailLayout from '@/components/DetailLayout.vue'

import { ref } from 'vue'
import { CoverPhotoOptions, getAutoCompletePhoto } from './coverPhoto.feature'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation()

const grayscale = ref<boolean>(false)
const blur = ref<number>(0)

const { sendCommand } = useCommandToPenpot<CoverPhotoOptions>()

async function generateCoverPhoto() {
  sendCommand({
    eventType: 'image',
    handler: getAutoCompletePhoto,
    options: { blur: blur.value, grayscale: grayscale.value },
  })
}
</script>

<template>
  <DetailLayout>
    <template #default>
      <section class="flow gap_8">
        <CCheckbox :label="t('applyGrayscale')" v-model:modelValue="grayscale" />

        <CInput :label="t('applyBlur')" type="number" min="1" max="10" v-model:modelValue.number="blur" />
      </section>
    </template>
    <template #bottomSticky>
      <div class="flow gap_8">
        <button data-appearance="primary" @click="generateCoverPhoto">{{ t('apply') }}</button>
      </div>
    </template>
  </DetailLayout>
</template>
