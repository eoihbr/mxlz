<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login');
  }
});
</script>

<style scoped>
</style>
