<script setup lang="ts">
  const route = useRoute();
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const signOut = async () => {
    await client.auth.signOut();
    user.value = null;
  };
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <h1 class="text-3xl font-bold mb-6">Welcome to Our App!</h1>
      <p class="mb-6">Current route: {{ route.path }}</p>
      <div v-if="user">
        <p class="mb-4">Hello, {{ user.email }}</p>
        <a
          href="/profile"
          class="text-indigo-600 hover:underline"
          >Go to your profile</a
        >
        <button
          @click="signOut"
          class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Out
        </button>
      </div>
      <div v-else>
        <a
          href="/login"
          class="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
        >
          Log In
        </a>
        <a
          href="/register"
          class="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Register
        </a>
      </div>
    </div>
  </div>
</template>
