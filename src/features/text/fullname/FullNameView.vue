<script setup lang="ts">
import PreviewTexts from '@/components/PreviewTexts.vue'
import { FullNameOptions, getFullName } from './fullname.feature'
import { computed } from 'vue'
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import DetailLayout from '@/components/DetailLayout.vue'
import CCheckbox from '@/components/CCheckbox.vue'
import useCommandToPenpot from '@/compose/useCommandToPenpot'

interface InnerOptions {
  option: FullNameOptions['elementOrder'][0]
  active: boolean
}

const { sendCommand } = useCommandToPenpot<FullNameOptions>()

const [parentDrop, itemOrder] = useDragAndDrop<InnerOptions>([
  {
    option: 'name',
    active: true,
  },
  {
    option: 'lastName',
    active: true,
  },
  {
    option: ',',
    active: false,
  },
])

const activeItems = computed(() => itemOrder.value.filter(item => item.active))

const previewNames = computed<string[]>(() => {
  return fullNames.map(fullName => {
    return activeItems.value
      .map(item => {
        if (item.option === 'name') {
          return fullName.name
        } else if (item.option === 'lastName') {
          return fullName.lastName
        } else {
          return item.option
        }
      })
      .join(' ')
  })
})

const fullNames = [
  {
    name: 'José',
    lastName: 'Arrollo',
  },
  {
    name: 'Mateo',
    lastName: 'Lewis',
  },
]

function generateFullNameOptions() {
  return {
    elementOrder: activeItems.value.map(i => i.option),
  }
}

async function generateFullName() {
  await sendCommand({
    options: generateFullNameOptions(),
    eventType: 'text',
    handler: getFullName,
  })
}
</script>

<template>
  <DetailLayout>
    <template #default>
      <section class="flow gap_8">
        <strong>Orden de elementos:</strong>

        <ul ref="parentDrop">
          <li v-for="item in itemOrder" :key="item.option">
            <CCheckbox :label="item.option" v-model="item.active" />
          </li>
        </ul>
      </section>
    </template>
    <template #bottomSticky>
      <div class="flow gap_8">
        <PreviewTexts :preview-texts="previewNames" />
        <button data-appearance="primary" @click="generateFullName">Aplicar</button>
      </div>
    </template>
  </DetailLayout>
</template>
