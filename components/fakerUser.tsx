// fakeUsers.ts
export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // ⚠️ solo para demo, nunca guardes contraseñas así en producción
};

export const fakeUsers: User[] = [
  {
    id: "1",
    name: "Carlos Pérez",
    email: "carlos@test.com",
    password: "1234",
  },
  {
    id: "2",
    name: "Lucía Gómez",
    email: "lucia@test.com",
    password: "abcd",
  },
];
