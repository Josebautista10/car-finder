import React, { useState, useEffect } from 'react';

function Home() {
  const [error, setError] = useState(null);
  const [make, setMake] = useState(null);
  const [year, setYear] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target)
    const makeInput = event.target.make.value; // accessing directly
    // const yearInput = event.target.elements.year.value; // accessing via `form.elements`
    console.log(makeInput)
    setMake(makeInput)
    // setYear(yearInput)
  };
  
  console.log(make); 
  const listOfCars = items.filter(car => car.make === make).map(car => {
    return <li>{car.year}</li>
  })

  console.log(listOfCars)


  useEffect(() => {
    fetch("https://private-anon-ed07454f4c-carsapi1.apiary-mock.com/cars")
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
  console.log(items.filter(e => e.horsepower < 150))
  
  return (
    <div>
      <form action='' className='form-example' onSubmit={handleSubmit}>
        <div className='form-example'>
          <label htmlFor='name'>Make: </label>
          <input type='text' name='make' id='car' required />
          {/* <label htmlFor='year'>year: </label>
          <input type='number' name='year' id='car' required /> */}
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {listOfCars}
        </ul>
    </div>
  )
}

export default Home
