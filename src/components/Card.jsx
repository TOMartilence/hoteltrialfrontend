import React from 'react';

function Card(props) {
  const handleAddToCart = async(e)=>{
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div>
      <div className="card m-5" style={{ width: "18rem" }}>
        <img src={props.imageUrl} className="card-img-top" alt="Food" style={{width:"100%",height:"250px"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            {props.description}
          </p>
          <div className="container">
            <select className="m-2 h-100 bg-warning rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-warning rounded">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
            <div className="d-inline h-100 fs-5">Total Price</div>
            <hr />
            <button className="btn btn-success" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;
