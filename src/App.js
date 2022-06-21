import { Routes, Route } from 'react-router-dom';
import { HomePage, Navigation, Authentication } from './routes';

const ShopPage = () => {
  return <div>shop</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path='shop' element={<ShopPage />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
