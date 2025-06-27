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
  user: {
    id: string;
    email: string;
  };
  amount: number;
};

export default Challenge;
