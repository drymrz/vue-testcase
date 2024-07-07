import axios from 'axios'

export const login = async (userName, password) => {
  const payload = {
    UserName: userName,
    Password: password,
    Company: 'd3170153-6b16-4397-bf89-96533ee149ee',
    Device: 'web_1703742830368',
    Model: 'Admin Web',
    Source: '103.242.150.163',
    Exp: 3
  }
  try {
    const response = await axios.post('https://core.api.elsoft.id/portal/api/auth/signin', payload)
    return response
  } catch (error) {
    return error.response
  }
}
