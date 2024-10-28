import express from "express";
import multer from "multer";
import mongoose, { model, Schema } from "mongoose";
import { uploadOnCloudinary } from "./utils/cloudinary.js";
import dotenv from "dotenv";

const app = express();

// multer -----------------------------------------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// configration -----------------------------------------------------------------
dotenv.config({
  path: "./.env",
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Db connect -----------------------------------------------------------------
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/CRUD_With_images`
    );
    console.log(
      `Mongo DB connected successfully : DB Host > ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Mongo DB Connection failed ERROR :: ${error}`);
    process.exit(1);
  }
};

// model -----------------------------------------------------------------
const userSchema = new Schema({
  avatar: String,
  coverImage: String,
  fullName: String,
  email: String,
  phone: String,
});

const User = model("User", userSchema);

// Routes -----------------------------------------------------------------
app.get("/", (req, res) => {
  return res.render("index");
});

app.post(
  "/upload",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  async (req, res) => {
    const { fullName, email, phone } = req.body;
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    await User.create({
      avatar: avatar?.url || "",
      coverImage: coverImage?.url || "",
      fullName,
      email,
      phone,
    });

    return res.redirect("/all");
  }
);

app.get("/all", async (req, res) => {
  const data = await User.find();
  return res.render("all", { data });
});

app.get("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete({ _id: userId });
  return res.redirect("/all");
});

app.get("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  return res.render("update", { user });
});

app.post("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const { phone, fullName, email } = req.body;
  const updatedData = { phone, fullName, email };

  const updated = await User.findOneAndUpdate({ _id: userId }, updatedData, {
    new: true,
  });

  return res.redirect("/all");
});

// listen -----------------------------------------------------------------
const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Running on this Port : ", port);
    });
  })
  .catch(() => {
    console.log(`Mongo DB Connection Error`);
  });
