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

export interface ICashflowProp extends Props {
  cashflow: number;
  income: number;
  currency: any;
  monthAndYear: string;
  costs: { name: string; limit: number }[];
}
