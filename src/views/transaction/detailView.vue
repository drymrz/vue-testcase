<template>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        class="nav-link active"
        id="nav-home-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-home"
        type="button"
        role="tab"
        aria-controls="nav-home"
        aria-selected="true"
      >
        Main
      </button>
      <button
        class="nav-link"
        id="nav-profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-profile"
        type="button"
        role="tab"
        aria-controls="nav-profile"
        aria-selected="false"
      >
        Details
      </button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div
      class="tab-pane fade show active"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <mainItemTransaction :item="item" />
    </div>
    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
      <detailItemTransaction :item="item" @data-refresh="getTransactionItemById" />
    </div>
  </div>
</template>
<script>
import { getTransactionItemById } from '@/services/transactionStockService'
import mainItemTransaction from '@/components/transaction/mainItemTransaction.vue'
import detailItemTransaction from '@/components/transaction/detailItemTransaction.vue'
export default {
  data() {
    return {
      item: {}
    }
  },
  mounted() {
    this.getTransactionItemById()
  },
  methods: {
    getTransactionItemById() {
      getTransactionItemById(this.$route.params.Oid).then((response) => {
        if (response.status === 200) {
          this.item = response.data
        } else {
          console.log(response.message)
        }
      })
    }
  },
  components: {
    mainItemTransaction,
    detailItemTransaction
  }
}
</script>
