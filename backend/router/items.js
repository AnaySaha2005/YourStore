const express = require("express");
const router=express.Router();
const isAuthorized = require("../MIddlewares/is Authorized");
const Retailer = require("../models/retailer");
const Items = require("../models/items");

router.post("/", isAuthorized, async (req, res) => {
    const id = req.id;
    let { item, amount, price } = req.body;
    const newItem = new Items({
      item,
      amount,
      price,
    });
    newItem.author = id;
    await newItem.save();
    const retailer = await Retailer.findById(id);
    retailer.itemList.push(newItem);
    await retailer.save();
    return res.json(newItem);
  });
  router.delete("/:id", isAuthorized, async (req, res) => {
    let { id } = req.params;
    let rid = req.id;
  
    try {
      await Items.findById(id).then(async (res) => {
        const retailer = await Retailer.findById(rid);
        retailer.itemList = retailer.itemList.filter((item) => {
          return item != id;
        });
        await retailer.save();
        await Items.findByIdAndDelete(id);
      });
      return res.json({ success: "Removed Item" });
    } catch (e) {
      console.log(e);
    }
  });
  module.exports=router