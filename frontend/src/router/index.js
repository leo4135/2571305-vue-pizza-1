import { createRouter, createWebHistory } from "vue-router";
import { middlewarePipeline } from "@/middlewares/middleware-pipeline";
import routes from "@/router/routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

middlewarePipeline(router);
