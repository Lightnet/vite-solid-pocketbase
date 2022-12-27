/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

//import { createEffect } from 'solid-js'
import Account  from '../components/auth/Account.jsx';
import { useAuth } from '../components/auth/AuthProvider.jsx';
import Access from '../components/auth/Access.jsx';
import { useNavigate } from '@solidjs/router';

export default function PageAccount() {

  const { authStore } = useAuth();
  const navigate = useNavigate();

  const btnSecurity = ()=>{
    navigate("/security", { replace: true });
  }

  return (
    <Access>
      <Account />
      <button onClick={btnSecurity}> Security </button>
    </Access>
  )
}