<script setup lang="ts">
import { ref } from 'vue'

export type TabInfo = {
  name: string
  label: string
}

const { tabs } = defineProps<{
  tabs: TabInfo[]
}>()

const emit = defineEmits<{
  (e: 'change', name: string): void
}>()

const tabSelected = ref(tabs[0] ? tabs[0].name : '')

function selectOtherTab(option: TabInfo) {
  tabSelected.value = option.name
  emit('change', option.name)
}
</script>

<template>
  <nav class="main_tab_switcher">
    <ul class="main_tab_switcher__tab_list" role="tablist" aria-orientation="horizontal">
      <li v-for="tabOption in tabs" :key="tabOption.name">
        <button
          :class="['main_tab_switcher__tab', { main_tab_switcher__tab__selected: tabOption.name === tabSelected }]"
          role="tab"
          aria-selected="false"
          :title="tabOption.label"
          :data-id="tabOption.name"
          :id="tabOption.label"
          @click="selectOtherTab(tabOption)"
        >
          <span
            :class="[
              'main_tab_switcher__tab_text',
              { main_ui_ds_layout_tab_switcher__selected: tabOption.name === tabSelected },
            ]"
            >{{ tabOption.label }}</span
          >
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.main_tab_switcher {
  --switcher-surface: var(--background-secondary);
  --switcher-color: var(--foreground-secondary);
  --switcher-active-color: var(---foreground-primary);
  --switcher-item-selected-color: var(--accent-tertiary);
  --switcher-item-selected-surface: var(--background-tertiary);

  &__tab_list {
    display: grid;
    grid-auto-flow: column;
    gap: var(--spacing-4);
    width: 100%;
    margin-block-end: 0;
    border-radius: var(--radius-standard);
    background-color: var(--switcher-surface);

    & > li {
      width: 100%;
      line-height: 1.33;
    }
  }

  &__tab_text {
    text-overflow: ellipsis;
    font-weight: 500;
    width: 100%;
  }

  &__tab {
    background-color: var(--switcher-surface);
    color: var(--switcher-color);
    width: 100%;
    transition: color 0.25s ease-in-out;

    &:hover {
      color: var(--switcher-active-color);
    }
  }

  &__tab__selected {
    background-color: var(--switcher-item-selected-surface);
    color: var(--switcher-item-selected-color);

    &:hover {
      color: var(--switcher-item-selected-color);
      cursor: unset;
    }
  }
}
</style>
