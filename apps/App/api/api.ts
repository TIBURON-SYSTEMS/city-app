import Challenge from "@/types/types";
import { BASE_URL } from "@/utils/baseUrl";

const api = {
  async getChallengeById(id: string): Promise<Challenge | undefined> {
    const res = await fetch(`${BASE_URL}/api/challenge/${id}`);
    const data = await res.json();

    if (!data) return;

    // if (
    //   data.challenge.users.some(
    //     (participatedUser: { id: string; email: string }) =>
    //       participatedUser.email === user?.email
    //   )
    // ) {
    //   setIsParticipated(true);
    // }

    return data.challenge;
  },
};

export default api;
