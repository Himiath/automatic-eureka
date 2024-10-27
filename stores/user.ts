enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export const useUser = () => useState<User | null>("user", () => null);
