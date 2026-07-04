import { fail } from '@sveltejs/kit';
import pool from '$lib/db';
import { invalidateAll } from '$app/navigation';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (!username || !password) {
            return fail(400, { message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        try {
            // ค้นหาผู้ใช้จากฐานข้อมูล
            const [rows] = await pool.query(
                'SELECT id, username, name, role FROM users WHERE username = ? AND password = ?',
                [username, password]
            );

            if (rows.length === 0) {
                return fail(401, { message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
            }

            const user = rows[0];

            // สร้าง Session (ในที่นี้เราเก็บข้อมูล user ไว้ใน Cookie)
            // หมายเหตุ: ในโปรดักชั่นจริง ควรใช้ library เช่น lucia-auth หรือเก็บ session ID ไว้ใน Redis/DB
            cookies.set('session', JSON.stringify({ 
                id: user.id, 
                username: user.username,
                role: user.role 
            }), {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 // 1 วัน
            });
            return { success: true };

        } catch (error) {
            console.error(error);
            return fail(500, { message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล' });
        }
    }
};