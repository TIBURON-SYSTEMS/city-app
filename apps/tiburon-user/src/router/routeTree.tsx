import App from "@/App";
import BrandDetails from "@/components/Brand/BrandDetails";
import ChallengeDetails from "@/components/Challenges/ChallengeDetails";
import RewardDetails from "@/components/Reward/RewardDetails";
import { createRootRoute, createRoute, Router } from "@tanstack/react-router";

// const rootRoute = createRootRoute({
//   component: () => <App />,
// });

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <App />,
});

const challengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "challenge/$challengeId",
  component: () => <ChallengeDetails />,
});

const rewardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "reward/$rewardId",
  component: () => <RewardDetails />,
});

const brandRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "brand/$brandId",
  component: () => <BrandDetails />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  challengeRoute,
  rewardRoute,
  brandRoute,
]);

export const router = new Router({ routeTree });
