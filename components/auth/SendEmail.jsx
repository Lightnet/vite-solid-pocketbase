/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

import { createSignal } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'

//import PocketBase from 'pocketbase';
import { useNavigate } from '@solidjs/router';
//const pocketBase = new PocketBase('http://127.0.0.1:8090');

export default function SendEmail(props) {

  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal('gixone6962@razuz.com')
  const [status, setStatus] = createSignal('None')

  const navigate = useNavigate();

  const btnSendVerifyEmail = async (e) => {
    e.preventDefault()
    try {
      // request email send
      //const data = await pocketBase.collection('users').requestVerification(email());
      const data = await pocketBase.collection('users').requestVerification(email());
      console.log(data)
      setStatus('Pass')
    }catch (error) {
      if (error instanceof Error) {
        //alert(error.message)
      }
      setStatus('Fail')
    } finally {
      setLoading(false)
    }
  }

  const btnCancel = async (e) => {
    e.preventDefault()
    navigate("/", { replace: true });
  }

  return (<>
    <table>
      <tbody>
        <tr>
          <td colSpan="2" style="background:gray;">
            <center>
              <label>Request Verification:</label>
            </center>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <label>Status: {status()}</label>
          </td>
        </tr>
        <tr>
          <td>
            <label>Email</label>
          </td>
          <td>
            <input
              class="inputField"
              type="email"
              placeholder="Your email"
              value={email()}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </td>
        </tr>

        <tr>
          <td colSpan="2">
            <button type="submit" class="button block" style="width:100%;" onClick={btnSendVerifyEmail}>
              {loading() ? <span>Loading</span> : <span>Send</span>}
            </button>    
          </td>
        </tr>

        <tr>
          <td colSpan="2">
            <button type="submit" class="button block" style="width:100%;" onClick={btnCancel}>
              {loading() ? <span>Loading</span> : <span>Cancel</span>}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </>)
}