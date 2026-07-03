<script>
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
    import { invalidateAll } from '$app/navigation';

    let { children, data } = $props();

    async function handleLogout() {
        const response = await fetch('/logout', {
            method: 'POST'
        });

        if (response.ok) {
            // โหลดข้อมูลใหม่จาก +layout.server.js
            await invalidateAll();

            // กลับหน้า login
            window.location.href = '/';
        }
    }
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar">
    <div class="brand">TASK-PLANNER</div>

    <div class="nav-links">
        {#if data?.user}
            <span class="username">
                👨‍💻 {data.user.username}
            </span>

            <button
                class="bg-red-900 hover:bg-red-600 px-5 py-2 rounded-xl text-sm transition"
                onclick={handleLogout}
            >
                Logout
            </button>
        {/if}
    </div>
</nav>

<main>
    {@render children()}
</main>

<style>
    .navbar {
        background-color: #23357a;
        color: white;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
    }

    .brand {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .username {
        font-size: .9rem;
    }
</style>