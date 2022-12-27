/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// https://pocketbase.io/docs/api-records/

import { createSignal } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'

import { useNavigate } from '@solidjs/router';

export default function PasswordReset() {

  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal('')
  const [status, setStatus] = createSignal('None')

  const btnSendResetPassword = async (e) => {
    e.preventDefault()
    try {
      // request email send
      //const data = await pocketBase.collection('users').requestVerification(email());
      const data = await pocketBase.collection('users').requestPasswordReset(email());
      console.log(data)

    }catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (<>
    <table>
      <tbody>
        <tr>
          <td colSpan="2" style="background:gray;">
            <label> Password Reset: </label>
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
            <label> Email: </label>
          </td>
          <td>
            <input value={email()} onInput={(e)=>setEmail(e.target.value)}/>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button style="width:100%;" onClick={btnSendResetPassword}> Send </button>
          </td>
        </tr>
      </tbody>
    </table> 
  </>)

}