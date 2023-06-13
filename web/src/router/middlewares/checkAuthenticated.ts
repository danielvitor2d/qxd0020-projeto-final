import { useAuthStore } from "@/stores/authStore";
import type { NavigationGuardNext } from "vue-router";

export function checkAuthenticated(_: any, __: any, next: NavigationGuardNext) {
  const authStore = useAuthStore()

  const isAuthenticated = authStore.isLogged

  if (!isAuthenticated) {
    next('/unauthenticated');
  } else {
    next();
  }
}
