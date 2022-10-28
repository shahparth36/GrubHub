const createUserModel = (mongoose) => {
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  const User = mongoose.model("User", userSchema);
  return User;
};

module.exports = createUserModel;