import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import { useAuthStore } from "@/store/auth.ts";
import { routes } from "@/router/routes";
import { computed } from "vue";
import { eventBus$ } from "@/main";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  async (
    routeTo: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // 권한 검사
    const auth = useAuthStore();
    try {
      // TODO: 유저정보 확인방법 PROM에 맞게 수정
      //const isInitialAccess = computed(() => auth.isInitialAccess);
      const isLoggedIn = computed(() => auth.isLoggedIn);
      const checkError = checkErrorRoutePath(routeTo.path);
      const checkRoute = checkRoutePath(routeTo.path);

      if (checkError) {
        //에러 페이지
        next();
      } else if (isLoggedIn.value && !checkRoute) {
        //로그인 유저, 유저 페이지
        next();
      } else if (!isLoggedIn.value && checkRoute) {
        //유저x, 공개 페이지
        next();
      } else if (isLoggedIn.value && checkRoute) {
        //로그인 유저, 공개 페이지
        next({ path: "/" });
      } else if (!isLoggedIn.value && !checkRoute) {
        //유저x, 유저 페이지
        next({ path: "/login" });
      } else {
        console.error("exeptional page!");
      }
    } catch (error) {
      // 세션정보를 확인할 수 없을 때
      eventBus$.$emit(
        "error",
        "유저정보를 확인할 수 없습니다. 로그아웃 합니다."
      );
      auth.logout();
    }
  }
);

// 퍼블릭 페이지로 이동하려는 경우
function checkRoutePath(path: string) {
  const publicPages = ["/login"];
  return publicPages?.some((item) => {
    const pattern = new RegExp(item, "gi");
    if (pattern.test(path)) return true;
    else return false;
  });
}

// 에러 페이지로 이동하려는 경우
function checkErrorRoutePath(path: string) {
  const errorPages = ["/404", "/403", "/500"];
  return errorPages?.some((item) => item === path);
}

export default router;
