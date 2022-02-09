import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface User {
  displayName: string;
}

export interface AuthenticationState {
  user: User | undefined;
}

export const authenticationSlice = createSlice<
  AuthenticationState,
  SliceCaseReducers<AuthenticationState>
>({
  name: 'authentication',
  initialState: {
    user: undefined,
  },
  reducers: {
    connect: (state, action: PayloadAction<User>) => {
      console.log('action: ', action);
      state.user = action.payload;
    },
    disconnect: state => {
      state.user = undefined;
    },
  },
});

export const selectAuthentication = (state: RootState) => state.authentication;

export const {connect, disconnect} = authenticationSlice.actions;
