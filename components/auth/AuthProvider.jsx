/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// https://supabase.com/docs/reference/javascript/auth-onauthstatechange

import { 
  createSignal
, createEffect
, createContext
, useContext 
} from "solid-js";

import { pocketBase } from '../../libs/pocketbaseclient.js';

const AuthContext = createContext();

export function AuthProvider(props) {

  const [authStore, setAuthStore] = createSignal( null)
  const [isLogin, setIsLogin] = createSignal(false)

  const value = {
    authStore, 
    setAuthData: function (data){
      setAuthStore(data)
    },
    APISignOut:function(){
      console.log(pocketBase)
      pocketBase.authStore.clear();
      setAuthStore(null);
    }
  };

  //get data
  //createEffect(() => {
    //let authData = authStore();
    //console.log(authData)
  //})

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }