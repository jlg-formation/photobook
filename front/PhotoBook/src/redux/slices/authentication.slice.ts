import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isConnected: false,
  },
  reducers: {
    connect: state => {
      state.isConnected = true;
    },
    disconnect: state => {
      state.isConnected = false;
    },
  },
});

export const selectAuthentication = (state: RootState) => state.authentication;

export const {connect, disconnect} = authenticationSlice.actions;
