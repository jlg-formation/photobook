import {disconnect} from './redux/slices/authentication.slice';
import {store} from './redux/store';

export const authFetch = async (info: RequestInfo, init: RequestInit) => {
  const response = await fetch(info, init);
  if (response.status === 401) {
    setTimeout(() => {
      store.dispatch(disconnect(undefined));
    }, 200);
  }
  return response;
};
