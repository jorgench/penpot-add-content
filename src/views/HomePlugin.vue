<script setup lang="ts">
import DetailLayout from '@/components/DetailLayout.vue'
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation()
</script>

<template>
  <DetailLayout>
    <template #default>
      <div class="flow gap_16 text_center">
        <h4 class="intro-header">PlaceHolder+</h4>
        <div class="intro-subtitle">{{ t('homeDescription') }}</div>

        <div class="features flow gap_4">
          <div class="flex gap_8">
            <div class="feature-icon">📋</div>
            <div>{{ t('homeFeature1') }}</div>
          </div>
          <div class="flex gap_8">
            <div class="feature-icon">💰</div>
            <div>{{ t('homeFeature2') }}</div>
          </div>
          <div class="flex gap_8">
            <div class="feature-icon">📷</div>
            <div>{{ t('homeFeature3') }}</div>
          </div>
        </div>
      </div>
    </template>
    <template #bottomSticky>
      <div class="flex gap_8">
        <button data-appearance="primary">{{ t('homeStart') }}</button>
        <button data-appearance="primary">{{ t('homeMoreInfo') }}</button>
      </div>
    </template>
  </DetailLayout>
</template>
