<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line vue/no-setup-props-destructure
const { question, onDelete } = defineProps<{
  question: {
    id: number
    items: Array<{
      id: number
      label: string
      course: string
    }>
  }
  onDelete: (id: number) => void
}>()

const items = ref(question.items)

// const handleDelete = (id: number) => {
//   items.value = items.value.filter(({ id: _id }) => _id !== id)
//   onDelete(id)
// }

const handleAddItem = () => {
  items.value = [
    ...items.value,
    {
      id: items.value.length + 1,
      course: '',
      label: ''
    }
  ]
}
</script>

<template>
  <div class="w-full h-fit p-5 bg-[#F5F5F5] border-[1px] border-gray-400 rounded-md">
    <div class="w-full mb-6 flex flex-row items-center justify-center gap-10">
      <input
        class="w-fit flex-1 bg-[#F5F5F5] font-normal text-sm px-1 py-2 border-[1px] border-gray-400"
        type="text"
      />
      <button class="delete-button" @click="() => onDelete(question.id)">
        <font-awesome-icon class="w-fit text-red-600" icon="trash-can" />
      </button>
    </div>
    <div class="w-full flex flex-col gap-3">
      <!-- <QuestionItem
        :item="item"
        v-for="item in items"
        :on-delete="handleDelete"
      /> -->
    </div>
    <button
      class="add-button flex flex-row gap-3 mt-3 px-4 py-2 items-center justify-center text-[#007AC2] rounded-md hover:bg-[#2ea6eb] hover:text-white"
      @click="() => handleAddItem()"
    >
      <font-awesome-icon class="w-fit" icon="plus" />
      Adicionar opção
    </button>
  </div>
</template>
