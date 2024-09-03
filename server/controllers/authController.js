const bcrypt = require("bcryptjs"); //verify & hashing password

const registerController = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log('Received Data:', { email, password, role });
  
      // Validate role
      const validRoles = ["User", "Admin"];
      if (!validRoles.includes(role)) {
        return res.status(400).send({
          success: false,
          message: "Invalid role",
        });
      }
  
      // Ensure required fields are provided
      if (!email || !password || !role) {
        return res.status(400).send({
          success: false,
          message: "Email, password, and role are required",
        });
      }
  
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "User already exists",
        });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user data based on role
      const userData = {
        email,
        password: hashedPassword,
        role,
      };
  
      // Create and save the new user
      const user = new userModel(userData);
      await user.save();
  
      return res.status(201).send({
        success: true,
        message: `${role} registered successfully`,
        user,
      });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).send({
        success: false,
        message: "Error in Register API",
        error,
      });
    }
  };
  
  module.exports = { 
    registerController, 
};
