<script setup lang="ts">
import { ref } from 'vue';
import Question from '../components/Question.vue';

const questions = ref([
  {
    id: 0,
    items: [
      {
        id: 0,
        label: 'a) Mussum Ipsum, cacilds vidis litro abertis.',
        course: 'CC',
      },
      {
        id: 1,
        label: 'b) Diuretics paradis num copo é motivis de denguis.',
        course: 'EC',
      },
      {
        id: 2,
        label: 'c) Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.',
        course: 'ES',
      },
    ],
  },
  {
    id: 1,
    items: [
      {
        id: 0,
        label: 'a) Nec orci ornare consequat. Praesent lacinia ultrices consectetur.',
        course: 'CC',
      },
      {
        id: 1,
        label: 'b) Sed non ipsum felis.',
        course: 'SI',
      },
      {
        id: 2,
        label: 'c) Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!',
        course: 'DD',
      },
    ],
  },
])

const handleDeleteQuestion = (id: number) => {
  questions.value = questions.value.filter(({ id: _id }) => _id !== id)
}

const handleAddQuestion = () => {
  questions.value = [
    ...questions.value,
    {
      id: questions.value.length + 1,
      items: []
    }
  ]
}

const handleSave = () => {
  
}
</script>

<template>
  <main class="w-full pb-10 flex flex-col items-center justify-start bg-[#F5F5F5]">
    <section class="w-1/2 px-16 mt-10 flex flex-col items-start justify-center gap-10">
      <div class="w-full flex flex-row items-center justify-between">
        <h1 class="font-sans text-xl font-bold text-black">
          Editar Teste Vocacional
        </h1>

        <button 
          @click="() => handleSave()"
          class="flex flex-row h-fit gap-3 mt-3 px-4 py-2 items-center justify-center text-white bg-[#007AC2] rounded-md hover:bg-[#0080ca]"
        >
          Salvar alterações
        </button>
      </div>

      <div class="w-full flex flex-col gap-6">
        <Question
          v-for="question of questions"
          :question="question"
          :on-delete="handleDeleteQuestion"
        />
      </div>

      <button 
        @click="() => handleAddQuestion()"
        class="flex flex-row gap-3 mt-3 px-4 py-2 items-center justify-center text-white bg-[#007AC2] rounded-md hover:bg-[#0080ca]"
      >
        <font-awesome-icon
          class="w-fit"
          icon="plus"
        />
        Nova pergunta
      </button>
    </section>
  </main>
</template>