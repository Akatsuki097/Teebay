import { useQuery, useMutation } from '@apollo/client';
import { ALL_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from '../queries/product';
import ProductItem from '../components/ProductItem';
import { useNavigate} from 'react-router-dom'

function AllProductsPage() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
  });
   const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


   return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>
      <div className="space-y-4">
        {data.allProducts.map(prod => (
          <div
            key={prod.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/products/${prod.id}`)}
          >
            <ProductItem
              product={prod}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllProductsPage;
