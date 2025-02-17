import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { kitRoutes } from 'vite-plugin-kit-routes';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		kitRoutes({
			generated_file_path: 'src/lib/routes.ts',
			LINKS: {
				// reference to a hardcoded link
				github: 'https://github.com/q1b'
			}
		}),
		SvelteKitPWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'service-worker.ts',
			registerType: 'autoUpdate',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true
			},

			manifest: {
				name: 'University 1',
				short_name: 'u1',
				description:
					'University 1 focuses on building a web application which can be widely used by University, College etc.',
				theme_color: '#4f39f6'
			},

			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp}']
			},

			devOptions: {
				enabled: false,
				suppressWarnings: true,
				navigateFallback: '/',
				navigateFallbackAllowlist: [/^\/$/],
				type: 'module'
			}
		})
	]
});
