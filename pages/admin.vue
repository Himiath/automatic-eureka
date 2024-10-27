<script lang="ts" setup>
  definePageMeta({
    middleware: ["auth", "role-guard"],
  });
</script>
<template>
  <p>Only admins allowed!</p>
</template>
