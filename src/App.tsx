import './App.css';
import Cards from './components/Cards';

function App() {
  return (
    <>
      <div className="heading">
        <h1>Memory game</h1>
        <p>Memorize as many cats you can</p>
      </div>
      <Cards />
    </>
  );
}

export default App;
