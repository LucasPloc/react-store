import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
  const { title, image, key } = category;
  return (
    <div className='category-container' key={key}>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  );
};

export default CategoryItem;
