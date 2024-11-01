import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Box,
} from "@mui/material";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("User");
  const [shoptype, setShoptype] = useState("Medicine");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    formData.type=type;
    setFormData({...formData})
    try {
      if (type == "User") {
        data = await axios.post(import.meta.env.VITE_API_URL+"/signup/user", {
          formData,
        });
      } else {
        formData.type = type;
        formData.shoptype = shoptype;
        setFormData({
          ...formData,
        });
        data = await axios.post(import.meta.env.VITE_API_URL+"/signup/retailer", {
          formData,
        });
      }
      if (data.data.error) toast.error(data.data.error);
      else {
        toast.success("successfully registered");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
          <Dropdown>
            <MenuButton sx={{ width: "9rem", left: " 10%" }}>{type}</MenuButton>
            <Menu sx={{ width: "9rem" }}>
              <MenuItem
                onClick={() => {
                  setType("User");
                }}
              >
                User
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setType("Retailer");
                }}
              >
                Retailer
              </MenuItem>
            </Menu>
          </Dropdown>
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }} action="POST">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            color="neutral"
            required
          />

          {type == "Retailer" ? (
            <>
              <TextField
                label="Shop Name"
                name="shopname"
                value={formData.shopname}
                onChange={handleChange}
                margin="normal"
                color="neutral"
                required
              />
              <Dropdown>
                <MenuButton
                  sx={{ width: "9rem", left: " 10%", marginTop: "1.5rem" }}
                >
                  {shoptype}
                </MenuButton>
                <Menu sx={{ width: "9rem" }}>
                  <MenuItem
                    value="groceries"
                    onClick={() => {
                      setShoptype("Groceries");
                    }}
                  >
                    Groceries
                  </MenuItem>
                  <MenuItem
                    value="food"
                    onClick={() => {
                      setShoptype("Food");
                    }}
                  >
                    Food
                  </MenuItem>
                  <MenuItem
                    value="medicine"
                    onClick={() => {
                      setShoptype("Medicine");
                    }}
                  >
                    Medicine
                  </MenuItem>
                  <MenuItem
                    value="clothing"
                    onClick={() => {
                      setShoptype("Clothing");
                    }}
                  >
                    Clothing
                  </MenuItem>
                  <MenuItem
                    value="electronics"
                    onClick={() => {
                      setShoptype("Electronics");
                    }}
                  >
                    Electronics
                  </MenuItem>
                  <MenuItem
                    value="books"
                    onClick={() => {
                      setShoptype("Books");
                    }}
                  >
                    Books
                  </MenuItem>
                </Menu>
              </Dropdown>

              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                color="neutral"
                required
              />
            </>
          ) : (
            <></>
          )}

          <TextField
            label="Email"
            type="email"
            name="email"
            color="neutral"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            color="neutral"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="neutral"
            fullWidth
            sx={{ marginTop: 3, padding: 1.5 }}
          >
            Signup
          </Button>
        </form>
        <br />
        <span>
          <Link to="/login">Login?</Link>
          &nbsp;
          <Link to="/">Home</Link>
        </span>
      </Box>
    </Container>
  );
};

export default Signup;
