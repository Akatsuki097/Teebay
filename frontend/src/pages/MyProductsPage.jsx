import { useQuery, useMutation } from '@apollo/client';
import { MY_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from '../queries/product';
import ProductItem from '../components/ProductItem';

function MyProductsPage() {
  const { loading, error, data } = useQuery(MY_PRODUCTS_QUERY);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: MY_PRODUCTS_QUERY }]
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;



  return (
    <div>
      <h2>My Products</h2>
      {data.myProducts.map(prod => (
        <ProductItem 
          key={prod.id} 
          product={prod} 
          onDelete={() => deleteProduct({ variables: { id: prod.id } })} 
          showDelete={true}
          showEdit={true}
        />
      ))}
    </div>
  );
}
export default MyProductsPage;
