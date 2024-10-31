import axios from "axios";
import "./Body.css";
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Body() {
  const navigate = useNavigate();
  let [cards, setCards] = useState([{}]);
  const search=useSelector((state)=>state.searchBar)
  useEffect(() => {
    async function getData() {
      const params={search:search}
      const result = await axios.get(import.meta.env.VITE_API_URL+"/shop", {
        params,
        withCredentials: true,
      });
      setCards(result.data);
    }
    getData();
  }, [search]);
  return (
    <>
      <div className="row costom row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-xs-1 mt-3">
        {cards.map((data) => {
          return (
            <div
              className="card col"
              style={{ width: "18rem" }}
              onClick={() => {
                navigate("/shop/" + data._id);
              }}
            >
              <img src={data.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{data.shopname}</h5>
                <p className="card-text">{data.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
