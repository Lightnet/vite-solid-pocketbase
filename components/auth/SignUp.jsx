/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

import { createSignal } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
//import { useAuth } from './AuthProvider'

//import PocketBase from 'pocketbase';
import { useNavigate } from '@solidjs/router';
import SignUpVerifyEmail from './SignUpVerifyEmail';
//const pocketBase = new PocketBase('http://127.0.0.1:8090');

export default function SignUp() {

  const [loading, setLoading] = createSignal(false)
  const [isCreated, setIsCreated] = createSignal(false)

  const [userName, setUserName] = createSignal('test')
  const [alias, setAlias] = createSignal('test2')
  const [email, setEmail] = createSignal('gixone6962@razuz.com')
  const [passphrase, setPassphrase] = createSignal('test123456')
  const [rePassphrase, setRePassphrase] = createSignal('test123456')
  //const [session,{setSession}] = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      navigate("/", { replace: true });
    }catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      // send verification email
      //const result = await pocketBase.users.requestVerification(email());
      //console.log(result)

      // sign-up via email and password
      console.log(pocketBase)

      /*
      const data = {
        username: "test_username",
        email: "test@example.com",
        emailVisibility: true,
        password: "12345678",
        passwordConfirm: "12345678",
        name: "test"
      };
      */

      const data = {
        username: userName(),
        email: email(),
        emailVisibility: false,
        password: passphrase(),
        passwordConfirm: rePassphrase(),
        name: alias()
      };
      console.log(data)

      const record = await pocketBase.collection('users').create(data);
      console.log(record)

      // (optional) send an email verification request
      await pocketBase.collection('users').requestVerification(email());
      setIsCreated(true)
    }catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
      setIsCreated(false)
    } finally {
      setLoading(false)
    }
  }

  return (<>
    {isCreated() ? <>
      <SignUpVerifyEmail email={email()}/>
    </> : <>
    <table>
      <tbody>
        <tr>
          <td colSpan="2" style="background:gray;">
            <center>
              <label> Sign Up </label>
            </center>
          </td>
        </tr>

        <tr>
          <td>
            <label>User Name:</label>
          </td>
          <td>
            <input
              class="inputField"
              type="text"
              placeholder="Your User Name"
              value={userName()}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
          </td>
        </tr>

        <tr>
          <td>
            <label>Alias:</label>
          </td>
          <td>
            <input
              class="inputField"
              type="text"
              placeholder="Your Alias"
              value={alias()}
              onChange={(e) => setAlias(e.currentTarget.value)}
            />
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
          <td>
            <label for="Passphrase">Re-Passphrase</label>
          </td>
          <td>
            <input
              class="inputField"
              type="text"
              placeholder="Your password"
              value={rePassphrase()}
              onChange={(e) => setRePassphrase(e.currentTarget.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button type="submit" class="button block" style="width:100%;" onClick={handleRegister}>
              {loading() ? <span>Loading</span> : <span>Register</span>}
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button type="submit" class="button block" style="width:100%;" onClick={handleLogin}>
              {loading() ? <span>Loading</span> : <span> Back </span>}
            </button>
          </td>
        </tr>

      </tbody>
    </table>
    </>}
    </>
  )
}