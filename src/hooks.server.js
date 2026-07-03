import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    const sessionCookie = event.cookies.get('session');
    
    let user = null;
    if (sessionCookie) {
        try {
            user = JSON.parse(sessionCookie);
        } catch (e) {
            event.cookies.delete('session', { path: '/' });
        }
    }

    event.locals.user = user;

    const url = event.url.pathname;

    // 1. ถ้าไม่ได้ล็อกอิน แล้วพยายามเข้าหน้า protected ให้เด้งไปหน้า login (สมมติ path คือ '/')
    if (!user && (url.startsWith('/task-admin') || url.startsWith('/task-users'))) {
        throw redirect(303, '/');
    }

    // 2. ถ้าล็อกอินแล้ว: ตรวจสอบสิทธิ์เข้าถึงตาม Role
    if (user) {
        // ถ้าเข้าหน้า admin แต่ไม่ใช่ admin ให้เด้งไปหน้าตัวเอง
        if (url.startsWith('/task-admin') && user.role !== 'admin') {
            throw redirect(303, user.role === 'employee' ? '/task-users' : '/');
        }

        // ถ้าเข้าหน้า user แต่ไม่ใช่ user ให้เด้งไปหน้าตัวเอง
        if (url.startsWith('/task-users') && user.role !== 'employee') {
            throw redirect(303, user.role === 'admin' ? '/task-admin' : '/');
        }
    }

    return await resolve(event);
};