<template>
  <div class="card">
    <div class="card-header position-relative d-flex justify-content-between">
      <h6 class="fs-17 fw-semi-bold my-1">Table Data Master Item</h6>
      <addButton @item-created="getMasterItem" />
    </div>
    <div class="card-body bg-white">
      <div class="table-responsive">
        <table class="table table-bordered text-nowrap table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Company</th>
              <th scope="col">Code</th>
              <th scope="col">ItemGroup</th>
              <th scope="col">Is Active</th>
              <th scope="col">Balance</th>
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
              <td>{{ item.Label }}</td>
              <td>{{ item.CompanyName }}</td>
              <td>{{ item.Code }}</td>
              <td>{{ item.ItemGroupName }}</td>
              <td>{{ item.IsActive }}</td>
              <td>{{ item.BalanceAmount }}</td>
              <td>
                <button class="btn btn-danger" @click="deleteMasterItem(item.Oid)">
                  <i class="fa-solid fa-trash mt-1"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editProductModal"
                  @click="openEditModal(item)"
                >
                  <i class="fa-solid fa-edit mt-1"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <editModal :item="selectedItem" @item-updated="getMasterItem" />
</template>

<script>
import addButton from '@/components/modals/addProductModal.vue'
import editModal from '@/components/modals/editProductModal.vue'

import { getMasterItem, deleteMasterItem } from '@/services/masterItemService'

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
      getMasterItem().then((response) => {
        this.isLoading = false
        if (response.status === 200) {
          this.items = response.data.data
        } else {
          console.log(response.message)
        }
      })
    },
    openEditModal(item) {
      this.selectedItem = item
    },
    deleteMasterItem(id) {
      if (confirm('Are you sure to delete this item?')) {
        deleteMasterItem(id).then((response) => {
          if (response.status === 200) {
            alert('Item has been deleted')
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
