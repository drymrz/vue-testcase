<template>
  <div>
    <button
      type="button"
      class="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Add
    </button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add Item</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleFormSubmit">
              <div class="row">
                <div class="col-12 mb-3">
                  <label class="form-label">Item</label>
                  <select class="form-select" id="" required v-model="item">
                    <option v-for="(item, index) in masterItem" :key="index" :value="item.Oid">
                      {{ item.Label }} - {{ item.Code }}
                    </option>
                  </select>
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Quantity</label>
                  <input type="text" class="form-control" v-model="quantity" required />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Item Unit</label>
                  <select class="form-select" id="" required v-model="itemUnit">
                    <option value="5daf6a23-472d-4921-9945-57674d5fd1aa" selected>PCS - PCS</option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Note</label>
                  <textarea class="form-control" rows="2" v-model="note"></textarea>
                </div>
              </div>
              <div class="float-end">
                <button
                  ref="closeBtn"
                  type="button"
                  class="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMasterItem } from '@/services/masterItemService'
import { createTransactionItemDetail } from '@/services/transactionStockService'

export default {
  data() {
    return {
      masterItem: {},
      item: '',
      quantity: '',
      itemUnit: '',
      note: ''
    }
  },
  mounted() {
    this.getMasterItem()
  },
  methods: {
    getMasterItem() {
      getMasterItem().then((response) => {
        if (response.status === 200) {
          this.masterItem = response.data.data
        } else {
          console.log(response.message)
        }
      })
    },

    handleFormSubmit() {
      const payload = {
        index: null,
        Item: this.item,
        ItemName: this.masterItem.find((item) => item.Oid === this.item).Label,
        Quantity: this.quantity,
        ItemUnit: this.itemUnit,
        ItemUnitName: 'PCS - PCS',
        Note: this.note
      }

      createTransactionItemDetail(this.$route.params.Oid, payload).then((response) => {
        if (response.status === 200) {
          alert('Data has been added')
          this.$refs.closeBtn.click()
          this.$emit('item-refresh')
        } else {
          return console.log(response.message)
        }
      })
    }
  }
}
</script>
