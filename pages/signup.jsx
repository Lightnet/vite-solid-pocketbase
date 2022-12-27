/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

//import { useAuth } from '../components/auth/AuthProvider.jsx';
import SignUp from '../components/auth/SignUp.jsx';

export default function PageSignUp() {

  //const { authStore } = useAuth();

  return (
    <div class="container" style={{ padding: '10px 0 10px 0' }}>
      <SignUp/>
    </div>
  )
}