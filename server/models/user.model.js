const createUserModel = (mongoose) => {
  const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      contactNo: { type: Number, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      address: { type: String },
      role: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  const User = mongoose.model("User", userSchema);
  return User;
};

module.exports = createUserModel;
