export const apiUrl = 'http://10.0.2.2:3000/api';

export class Api {
  async connect(email: string, password: string) {
    return await fetch(apiUrl + '/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
  }
  async disconnect() {
    return await fetch(apiUrl + '/disconnect', {
      method: 'POST',
    });
  }
}

export const api = new Api();
