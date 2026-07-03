import pool from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const session = cookies.get('session');
    if (!session) throw redirect(303, '/');
    const user = JSON.parse(session);
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE assigned_to = ? ORDER BY due_date ASC', [user.id]);
    return { tasks, user };
}

export const actions = {
    create: async ({ request, cookies }) => {
        const user = JSON.parse(cookies.get('session'));
        const data = await request.formData();
        await pool.query('INSERT INTO tasks (title, due_date, status, assigned_to) VALUES (?, ?, ?, ?)',
            [data.get('title'), data.get('date'), data.get('status'), user.id]);
        return { success: true };
    },
    update: async ({ request }) => {
        const data = await request.formData();
        // อัปเดตทั้งชื่อและสถานะ
        await pool.query('UPDATE tasks SET title = ?, status = ? WHERE id = ?',
            [data.get('title'), data.get('status'), data.get('id')]);
        return { success: true };
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        await pool.query('DELETE FROM tasks WHERE id = ?', [data.get('id')]);
        return { success: true };
    }
};