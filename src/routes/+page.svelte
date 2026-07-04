<script>
    import { goto, invalidateAll } from "$app/navigation";
    let { form } = $props(); // รับค่าจาก Server Action
    let username = $state("");
    let password = $state("");

    $effect(() => {
        if (form?.success) {
            (async () => {
                await invalidateAll();
                await goto("/task-users");
            })();
        }
    });
</script>

<div
    class="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans"
>
    <div
        class="w-full max-w-sm bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
    >
        <h1 class="text-2xl font-bold text-slate-900 mb-8 text-center">
            เข้าสู่ระบบ
        </h1>

        <form method="POST" action="?/login" class="space-y-6">
            <div class="space-y-4">
                <input
                    name="username"
                    type="text"
                    bind:value={username}
                    placeholder="Username"
                    required
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                <input
                    name="password"
                    type="password"
                    bind:value={password}
                    placeholder="Password"
                    required
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
            >
                เข้าสู่ระบบ
            </button>
        </form>

        {#if form?.message}
            <p
                class="text-rose-500 mt-6 text-sm text-center font-medium bg-rose-50 py-2 rounded-lg"
            >
                {form.message}
            </p>
        {/if}
    </div>
</div>
