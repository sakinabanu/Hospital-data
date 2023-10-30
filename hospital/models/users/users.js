import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // -- firstname, lastname, email, password, confirmpassword, phone, address, role, userverifed, userverifytoken, isSuspended

    firstName: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 2,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
      },
    address: {
      type: String,
      required: true,
      maxlength: 100,
    },
    userverified: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    userverifytoken: {
      email: {
        type: String,
        default: null,
      },
      phone: {
        type: String,
        default: null,
      },
    },
  },
  { timestamp: true }
);

export default mongoose.model("Users", userSchema, "Users");