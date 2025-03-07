import jwt from "jsonwebtoken";

// Replace 'your_secret_key' with your actual secret key
const secretKey = "Satyam";

// Function to encode user JWT
export const EncodeUserJwt = (email) => {
  // Payload data to include in the token
  const payload = { email };
  // Options for the token (e.g., expiration time)
  const options = { expiresIn: "5h" }; // Token expires in 1 hour

  // Generate the token
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

// Function to verify user JWT
export const VerifyUserJwt = (token) => {
  try {
    // Verify the token and return the decoded data
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Return the decoded payload
  } catch (error) {
    console.error("JWT verification error:", error);
    throw new Error("Invalid token");
  }
};
