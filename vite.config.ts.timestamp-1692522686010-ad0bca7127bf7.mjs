// vite.config.ts
import { defineConfig } from "file:///E:/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E7%AC%AC%E4%B8%83%E5%91%A8%20%E5%87%86%E5%A4%87/Project_HouTai/family_doctor_back/node_modules/vite/dist/node/index.js";
import react from "file:///E:/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E7%AC%AC%E4%B8%83%E5%91%A8%20%E5%87%86%E5%A4%87/Project_HouTai/family_doctor_back/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Components from "file:///E:/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E7%AC%AC%E4%B8%83%E5%91%A8%20%E5%87%86%E5%A4%87/Project_HouTai/family_doctor_back/node_modules/unplugin-vue-components/dist/vite.mjs";
import { AntDesignVueResolver } from "file:///E:/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E7%AC%AC%E4%B8%83%E5%91%A8%20%E5%87%86%E5%A4%87/Project_HouTai/family_doctor_back/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
        })
      ]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTUyNERcdTdBRUZcdTVGMDBcdTUzRDFcXFxcXHU3QjJDXHU1NkRCXHU5NjM2XHU2QkI1XFxcXFx1N0IyQ1x1NEUwM1x1NTQ2OCBcdTUxQzZcdTU5MDdcXFxcUHJvamVjdF9Ib3VUYWlcXFxcZmFtaWx5X2RvY3Rvcl9iYWNrXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxcdTUyNERcdTdBRUZcdTVGMDBcdTUzRDFcXFxcXHU3QjJDXHU1NkRCXHU5NjM2XHU2QkI1XFxcXFx1N0IyQ1x1NEUwM1x1NTQ2OCBcdTUxQzZcdTU5MDdcXFxcUHJvamVjdF9Ib3VUYWlcXFxcZmFtaWx5X2RvY3Rvcl9iYWNrXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8lRTUlODklOEQlRTclQUIlQUYlRTUlQkMlODAlRTUlOEYlOTEvJUU3JUFDJUFDJUU1JTlCJTlCJUU5JTk4JUI2JUU2JUFFJUI1LyVFNyVBQyVBQyVFNCVCOCU4MyVFNSU5MSVBOCUyMCVFNSU4NyU4NiVFNSVBNCU4Ny9Qcm9qZWN0X0hvdVRhaS9mYW1pbHlfZG9jdG9yX2JhY2svdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcclxuICAgICAgICAgIGltcG9ydFN0eWxlOiBmYWxzZSwgLy8gY3NzIGluIGpzXHJcbiAgICAgICAgfSksXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVjLFNBQVMsb0JBQW9CO0FBQ3BlLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUdyQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFBQyxNQUFNO0FBQUEsSUFDZCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUEsUUFDVCxxQkFBcUI7QUFBQSxVQUNuQixhQUFhO0FBQUE7QUFBQSxRQUNmLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
