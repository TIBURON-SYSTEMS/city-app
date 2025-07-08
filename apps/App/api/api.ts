import {
  Brand,
  Challenge,
  Participant,
  ParticipationData,
} from "@/types/types";
import { BASE_URL } from "@/utils/baseUrl";

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
  }> {
    if (!pariticipantId)
      return { ongoingChallengesRes: [], availableChallengesRes: [] };

    const res = await fetch(
      `${BASE_URL}/api/participant/challenges/${pariticipantId}`
    );
    const data = await res.json();

    if (!data) return { ongoingChallengesRes: [], availableChallengesRes: [] };

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
};

export default api;
