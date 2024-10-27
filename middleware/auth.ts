import { useUser } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (ctx) => {
  const user = useSupabaseUser();
  const userData = useUser();

  if (!user.value) {
    return navigateTo("/login");
  }

  const theUser = await $fetch("/api/user", {
    headers: useRequestHeaders(["cookie"]),
  });

  userData.value = {
    id: theUser.id,
    email: theUser.email,
    firstName: theUser.first_name,
    lastName: theUser.last_name,
    role: theUser.role,
  };

  if (!user.value) {
    return navigateTo("/login");
  }
});
