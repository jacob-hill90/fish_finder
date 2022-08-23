import {BrowserRouter , Routes, Route} from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                 //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import FormSignUp from './pages/FormSignUp';
import { whoAmI } from './api/UserAPI'; 
import ProfilePage from './pages/ProfilePage';

function App() {
  const [user, setUser] = useState(null)


  useEffect(()=>{
    let response = whoAmI()
    .then( (response) => {
      setUser(response);
    });

  }, []) 

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user}/>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path ="/signup" element={<FormSignUp />} />
            <Route path ="/user_profile" element={<ProfilePage />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
