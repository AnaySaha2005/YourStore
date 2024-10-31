import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Shop.css";
import axios from "axios";
function Shop() {
  const { id } = useParams();
  const [loading, setLoadig] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    async function render() {
      await axios
        .get(import.meta.env.VITE_API_URL + "/shop/" + id, {
          withCredentials: true,
        })
        .then((response) => {
          setData(response.data);
          setLoadig(false);
        });
   }

    render();
  }, []);
  if (loading) return <>LOADING.....</>;
  if (loading == false)
    return (
      <div className=" container shop">
        <img src={data.image} class="card-img-top shop-img" alt="..." />
        <div class="card-body">
          <h2>
            {" "}
            {data.shopname}({data.shoptype})
          </h2>
          <h6>Prop: {data.name}</h6>
          <p class="card-text">
            {data.description} <br />
            {data.address}
          </p>
          {data.itemList.length == 0 ? (
            <></>
          ) : (
            <div class="container-fluid">
              <h4>Items in Stock</h4>
              <hr />
              <div class="row  ">
                <div class="col">Item</div>
                <div class="col">InStock</div>
                <div class="col">Price</div>
              </div>
              <hr />
            </div>
          )}
          <p>
            {data.itemList.map((product) => {
              return (
                <>
                  <div class="container-fluid">
                    <div class="row ">
                      <div class="col">{product.item}</div>
                      <div class="col">{product.amount}</div>
                      <div class="col">{product.price}</div>
                      <hr />
                    </div>
                  </div>
                </>
              );
            })}
          </p>
        </div>
  
      </div>
    );
}

export default Shop;
