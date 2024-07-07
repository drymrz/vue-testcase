<template lang="">
  <div class="card bg-white mt-3">
    <div class="card-header d-flex justify-content-between">
      <h6 class="card-title mt-3">Details</h6>
      <addTransactionDetail @item-refresh="refreshData" />
    </div>
    <div class="card-body">
      <div class="spinner-border text-primary" role="status" v-if="isLoading">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="table-responsive" v-if="!isLoading">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th width="60%">Item</th>
              <th>Quantity</th>
              <th>Item Unit</th>
              <th width="20%">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="itemDetails.length === 0">
              <td colspan="5" class="text-center">No data available</td>
            </tr>
            <tr v-for="(item, index) in itemDetails" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.ItemName }}</td>
              <td>{{ parseInt(item.Quantity) }}</td>
              <td>{{ item.ItemUnitName }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editTransaction"
                  @click="openEditModal(item)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteItemDetail(item.Oid)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <editTransactionDetail :itemProps="selectedItem" @item-refresh="refreshData" />
</template>

<script>
import addTransactionDetail from '@/components/modals/addTransactionDetail.vue'
import editTransactionDetail from '@/components/modals/editTransactionDetail.vue'
import { deleteTransactionItemDetail } from '@/services/transactionStockService'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    addTransactionDetail,
    editTransactionDetail
  },
  data() {
    return {
      itemDetails: {},
      selectedItem: null,
      isLoading: true
    }
  },
  methods: {
    refreshData() {
      this.$emit('data-refresh')
    },
    openEditModal(item) {
      this.selectedItem = item
    },
    deleteItemDetail(id) {
      if (confirm('Are you sure to delete this item?')) {
        deleteTransactionItemDetail(id).then((response) => {
          if (response.status === 204) {
            alert('Item has been deleted')
            this.refreshData()
          } else {
            console.log(response.message)
          }
        })
      }
    }
  },
  watch: {
    item: {
      handler() {
        this.isLoading = false
        this.itemDetails = this.item.Details
      },
      deep: true
    }
  }
}
</script>
