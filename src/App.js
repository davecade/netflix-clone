import './App.scss';
import Navbar from './components/navbar/navbar.component'
const banner = './assets/the_witcher.jpg'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="banner__container">
        <img className="banner__image" src={banner}></img>
      </div>
      
    </div>
  );
}

export default App;
