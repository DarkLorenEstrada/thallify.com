import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Callback, Artists, Tracks, Recent, Login, About, Iceberg } from './pages/'
import AuthGate from './gates/AuthGate';


const App = () => {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<AuthGate><Login/></AuthGate>} />
          <Route path='/top-artists' element={<AuthGate><Artists/></AuthGate>} />
          <Route path='/top-tracks' element={<AuthGate><Tracks/></AuthGate>} />
          <Route path='/recently-played' element={<AuthGate><Recent/></AuthGate>} />
          <Route path='/iceberg' element={<AuthGate><Iceberg/></AuthGate>} />
          <Route path='/about' element={<AuthGate><About/></AuthGate>} />
          <Route path='/callback' element={<Callback/>} />
        </Routes>
      </Router>
  );

}

export default App;