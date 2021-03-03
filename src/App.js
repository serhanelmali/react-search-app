import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [choosen, setChosen] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }

  const searchChangeHandler = (e) => {
    setDropdownOpen(true);
    setSearch(e.target.value);
  };

  const dropdownClickHandler = (item) => {
    setDropdownOpen(false);
    setChosen([...choosen, item]);
  };

  return (
    <div className="App">
      <div className="container-1">
        <form className="search-form">
          <input
            type="text"
            className="search"
            placeholder="Type a Name"
            value={search}
            onChange={(e) => searchChangeHandler(e)}
          />
        </form>
      </div>
      <div className="container-2">
        {search === "" || !dropdownOpen ? (
          <p class="no-search">Fill the input to see person list.</p>
        ) : (
          <ul className="suggestions">
            {data
              .filter(
                (item) =>
                  item.name.first
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.name.last.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <li
                  class="list"
                  key={index}
                  onClick={() => dropdownClickHandler(item)}
                >
                  <img className="thumbn" src={item.picture.thumbnail}></img>
                  <span className="listed">
                    {item.name.first} {item.name.last}
                  </span>
                </li>
              ))
              .slice(0, 5)}
          </ul>
        )}

        <ul class="selected">
          {choosen.length > 0 &&
            choosen.map((item) => (
              <li>
                <img class="thumbn-2" src={item.picture.thumbnail} />{" "}
                <span className="selected-span">
                  {item.name.first} {item.name.first}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
