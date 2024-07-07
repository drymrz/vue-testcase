<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Add New Data
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
            <h5 class="modal-title" id="staticBackdropLabel">Add Product</h5>
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
                <div class="col-6 mb-3">
                  <label class="form-label">Company</label>
                  <input type="text" class="form-control" v-model="company" readonly required />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Code</label>
                  <input type="text" class="form-control" v-model="code" required />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Date</label>
                  <input type="date" class="form-control" v-model="date" required />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Account</label>
                  <select class="form-select" id="" required v-model="account">
                    <option value="bc54db2f-4b44-4401-be7d-31c21effa9c1">
                      Biaya Adm Bank - 800-01 - 800-01 (testcase)
                    </option>
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
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <div class="spinner-border spinner-border-sm" role="status" v-if="isLoading">
                    <span class="sr-only">Loading...</span>
                  </div>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createTransactionItem } from '@/services/transactionStockService'

export default {
  data() {
    return {
      company: 'testcase',
      code: '<<AutoGenerate>>',
      date: new Date().toISOString().substr(0, 10),
      account: '',
      note: '',
      isLoading: false
    }
  },
  methods: {
    handleFormSubmit() {
      this.isLoading = true
      const payload = {
        Company: 'd3170153-6b16-4397-bf89-96533ee149ee',
        CompanyName: this.company,
        Code: this.code,
        Date: this.date,
        Account: this.account,
        Note: this.note
      }

      createTransactionItem(payload).then((response) => {
        if (response.status === 200) {
          alert('Data has been added')
          this.isLoading = false
          this.$emit('item-created')
          this.$refs.closeBtn.click()
          window.open(`/transaction/detail/item/${response.data.Oid}`, '_blank')
        } else {
          return console.log(response.message)
        }
      })
    }
  }
}
</script>
