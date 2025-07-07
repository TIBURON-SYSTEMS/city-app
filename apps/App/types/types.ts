export type User = {
  id: string;
  email: string;
};

export type Participant = {
  participantId: string;
};

export type Challenge = {
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

export type Participation = {
  id: string;
  participantId: string;
  challengeId: string;
  amount: number;
};
