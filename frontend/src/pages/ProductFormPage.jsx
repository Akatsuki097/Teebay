import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { CREATE_PRODUCT_MUTATION, MY_PRODUCTS_QUERY, UPDATE_PRODUCT_MUTATION, GET_PRODUCT_QUERY , ALL_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION} from '../queries/product';
import ProductForm from '../components/ProductForm';

function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_PRODUCT_QUERY, { variables: { id }, skip: !isEdit });

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
  onCompleted: () => navigate('/my-products'),
  refetchQueries: [{ query: MY_PRODUCTS_QUERY }]
});

const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
  update(cache, { data: { deleteProduct }, context: { id: deletedId } }) {
    const existing = cache.readQuery({ query: ALL_PRODUCTS_QUERY });
    cache.writeQuery({
      query: ALL_PRODUCTS_QUERY,
      data: { allProducts: existing.allProducts.filter(p => p.id !== deletedId) }
    });
  }
});

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
    onCompleted: () => navigate('/my-products')
  });

  if (loading) return <p>Loading...</p>;

  const initialData = isEdit ? data.productById : {};
  const handleSubmit = (values) => {
    if (isEdit) {
      updateProduct({ variables: { id, input: values } });
    } else {
      createProduct({ variables: { input: {
        title: values.title,
        category: values.category,
        description: values.description,
        summary: values.summary,
        price: parseFloat(values.price)
      } } });
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Product' : ''}</h2>
      <ProductForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
export default ProductFormPage;
