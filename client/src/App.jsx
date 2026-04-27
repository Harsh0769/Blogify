import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import SinglePost from './pages/SinglePost'
import UserProfile from './pages/UserProfile'
import EditPost from './pages/EditPost'
import AdminSignup from './pages/AdminSignup'
import AdminDashboard from './pages/AdminDashboard'
import UserDetails from './pages/UserDetails'


function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/editpost/:id' element={<EditPost />} />
          <Route path="/Admin/Signup" element={<AdminSignup />} />
          <Route path='/Admin/Dashboard' element={<AdminDashboard />} />
          <Route path='/posts/:id' element={<UserDetails />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App