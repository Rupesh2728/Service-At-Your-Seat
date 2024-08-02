import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'SAITEJA LIKES MEGHANA'; 


const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const encryptedState = CryptoJS.AES.encrypt(serializedState, SECRET_KEY).toString();
    localStorage.setItem('clientState', encryptedState);
  } catch (error) {
    console.error('Could not save state to localStorage:', error);
  }
};


const loadStateFromLocalStorage = () => {
  try {
    const encryptedState = localStorage.getItem('clientState');
    if (encryptedState === null) {
      return undefined;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedState, SECRET_KEY);
    const serializedState = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load state from localStorage:', error);
    return undefined;
  }
};


const persistedState = loadStateFromLocalStorage();

const initialState = persistedState || {
  value: [
    {
      client: "User",
      Id: null,
      currtheatrecity: ""
    }
  ]
};

const ClientSlice = createSlice({
  name: "Client",
  initialState,
  reducers: {
    ref: (state, action) => {
      state.value[0].client = state.value[0].client;
      state.value[0].Id = action.payload[0].Id;
      state.value[0].currtheatrecity = action.payload[0].City;

      saveStateToLocalStorage(state); 
    },
    update: (state, action) => {
      console.log(action.payload);
      state.value[0].client = action.payload[0].client;

      saveStateToLocalStorage(state); 
    },
    logout: (state) => {
      state.value = [
        {
          client: "User",
          Id: null,
          currtheatrecity: ""
        }
      ];
      localStorage.removeItem('clientState'); 
    }
  }
});

export const { ref, update, logout } = ClientSlice.actions;
export default ClientSlice.reducer;
