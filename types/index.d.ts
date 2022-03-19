export type Response = {
  message?: string;
  isSuccess: boolean;
  data?: any;
};

export interface IAuthResponse extends Response {
  accessToken?: string;
  id?: number;
}

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

export interface ICashflowProp extends Props {
  action: 'create' | 'update' | 'delete';
  profit: number;
  income: number;
  currency: any;
  monthAndYear: string;
  costs: { name: string; limit: number }[];
  cashflowId?: number;
}
