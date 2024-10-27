import { useUser } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();

  // Check if the user is authenticated
  if (!user.value) {
    return navigateTo("/login");
  }
  enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
  }

  // Define the roles required for each route
  const routeRoles: { [key: string]: Role[] } = {
    "/admin": [Role.ADMIN],
  };

  // Get the required roles for the current route
  const requiredRoles: Role[] = routeRoles[to.path] || [];

  // Check if the user's role is in the required roles
  if (!requiredRoles.includes(user.value.role)) {
    return navigateTo("/unauthorized");
  }
});
