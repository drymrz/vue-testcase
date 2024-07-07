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
                    placeholder="title"
                    v-model="title"
                    required
                  />
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Item Group</label>
                  <select class="form-select" name="" id="" v-model="itemGroup">
                    <option value="55692914-7402-4dd8-adec-40a823222b3e">Product Lain-Lain</option>
                  </select>
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label">Item Account Group</label>
                  <select class="form-select" name="" id="" v-model="itemAccountGroup">
                    <option value="4fc9683e-f22b-47c6-9525-b054ba24ea42">Default</option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Item Unit</label>
                  <select class="form-select" name="" id="" v-model="itemUnit">
                    <option value="5daf6a23-472d-4921-9945-57674d5fd1aa">PCS</option>
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
import { createMasterItem } from '@/services/masterItemService'

export default {
  data() {
    return {
      company: 'testcase',
      itemType: 'Product',
      code: '<<Auto>>',
      title: '',
      itemGroup: '',
      itemAccountGroup: '',
      itemUnit: '',
      isActive: true,
      isLoading: false
    }
  },
  methods: {
    handleFormSubmit() {
      this.isLoading = true
      const payload = {
        Company: 'd3170153-6b16-4397-bf89-96533ee149ee',
        ItemType: '3adfb47a-eab4-4d44-bde9-efae1bec8543',
        Code: this.code,
        Label: this.title,
        ItemGroup: this.itemGroup,
        ItemAccountGroup: this.itemAccountGroup,
        ItemUnit: this.itemUnit,
        IsActive: this.isActive
      }

      createMasterItem(payload).then((response) => {
        if (response.status === 200) {
          alert('Data has been added')
          this.isLoading = false
          this.$emit('item-created')
          this.$refs.closeBtn.click()
        } else {
          return console.log(response.message)
        }
      })
    }
  }
}
</script>
