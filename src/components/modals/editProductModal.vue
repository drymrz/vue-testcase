<template>
  <div>
    <div
      class="modal fade"
      id="editProductModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
      v-on:mouseenter="fillForm"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductModalLabel">Edit Product</h5>
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
                  <label class="form-label">Item Type</label>
                  <input type="text" class="form-control" v-model="itemType" readonly required />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Code</label>
                  <input type="text" class="form-control" v-model="code" required />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    v-model="title"
                    required
                  />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Item Group</label>
                  <select class="form-select" v-model="itemGroup">
                    <option value="55692914-7402-4dd8-adec-40a823222b3e" selected>
                      Product Lain-Lain
                    </option>
                  </select>
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Item Account Group</label>
                  <select class="form-select" v-model="itemAccountGroup">
                    <option value="4fc9683e-f22b-47c6-9525-b054ba24ea42" selected>Default</option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Item Unit</label>
                  <select class="form-select" v-model="itemUnit">
                    <option value="5daf6a23-472d-4921-9945-57674d5fd1aa" selected>PCS</option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <input class="form-check-input me-2" type="checkbox" v-model="isActive" />
                  <label class="form-label">Is Active</label>
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
                <button type="submit" class="btn btn-warning" :disabled="isLoading">
                  <div class="spinner-border spinner-border-sm" role="status" v-if="isLoading">
                    <span class="sr-only">Loading...</span>
                  </div>
                  Update
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
import { updateMasterItem } from '@/services/masterItemService'

export default {
  props: {
    item: Object
  },
  data() {
    return {
      company: '',
      itemType: 'Product',
      code: '',
      title: '',
      itemGroup: '',
      itemAccountGroup: '',
      itemUnit: '',
      isActive: true,
      isLoading: false
    }
  },
  methods: {
    fillForm() {
      this.company = this.item.CompanyName
      this.code = this.item.Code
      this.title = this.item.Label
      this.itemGroup = '55692914-7402-4dd8-adec-40a823222b3e'
      this.itemAccountGroup = '4fc9683e-f22b-47c6-9525-b054ba24ea42'
      this.itemUnit = '5daf6a23-472d-4921-9945-57674d5fd1aa'
      this.isActive = this.item.IsActive === 'Y' ? true : false
    },
    handleFormSubmit() {
      this.isLoading = true
      const payload = {
        Company: this.item.Company,
        ItemType: this.item.ItemType,
        Code: this.code,
        Label: this.title,
        ItemGroup: this.itemGroup,
        ItemAccountGroup: this.itemAccountGroup,
        ItemUnit: this.itemUnit,
        IsActive: this.isActive
      }

      updateMasterItem(this.item.Oid, payload).then((response) => {
        if (response.status === 200) {
          alert('Data has been edited')
          this.isLoading = false
          this.$emit('item-updated')
          this.$refs.closeBtn.click()
        } else {
          return console.log(response.message)
        }
      })

      this.$refs.closeBtn.click()
    }
  }
}
</script>
