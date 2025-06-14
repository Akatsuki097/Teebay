import { useQuery, useMutation } from '@apollo/client';
import { ALL_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from '../queries/product';
import ProductItem from '../components/ProductItem';

function AllProductsPage() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>All Products</h2>
      {data.allProducts.map(prod => (
        <ProductItem 
          key={prod.id} 
          product={prod} 
          onDelete={() => deleteProduct({ variables: { id: prod.id } })} 
          showDelete={true}
        />
      ))}
    </div>
  );
}
export default AllProductsPage;
