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


  switch(step) {
    case 1:
      return (
        <div>
          <h3>Step 1: Title</h3>
          <input name="title" value={values.title} onChange={handleChange} />
          <button onClick={handleNext}>Next</button>
        </div>
      );
    case 2:
      return (
        <div>
          <h3>Step 2: Category</h3>
          <select name="category" value={values.category} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="FURNITURE">Furniture</option>
            <option value="OUTDOOR">Outdoor</option>
            <option value="SPORTING_GOODS">Sporting Goods</option>
            <option value="HOME_APPLIANCES">Home Appliances</option>
            <option value="TOYS">TOYS</option>
          
          </select>
          <button onClick={prevStep}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    case 3:
      return (
        <div>
          <h3>Step 3: Description</h3>
          <textarea name="description" value={values.description} onChange={handleChange} />
          <button onClick={prevStep}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    case 4:
      return (
        <div>
          <h3>Step 4: Price</h3>
          <input name="price" type="number" value={parseFloat( values.price)} onChange={handleChange} />
          <button onClick={prevStep}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    case 5:
        const { title, category, description, price } = values;      return (
        <div>
          <h3>Summary</h3>
          <div className="p-4 border rounded bg-gray-50 space-y-2">
              <div><strong>Title:</strong> {title}</div>
              <div><strong>Category:</strong> {category}</div>
              <div><strong>Description:</strong> {description}</div>
              <div><strong>Price:</strong> ${price}</div>
          </div>
          <button onClick={prevStep}>Back</button>
          <button onClick={() => onSubmit(values)}>Submit</button>
        </div>
      );
    default:
      return null;
  }
}

export default ProductForm;
