<script setup lang="ts">
  const client = useSupabaseClient();
  const router = useRouter();
  const email = ref("");
  const password = ref("");
  const errorMsg = ref(null);

  async function signIn() {
    try {
      const { error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      router.push("/profile");
    } catch (error: any) {
      errorMsg.value = error.message ?? error;
    }
  }
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form
        @submit.prevent="signIn"
        class="space-y-6"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
