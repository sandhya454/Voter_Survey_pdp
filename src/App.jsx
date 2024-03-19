import { useState } from 'react'
import './App.css'
import Login from './Components/Login/Login';
import Mainpage from './Components/MainPage/Mainpage';
import VoterList from './Components/VotersList/VoterList';
import WardsVoterList from './Components/VotersList/WardVoterList';
import AreaVoterList from './Components/VotersList/AreaVoterList';

import BoothList from './Components/BoothList/BoothList';
import WardsList from './Components/WardsList/WardsList';
import AreasList from './Components/AreasList/AreasList';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SurveyForm from './Components/SurveyForm/SurveyForm';
import FindVoter from './Components/FindVoter/FindVoter';






function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='' element={<Login/>} />
        <Route path='mainpage' element={<Mainpage/>} />
        <Route path='mainpage/find-voter/:Ward/:Booth' element={<FindVoter/>} />
        <Route path='mainpage/find-voter/:WardNo/:BoothNo/voter-survey/:VoterId' element={<SurveyForm/>} />
      
        <Route path='mainpage/booth-list' element={<BoothList/>} />
        <Route path='mainpage/wards-list' element={<WardsList/>} />
        <Route path='mainpage/areas-list' element={<AreasList/>} />
        <Route path='mainpage/booth-list/booth-voter-list/:BoothNo' element={<VoterList/>} />
        <Route path='mainpage/wards-list/ward-voter-list/:WardNo' element={<WardsVoterList/>} />
        <Route path='mainpage/areas-list/area-voter-list/:Area/:BoothNo' element={<AreaVoterList/>} />
        <Route path='mainpage/booth-list/booth-voter-list/:BoothNo/voter-survey/:VoterId' element={<SurveyForm/>} />
        <Route path='mainpage/wards-list/ward-voter-list/:WardNo/voter-survey/:VoterId' element={<SurveyForm/>} />
        <Route path='mainpage/areas-list/area-voter-list/:Area/:BoothNo/voter-survey/:VoterId' element={<SurveyForm/>} />
      </Routes>
    </Router>
    
    
    
  )
}

export default App
