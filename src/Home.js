import React, { useState, useEffect } from 'react';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  console.log(items.Results);

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2015?format=json')
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

  function getCarDetails() {
    const carInfo = document.querySelectorAll('input')
    console.log(carInfo)
    const searchCar = []
    carInfo.forEach(e => searchCar.push(e.value))
    console.log(searchCar)
  }

  return (
    <div>
      <form action='' className='form-example' onSubmit={() => getCarDetails()}>
        <div className='form-example'>
          <label htmlFor='name'>Make: </label>
          <input type='text' name='name' id='car' required />
          <label htmlFor='name'>year: </label>
          <input type='text' name='name' id='car' required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {items.Results.map(item => (
          <li key={item.id}>
            {item.Make_Name}
          </li>
        ))}
        </ul>
    </div>
  )
}

export default Home
