<template>
  <div class="app_layout">
    <AppHeader />
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.app_layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
