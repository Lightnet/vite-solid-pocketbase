/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// https://supabase.com/docs/guides/with-react
// upload / image file check

import { createEffect, createSignal } from 'solid-js'
import { pocketBase } from '../../libs/pocketbaseclient'
import { useAuth } from './AuthProvider';

//export default function Avatar({ url, size, onUpload }) {//does not watch changes?
export default function Avatar(props) {

  const [avatarUrl, setAvatarUrl] = createSignal(props.url || null);
  const [uploading, setUploading] = createSignal(false);

  const { authStore } = useAuth();

  const downloadImage = async (path) => {


    console.log(path)

    try {
      let userData = authStore();
      //userData.record.id
      //http://127.0.0.1:8090/api/files/_pb_users_auth_/l7dfphk97a2tv4x/fib_cesexo_aihcrg_MqMzH2SFls.jpg

      //const url = URL.createObjectURL("http://127.0.0.1:8090/api/files/_pb_users_auth_/"+userData.record.id+"/"+path)

      setAvatarUrl("http://127.0.0.1:8090/api/files/_pb_users_auth_/"+userData.record.id+"/"+path)

      /*
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)

      setAvatarUrl(url)
      */
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {

    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const formData = new FormData();
      const file = event.target.files[0];
      //formData.append('image', file);
      formData.append('avatar', file);
      const fileExt = file.name.split('.').pop();
      let uuid = crypto.randomUUID().replaceAll("-","");
      const fileName = `avatar${uuid}.${fileExt}`;
      const filePath = `${fileName}`;
      //formData.append('name', fileName);
      console.log(formData)
      //await pocketBase.collection('avatars').create(formData);
      //await pocketBase.collection('users').create(formData);
      //await pocketBase.collection('users').update(formData);

      let userData = authStore();

      const record = await pocketBase.collection('users').update(userData.record.id, formData);

      console.log(record)

      props.onUpload(filePath);


    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
    
    /*
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      let uuid = crypto.randomUUID().replaceAll("-","")
      //console.log(uuid)
      //const fileName = `${Math.random()}.${fileExt}`
      const fileName = `avatar${uuid}.${fileExt}`
      //console.log(fileName)
      const filePath = `${fileName}`
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      props.onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
    */
  }

  createEffect(() => {
    //console.log(props.url)
    if (props.url) downloadImage(props.url)
  })

  return (
    <div style={{ width: props.size }} aria-live="polite">
      <img
        width={props.size}
        height={props.size}
        src={avatarUrl() ? avatarUrl() : `https://place-hold.it/${props.size}x${props.size}`}
        alt={avatarUrl() ? 'Avatar' : 'No image'}
        className="avatar image"
        style={{ height: props.size, width: props.size }}
      />
      {uploading() ? (
        'Uploading...'
      ) : (
        <>
          <label className="button primary block" htmlFor="single">
            Upload an avatar
          </label>
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading()}
            />
        </>
      )}
    </div>
  )
}