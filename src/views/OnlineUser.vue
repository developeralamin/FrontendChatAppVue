<template>
  <div class="online-users-container">
    <h1 class="title">Online Users</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="user-grid">
      <div class="user-card" v-for="user in users" :key="user.email">
        <MessageOutlined class="user-icon" />
        <span class="user-email">{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { MessageOutlined } from "@ant-design/icons-vue";

const loading = ref(true);
const users = ref([]);

onMounted(() => {
  axios
    .get("message/online-users")
    .then((response) => {
      users.value = response.data.users;
      loading.value = false;
    })
    .catch((error) => {
      console.error("Error fetching online users:", error);
      loading.value = false;
    });
});
</script>


