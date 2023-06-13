<template>
  <div class="bg-[#FEFEFE] min-h-screen flex flex-col items-center justify-center">
    <img class="w-[35rem] mb-8 animate-pulse" src="../assets/404.jpg" alt="404 Error" />
    <!-- <div class="text-black text-3xl mb-6">
      <font-awesome-icon
        icon="fa-exclamation-triangle"
      /> Erro 404
    </div> -->
    <div class="text-black text-lg text-center">
      Ops! A página que você está procurando não foi encontrada. Verifique o URL ou volte para a página inicial.
    </div>
    <div class="mt-8">
      <router-link to="/" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-xl">
        <i class="fas fa-home"></i> Ir para Página Inicial
      </router-link>
    </div>
  </div>
</template>
