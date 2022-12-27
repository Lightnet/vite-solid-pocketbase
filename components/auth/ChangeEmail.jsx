/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// https://pocketbase.io/docs/api-records/

import { createSignal, onMount } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
import { useAuth } from './AuthProvider'
//import { useNavigate } from '@solidjs/router';

export default function ChangeEmail() {

  const [email, setEmail] = createSignal('')
  const [token, setToken] = createSignal('')
  const [newEmail, setNewEmil] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [status, setStatus] = createSignal('None')

  const { authStore } = useAuth();

  onMount(()=>{
    const userData = authStore();
    if(userData){
      console.log(userData.record.email)
      setEmail(userData.record.email)
    }
  })

  async function btnRequest(){
    try {
      const result = await pocketBase.collection('users').requestEmailChange(newEmail());
      console.log(result)
    } catch (error) {
      console.log("Request Fail");
    }
  }

  async function btnApply(){
    try {
      await pocketBase.collection('users').confirmEmailChange(
        token(),
        password()
      );
      setStatus("Done")
    } catch (error) {
      setStatus("FAIL!")
    }
  }

  return (<>
    <table>
      <tbody>
        <tr>
          <td colSpan={2} style="background:gray;">
            <label>Change Email:</label>
          </td>
        </tr>
        
        <tr>
          <td>
            <label>Current Email:</label>
          </td>
          <td>
            <input value={email()} onInput={(e)=>setEmail(e.target.value)} disabled/>
          </td>
        </tr>
        <tr>
        <td>
          <label>New Email:</label>
          </td>
          <td>
          <input value={newEmail()} onInput={(e)=>setNewEmil(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} >
            <button style="width:100%;" onClick={btnRequest}>Request</button>
          </td>
        </tr>
        <tr>
          <td>
            <label>Status:</label>
          </td>
          <td>
            <label>{status()}</label>
          </td>
        </tr>
        <tr>
          <td>
            <label>Token:</label>
          </td>
          <td>
          <input value={token()} onInput={(e)=>setToken(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td>
            <label>Password:</label>
          </td>
          <td>
          <input value={password()} onInput={(e)=>setPassword(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} >
            <button style="width:100%;" onClick={btnApply}>Apply</button>
          </td>
        </tr>
        
      </tbody>
    </table>
    
  </>)

}