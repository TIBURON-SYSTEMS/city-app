import App from "@/App";
import ChallengeDetails from "@/components/Challenges/ChallengeDetails";
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

const routeTree = rootRoute.addChildren([homeRoute, challengeRoute]);

export const router = new Router({ routeTree });
