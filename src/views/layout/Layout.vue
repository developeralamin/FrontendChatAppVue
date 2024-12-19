<template>
  <a-layout>
    <a-layout class="full-layout-area">
      <!-- Main Content -->
      <a-layout class="main-content">
        <Header />
        <a-layout-content>
          <router-view :key="$route.fullPath"></router-view>
        </a-layout-content>

        <!-- <Footer /> -->
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Header from "@/views/layout/Header.vue";

</script>
