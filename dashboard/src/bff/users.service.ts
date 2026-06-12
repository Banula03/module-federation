export interface UserDTO {
  id?: number;
  name: string;
  email: string;
  role: string;
  status?: string;
  avatar?: string;
}

const BACKEND_URL = 'http://localhost:4000/api/users';
const BEARER_TOKEN = 'secret-bff-token'; // In production, this would be retrieved dynamically

const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${BEARER_TOKEN}`
};

export class UsersBFFService {
  // Acts as a proxy, requesting data from the upstream Express API Backend
  static async getUsers() {
    const res = await fetch(BACKEND_URL, { headers: HEADERS });
    if (!res.ok) throw new Error('Backend error fetching users');
    return res.json();
  }

  // Proxies the POST request, adding the necessary server-side authentication
  static async addUser(newUser: UserDTO) {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(newUser)
    });
    if (!res.ok) throw new Error('Backend error adding user');
    return res.json();
  }

  // Proxies the PATCH request ensuring only authenticated clients can modify statuses
  static async updateStatus(id: number, status: string) {
    const res = await fetch(`${BACKEND_URL}/${id}/status`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({ status })
    });
    
    if (!res.ok) {
      if (res.status === 404) throw new Error('User not found');
      throw new Error(`Backend error updating status. Status: ${res.status}`);
    }
    
    return res.json();
  }
}
