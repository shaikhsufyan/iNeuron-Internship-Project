import React, { useState } from "react";

function Structure() {
  const [search, setSearch] = useState("---");
  const [temp, setTemp] = useState("---");
  const [imgs, setImg] = useState();
  const [type, setType] = useState("------");

  let key = "6d83156e4e40ca97d0c6924b832fe00c";

  function getData() {
    async function get() {
      let API = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=metric`
      );
      console.log(API);
      let jsonData = await API.json();
      console.log(jsonData);
      console.log(jsonData.cod);
      if (jsonData.cod == 400) {
        alert("Please Enter City Name");
      }
      if (jsonData.cod == 404) {
        alert("Please Enter Valid City Name");
      }
      console.log(jsonData.main.temp);
      setTemp(Math.round(jsonData.main.temp));
      document.getElementById("val").value = "";
      let type = jsonData.weather[0].main;
      setType(type);

      if (type == "Clouds") {
        setImg("images/clouds.png");
      } else if (type == "Clear") {
        setImg("images/clear-sky.png");
      } else if (type == "Rain") {
        setImg("images/rain-ran.png");
      } else if (type == "Strome") {
        setImg("images/strom.png");
      } else if (type == "Snow") {
        setImg("images/rain-ran.png");
      } else if (type == "Haze") {
        setImg("images/clouds.png");
      }
    }
    get();
  }

  return (
    <>
      <div className="container">
        <h1 id="head">Weather App</h1>
        <div className="input">
          <input
            type="text"
            id="val"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Search Weather Forcast"
          />
          <button onClick={getData} id="srh">
            Search
          </button>
        </div>
        <h1 id="city">{search}</h1>
        <h1 id="deg">{temp}°C</h1>
        <h1>{type}</h1>
        <img src={imgs} />
      </div>
    </>
  );
}
export default Structure;
