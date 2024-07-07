<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <div
          class="mb-3"
          v-if="
            !$route.path.startsWith('/transaction/detail/') && !$route.path.startsWith('/login')
          "
        >
          <router-link class="btn btn-primary me-2" to="/masteritem/list">Master Item</router-link>
          <router-link class="btn btn-primary" to="/transaction/list">Transaction Item</router-link>
        </div>

        <RouterView />
      </div>
    </div>
  </div>
</template>
