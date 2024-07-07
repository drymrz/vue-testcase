<!-- <template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <h2>Table Data Master Item</h2>
          <router-link to="/add-item" class="btn btn-primary ms-auto pt-2">Add Data</router-link>
        </div>

        <table class="table table-striped table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Company</th>
              <th scope="col">Code</th>
              <th scope="col">ItemGroup</th>
              <th scope="col">Is Active</th>
              <th scope="col">Balace</th>
            </tr>
          </thead>
          <tbody>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('https://app.api.elsoft.id/admin/api/v1/item/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      this.items = response.data.data
      console.log(this.items)
    } catch (error) {
      console.log(error)
    }
  }
}
</script> -->
