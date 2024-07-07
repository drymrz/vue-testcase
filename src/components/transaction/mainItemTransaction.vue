<template lang="">
  <div class="card bg-white mt-3">
    <div class="card-header">
      <h6 class="card-title">Main</h6>
    </div>
    <div class="card-body">
      <div class="spinner-border text-primary" role="status" v-if="isLoading">
        <span class="sr-only">Loading...</span>
      </div>

      <form action="" @submit.prevent="handleFormSubmit" v-if="!isLoading">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label for="company">Company</label>
              <input
                type="text"
                class="form-control-plaintext"
                id="company"
                v-model="company"
                readonly
              />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label for="code">Code</label>
              <input
                type="text"
                :class="!isEdit ? 'form-control-plaintext' : 'form-control'"
                id="code"
                v-model="code"
                :readonly="!isEdit"
              />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label for="date">Date</label>
              <input
                type="date"
                :class="!isEdit ? 'form-control-plaintext' : 'form-control'"
                id="date"
                v-model="date"
                :readonly="!isEdit"
              />
            </div>
          </div>
          <div class="col-md-8 mb-3">
            <div class="form-group">
              <label for="account">Account</label>
              <select
                :class="!isEdit ? 'form-control-plaintext' : 'form-select'"
                id=""
                required
                v-model="account"
                :disabled="!isEdit"
              >
                <option value="bc54db2f-4b44-4401-be7d-31c21effa9c1">
                  Biaya Adm Bank - 800-01 - 800-01
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label for="status">Status</label>
              <input
                type="text"
                class="form-control-plaintext"
                id="status"
                v-model="status"
                readonly
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label for="note">Note</label>
              <textarea
                :class="!isEdit ? 'form-control-plaintext' : 'form-control'"
                id="note"
                v-model="note"
                :readonly="!isEdit"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="d-flex float-end mt-3">
          <router-link class="btn btn-secondary me-2" to="/transaction/list">Back</router-link>
          <button v-if="!isEdit" type="button" class="btn btn-warning" @click="isEdit = !isEdit">
            Edit
          </button>
          <button v-if="isEdit" type="button" class="btn btn-secondary" @click="fillForm">
            Cancel
          </button>
          <button
            v-if="isEdit"
            type="submit"
            class="btn btn-primary ms-2"
            @click="updateTransactionItem"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { updateTransactionItem } from '@/services/transactionStockService'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      company: '',
      code: '',
      date: '',
      account: '',
      status: '',
      note: '',
      isEdit: false,
      isLoading: true
    }
  },
  methods: {
    fillForm() {
      this.isEdit = false
      this.company = this.item.CompanyFullName
      this.code = this.item.Code
      this.date = this.item.Date
      this.account = this.item.Account
      this.status = this.item.StatusName
      this.note = this.item.Note
    },

    handleFormSubmit() {
      const payload = {
        Oid: this.item.Oid,
        Company: this.item.Company,
        Code: this.code,
        Date: this.date,
        Account: this.account,
        Status: this.item.Status,
        StatusName: this.status,
        Note: this.note
      }

      updateTransactionItem(this.item.Oid, payload).then((response) => {
        if (response.status === 200) {
          alert('Data has been edited')
          this.getTransactionItemById()
        } else {
          return console.log(response.message)
        }
      })
    }
  },
  watch: {
    item: {
      handler() {
        this.isLoading = false
        this.fillForm()
      },
      deep: true
    }
  }
}
</script>
