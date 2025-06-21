import { Link } from 'react-router-dom';

function ProductItem({ product, onDelete, showDelete, showEdit }) {
  return (
    <div className="product-item">
      <h4>{product.title} (${product.price})</h4>
      <p><i>{product.category}</i></p>
      <p>{product.description}</p>
      {showEdit && <Link to={`/products/${product.id}/edit`}><button>Edit</button></Link>}
      {showDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
}
export default ProductItem;
