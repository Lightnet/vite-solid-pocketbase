/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createSignal, onMount } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
import { useAuth } from './AuthProvider'
import Avatar from './Avatar'

const Account = ({ session }) => {
  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal("None")
  const [username, setUserName] = createSignal("Guest")
  const [name, setName] = createSignal("Guest")
  const [website, setWebsite] = createSignal("None")
  const [avatarUrl, setAvatarUrl] = createSignal(null)

  const { authStore, APISignOut } = useAuth();

  //createEffect(() => {
    //getProfile()
    //console.log(authStore())
  //})

  onMount(()=>{
    //console.log(pocketBase)
    getProfile();
  })

  const getProfile = async () => {
    try {
      setLoading(true)
      let userData = authStore();
      console.log(userData)
      if(userData){
        if(userData?.record?.username){
          setUserName(userData.record.username)
        }
        if(userData?.record?.name){
          setName(userData.record.name)
        }
        if(userData?.record?.email){
          setEmail(userData.record.email)
        }

        if(userData?.record?.avatar){
          setAvatarUrl(userData.record.avatar)
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    //e.preventDefault()
    
    try {
      setLoading(true)

      console.log("avatarUrl"+avatarUrl())
      let userData = authStore();
      console.log(userData);
      console.log(userData.record.id);
      //const record = await pocketBase.collection('users').update(userData.record.id, {
        //avatar: avatarUrl(),
      //});
      const record = await pocketBase.collection('users').update(userData.record.id, {
        name: name(),
      });
      console.log(record)

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  function btnSignOut(){
    APISignOut();
  }

  return (
    <div aria-live="polite">
      <table>
        <tbody>
          <tr>
            <td colSpan="2">
              <label> Profile Information: </label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Email: </label>
            </td>
            <td>
              <input value={email()} readonly disabled />
            </td>
          </tr>

          <tr>
            <td>
              <label>Username: </label>
            </td>
            <td>
              <input
                id="username"
                type="text"
                value={username() || ''}
                onChange={(e) => setUserName(e.currentTarget.value)}
                disabled
                />
            </td>
          </tr>

          <tr>
            <td>
              <label>Name: </label>
            </td>
            <td>
              <input
                id="name"
                type="text"
                value={name() || ''}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </td>
          </tr>
          {/* 
          <tr>
            <td>
              <label>Website: </label>
            </td>
            <td>
              <input
                type="text"
                value={website() || ''}
                onChange={(e) => setWebsite(e.currentTarget.value)}
              />
            </td>
          </tr>
          */}

          <tr>
            <td colSpan="2">
            <Avatar 
                url={avatarUrl()}
                size={64}
                onUpload={(url) => {
                  setAvatarUrl(url)
                  updateProfile({})
                }}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button type="submit" class="button primary block" style="width:100%;" onClick={updateProfile} disabled={loading()}>
                {loading() ? 'Saving ...' : 'Update profile'}
              </button>
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button type="button" class="button block" onClick={btnSignOut}>Sign Out</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Account