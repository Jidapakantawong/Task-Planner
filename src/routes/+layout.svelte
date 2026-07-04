<script>
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";
    import { invalidateAll } from "$app/navigation";

    let { children, data } = $props();

    async function handleLogout() {
        const response = await fetch("/logout", {
            method: "POST",
        });

        if (response.ok) {
            await invalidateAll();
            window.location.href = "/";
        }
    }
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<nav
    class="navbar bg-[#EBE6E0] border-b border-[#D8D2CB] px-8 py-4 flex justify-between items-center shadow-sm"
>
    <div class="brand font-bold text-xl text-[#5D5750] tracking-tight">
        TASK-PLANNER
    </div>

    <div class="nav-links flex items-center gap-4">
        {#if data?.user}
            <span class="username text-sm font-medium text-[#7A746D]">
                👨‍💻 {data.user.username}
            </span>

            <button
                class="bg-[#C4B4A5] hover:bg-[#B5A496] text-[#2F2D2A] px-5 py-2 rounded-xl text-sm transition-all shadow-sm"
                onclick={handleLogout}
            >
                Logout
            </button>
        {/if}
    </div>
</nav>

<main class="bg-[#F5F2EF] min-h-screen">
    {@render children()}
</main>
