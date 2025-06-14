import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import {
  GET_PRODUCT_QUERY,
  UPDATE_PRODUCT_MUTATION,
} from '../queries/product'

const CATEGORY_OPTIONS = [
  'ELECTRONICS',
  'FURNITURE',
  'HOME_APPLIANCES',
  'SPORTING_GOODS',
  'OUTDOOR',
  'TOYS',
]

const RENT_UNITS = ['per hour', 'per day', 'per week']

export default function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GET_PRODUCT_QUERY, {
    variables: { id },
  })

  const [title, setTitle]           = useState('')
  const [categories, setCategories] = useState([])
  const [description, setDescription] = useState('')
  const [price, setPrice]           = useState('')
//   const [rent, setRent]             = useState('')
//   const [rentUnit, setRentUnit]     = useState(RENT_UNITS[0])

 
  useEffect(() => {
    if (data?.productById) {
      const p = data.productById
      setTitle(p.title)
      setCategories([p.category])
      setDescription(p.description || '')
      setPrice(p.price)
    //   setRent(p.rent || '')
    //   setRentUnit(p.rentUnit || RENT_UNITS[0])
    }
  }, [data])

  const [updateProduct, { loading: saving }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      onCompleted: () => navigate('/my-products'),
      onError: (e) => alert(e.message),
    }
  )

  if (loading) return <p>Loading product…</p>
  if (error)   return <p>Error: {error.message}</p>

  function handleSubmit(e) {
    e.preventDefault()
    updateProduct({
      variables: {
        id,
        input: {
          title,
          category: categories[0],
          description,
          price: parseFloat(price),
        //   rent: parseFloat(rent),
        //   rentUnit,
        },
      },
    })
  }

  const formatCategory = (cat) => {
    const text = cat.replace(/_/g, ' ').toLowerCase()
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-6">Edit product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Categories</label>
          <select
            value={categories[0] || ''}
            onChange={e => setCategories([e.target.value])}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">— select —</option>
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>
                {formatCategory(cat)}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows={6}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Price & Rent */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full border rounded-r px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Rent</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l">
                $
              </span>
              <input
                type="number"
                // value={rent}
                // onChange={e => setRent(e.target.value)}
                className="w-full border px-3 py-2"
              />
              <select
                // value={rentUnit}
                //onChange={e => setRentUnit(e.target.value)}
                className="border px-3 py-2 rounded-r"
              >
                {RENT_UNITS.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            {saving ? 'Saving…' : 'Edit Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
