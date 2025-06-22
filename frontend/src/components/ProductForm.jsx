import { useState } from 'react';

function ProductForm({ initialData = {}, onSubmit }) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    title: initialData.title || '',
    category: initialData.category || '',
    description: initialData.description || '',
    price: initialData.price || ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (step === 1 && !values.title) return false;
    if (step === 2 && !values.category) return false;
    if (step === 3 && !values.description) return false;
    if (step === 4 && !values.price) return false;
    return true;
  };

  const handleNext = () => {
    if (validateStep()) nextStep();
    else alert('Please fill required fields');
  };

  const wrapper = 'max-w-md mx-auto bg-white rounded shadow-md';
  const body = 'p-6';
  const footer = 'bg-gray-100 border-t px-6 py-4 flex justify-between';
  const inputStyle = 'w-full border rounded px-3 py-2 focus:outline-none focus:ring';
  const buttonPrimary = 'bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700';
  const buttonSecondary = 'bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50';

  return (
    <div className={wrapper}>
      <div className={body}>
        {step === 1 && (
          <>
            <label className="block mb-2 font-medium">Title</label>
            <input
              className={inputStyle}
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Enter product title"
            />
          </>
        )}
        {step === 2 && (
          <>
            <label className="block mb-2 font-medium">Category</label>
            <select
              className={inputStyle}
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              <option value="">Select a category…</option>
              <option value="ELECTRONICS">Electronics</option>
              <option value="FURNITURE">Furniture</option>
              <option value="OUTDOOR">Outdoor</option>
              <option value="SPORTING_GOODS">Sporting Goods</option>
              <option value="HOME_APPLIANCES">Home Appliances</option>
              <option value="TOYS">Toys</option>
            </select>
          </>
        )}
        {step === 3 && (
          <>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              className={inputStyle + ' h-32'}
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Enter a detailed description"
            />
          </>
        )}
        {step === 4 && (
          <>
            <label className="block mb-2 font-medium">Price</label>
            <input
              className={inputStyle}
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </>
        )}
        {step === 5 && (
          <>
            <h3 className="font-medium mb-3">Summary</h3>
            <div className="p-4 border rounded bg-gray-50 space-y-2 text-gray-800">
              <div><strong>Title:</strong> {values.title}</div>
              <div><strong>Category:</strong> {values.category}</div>
              <div><strong>Description:</strong> {values.description}</div>
              <div><strong>Price:</strong> ${values.price}</div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className={footer}>
        <button
          className={buttonSecondary}
          onClick={prevStep}
          disabled={step === 1}
        >
          Back
        </button>
        {step < 5 ? (
          <button className={buttonPrimary} onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className={buttonPrimary} onClick={() => onSubmit(values)}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductForm;
