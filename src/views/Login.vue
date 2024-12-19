<template>
  <div class="card-login">
    <div class="col-md-6 col-12">
      <div class="card p-4">
        <h3 class="text-center">Login</h3>
        <form @submit.prevent="onFinish">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="login.email"
              placeholder="Enter your email"
            />
            <div v-if="login.errors.email" class="text-danger">
              {{ login.errors.email[0] }}
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="login.password"
              placeholder="Enter your password"
            />
            <div v-if="login.errors.password" class="text-danger">
              {{ login.errors.password[0] }}
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Login</span>
          </button>
        </form>
      </div>

      <div class="text-center mt-3">
        <p>
          Don't have an account?
          <router-link :to="{ name: 'registration' }" class="text-decoration-none">
            Registration
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthenticateStore } from "@/stores/authenticate";
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const authenticate = useAuthenticateStore();
const router = useRouter();

const login = reactive({
  email: "",
  password: "",
  errors: {},
});

const loading = ref(false);

const onFinish = () => {
  loading.value = true;
  axios
    .post("login", login)
    .then((response) => {
      localStorage.setItem("token", response.data.data.token);
      authenticate.login(response.data.data.token);
      authenticate.setUser(response.data.data.user);
      loading.value = false;
       router.push({ name: 'onlineUser' }); 
    })
    .catch((error) => {
     if (error.response.status == "422") {
        login.errors = error.response.data.errors;
      }
      loading.value = false;
    });
};
</script>
