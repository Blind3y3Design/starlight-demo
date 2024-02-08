import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Nebula Design System",
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/nebula-theme.css",
        "@discoveryedu/nebula-core/dist/styles/nebula_core.css",
        "@discoveryedu/nebula-core/dist/styles/fonts/nebula_fonts.css",
        "@discoveryedu/nebula-components/dist/nebula-components.css",
      ],
      sidebar: [
        {
          label: "Introduction",
          autogenerate: {
            directory: "introduction",
          },
        },
        {
          label: "Visual Language",
          autogenerate: {
            directory: "visual-language",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
      ],
    }),
    vue(),
  ],
});
