import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import NavSection from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Detail from './components/Detail';
import {Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <NavSection />
      <Routes>
    <Route exact path='/' element={<Home />}></Route>
    <Route exact path='/register' element={<Register />}></Route>
    <Route exact path='/edit/:id' element={<Edit />}></Route>
    <Route exact path='/view/:id' element={<Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
