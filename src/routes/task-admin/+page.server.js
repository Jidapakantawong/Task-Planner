import pool from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, depends }) {
    // บังคับให้หน้า Admin โหลดข้อมูลใหม่เสมอเมื่อมีการเปลี่ยนแปลง
    depends('admin:data');
    
    const session = cookies.get('session');
    if (!session) throw redirect(303, '/');
    const user = JSON.parse(session);
    
    if (user.role !== 'admin') throw redirect(303, '/task-users');

    const [tasks] = await pool.query(`
        SELECT t.*, u.name as user_name 
        FROM tasks t 
        LEFT JOIN users u ON t.assigned_to = u.id
    `);
    
    const [users] = await pool.query('SELECT id, name, username FROM users WHERE role = "employee"');

    return { tasks, users };
}