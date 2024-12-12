<script setup lang="ts">
import DetailLayout from '@/components/DetailLayout.vue'
import useCommandToPenpot from '@/compose/useCommandToPenpot'
import { getUserStaticProfile, ProfilePhotoOptions } from './profilePhoto.feature'
import { ref } from 'vue'

const { sendCommand } = useCommandToPenpot<ProfilePhotoOptions>()

const sex = ref<ProfilePhotoOptions['sex']>('neutral')

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
      <section class="flow gap_8"></section>
    </template>
    <template #bottomSticky>
      <button data-appearance="primary" @click="generateProfilePhoto">Aplicar</button>
    </template>
  </DetailLayout>
</template>
