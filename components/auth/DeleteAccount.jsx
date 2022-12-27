/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// https://pocketbase.io/docs/api-records/

import { createSignal, onMount } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
import { useNavigate } from '@solidjs/router';

export default function ConfirmEmail() {

  const [status, setStatus] = createSignal('checking...')

  onMount(()=>{

  })

  return (<>
  
  </>)

}