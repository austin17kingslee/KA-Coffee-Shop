import React,{useContext} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SetContext } from "../../context/edit";
import {deletePost} from '../../redux/actions/products'

function ProductList({ handleClick, Delete, Edit }) {
  const setCurrentId = useContext(SetContext);
  const dispatch = useDispatch();
  const ProductData = useSelector((state) => state.productReducer);

  const CannedCoffee = ProductData.filter(product => product.category === "canned coffee");
  const InstantCoffee = ProductData.filter(product => product.category === "instant coffee");
  const BottledCoffee = ProductData.filter(product => product.category === "bottled coffee");


    return (
      <div>
        {CannedCoffee.length > 0 && (
          <section className="product-section">
            <div className="product-container">
              <h1 className="product-header">Canned Coffee</h1>
              <div className="card-container ">
                {CannedCoffee.map((product) =>  
                  (<div className="" key={product._id}>
                    <div className="card-body transform duration-150 ease-in sm:hover:scale-110">
                      <img
                        src={product.selectedFile}
                        alt="product"
                        className="card-image"
                      />
                      <div className="card-details">
                        <h1 className="card-heading">{product.name}</h1>
                        <p className="card-text">Category: {product.category}</p>
                        <p className="card-text">Quantity: {product.quantity}</p>
                        <p className="card-text">Price: {product.price} VND</p>
                        {Edit && (
                          <div className="line-clamp-3 mt-3">
                            {" "}
                            {product.description}
                          </div>
                        )}
                      </div>
                      {handleClick && (
                        <Link
                          to={`/details/${product._id}`}
                          onClick={handleClick}
                        >
                          <div className="card-footer">
                            <p> View</p>
                          </div>
                        </Link>
                      )}

                      {Edit && (
                        <div className="card-footer" onClick={()=>setCurrentId(product._id)}>
                          <p>Edit</p>
                        </div>
                      )}
                      {Delete && (
                        <div className="card-footer bg-red-400" onClick={()=>dispatch(deletePost(product._id))}>
                          <p>Delete</p>
                        </div>
                      )}
                  </div>
                  </div>)
                  )
                }
              </div>
            </div>
          </section>
        )}
        {InstantCoffee.length > 0 && (
          <section className="product-section">
            <div className="product-container">
              <h1 className="product-header">Instant Coffee</h1>
              <div className="card-container ">
                {InstantCoffee.map((product) =>  
                  (<div className="" key={product._id}>
                    <div className="card-body transform duration-150 ease-in sm:hover:scale-110">
                      <img
                        src={product.selectedFile}
                        alt="product"
                        className="card-image"
                      />
                      <div className="card-details">
                        <h1 className="card-heading">{product.name}</h1>
                        <p className="card-text">Category: {product.category}</p>
                        <p className="card-text">Quantity: {product.quantity}</p>
                        <p className="card-text">Price: {product.price} VND</p>
                        {Edit && (
                          <div className="line-clamp-3 mt-3">
                            {" "}
                            {product.description}
                          </div>
                        )}
                      </div>
                      {handleClick && (
                        <Link
                          to={`/details/${product._id}`}
                          onClick={handleClick}
                        >
                          <div className="card-footer">
                            <p> View</p>
                          </div>
                        </Link>
                      )}

                      {Edit && (
                        <div className="card-footer" onClick={()=>setCurrentId(product._id)}>
                          <p>Edit</p>
                        </div>
                      )}
                      {Delete && (
                        <div className="card-footer bg-red-400" onClick={()=>dispatch(deletePost(product._id))}>
                          <p>Delete</p>
                        </div>
                      )}
                  </div>
                  </div>)
                  )
                }
              </div>
            </div>
          </section>
        )}
        {BottledCoffee.length > 0 && (
          <section className="product-section">
            <div className="product-container">
              <h1 className="product-header">Bottled Coffee</h1>
              <div className="card-container ">
                {BottledCoffee.map((product) =>  
                  (<div className="" key={product._id}>
                    <div className="card-body transform duration-150 ease-in sm:hover:scale-110">
                      <img
                        src={product.selectedFile}
                        alt="product"
                        className="card-image"
                      />
                      <div className="card-details">
                        <h1 className="card-heading">{product.name}</h1>
                        <p className="card-text">Category: {product.category}</p>
                        <p className="card-text">Quantity: {product.quantity}</p>
                        <p className="card-text">Price: {product.price} VND</p>
                        {Edit && (
                          <div className="line-clamp-3 mt-3">
                            {" "}
                            {product.description}
                          </div>
                        )}
                      </div>
                      {handleClick && (
                        <Link
                          to={`/details/${product._id}`}
                          onClick={handleClick}
                        >
                          <div className="card-footer">
                            <p> View</p>
                          </div>
                        </Link>
                      )}

                      {Edit && (
                        <div className="card-footer" onClick={()=>setCurrentId(product._id)}>
                          <p>Edit</p>
                        </div>
                      )}
                      {Delete && (
                        <div className="card-footer bg-red-400" onClick={()=>dispatch(deletePost(product._id))}>
                          <p>Delete</p>
                        </div>
                      )}
                  </div>
                  </div>)
                  )
                }
              </div>
            </div>
          </section>
        )}
        {!ProductData.length && (
          <div className="p-10 text-center">
            <h1 className="text-3xl">Product List</h1>
            <h1 className="text-center text-lg animate-pulse font-bold mt-4">
              Loading items...
            </h1>
          </div>
        )}
      </div>
    );
     
}

 export default ProductList
