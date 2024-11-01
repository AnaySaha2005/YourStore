if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
const app = express();

const signupRouter = require("./router/signup");
const loginRouter = require("./router/login");
const itemsRouter = require("./router/items");
const shopRouter = require("./router/shop");

const User = require("./models/user");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const dburl = process.env.ATLAS_DBURL;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = 3000;
const cors = require("cors");
const isAuthorized = require("./MIddlewares/is Authorized");
const Retailer = require("./models/retailer");
const Items = require("./models/items");
const corsOptions = {
  origin: "https://your-store-alpha.vercel.app",
  credentials: true,
};
const multer = require("multer");
const { cloudinary, storage } = require("./cloudConfig");
const upload = multer({ storage });
const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60,
});
store.on("error", () => {
  console.log("error in mogo session store", err);
});
async function main() {
  await mongoose.connect(dburl);
  console.log("db connected");
}
main().catch((err) => console.log(err));

app.use(cors(corsOptions));
app.get("/", cors(), (req, res) => res.json({ greet: "App listening here" }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/item", itemsRouter);
app.use("/shop", shopRouter);

//MISC ROUTING

app.get("/getcookie", (req, res) => {
  return res.json(req.cookies.access_token);
});

app.patch("/", isAuthorized, upload.single("file"), async (req, res) => {
  const id = req.id;
  const { username, email, password, description } = req.body;
  try {
    const getuser = await User.findById(id);
    let getretailer = await Retailer.findById(id).populate("itemList"); //updating retailer

    if (getuser) {
      if (bcrypt.compareSync(password, getuser.password)) {
        if (email != getuser.email) {
          let user = await User.findOne({ email: email });
          if (user != null) return res.json({ error: "email already exixts" });
        }
        await User.updateOne(
          { _id: id },
          {
            name: username,
            email: email,
            image: req.file ? req.file.path : getuser.image,
          }
        );
        let { password, ...rest } = getuser._doc;
        return res.json({ success: "Updated successfully", data: rest });
      } else return res.json({ error: "password is incorrect" });
    } else if (getretailer) {
      if (bcrypt.compareSync(password, getretailer.password)) {
        await Retailer.updateOne(
          { _id: id },
          {
            name: username,
            email: email,
            image: req.file ? req.file.path : getretailer.image,
            description: description,
          }
        );
        let { password, ...rest } = getretailer._doc;
        return res.json({ success: "Updated successfully", data: rest });
      } else return res.json({ error: "password is incorrect" });
    } else return res.json({ error: "Not a user or retailer" });
  } catch (e) {
    console.log("error");
  }
});

app.get("/logout", isAuthorized, (req, res) => {
  console.log("logout");
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ success: "Logged Out successfully" });
});

app.delete("/:password", isAuthorized, async (req, res) => {
  let password = req.params.password;

  const id = req.id;
  try {
    const getuser = await User.findById(id);
    if (getuser) {
      if (bcrypt.compareSync(password, getuser.password)) {
        await User.deleteOne({ _id: id });
        return res.json({ success: "Deleted Account Succesfully" });
      } else return res.json({ error: "password incorrect" });
    }

    const getretailer = await Retailer.findById(id);
    if (getretailer) {
      if (bcrypt.compareSync(password, getretailer.password)) {
        await Retailer.findById(id).then(async (res) => {
          for (const item of res.itemList) {
            await Items.deleteOne({ _id: item }).then((res) =>
              console.log(res)
            );
          }
          await Retailer.deleteOne({ _id: id });
        });

        return res.json({ success: "Deleted Account Succesfully" });
      } else return res.json({ error: "password incorrect" });
    }
  } catch (e) {
    console.log(e);
  }
});
app.use((err, req, res) => {
  if (err) res.json(err);
  return res.json("NO ERROR HERE MAN");
});
