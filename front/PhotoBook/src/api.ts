import {authFetch} from './fetch';
import {Article} from './redux/slices/articles.slice';
export const domain = 'http://10.0.2.2:3000';
export const apiUrl = `${domain}/api`;

export class Api {
  async addNewArticle(article: Article) {
    const url = apiUrl + '/articles';
    console.log('url: ', url);

    const response = await authFetch(url, {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

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

  async getArticles() {
    const response = await fetch(apiUrl + '/articles');
    return await response.json();
  }

  async isConnected() {
    return await fetch(apiUrl + '/auth/isConnected');
  }

  async upload(formData: FormData) {
    return await authFetch(apiUrl + '/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }
}

export const api = new Api();
