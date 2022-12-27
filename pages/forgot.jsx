/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

//import { createEffect } from 'solid-js'
//import { supabase } from '../libs/supabaseclient.js';
import Auth from '../components/auth/Auth.jsx';
import Account  from '../components/auth/Account.jsx';
import { useAuth } from '../components/auth/AuthProvider.jsx';

export default function PageForgot() {

  const { authStore } = useAuth();

  return (
    <div class="container" style={{ padding: '10px 0 10px 0' }}>
      {!authStore() ? <Auth /> : <Account session={authStore()} />}
    </div>
  )
}