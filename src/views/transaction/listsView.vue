<template>
  <div class="card">
    <div class="card-header position-relative d-flex justify-content-between">
      <h6 class="fs-17 fw-semi-bold my-1">Table Data Transaction Stock</h6>
      <addButton @item-created="getMasterItem" />
    </div>
    <div class="card-body bg-white">
      <div class="table-responsive">
        <table class="table table-bordered text-nowrap table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Company</th>
              <th scope="col">Code</th>
              <th scope="col">Date</th>
              <th scope="col">Account</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <div class="spinner-border text-primary" role="status" v-if="isLoading">
            <span class="sr-only">Loading...</span>
          </div>
          <tbody v-if="!isLoading">
            <tr v-for="(item, index) in items" :key="index">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>{{ item.CompanyName }}</td>
              <td>{{ item.Code }}</td>
              <td>{{ new Date(item.Date).toLocaleDateString('id-ID') }}</td>
              <td>{{ item.AccountName }}</td>
              <td>{{ item.StatusName }}</td>
              <td>
                <button class="btn btn-danger" @click="deleteTransactionItem(item.Oid)">
                  <i class="fa-solid fa-trash mt-1"></i>
                </button>
                <router-link
                  class="btn btn-primary"
                  :to="`/transaction/detail/item/${item.Oid}`"
                  target="_blank"
                >
                  <i class="fa-solid fa-edit mt-1"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <editModal :item="selectedItem" />
</template>

<script>
import addButton from '@/components/modals/addTransactionParent.vue'
import editModal from '@/components/modals/editProductModal.vue'

import { getTransactionItem, deleteTransactionItem } from '@/services/transactionStockService'

export default {
  data() {
    return {
      isLoading: false,
      items: [],
      selectedItem: null
    }
  },
  async mounted() {
    this.getMasterItem()
  },
  methods: {
    getMasterItem() {
      this.isLoading = true
      getTransactionItem().then((response) => {
        this.isLoading = false
        if (response.status === 200) {
          this.items = response.data.data
        } else {
          console.log(response.message)
        }
      })
    },
    deleteTransactionItem(id) {
      if (confirm('Are you sure to delete this item?')) {
        deleteTransactionItem(id).then((response) => {
          if (response.status === 204) {
            alert('Data has been deleted')
            this.getMasterItem()
          } else {
            console.log(response.message)
          }
        })
      }
    }
  },
  components: {
    addButton,
    editModal
  }
}
</script>
