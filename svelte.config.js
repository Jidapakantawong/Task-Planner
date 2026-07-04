import adapter from '@sveltejs/kit/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // กำหนดให้แปลงโค้ดออกมาเป็น Node.js Production Build (จะได้โฟลเดอร์ build/index.js)
        adapter: adapter(),
        csrf: {
            checkOrigin: false
        }
    },
    preprocess: vitePreprocess()
};

export default config;