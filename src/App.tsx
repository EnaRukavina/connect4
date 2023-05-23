import './App.css';
import { Images } from './assets/images';

function App() {
  return (
    <h1 className='text-3xl font-bold underline'>
      Hello world!
      <img src={Images.cpu} alt='' />
    </h1>
  );
}

export default App;
