export type Response = {
  message?: string;
  isSuccess: boolean;
  data?: any;
};

export type UserDataProps = {
  username: string;
  password: string;
  email: string;
};
