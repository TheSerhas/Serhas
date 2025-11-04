import { routeTree } from "@serhas/routeTree.gen";
import { RoutePaths } from "@tanstack/react-router";

export type AppRouterPaths = RoutePaths<typeof routeTree>;
