<template>
  <div class="relative">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="showDialog = true"
    >
      Open Dialog
    </button>
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      v-if="showDialog"
    >
      <div class="bg-white rounded-lg p-8">
        <p class="mb-4">{{ message }}</p>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          @click="confirm"
        >
          Yes
        </button>
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          @click="showDialog = false"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const showDialog = ref(false);
  const message = ref('Click the button to open the dialog');

  function confirm() {
    message.value = 'Confirmed!';
    showDialog.value = false;
    // Do something else, like deleting a record or navigating to a new page
  }
</script>
