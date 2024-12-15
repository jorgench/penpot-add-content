<script setup lang="ts">
import DetailLayout from '@/components/DetailLayout.vue'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import { getUserStaticProfile, ProfilePhotoOptions } from './profilePhoto.feature'
import { ref } from 'vue'
import CRadio from '@/components/CRadio.vue'
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation()

const { sendCommand } = useCommandToPenpot<ProfilePhotoOptions>()

const sex = ref<ProfilePhotoOptions['sex']>('neutral')

const options: ProfilePhotoOptions['sex'][] = ['neutral', 'female', 'male']

async function generateProfilePhoto() {
  await sendCommand({
    handler: getUserStaticProfile,
    eventType: 'image',
    options: { sex: sex.value },
  })
}
</script>

<template>
  <DetailLayout>
    <template #default>
      <section class="flow gap_8">
        <ul class="flow gap_8">
          <li v-for="option in options" :key="option">
            <CRadio :label="t(option)" :value="option" :name="option" v-model="sex" />
          </li>
        </ul>
      </section>
    </template>
    <template #bottomSticky>
      <div class="flow gap_8">
        <button data-appearance="primary" @click="generateProfilePhoto">{{ t('apply') }}</button>
      </div>
    </template>
  </DetailLayout>
</template>
