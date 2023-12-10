import react, {createContext, useState} from 'react'
import './App.css';
import Login from './pages/Login'
import RequestResource from './pages/RequestResource';
import Resources from './pages/Resources'
import NavBar from './components/NavBar';
import Confirmation from './pages/Confirmation';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export const UserContext = createContext('userContext')
function App() {
  
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState([])
  const [availableResources, setAvailableResources] = useState([])
  const [selectedResources, setSelectedResources] = useState([]) 
  return (
    <UserContext.Provider value={{selectedResources, setSelectedResources, username, setUsername, resources, setResources, availableResources, setAvailableResources}}>
    <BrowserRouter>
    <div className="App">
    
    {username !='' && <NavBar/>}

    <div class="main">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/request-resource' element={<RequestResource/>}/>
          <Route path='/confirmation' element={<Confirmation/>}/>
        </Routes>
      
</div>

    </div>
    </BrowserRouter> 
    </UserContext.Provider>
  );
}

export default App;
