import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return token;
};

export default generateToken;