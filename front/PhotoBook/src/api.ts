export const domain = 'http://10.0.2.2:3000';
export const apiUrl = `${domain}/api`;

export class Api {
  async connect(email: string, password: string) {
    return await fetch(apiUrl + '/auth/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
  }

  async disconnect() {
    return await fetch(apiUrl + '/auth/disconnect', {
      method: 'POST',
    });
  }

  async isConnected() {
    return await fetch(apiUrl + '/auth/isConnected');
  }
}

export const api = new Api();
