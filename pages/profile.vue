<script lang="ts" setup>
  import { useUser } from "~/stores/user";

  definePageMeta({
    middleware: ["auth"],
  });
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const router = useRouter();
  const userData = useUser();

  if (!userData) {
    router.push("/");
  }

  async function logout() {
    try {
      const { error } = await client.auth.signOut();

      if (error) throw error;
      router.push("/");
    } catch (error: any) {
      console.error("Sign out error", error.message ?? error);
    }
  }

  const isAdmin = computed(() => userData.value?.role === "ADMIN");

  function getInitials(name: string) {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  }
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
  >
    <div class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
      <div
        class="bg-cover bg-center h-56"
        style="
          background-image: url('https://source.unsplash.com/random/1600x900');
        "
      >
        <div
          class="h-full w-full flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            class="bg-white rounded-full h-24 w-24 flex items-center justify-center text-2xl font-bold text-gray-700"
          >
            {{ getInitials(userData?.firstName + " " + userData?.lastName) }}
          </div>
        </div>
      </div>
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">
          Welcome to your profile, {{ userData?.firstName }}
        </h1>
        <p class="text-gray-700 mb-4"><b>Email:</b> {{ user?.email }}</p>
        <p class="text-gray-700 mb-4"><b>Role:</b> {{ userData?.role }}</p>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        <button
          @click="$router.push('/admin')"
          class="ml-2"
          :class="{
            'bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600':
              isAdmin,
            'bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed':
              !isAdmin,
          }"
          :disabled="!isAdmin"
        >
          To Admin page
        </button>
      </div>
    </div>
  </div>
</template>
