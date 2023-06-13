<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-gray-300 rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 14.5a.5.5 0 01-.5-.5v-5a.5.5 0 011 0v5a.5.5 0 01-.5.5z" fill="#fff" />
    </svg>
    <p :class="primary ? 'text-gray-500 text-lg font-semibold mb-2' : 'text-white text-lg font-semibold mb-2'">Dados vazios</p>
    <p :class="primary ? 'text-gray-400' : 'text-white'">Não há informações disponíveis no momento.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  primary?: boolean
}>()
</script>