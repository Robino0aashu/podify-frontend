import './App.css';
import './output.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import Home from './routes/Home';
import LoggedInHome from './routes/LoggedInHome';
import UploadPodcast from './routes/UploadPodcast';
import MyPodcast from './routes/MyPodcast';
import SearchPage from './routes/SearchPage';
import { useCookies } from 'react-cookie';
import soundContext from './contexts/soundContext';
import Library from './routes/Library';
import SingleRecordView from './routes/SingleRecordView';

function App() {

  const [currentSound, setCurrentSound] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className='h-screen w-screen font-poppins'>
      <Router>
        {cookie.token ? (
          //Logged In Routes
          <soundContext.Provider value={{ currentSound, setCurrentSound, soundPlayed, setSoundPlayed, isPaused, setIsPaused }}>
            <Routes>
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="/uploadPodcast" element={<UploadPodcast />} />
              <Route path="/myPodcast" element={<MyPodcast />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route
                path="/record/:recordId"
                element={<SingleRecordView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </soundContext.Provider>)
          : (

            //Logged Out Routes
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )
        }
      </Router>
    </div>
  );
}

export default App;
