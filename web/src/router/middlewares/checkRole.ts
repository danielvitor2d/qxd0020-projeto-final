import { useAuthStore } from "@/stores/authStore";
import type { NavigationGuardNext } from "vue-router";

export function checkRole(_: any, __: any, next: NavigationGuardNext) {
  const authStore = useAuthStore()

  const isAuthenticated = authStore.isLogged
  const userRole = authStore.getRoles()

  if (isAuthenticated && userRole === 'admin') {
    next();
  } else {
    next('/unauthorized');
  }
}
