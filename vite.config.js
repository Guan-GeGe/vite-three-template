import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        // 预设
        "vue",
        "vue-router",

        {
          three: [
            // alias
            ["*", "THREE"], // import { * as THREE } from 'three',
          ],
          "dat.gui": [
            // alias
            ["*", "dat"], // import { * as dat } from 'dat.gui',
          ],
          "three/examples/jsm/controls/OrbitControls": [
            // 命名导入
            "OrbitControls", // import { useMouse } from '@vueuse/core',
          ],
          "three/examples/jsm/loaders/RGBELoader": ["RGBELoader"],
          "three/examples/jsm/loaders/GLTFLoader": ["GLTFLoader"],
          "@/three/index.js": [
            "scene",
            "camera",
            "axesHelper",
            "renderer",
            "controls",
            "gui",
            "animate",
            "light",
            "createMesh",
            "gsap",
          ],
        },
      ],
    }),
    Components({}),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
