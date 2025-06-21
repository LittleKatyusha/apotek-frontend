import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios'; // 1. Import axios secara langsung

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
    
    // --- PERBAIKAN UTAMA ADA DI SINI ---
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                // 2. Kita gunakan axios langsung ke URL lengkap, BUKAN apiClient
                axios.post('https://romanesco.it.com/apotek-backend/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name,
                }, {
                    // 3. Kita harus mengirim token otentikasi secara manual
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                })
                .then(response => {
                    callback(null, response.data);
                })
                .catch(error => {
                    console.error("Authorization Failed! Cek URL, token, dan log backend.", error);
                    callback(error);
                });
            },
        };
    },
});

export default echo;
