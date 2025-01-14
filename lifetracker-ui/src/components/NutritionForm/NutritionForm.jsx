import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CaloriesContext from '../CaloriesContext';
import "./NutritionForm.css"

const NutritionForm = ({ onSubmit, appState }) => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");


  //may delete
  const { setMealCalories } = useContext(CaloriesContext); // consume the CaloriesContext


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !calories || !imageUrl || !category) {
      setError("All fields are required");
      return;
    }
  
    onSubmit({
      name: name,
      calories: calories,
      image_url: imageUrl,
      category: category,
      user_id: appState.user.id 
    })
    .then(() => {
      setMealCalories(450, 450); // update the calories when the form is submitted
      navigate("/nutrition");
    })
      .catch((error) => {
        setError(error.message);
      });
  };
  

  return (
    <div className="nutrition-form">
      <h1 className="form-title">Nutrition Entry</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Food Name:
          <input id="name" className="form-input" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        
        <label htmlFor="calories">
          Calories:
          <input id="calories" className="form-input" name="calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
        </label>
        
        <label htmlFor="imageUrl">
          Image URL:
          <input id="imageUrl" className="form-input" name="imageUrl" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        
        <label htmlFor="category">
          Category:
          <input id="category" className="form-input" name="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        
        <button className="submit-nutrition" type="submit">Save</button>
      </form>
    </div>
  );
};

export default NutritionForm;
