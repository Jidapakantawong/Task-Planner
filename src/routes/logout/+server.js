// src/routes/logout/+server.js
import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
    cookies.delete('session', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    });

    return json({ success: true });
};