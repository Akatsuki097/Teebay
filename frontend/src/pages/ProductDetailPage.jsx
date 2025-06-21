import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import ProductItem from '../components/ProductItem';

// GraphQL queries & mutations
const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    productById(id: $id) {
      id
      title
      category
      description
      price
      rentalEndDate
      createdBy { id, email }
    }
  }
`;

const BUY_PRODUCT = gql`
  mutation BuyProduct($productId: ID!) {
    buyProduct(productId: $productId) {
      id
      buyer { id }
    }
  }
`;

const RENT_PRODUCT = gql`
  mutation RentProduct($input: RentInput!) {
    rentProduct(input: $input) {
      id
      renter { id }
      rentalEndDate
    }
  }
`;

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { id } });
  const [buyProduct] = useMutation(BUY_PRODUCT);
  const [rentProduct] = useMutation(RENT_PRODUCT);
  
  const [showBuyConfirm, setShowBuyConfirm] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentDays, setRentDays] = useState(1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data.productById;

  const handleBuy = async () => {
    await buyProduct({ variables: { productId: product.id } });
    navigate('/products');
  };

  const handleRent = async () => {
    await rentProduct({ variables: { input: { productId: product.id, days: rentDays } } });
    navigate('/products');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProductItem product={product} showActions={false} />
      <div className="mt-4 flex space-x-4">
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded"
          onClick={() => setShowBuyConfirm(true)}
        >
          Buy
        </button>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded"
          onClick={() => setShowRentModal(true)}
        >
          Rent
        </button>
      </div>

      {/* Buy confirmation modal */}
      {showBuyConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Purchase</h2>
            <p>Are you sure you want to buy this product?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 py-1 px-3 rounded"
                onClick={() => setShowBuyConfirm(false)}
              >
                No
              </button>
              <button
                className="bg-purple-600 text-white py-1 px-3 rounded"
                onClick={handleBuy}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rent modal */}
      {showRentModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Rental Period (days)</h2>
            <input
              type="number"
              min="1"
              value={rentDays}
              onChange={e => setRentDays(parseInt(e.target.value, 10))}
              className="border p-2 rounded w-full"
            />
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 py-1 px-3 rounded"
                onClick={() => setShowRentModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white py-1 px-3 rounded"
                onClick={handleRent}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}