/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// https://pocketbase.io/docs/api-records/

import { createSignal } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
import { useAuth } from './AuthProvider';

//import { useNavigate } from '@solidjs/router';

export default function ChangePassword() {

  const { authStore } = useAuth();

  const [currentPassword, setCurrentPassword] = createSignal('')
  
  const [token, setToken] = createSignal('')
  const [newPassword, setNewPassword] = createSignal('')
  const [newPasswordConfirm, setNewPasswordConfirm] = createSignal('')

  //console.log(authStore())

  async function btnRequest(){
    const userData = authStore();
    try {
      const result = await pocketBase.collection('users').requestPasswordReset(userData?.record?.email);
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  async function btnApply(){
    try{
      const result = await pocketBase.collection('users').confirmPasswordReset(
        token(),
        newPassword(),
        newPasswordConfirm(),
      );
      console.log(result)
    }catch(error){
      console.log(error);
    }
    
  }

  return (<>
    <table>
      <tbody>
        <tr>
          <td colSpan={2} style="background:gray;">
            <label>Change Password:</label>
          </td>
        </tr>
        <tr>
          <td colSpan={2} >
            <button style="width:100%;" onClick={btnRequest}>Request</button>
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
            <label>Old Password:</label>
          </td>
          <td>
            <input value={currentPassword()} onInput={(e)=>setCurrentPassword(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td>
            <label>New Password:</label>
          </td>
          <td>
            <input value={newPassword()} onInput={(e)=>setNewPassword(e.target.value)} />
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