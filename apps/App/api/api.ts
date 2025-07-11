import {
  AffectedChallengeWithAmount,
  AiResultResponse,
  Bin,
  Brand,
  Challenge,
  ChallengeWithRewards,
  Participant,
  ParticipationData,
} from "@/types/types";
import { AI_SERVER_URL, BASE_URL } from "@/utils/baseUrl";

const api = {
  async getUserByEmail(
    email: string | undefined
  ): Promise<Participant | undefined> {
    const res = await fetch(`${BASE_URL}/api/participant/email/${email}`);
    const data = await res.json();

    return data;
  },

  async getOnGoingAvailableChallenges(
    pariticipantId: string | undefined
  ): Promise<{
    ongoingChallengesRes: Challenge[];
    availableChallengesRes: Challenge[];
    completedChallengesRes: Challenge[];
  }> {
    if (!pariticipantId)
      return {
        ongoingChallengesRes: [],
        availableChallengesRes: [],
        completedChallengesRes: [],
      };

    const res = await fetch(
      `${BASE_URL}/api/participant/challenges/${pariticipantId}`
    );
    const data = await res.json();

    if (!data)
      return {
        ongoingChallengesRes: [],
        availableChallengesRes: [],
        completedChallengesRes: [],
      };

    return data;
  },

  async getChallenges(): Promise<Challenge[]> {
    const res = await fetch(`${BASE_URL}/api/challenges`);
    const data = await res.json();

    if (!data) return [];

    return data.challenges;
  },
  async getChallengeProgress(
    participandId: string | undefined,
    challengeId: string
  ): Promise<ParticipationData | undefined> {
    const res = await fetch(
      `${BASE_URL}/api/participation?participantId=${participandId}&challengeId=${challengeId}`
    );

    const data = await res.json();

    return data;
  },
  async getChallengeById(id: string): Promise<Challenge | undefined> {
    const res = await fetch(`${BASE_URL}/api/challenge/${id}`);
    const data = await res.json();

    if (!data) return;

    return data.challengeRes;
  },
  async getBrandInfo(id: string): Promise<Brand | undefined> {
    const res = await fetch(`${BASE_URL}/api/brand/${id}`);
    const data = await res.json();

    return data.brand;
  },
  async createParticipation(
    participantId: string | undefined,
    challengeId: string
  ) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participantId, challengeId }),
    };

    const res = await fetch(`${BASE_URL}/api/participation`, options);
    const data = await res.json();
    return data;
  },
  async getBinByPositionType(
    lat: number,
    lon: number,
    type: string
  ): Promise<Bin | undefined> {
    const res = await fetch(
      `${BASE_URL}/api/bin?lat=${lat}&lon=${lon}&type=${type}`
    );
    const data = await res.json();

    return data;
  },

  async startAnalysis(payload: {
    before: string;
    after: string;
    filenameBefore: string;
    filenameAfter: string;
    typeBefore: string;
    typeAfter: string;
  }): Promise<AiResultResponse> {
    const res = await fetch(`${AI_SERVER_URL}/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  },
  async createDisposal(
    participantId: string | undefined,
    binId: string | undefined,
    binType: string | undefined,
    aiResult: AiResultResponse
  ): Promise<AffectedChallengeWithAmount[]> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participantId, binId, binType, aiResult }),
    };
    const res = await fetch(`${BASE_URL}/api/disposal`, options);
    const data = res.json();

    return data;
  },

  async fetchAllBins(): Promise<Bin[]> {
    const res = await fetch(`${BASE_URL}/api/bins`);
    const data = await res.json();
    return data;
  },
  async getChallengesWithRewards(
    participandId: string | undefined
  ): Promise<ChallengeWithRewards[] | undefined> {
    const res = await fetch(`${BASE_URL}/api/rewards/${participandId}`);
    const data = await res.json();
    return data;
  },
};

export default api;
