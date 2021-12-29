import React, { useState, useEffect } from 'react';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://apis.solarialabs.com/shine/v1/vehicle-stats/specs?make={value}&model={value}&year={value}&full-data={value}&apikey={value}")
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


  return (
    <div>
      <form action='' method='get' class='form-example'>
        <div class='form-example'>
          <label for='name'>Enter your name: </label>
          <input type='text' name='name' id='name' required />
        </div>
        <div class='form-example'>
          <input type='submit' value='Subscribe!' />
        </div>
      </form>
    </div>
  )
}

export default Home
