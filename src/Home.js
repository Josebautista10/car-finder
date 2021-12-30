import React, { useState, useEffect } from 'react';

function Home() {
  const [error, setError] = useState(null);
  const [make, setMake] = useState(null);
  const [year, setYear] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  console.log(typeof(items.Results))
  console.log(items)
  for (let item in items.Results) {
    console.log(items.Results[item].Make_Name, items.Results[item].Model_Name)
  }


  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target)
    const makeInput = event.target.make.value; // accessing directly
    const yearInput = event.target.elements.year.value; // accessing via `form.elements`
    setMake(makeInput)
    setYear(yearInput)


    console.log(make); 
    console.log(year); 
};

  useEffect(() => {
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${year}?format=json`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const list = items.Results.map(item => (
    <li>
    {/* gotta wait for something to load before I can display */}
      {item.Make_Name} {item.Model_Name}
    </li>
  ))

  

  return (
    <div>
      <form action='' className='form-example' onSubmit={handleSubmit}>
        <div className='form-example'>
          <label htmlFor='name'>Make: </label>
          <input type='text' name='make' id='car' required />
          <label htmlFor='year'>year: </label>
          <input type='number' name='year' id='car' required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {list}
        </ul>
    </div>
  )
}

export default Home
