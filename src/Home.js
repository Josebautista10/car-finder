import React, { useState, useEffect } from 'react';
import FoundCars from './components/FoundCars'

function Home() {
  const [error, setError] = useState(null);
  const [make, setMake] = useState(null);
  const [year, setYear] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cars, setCars] = useState([]);


  
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
  const filterCars = cars.filter(car => car.make === make)
  let foundCars = filterCars.length
  const listOfCars = filterCars.map(car => {
    return <li key={car.id}>
    <img src={car.img_url} alt={car.model}/>
    <h4>model: {car.model}</h4>
    <p>year: {car.year}</p>
    <p>horsepower: {car.horsepower}</p>
    </li>
  })

  console.log(listOfCars)


  useEffect(() => {
    fetch("https://private-anon-ed07454f4c-carsapi1.apiary-mock.com/cars")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCars(result);
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
      <FoundCars cars={cars} make={make}/>
    </div>
  )
}

export default Home
