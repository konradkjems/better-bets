// vite.config.js
import { defineConfig } from "file:///Users/konradkjems/Desktop/Arbi%20Better/node_modules/vite/dist/node/index.js";
import postcssImport from "file:///Users/konradkjems/Desktop/Arbi%20Better/node_modules/postcss-import/index.js";
import tailwindcss from "file:///Users/konradkjems/Desktop/Arbi%20Better/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/konradkjems/Desktop/Arbi%20Better/node_modules/autoprefixer/lib/autoprefixer.js";
import postcssNesting from "file:///Users/konradkjems/Desktop/Arbi%20Better/node_modules/postcss-nesting/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    port: 3e3,
    open: true,
    host: true,
    strictPort: true,
    timeout: 12e4
  },
  build: {
    outDir: "dist",
    assetsDir: "assets"
  },
  css: {
    postcss: {
      plugins: [
        postcssImport,
        tailwindcss,
        postcssNesting,
        autoprefixer
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva29ucmFka2plbXMvRGVza3RvcC9BcmJpIEJldHRlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tvbnJhZGtqZW1zL0Rlc2t0b3AvQXJiaSBCZXR0ZXIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tvbnJhZGtqZW1zL0Rlc2t0b3AvQXJiaSUyMEJldHRlci92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHBvc3Rjc3NJbXBvcnQgZnJvbSAncG9zdGNzcy1pbXBvcnQnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCBwb3N0Y3NzTmVzdGluZyBmcm9tICdwb3N0Y3NzLW5lc3RpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiAzMDAwLFxuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICBob3N0OiB0cnVlLFxuICAgICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgICB0aW1lb3V0OiAxMjAwMDBcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgICBhc3NldHNEaXI6ICdhc3NldHMnXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgIHBvc3Rjc3NJbXBvcnQsXG4gICAgICAgICAgICAgICAgdGFpbHdpbmRjc3MsXG4gICAgICAgICAgICAgICAgcG9zdGNzc05lc3RpbmcsXG4gICAgICAgICAgICAgICAgYXV0b3ByZWZpeGVyLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICB9XG59KTsgIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLG9CQUFvQjtBQUNuVSxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLG9CQUFvQjtBQUUzQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsRUFDYjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLEVBQ2Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELFNBQVM7QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
