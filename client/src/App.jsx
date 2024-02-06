import{Routes,Route,useParams} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import './App.css'
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './Usercontext';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
//here credential means cookies --> on axios request by default you have to send cookies with request
axios.defaults.withCredentials = true;

//Q- why registerpage and loginpage is not imported-->because loginpage and register are only used in context of /login and /register
//importing some component depend, how you use it in your application

function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element = {<Layout/>}> 
          <Route index element={<IndexPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/account/:subpages?' element = {<AccountPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
