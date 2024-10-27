<script setup lang="ts">
  const email = ref("");
  const password = ref("");
  const errorMsg = ref("");
  const successMsg = ref("");

  async function signUp() {
    try {
      const { error, data } = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      }).then((res) => res.json());
      if (error) throw error;
      successMsg.value =
        "Sign up successful! Please check your email to verify your account.";
    } catch (error: any) {
      errorMsg.value = error.message ?? error;
    }
  }
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <h1 class="text-3xl font-bold mb-6">Register</h1>
      <form
        @submit.prevent="signUp"
        class="space-y-4"
      >
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Sign Up
        </button>
      </form>
      <div
        v-if="errorMsg"
        class="mt-4 text-red-600"
      >
        {{ errorMsg }}
      </div>
      <div
        v-if="successMsg"
        class="mt-4 text-green-600"
      >
        {{ successMsg }}
      </div>
    </div>
  </div>
</template>
