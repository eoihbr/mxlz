import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//mock模拟通道
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    vue(),
    viteMockServe({
      mockPath: './mock/',//设置模拟数据的存储文件夹
      //@ts-ignore
      supportTs: true,//是否读取ts文件模块
      logger:true,//是否在控制台显示请求日志
      localEnabled: true,//设置是否启用本地mock文件
      prodEnabled:true//设置打包是否启用mock功能
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
