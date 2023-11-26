import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import TrackDetail from './pages/TrackDetail'
import ArtistDetail from './pages/ArtistDetail'
import Playlists from './pages/Playlists'
import PlaylistDetail from './pages/PlaylistDetail'
import PlaylistShared from './pages/PlaylistShared'
import PrivateRouter from './components/auth/PrivateRouter'

function App() {


  return (
    <Routes>

      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/register' element={<Register />} />

      <Route element={<PrivateRouter />}>
        <Route path='/' element={<Home />} />
        <Route path='/tracks/:id' element={<TrackDetail />} />
        <Route path='/artists/:id' element={<ArtistDetail />} />
        <Route path='/playlists' element={<Playlists />} />
        <Route path='/playlists/:id' element={<PlaylistDetail />} />
        <Route path='/playlists/public/:id' element={<PlaylistShared />} />
      </Route>

      <Route path='*' element={<Page404 />} />

    </Routes>
  )
}

export default App