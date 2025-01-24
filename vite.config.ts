import { fileURLToPath, URL } from "node:url";
import { compression } from "vite-plugin-compression2";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngQuant from "imagemin-pngquant";
import imageminGifSicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import svgr from "vite-plugin-svgr";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import vueDevTools from "vite-plugin-vue-devtools";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import gracefulFs from "graceful-fs";
import Components from "unplugin-vue-components/vite";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";

gracefulFs.gracefulify(fs);
// import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  const config = defineConfig({
    optimizeDeps: { exclude: ["fsevents"] },
    define: {
      "process.env.VITE_UPDATE_DATE_TIME": JSON.stringify(new Date()),
    },
    plugins: [
      vue(),

      Components({
        resolvers: [
          BootstrapVueNextResolver({
            resolveIcons: true,
          }),
        ],
      }),

      // pinia 개발 도구
      vueDevTools(),

      // 서비스워커
      VitePWA({
        includeAssets: ["public/*"],
        workbox: {
          navigateFallback: "/index.html",
        }, // 모든 탐색 요청이 index.html로 라우팅되도록 함.
      }),

      // 프로덕션 빌드에서만 활성화
      ...(mode === "production"
        ? [
            // chunks 분리
            splitVendorChunkPlugin(),
            // svg 최적화
            svgr(),
            // 코드 압축
            compression({
              algorithm: "brotliCompress", // 압축 알고리즘 선택 (gzip 또는 brotliCompress)
              include: [
                /\.(js)$/,
                /\.(css)$/,
                /\.(json)$/,
                /\.(svg)$/,
                /\.(html)$/,
                /\.(ico)$/,
              ],
            }),
            // 이미지 최적화
            viteImagemin({
              plugins: {
                jpg: imageminMozjpeg() as any,
                png: imageminPngQuant() as any,
                gif: imageminGifSicle() as any,
                svg: imageminSvgo() as any,
              },
              makeWebp: {
                plugins: {
                  jpg: imageminWebp(),
                  png: imageminWebp(),
                },
              },
            }),
            // 코드 난독화/최소화
            ViteMinifyPlugin({}),
          ]
        : []),
      // mkcert(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      devSourcemap: true,
    },
    server: {
      hmr: true,
      host: "localhost",
      port: 8084,
      proxy: {
        "^/imageUpload": {
          target: process.env.VITE_ENV_PROXY_TARGET,
          secure: false,
          ws: true,
          changeOrigin: true,
        },
        "^/imageDownload": {
          target: process.env.VITE_ENV_PROXY_TARGET,
          secure: false,
          ws: true,
          changeOrigin: true,
        },
        "^/api": {
          target: process.env.VITE_ENV_PROXY_TARGET,
          secure: false,
          ws: true,
          changeOrigin: true,
        },
        "^/websocket": {
          target: process.env.VITE_ENV_SOCKET_PROXY_TARGET,
          secure: false,
          ws: true,
          changeOrigin: true,
        },
      },
      https: {
        key: fs.readFileSync("keys/key.pem"),
        cert: fs.readFileSync("keys/cert.pem"),
      },
    },
    build: {
      outDir: process.env.VITE_OUT_DIR, // 빌드 경로
      assetsDir: "assets", // 빌드 시 assets/ 하위 경로에 프로젝트 핵심파일 생성
      rollupOptions: {
        treeshake: true,
        plugins: [
          // 빌드시 파일을 특정 경로에 복사
          // copy({
          //   targets: [
          //     // 복사할 파일 또는 디렉토리 목록
          //     { src: "src/assets/images/**/*", dest: "public/images" },
          //     { src: "src/assets/soundFile/**/*", dest: "public/sounds" },
          //     { src: "src/design/fonts/**/*", dest: "public/fonts" },
          //     { src: "src/js/**/*", dest: "public/js" },
          //   ],
          //   // buildStart를 썻을 때 이미지가 랜덤으로 사라지는 에러가 나타났음.
          //   // PWA가 서비스 워커를 등록하고, 웹 워커가 처리하는 과정에서 순서문제로 작업이 제대로 이루어 지지 않을 가능성이 있음.
          //   hook: "writeBundle",
          //   flatten: false,
          // }),
        ],
        output: {
          manualChunks(id, { getModuleInfo }) {
            const match = /.*\.strings\.(\w+)\.js/.exec(id);
            if (match) {
              const language = match[1]; // 예 "en"
              const dependentEntryPoints = [];

              // 무한루프 방지. 모듈 한번씩만 가져오기
              const idsToHandle = new Set(getModuleInfo(id)?.dynamicImporters);

              for (const moduleId of idsToHandle) {
                const { isEntry, dynamicImporters, importers }: any =
                  getModuleInfo(moduleId);
                if (isEntry || dynamicImporters.length > 0)
                  dependentEntryPoints.push(moduleId);

                // importers를 순회하면서 추가
                for (const importerId of importers) idsToHandle.add(importerId);
              }

              // 유니크한 엔트리가 있으면 엔트리 네임으로 추가
              if (dependentEntryPoints.length === 1) {
                return `${
                  dependentEntryPoints[0].split("/").slice(-1)[0].split(".")[0]
                }.strings.${language}`;
              }
              // 엔트리가 여러개일 때, 공유 엔트리로
              if (dependentEntryPoints.length > 1) {
                return `shared.strings.${language}`;
              }
            }
          },
        },
      },
    },
  });

  return config;
};
