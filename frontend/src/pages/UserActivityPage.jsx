import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import ProductItem from '../components/ProductItem';
import { useNavigate} from 'react-router-dom'

const USER_ACTIVITY_QUERY = gql`
  query UserActivity {
    userActivity {
      bought {
        id
        title
        category
        description
        price
        rentalEndDate
      }
      sold {
        id
        title
        category
        description
        price
      }
      borrowed {
        id
        title
        category
        description
        price
        rentalEndDate
      }
      lent {
        id
        title
        category
        description
        price
        rentalEndDate
      }
    }
  }
`;


export const RETURN_PRODUCT_QUERY = gql`
  mutation ReturnProduct($productId: ID!) {
    returnProduct(productId: $productId) {
      id
      renter { id }
    }
  }
`

export default function UserActivityGridPage() {
  const { data, loading, error } = useQuery(USER_ACTIVITY_QUERY);
  const navigate = useNavigate();
  const [returnProduct] = useMutation(RETURN_PRODUCT_QUERY, {
      refetchQueries: [{ query: USER_ACTIVITY_QUERY }],
    });

  const handleReturn = async (productId) => {
    await returnProduct({ variables: { productId} });
    navigate('/activity');
  };

  if (loading) return <p>Loading your activity…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { bought, sold, borrowed, lent } = data.userActivity;

  const sections = [
    { key: 'bought',   label: 'Bought',   items: bought },
    { key: 'sold',     label: 'Sold',     items: sold },
    { key: 'borrowed', label: 'Borrowed', items: borrowed },
    { key: 'lent',     label: 'Lent',     items: lent },
  ];

    return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Bought / Sold / Borrowed / Lent</h2>

      {/* Simplified grid container with fixed columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map(section => (
          <div
            key={section.key}
            className="border rounded-lg p-4 flex flex-col"
          >
            <h3 className="text-lg font-medium mb-4">{section.label}</h3>
            <div className="flex-1 overflow-y-auto">
              {section.items.length > 0 ? (
                <div className="space-y-4">
                  {section.items.map(prod => (
                    <ProductItem key={prod.id} product={prod} clickable={false}  onReturn={() => handleReturn(prod.id)} showReturn={section.key === 'borrowed'}/>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No {section.label.toLowerCase()} products.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
