export type Response = {
  message?: string;
  isSuccess: boolean;
  data?: any;
};

export type Props = {
  user: {
    id: number;
    name?: string;
  };
};

export type AuthProps = {
  name?: string;
  password: string;
  email: string;
};
