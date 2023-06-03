<!-- eslint-disable -->
<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
    <div class="w-[30rem] bg-white rounded-xl shadow-xl p-10">
      <h1 class="text-4xl font-semibold text-gray-900 mb-8">Register</h1>
      <form class="space-y-6">
        <input
          v-model="values.nome"
          type="text"
          placeholder="Nome"
          class="bg-gray-200 text-gray-900 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors['nome'] }"
          v-validate="'required'"
        />
        <ErrorMessage class="text-red-500" name="nome" />

        <input
          v-model="values.email"
          type="email"
          placeholder="E-mail"
          class="bg-gray-200 text-gray-900 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors['email'] }"
          v-validate="'required|email'"
        />
        <ErrorMessage class="text-red-500" name="email" />

        <input
          v-model="values.birthDate"
          type="date"
          placeholder="Data de Nascimento"
          class="bg-gray-200 text-gray-900 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors['birthDate'] }"
          v-validate="'required'"
        />
        <ErrorMessage class="text-red-500" name="birthDate" />

        <input
          v-model="values.contato"
          type="text"
          placeholder="Contato"
          class="bg-gray-200 text-gray-900 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors['contato'] }"
          v-validate="'required'"
        />
        <ErrorMessage class="text-red-500" name="contato" />

        <input
          v-model="values.senha"
          type="password"
          placeholder="Senha"
          class="bg-gray-200 text-gray-900 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors['senha'] }"
          v-validate="'required'"
        />
        <ErrorMessage class="text-red-500" name="senha" />

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate';
  
  const { handleSubmit, values, errors } = useForm();
  const onSubmit = handleSubmit((values) => {
    // Handle form submission here
    console.log(values);
  });

</script>
