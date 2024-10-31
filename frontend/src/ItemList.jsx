import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ItemList.css";
import toast from "react-hot-toast";
import { remove, update } from "./redux/isLogged/isLogged";
//itemList consists of object of itemList Model
const ItemList = () => {
  const dispatch = useDispatch();
  const loginData = useSelector((data) => data.isLogged.loginData);
  const [state, setState] = useState({ item: "", amount: 0, price: 0 });
  axios.defaults.withCredentials = true
  async function addItem(e) {
    e.preventDefault();
    if (state.item != "" || state.amount != 0 || state.price != 0) {
      try {
        const  response = await axios.post(import.meta.env.VITE_API_URL+"/item", {
          ...state,
        });
        dispatch(update(response.data));
      } catch (e) {
        console.log(e);
      }
    } else toast.error("Invalid Item");
  }
  async function deleteItem(item) {
    try{
      const response=await axios.delete(import.meta.env.VITE_API_URL+
        "/item/"+item._id)
      dispatch(remove(item));
      console.log("done")
    }
    catch(e){
      console.log(e);
    }
   
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      {loginData.itemList.length == 0 ? (
        <></>
      ) : (
        <div class="container-fluid">
          <h4>Items</h4>
          <hr />
          <div class="row  ">
            <div class="col">Item</div>
            <div class="col">InStock</div>
            <div class="col">Price</div>
            <div className="col"></div>
          </div>
          <hr />
        </div>
      )}

      {loginData.itemList.map((item) => {
        return (
          <>
            <div class="container-fluid">
              <div class="row ">
                <div class="col">{item.item}</div>
                <div class="col">{item.amount}</div>
                <div class="col">{item.price}</div>
                <div
                  className="col btn btn-dark btn-sm"
                  onClick={() => {
                    deleteItem(item);
                  }}
                >
                  Delete
                </div>
                <hr />
              </div>
            </div>
          </>
        );
      })}

      <br />

      <div className="form-inline">
        <input
          onChange={handleChange}
          type="text"
          class="form-control"
          name="item"
          required
          placeholder="Enter Item name"
        />
        <input
          onChange={handleChange}
          type="number"
          class="form-control"
          required
          name="amount"
          placeholder="Enter Amount"
        />
        <input
          onChange={handleChange}
          type="number"
          class="form-control"
          name="price"
          required
          placeholder="Enter cost of Each"
        />
        <button type="button" className="btn btn-dark" onClick={addItem}>
          Add
        </button>
      </div>
    </div>
  );
};

export default ItemList;
