import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/fooddata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      
      setFoodCat(response[0]);
      setFoodItem(response[1]);
    } catch (error) {
      console.log("Couldn't load data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="body">
        <nav className="mt-5 md-5 w-60">
          <div className="container-fluid"></div>
        </nav>

        <div className="mx-3 ">
          <form className="d-flex" role="search" style={{width:"65%",margin:"auto"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={handleSearchChange}
            />
            
          </form>
        </div>

        <div className="container">
          {foodCat.length > 0 &&
            foodCat.map((category, index) => {
              const filteredItems = foodItem.filter(
                (item) =>
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              );
              return (
                <div key={index} className="row">
                  <div className="fs-3 m-3 col-12">{category.CategoryName}</div>
                  {filteredItems.map((item, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-3">
                      <Card
                        name={item.name}
                        imageUrl={item.img}
                        description={item.description}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
