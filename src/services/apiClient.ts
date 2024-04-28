const BASE_URL = 'http://192.168.1.124:8055/items/';

const apiClient = {
  async get(endpoint: string) {
    try {
      const response = await fetch(BASE_URL + endpoint);
    if (!response.ok) {
      throw new Error('Request failed');
    }    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
  },
};

export default apiClient;