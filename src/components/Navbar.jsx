import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
 const handleLogout = async(e)=>{
  try {
    localStorage.removeItem("authtoken")
  } catch (error) {
    console.log(`Error logging you out ${error}`);
  }
 }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand fs-2 fst-italic" >Calogerus</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">Home</Link>
        </li>
        
        
        {!localStorage.getItem("authtoken")?<li className="nav-item">
          <Link to="/signup" className="nav-link">Signup</Link>
        </li> : ""}
        
        {localStorage.getItem("authtoken") ? <li className="nav-item">
          <Link to="/orders"  className="btn bg-white text-success mx-1">My Orders</Link>
          <Link to="/cart"  className="btn bg-white text-success mx-1">My Cart</Link>
        </li> : "" }

        {localStorage.getItem("authtoken")? <li className="nav-item">
          <Link to="/login" className="btn btn-danger mx-1" onClick={handleLogout} >Logout</Link>
        </li> : <li className="nav-item">
          <Link to="/login" className="nav-link" >Login</Link>
        </li>}
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
