import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return token; 
};
export const generateTokenAdmin = (email: string) => {
  const token = jwt.sign(
    { id: email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return token;
};
