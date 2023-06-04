<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold mb-8">Criar Teste</h1>
    <form class="w-[60rem]" @submit.prevent="createTest">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Título do Teste:</label>
        <input v-model="test.title" type="text" class="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500">
      </div>
      <div>
        <div v-for="(question, index) in test.questions" :key="index" class="mb-4">
          <div class="bg-gray-100 rounded-lg shadow-lg p-6">
            <div class="flex items-center mb-4">
              <input v-model="question.description" type="text" class="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500">
              <button @click="removeQuestion(index)" class="text-red-500 hover:text-red-600 ml-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-for="(item, itemIndex) in question.items" :key="itemIndex" class="flex items-center mb-2">
              <input v-model="item.text" type="text" class="w-3/4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500">
              <div class="relative w-1/4 ml-2">
                <select v-model="item.course" class="w-full appearance-none border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500">
                  <option value="" disabled selected>Selecione um curso</option>
                  <option v-for="course in courseOptions" :key="course.id" :value="course.id">{{ course.name }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <button @click="removeItem(index, itemIndex)" class="text-red-500 hover:text-red-600 ml-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <button @click="addItem(index)" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2">
              Adicionar Item
            </button>
          </div>
        </div>
        <button @click="addQuestion" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">
          Adicionar Pergunta
        </button>
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8">
        Criar Teste
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Course {
  id: number;
  name: string;
}

interface Item {
  text: string;
  course: number | null;
}

interface Question {
  description: string;
  items: Item[];
}

interface Test {
  title: string;
  questions: Question[];
}

const test = ref<Test>({
  title: '',
  questions: [
    {
      description: '',
      items: [
        { text: '', course: null },
      ],
    },
  ],
});

const courseOptions: Course[] = [
  { id: 1, name: 'Engenharia Civil' },
  { id: 2, name: 'Medicina' },
  { id: 3, name: 'Direito' },
  { id: 4, name: 'Administração' },
  { id: 5, name: 'Ciência da Computação' },
  // Add more course options as needed
];

const createTest = (): void => {
  // Perform actions to create the test
  console.log(test.value);
};

const addQuestion = (): void => {
  test.value.questions.push({
    description: '',
    items: [
      { text: '', course: null },
    ],
  });
};

const addItem = (questionIndex: number): void => {
  test.value.questions[questionIndex].items.push({ text: '', course: null });
};

const removeItem = (questionIndex: number, itemIndex: number): void => {
  test.value.questions[questionIndex].items.splice(itemIndex, 1);
};

const removeQuestion = (questionIndex: number): void => {
  test.value.questions.splice(questionIndex, 1);
};
</script>
