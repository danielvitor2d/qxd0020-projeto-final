<template>
  <div class="bg-[#FEFEFE] min-h-screen flex flex-col items-center justify-center">
    <div class="text-black text-4xl mb-6">
      <font-awesome-icon
        icon="fa-lock"
      /> Não autenticado
    </div>
    <div class="text-black text-xl text-center">
      Você precisa fazer login para acessar esta página. Clique abaixo para fazer login ou criar uma conta.
    </div>
    <div class="mt-8">
      <router-link to="/auth/login" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-xl mr-4">Login</router-link>
      <router-link to="/auth/registration" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-xl">Criar uma conta</router-link>
    </div>
  </div>
</template>