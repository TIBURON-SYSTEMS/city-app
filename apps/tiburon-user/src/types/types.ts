export type User = {
  id: string;
  email: string;
};

export type Participant = {
  participantId: string;
  participation: [];
};

export type Challenge = {
  id: string;
  label: string;
  status: string;
  goal: number;
  brandId: string;
  brandName: string;
  description: string;
  endDate: Date;
  rewards: Reward[];
  productName: string;
  // users: User[];
  amount: number;
};

export type OnGoingAvailableRes = {
  ongoingChallengesRes: Challenge[];
  completedChallengesRes: Challenge[];
  availableChallengesRes: Challenge[];
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
  completed: boolean;
  updatedAt: Date;
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
  latitude: string;
  longitude: string;
};

export type AiResultResponse = {
  message: string;
  result: aiResultInterface;
  success: boolean;
};

export type DisposedProduct = {
  label: string;
  material: string;
  brandName: string;
};

export type disposalResult = {
  id: string;
  disposedProduct: DisposedProduct;
  amount: number;
  confidence: string;
};

export interface aiResultInterface {
  detectedItems: disposalResult[];
  timestamp: string;
}

export type ChallengeProduct = {
  id: string;
  challengeId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  challenge: {
    id: string;
    label: string;
    status: string;
    endDate: Date;
    description: string;
    goal: number;
    brandId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type AffectedChallengeWithAmount = {
  challengeTitle: string;
  amount: number;
  challengeId: string;
  completed: boolean;
};

export type ChallengeWithRewards = {
  challengeId: string;
  challengeLabel: string;
  rewards: {
    id: string;
    amount: number;
    label: string;
    imageUrl: string | null;
  }[];
};

export type EligibleReward = {
  id: string;
  userId: string;
};

export type ParticipantReward = {
  rewardId: string;
  selected: true;
  participantId: string;
  reward: Reward;
};
