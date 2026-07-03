<script>
    import { goto, invalidateAll } from '$app/navigation';
    let { form } = $props(); // รับค่าจาก Server Action
    let username = $state("");
    let password = $state("");

    $effect(() => {
    if (form?.success) {
        (async () => {
            await invalidateAll();
            await goto('/task-users');
        })();
    }
});
</script>

<div class="min-h-screen flex items-center justify-center bg-[#050b21] p-4">
    <div class="w-full max-w-sm bg-[#111c40] rounded-2xl p-8 border border-[#1e295d] shadow-2xl">
        <h1 class="text-2xl font-bold text-white mb-6 text-center">เข้าสู่ระบบ</h1>
        
        <form method="POST" action="?/login" class="space-y-4">
            <input name="username" type="text" bind:value={username} placeholder="Username" required class="w-full bg-[#0b1329] border border-[#23357a] rounded-lg px-4 py-2 text-white" />
            <input name="password" type="password" bind:value={password} placeholder="Password" required class="w-full bg-[#0b1329] border border-[#23357a] rounded-lg px-4 py-2 text-white" />
            <button type="submit" class="w-full bg-[#00f2fe] text-[#0b1329] font-bold py-3 rounded-lg hover:bg-[#05d5e2] transition">เข้าสู่ระบบ</button>
        </form>

        {#if form?.message}
            <p class="text-red-500 mt-4 text-sm text-center">{form.message}</p>
        {/if}
    </div>
</div>