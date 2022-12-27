/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

//import Account from '../components/auth/Account.jsx';
import Access from '../components/auth/Access.jsx';
import { createSignal, onMount } from 'solid-js';
import { useAuth } from '../components/auth/AuthProvider.jsx';

export default function PageHome() {

  const [displayName, setDisaplyName] = createSignal('');

  const { authStore } = useAuth();

  onMount(()=>{
    console.log(authStore())
    let userData = authStore();
    if(userData){
      setDisaplyName(userData?.record?.name)
    }
  })

  return (
    <Access>
      <div>
        <p> Welcome {displayName()}! </p>
      </div>
    </Access>
  )
}