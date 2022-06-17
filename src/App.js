import { CategoryContainer } from './components';

const categories = [
  {
    id: '1',
    title: 'Laptops',
    image: '/images/laptop-cat.jpg',
  },
  {
    id: '2',
    title: 'Gaming',
    image: '/images/gamers-cat.jpg',
  },
  { id: '3', title: 'Components', image: '/images/components-cat.jpg' },
  { id: '4', title: 'Smartphones', image: '/images/smartphone-cat.jpg' },
  { id: '5', title: 'TV', image: '/images/tv-cat.jpg' },
  { id: '6', title: 'Accessories', image: '/images/accessories-cat.jpg' },
];

const App = () => {
  return <CategoryContainer categories={categories} />;
};

export default App;
