const express = require("express");
const router = express.Router();
const Retailer = require("../models/retailer");
const Items = require("../models/items");

router.get("/", async (req, res) => {
  const search = req.query.search;
  let result = [];
  try {
    await Retailer.find({
      shopname: { $regex: search, $options: "i" },
    })
      .populate("itemList")
      .then(async (output) => {
        if (output.length != 0) result = output; //if we found any shopname
        else {
          //else we find items with those name
          await Items.find({ item: { $regex: search, $options: "i" } })
            .populate("author")
            .then(async (outputs) => {
              for (output of outputs) {
                result.push(
                  await Retailer.findById(output.author._id).populate(
                    "itemList"
                  )
                );
              }
              result = Array.from(
                new Map(result.map((item) => [item.id, item])).values()
              );
            });
        }
      });
  } catch (e) {
    console.log(e);
  }
  return res.json(result);
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await Retailer.findById(id).populate("itemList");
    return res.json(result);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
