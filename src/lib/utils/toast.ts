import { toast as stoast } from '@zerodevx/svelte-toast';

export const toast = {
	success: (msg: string) =>
		stoast.push(msg, {
			theme: {
				'--toastColor': 'mintcream',
				'--toastBackground': 'rgba(72,187,120,0.9)',
				'--toastBarBackground': '#2F855A'
			}
		}),
	error: (msg: string) =>
		stoast.push(msg, {
			theme: {
				'--toastColor': 'mintcream',
				'--toastBackground': 'rgba(255,65,54,0.9)',
				'--toastBarBackground': '#ff2317'
			}
		})
};
