import axios from 'axios'

const apiUrl = 'https://app.api.elsoft.id/admin/api/v1/stockissue'
const apiDetail = 'https://app.api.elsoft.id/admin/api/v1/stockissue/detail'

export const getTransactionItem = async () => {
  try {
    const response = await axios.get(apiUrl + '/list?DateFrom=2024-07-01&DateTo=2024-07-31', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const getTransactionItemById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const createTransactionItem = async (data) => {
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

export const updateTransactionItem = async (id, data) => {
  try {
    const response = await axios.post(`${apiUrl}/${id}`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const deleteTransactionItem = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`, {
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

export const createTransactionItemDetail = async (id, data) => {
  try {
    const response = await axios.post(`${apiDetail}?StockIssue=${id}&Oid=NONE`, data, {
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

export const updateTransactionItemDetail = async (id, data) => {
  try {
    const response = await axios.post(`${apiDetail}?StockIssue=${id}&Oid=NONE`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export const deleteTransactionItemDetail = async (id) => {
  try {
    const response = await axios.delete(`${apiDetail}/${id}`, {
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
