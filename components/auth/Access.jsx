/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createSignal } from 'solid-js'
import Auth from './Auth.jsx';
import { useAuth } from './AuthProvider.jsx';

export default function Access(props) {
  
  const {authStore} = useAuth();

  createEffect(() => {
    console.log(authStore())
  })

  return (
    <>
      {!authStore() ? <>
        <Auth/>
      </> : <>
        {props.children}
      </>}
    </>
  )
}
