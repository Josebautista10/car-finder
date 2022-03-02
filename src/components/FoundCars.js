import React from 'react'

function FoundCars(props) {
const {cars, make} = props
  
  const filterCars = cars.filter(car => car.make ===make)
  let foundCars = filterCars.length
  
  const listOfCars = filterCars.map(car => {
    return <li key={car.id}>
    <img src={car.img_url} alt={car.model}/>
    <h4>model: {car.model}</h4>
    <p>year: {car.year}</p>
    <p>horsepower: {car.horsepower}</p>
    </li>
  })

  return (
    <ul>
      {foundCars ?<h1>Found {foundCars} cars</h1> : ''}
        {listOfCars}
        </ul>
  )
}

export default FoundCars