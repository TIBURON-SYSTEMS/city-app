type User = {
  id: string;
  email: string;
};

type Challenge = {
  id: string;
  label: string;
  status: string;
  goal: number;
  brandId: string;
  brand: string;
  description: string;
  rewards: string[];
  product: string;
  users: User[];
  amount: number;
};

export default Challenge;
