import axios from 'axios'

const apiUrl = 'https://app.api.elsoft.id/admin/api/v1/item'

export const getMasterItem = async () => {
  try {
    const response = await axios.get(apiUrl + '/list', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const createMasterItem = async (data) => {
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const updateMasterItem = async (id, data) => {
  try {
    const response = await axios.post(
      `https://app.api.elsoft.id/admin/api/v1/item/save?Oid=${id}`,
      data,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    )
    return response
  } catch (error) {
    return error
  }
}

export const deleteMasterItem = async (id) => {
  const payload = {
    GCRecordNote: 'Delete',
    Replace: null,
    ReplaceName: null
  }

  try {
    const response = await axios.post(
      `https://app.api.elsoft.id/admin/api/v1/data/item/delete?Oid=${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    return response
  } catch (error) {
    return error
  }
}
