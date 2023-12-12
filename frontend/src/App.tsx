import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { PassengerHomePage } from "./pages/PassengerHomePage";
import PassengerCandidatePage from './pages/PassengerCandidatePage';
import PassengerMatchedPage from './pages/PassengerMatchedPage';
import axios from "axios";
axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="passengerHome" element={<PassengerHomePage />} />
        <Route path="passengerCandidate" element={<PassengerCandidatePage />} />
        <Route path="passengerMatched" element={<PassengerMatchedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
