/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

//nope?

import { createSignal } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'

//import PocketBase from 'pocketbase';
import { useNavigate } from '@solidjs/router';
//const pocketBase = new PocketBase('http://127.0.0.1:8090');

export default function Recovery() {

  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal('test@test.com')

  const navigate = useNavigate();

  const btnSend = async (e) => {
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

  const btnSendForgotPassword = async (e) => {
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

  const btnCancel = async (e) => {
    e.preventDefault()
    navigate("/", { replace: true });
  }

  return (
    <div class="row flex-center flex">
      <div class="col-6 form-widget" aria-live="polite">
        <table>
          <tbody>
            <tr>
              <td colSpan="2" style="background:gray;">
                <center>
                  <label>Recovery</label>
                </center>
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
                <button type="submit" class="button block" style="width:100%;" onClick={btnSendForgotPassword}>
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
      </div>
    </div>
  )
}