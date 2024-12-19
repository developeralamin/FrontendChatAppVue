<template>
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <div class="container">
      <!-- Sidebar Toggle (Topbar) -->
      <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
        <i class="fa fa-bars"></i>
      </button>

      <!-- Home Section -->
      <div class="navbar-brand ml-3 font-weight-bold">
        Home
      </div>

      <!-- Topbar Navbar -->
      <ul class="navbar-nav profile-bar">
        <div class="topbar-divider d-none d-sm-block"></div>

        <!-- Nav Item - User Information -->
        <li class="nav-item dropdown no-arrow">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            @click="toggleDropdown"
            :aria-expanded="isDropdownOpen"
          >
            <span class="mr-2 d-none d-lg-inline text-gray-600 small">
              {{ authenticate.user?.name || "Guest" }}
            </span>
          </a>
          <!-- Dropdown - User Information -->
          <div
            class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            :class="{ show: isDropdownOpen }"
            aria-labelledby="userDropdown"
          >
            <a class="dropdown-item" href="#">
              <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="logout">
              <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useAuthenticateStore } from "@/stores/authenticate";
import { ref ,onBeforeMount} from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authenticate = useAuthenticateStore();

const logout = () => {
  authenticate.logout();
  router.push({ name: "login" });
};



/**
 * Check if user is logged in
 * @type {Array}
 */
onBeforeMount(() => {
  axios
    .get("auth-user")
    .then((response) => {
      if (response.status == 401) {
        logout();
      }
    })
    .catch((error) => {
      console.log(error);
      logout();
    });
});

/**
 * Profile dropdown
 */
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>
