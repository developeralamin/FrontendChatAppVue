<template>
  <div class="card-login">
    <div class="col-md-6 col-12">
      <div class="card p-4">
        <h3 class="text-center">Registration</h3>
        <form @submit.prevent="onFinish">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-control"
              v-model="registration.name"
              placeholder="Enter your name"
            />
            <div v-if="registration.errors.name" class="text-danger">
              {{ registration.errors.name[0] }}
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              name="email"
              v-model="registration.email"
              placeholder="Enter your email"
            />
            <div v-if="registration.errors.email" class="text-danger">
              {{ registration.errors.email[0] }}
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
               name="password"
              v-model="registration.password"
              placeholder="Enter your password"
            />
            <div v-if="registration.errors.password" class="text-danger">
              {{ registration.errors.password[0] }}
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password Confirmation</label>
            <input
              type="password"
              id="password"
              class="form-control"
              name="password_confirmation"
              v-model="registration.password_confirmation"
              placeholder="Enter your password"
            />
            <div v-if="registration.errors.password" class="text-danger">
              {{ registration.errors.password[0] }}
            </div>
          </div>

           <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Registration</span>
          </button>
        </form>
      </div>

      <div class="text-center mt-3">
        <p>
         Already have an account?
          <router-link :to="{ name: 'login' }" class="text-decoration-none">
            Login
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

const registration = reactive({
  name: "",
  email: "",
  password: "",
  errors: {},
});

const loading = ref(false);

const onFinish = () => {
  loading.value = true;
  axios
    .post("register", registration)
    .then((response) => {
      loading.value = false;
      if (response.data.status == "success") {
        alert(response.data.data)
        // notification.success({ message: response.data.data });
      }
      router.push("/login");
    })
    .catch((error) => {
      // notification.error({ message: error.response.data.message });
      registration.name = registration.name;
      registration.email = registration.email;
      registration.password = null;
      registration.password_confirmation = null;
      if (error.response.status == "422") {
        registration.errors = error.response.data.errors;
      }
      loading.value = false;
    });
};
</script>
