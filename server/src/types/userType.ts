

export interface IUser  {
  name: string;
  email: string;
  password: string;
  cartData: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}