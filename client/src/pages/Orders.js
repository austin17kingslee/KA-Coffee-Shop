import {  faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LOGIN_SIGNUP } from '../constants/routes';
import {createOrder, getOrder} from '../redux/actions/orders'

function Orders() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const CartProducts = JSON.parse(localStorage.getItem("cartItems"));
  // const Orders = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address: "",
    productList: [
      {
        productName: "",
        price: 0,
        quantity: 0,
      }
    ],    
    total: 0
  });

  // const [customerData, setCustomerData] = useState({
  //     name: "",
  //     phone_number: "",
  //     address: "",
  // });

  // const [total, setTotal] = useState();

    useEffect(() => {
      if (!user) {
        return history.push(LOGIN_SIGNUP);
      }
    }, [history, user, CartProducts]);


    const handleSubmit = (e) => {
      e.preventDefault();
      setFormData({ ...formData, total: subTotal});
      dispatch(createOrder(formData,history));
      console.log(formData);
    };
  
    let qty =CartProducts.map((product) => product.qty).reduce((acc, val) => {
      return acc + val;
    }, 0);
 
    let subTotal = CartProducts.reduce((acc, val) => {
      return acc + val.qty * val.price;
    }, 0);

    // let cartProduct ={
    //     productName: "",
    //     price: 0,
    //     quantity: 0,
    // };
    let cartProductArray = [];

    // CartProducts.map((product) => {
    //   cartProduct.productName = product.name;
    //   cartProduct.price = product.price;
    //   cartProduct.quantity = product.qty;
    //   cartProductArray.push(cartProduct);
    // });

    for (let i=0; i < CartProducts.length; i++){
      let cartProduct ={
        productName: "",
        price: 0,
        quantity: 0,
      };
      cartProduct.productName = CartProducts[i].name;
      cartProduct.price = CartProducts[i].price;
      cartProduct.quantity = CartProducts[i].qty;
      cartProductArray.push(cartProduct);
      console.log(CartProducts[i]);
    }

    useEffect(() => {
      setFormData({...formData, productList: cartProductArray});
    }, []);

    // const onPurchase = (e) => {
    //   e.preventDefault();
    //   fetch('http://localhost:5001/order')
    //     .then(res => res.json())
    //     .then(alert(res))
    // }
    
    return (
    <section className="section">
      <form className="form" onSubmit={handleSubmit}>
        <div className="order-container">
          <h1 className="mt-4">Hello, {user?.result.name}</h1>
          <div>
              <h1 className="text-3xl mt-2">Please fill in your purchase information</h1>
              <div className="row">
                <div className="col-2">
                  <strong 
                    className="p__cormorant" 
                    >Your Full Name: 
                  </strong>
                </div>
                <div className="col-1 text-right">
                  <input
                    value={formData.name}
                    onChange={(e) =>
                        {
                        // setCustomerData({...customerData, name: e.target.value});
                        setFormData({ ...formData, name: e.target.value})
                      }
                    }
                    type="text"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <strong className="p__cormorant"
                    >Your Phone Number: 
                  </strong>
                </div>
                <div className="col-1 text-right">
                  <input
                    value={formData.phone_number}
                    onChange={(e) =>
                      {
                        // setCustomerData({...customerData, phone_number: e.target.value});
                        setFormData({ ...formData, phone_number: e.target.value})
                      }
                    }
                    type="text"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <strong className="p__cormorant"
                    >Your Address: 
                  </strong>
                </div>
                <div className="col-1 text-right">
                  <input
                    value={formData.address}
                    onChange={(e) =>
                      {
                        // setCustomerData({...customerData, address: e.target.value});
                        setFormData({ ...formData, address: e.target.value})
                      }
                    }
                    type="text"
                    className="form-input"
                  />
                </div>
              </div>
          </div>

          <div className="border-b mt-4"></div>
          {CartProducts && CartProducts.map((product) => (
            <div className="mt-4" key={product._id}>
              <div className="flex items-center">
                <img src={product.selectedFile} alt="" className="h-44" />
                <div>
                  <p>{product.name}</p>
                  <p>Quantity: {product.qty}</p>
                  <p>Price: {product.price} VND</p>
                </div>
              </div>
              <div className="border-b mt-2"></div>
            </div>
          ))}

          {/* {setFormData({ ...formData, total: total.toFixed(2) })} */}

          {CartProducts.length && (
            <div className="flex justify-end mt-4 ">
              <div className="bg-gray-100 p-5">
                <h1>
                  Subtotal( {qty <= 1 ? `${qty} item` : `${qty} items`} ): 
                  {subTotal} VND
                </h1>
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <button className="form-button" type='submit'>Purchase</button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Orders
