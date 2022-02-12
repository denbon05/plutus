export type Response = {
  message?: string;
  isSuccess: boolean;
  data?: any;
};

export type UserDataProps = {
  name: string;
  password: string;
  email: string;
};
