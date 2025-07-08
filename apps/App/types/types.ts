import { Float } from "react-native/Libraries/Types/CodegenTypes";

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
  brandName: string;
  description: string;
  rewards: Reward[];
  product: string;
  // users: User[];
  amount: number;
};

export type Reward = {
  id: string;
  label: string;
  amount: number;
  challengeId: string;
  imageUrl: string;
};

export type ParticipationData = {
  isParticipating: boolean;
  participation: Participation | null;
};

export type Participation = {
  id: string;
  participantId: string;
  challengeId: string;
  amount: number;
};

export type Brand = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
};
export type Bin = {
  id: string;
  label: string;
  type: string;
  latitude: number;
  longitude: number;
}
