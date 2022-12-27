/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

import { useAuth } from '../components/auth/AuthProvider.jsx';
import PasswordReset from '../components/auth/PasswordReset.jsx';
import SendEmail from '../components/auth/SendEmail.jsx';


export default function PageRecovery() {

  const { authStore } = useAuth();

  return (
    <div class="container" style={{ padding: '10px 0 10px 0' }}>
      <label> Recovery </label>
      <SendEmail/>
      <PasswordReset/>
    </div>
  )
}