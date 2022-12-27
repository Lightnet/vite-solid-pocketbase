/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js'
import Access from "../components/auth/Access";
import ChangeEmail from '../components/auth/ChangeEmail';
import ChangePassword from '../components/auth/ChangePassword';

export default function PageSecurity() {

  const navigate = useNavigate();

  const btnBack =()=>{
    navigate("/account", { replace: true });
  }

  return (
    <Access>
      <ChangePassword/>
      <ChangeEmail/>
      <button onClick={btnBack}> Back </button>
    </Access>
  )
}