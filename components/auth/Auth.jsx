/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

import { createSignal } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
import { useAuth } from './AuthProvider'

//import PocketBase from 'pocketbase';
import { useNavigate } from '@solidjs/router';
//const pocketBase = new PocketBase('http://127.0.0.1:8090');

export default function Auth() {

  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal('gixone6962@razuz.com')
  const [username, setUserName] = createSignal('')
  const [loginType, setLoginType] = createSignal('EMAIL')//EMAIL, USERNAME, AUTH0
  const [passphrase, setPassphrase] = createSignal('test123456')
  const { setAuthData } = useAuth();
  //console.log(setAuthData)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      
      // sign-in via email and password
      let EMAIL = email();
      let PASSPHRASE = passphrase();
      const data = await pocketBase.collection('users').authWithPassword(EMAIL, PASSPHRASE);
      //const tdata = await pocketBase.collection('users');
      //console.log(tdata)
      //const data = await pocketBase.collection('users').authWithPassword('test@test.com', 'test123456');
      //console.log(data)
      //setSession(data)
      setAuthData(data)

    }catch (error) {
      if (error instanceof Error) {
        if(error.message == "Failed to authenticate."){
          alert(error.message)
        }
        
        console.log(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    navigate("/signup", { replace: true });
  }

  const handleRecovery = async (e) => {
    e.preventDefault()
    navigate("/recovery", { replace: true });
  }

  return (<>
    <table>
      <tbody>
        <tr>
          <td colSpan="2" style="background:gray;width:100%;">
            <center>
              <label>Access</label>
            </center>
          </td>
        </tr>
        <tr>
          <td>
            <label for="email">Email</label>
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
          <td>
            <label for="Passphrase">Passphrase</label>
          </td>
          <td>
            <input
              class="inputField"
              type="text"
              placeholder="Your password"
              value={passphrase()}
              onChange={(e) => setPassphrase(e.currentTarget.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button type="submit" class="button block" style="width:100%;" onClick={handleLogin}>
              {loading() ? <span>Loading</span> : <span>Login</span>}
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button type="submit" class="button block" style="width:100%;" onClick={handleSignUp}>
              {loading() ? <span>Loading</span> : <span>Sign Up</span>}
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button type="submit" class="button block" style="width:100%;" onClick={handleRecovery}>
              {loading() ? <span>Loading</span> : <span>Recovery</span>}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </>)
}