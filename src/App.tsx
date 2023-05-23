import MainMenu from './screens/MainMenu';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Rules from './screens/Rules';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: 'rules',
    element: <Rules />,
  },
]);

function App() {
  return (
    <div className='h-screen w-screen'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
