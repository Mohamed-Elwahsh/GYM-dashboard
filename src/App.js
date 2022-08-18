import Header from './components/Header'
import SideNav from './components/SideNav'
import Home from './components/Home'
import Footer from './components/Footer'
import Trainers from './components/Trainers'
import CreateTrainer from './components/CreateTrainer';
import Events from './components/Events'
import Classes from './components/Classes'
import Branches from './components/Branches'
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Users from './components/Users'
import Plans from './components/Plans'
import Google from './components/Google'

function App() {
  return (
    <>
    <Header />
    <Home />
    <Google/>
    <Users/>
    <SideNav />
    <Trainers/>
    <Events/>
    <Plans/>
    <Branches/>
    <Classes/>
    <Footer/>
    </>
  );
}

export default App;
