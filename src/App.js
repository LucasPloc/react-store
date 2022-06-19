import { Routes, Route } from 'react-router-dom';
import { HomePage, Navigation } from './routes';

const ShopPage = () => {
  return <div>shop</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path='shop' element={<ShopPage />} />
      </Route>
    </Routes>
  );
};

export default App;
