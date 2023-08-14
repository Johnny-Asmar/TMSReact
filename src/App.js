import './App.css';
import React from 'react';
import HomeAdmin from './Routes/HomeAdmin/HomeAdmin.component'
import SignInPage from './Routes/SignIn/SignInPage.component'
import { Routes, Route } from 'react-router-dom'
import HomeUser from './Routes/HomeUser/HomeUser.component';
import SignUp from './Components/SignUp/SignUp.component';

function App() {
  return (
    <Routes>
      <Route index element={<SignInPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/TMSUser" element={<HomeUser />} />
      <Route path="/TMSAdmin" element={<HomeAdmin />} />
    </Routes>
  );
}
export default App;
