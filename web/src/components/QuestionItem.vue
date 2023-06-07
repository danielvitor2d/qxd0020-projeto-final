<script setup lang="ts">
defineProps<{
  item: {
    id: number
    label: string
    course: string
  }
  onDelete: (id: number) => void
}>()
</script>

<template>
  <div class="w-full flex flex-row items-center justify-between">
    <p class="flex-1">{{ item.label }}</p>
    <p class="mr-4">{{ item.course }}</p>
    <button @click="() => onDelete(item.id)">
      <font-awesome-icon icon="fa-xmark" />
    </button>
  </div>
</template>
