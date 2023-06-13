<template>
  <div class="bg-gray-100 rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ test.title }}</h2>
    <p class="text-gray-600 mb-4">{{ test.description }}</p>
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500">{{ test.numResponses || 0 }} respostas</span>
      <div>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
          @click="viewAnswers"
        >
          Minhas respostas
        </button>
        <button
          class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2"
          @click="answerTest"
        >
          Responder
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps({
  test: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const viewAnswers = () => {
  router.push({
    name: 'AnswersHistoryView',
    params: {
      id: props.test.id
    }
  })
}

const answerTest = () => {
  router.push(`test/${props.test.id}/answer-test`)
}
</script>
