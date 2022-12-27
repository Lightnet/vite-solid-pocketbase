/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// https://pocketbase.io/docs/api-records/

import { createSignal, onMount } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
import { useNavigate } from '@solidjs/router';

export default function ConfirmVerifyEmail(props) {

  const [status, setStatus] = createSignal('None')
  const [token, setToken] = createSignal('')
  const [email, setEmail] = createSignal(props.email || '')

  const navigate = useNavigate();

  onMount(()=>{

  })

  async function btnCheckToken(){
    try{
      let result = await pocketBase.collection('users').confirmVerification(token());
      console.log(result)
      setStatus('Pass')
    }catch(e){
      console.log(e)
      setStatus('Fail')
    }
  }

  async function btnResend(){
    try{
      let result = await pocketBase.collection('users').confirmVerification(token());
      console.log(result)
      setStatus('Pass')
    }catch(e){
      console.log(e)
      setStatus('Fail')
    }
  }

  const btnBack = async (e) => {
    e.preventDefault()
    try {
      navigate("/", { replace: true });
    }catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      //setLoading(false)
    }
  }

  return (<>
    <table>
      <tbody>
      <tr>
        <td colSpan={2} style="background:gray;">
          <label> Sign Up Verifty: </label>
        </td>
      </tr>
      <tr>
          <td>
            <label>Email:</label>
          </td>
          <td>
            <input value={email()} onInput={(e)=>setEmail(e.target.value)} disabled/> <button onClick={btnResend}> Resend </button>
          </td>
        </tr>

        <tr>
          <td>
            <label>Status: </label>
          </td>
          <td>
          <label> {status()} </label>
          </td>
        </tr>

        <tr>
          <td>
            <label>Token: </label>
          </td>
          <td>
            <input value={token()} onInput={(e)=>setToken(e.target.value)}/> <button onClick={btnCheckToken}> Check </button>
          </td>
        </tr>
        
        <tr>
          <td colSpan={2}>
          <button onClick={btnBack}> Back </button>
          </td>
        </tr>
      </tbody>
    </table>
  </>)

}