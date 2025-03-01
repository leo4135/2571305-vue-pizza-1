import { useAuthStore } from "@/stores/authStore";

export const isLoggedIn = ({ to }) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return { path: "/login", query: { redirect: to.fullPath } };
  } else {
    return true;
  }
};
