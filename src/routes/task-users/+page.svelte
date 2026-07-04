<script>
    let { data } = $props();
    let currentMonth = $state(new Date());
    let modalDate = $state(null);

    function getTaskDate(dateValue) {
        if (!dateValue) return "";
        return new Date(dateValue).toISOString().split("T")[0];
    }

    let calendarDays = $derived.by(() => {
        const y = currentMonth.getFullYear();
        const m = currentMonth.getMonth();
        const firstDay = new Date(y, m, 1).getDay();
        const totalDays = new Date(y, m + 1, 0).getDate();
        return { firstDay, totalDays };
    });
</script>

<div class="min-h-screen bg-slate-50 p-6 text-slate-800 font-sans">
    <div class="max-w-5xl mx-auto">
        <div
            class="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
        >
            <button
                onclick={() =>
                    (currentMonth = new Date(
                        currentMonth.setMonth(currentMonth.getMonth() - 1),
                    ))}
                class="p-2 hover:bg-slate-100 rounded-full transition"
                >◀</button
            >
            <h2 class="text-xl font-bold text-slate-900">
                {currentMonth.toLocaleString("th-TH", {
                    month: "long",
                    year: "numeric",
                })}
            </h2>
            <button
                onclick={() =>
                    (currentMonth = new Date(
                        currentMonth.setMonth(currentMonth.getMonth() + 1),
                    ))}
                class="p-2 hover:bg-slate-100 rounded-full transition"
                >▶</button
            >
        </div>

        <div class="grid grid-cols-7 gap-3">
            {#each ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"] as d}
                <div
                    class="text-center text-xs font-bold text-slate-400 uppercase tracking-widest py-2"
                >
                    {d}
                </div>
            {/each}

            {#each Array(calendarDays.firstDay) as _}<div></div>{/each}

            {#each Array(calendarDays.totalDays) as _, i}
                {@const day = i + 1}
                {@const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`}

                <div
                    class="h-32 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm hover:border-blue-200 transition-all cursor-pointer"
                    onclick={() => (modalDate = { date: dateStr })}
                >
                    <span class="text-sm font-semibold text-slate-400"
                        >{day}</span
                    >
                    <div class="space-y-1 mt-2">
                        {#each data.tasks.filter((t) => getTaskDate(t.due_date) === dateStr) as task}
                            <button
                                onclick={(e) => {
                                    e.stopPropagation();
                                    modalDate = task;
                                }}
                                class="w-full text-left text-[10px] truncate p-2 rounded-lg bg-slate-50 border border-slate-100 transition-all
                                {task.status === 'completed'
                                    ? 'border-l-4 border-l-emerald-400'
                                    : task.status === 'in-progress'
                                      ? 'border-l-4 border-l-amber-400'
                                      : 'border-l-4 border-l-rose-400'}"
                            >
                                <span class="font-bold text-slate-700"
                                    >{task.title}</span
                                >
                            </button>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

{#if modalDate}
    <div
        class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
        <form
            method="POST"
            action={modalDate.id ? "?/update" : "?/create"}
            class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-sm"
        >
            <h2 class="text-xl font-bold mb-6 text-slate-900">
                {modalDate.id ? "แก้ไขงาน" : "เพิ่มงานใหม่"}
            </h2>

            {#if modalDate.id}
                <input type="hidden" name="id" value={modalDate.id} />
                <input type="hidden" name="date" value={modalDate.due_date} />
            {:else}
                <input type="hidden" name="date" value={modalDate.date} />
            {/if}

            <input
                name="title"
                value={modalDate.title || ""}
                placeholder="ชื่อหัวข้องาน"
                class="w-full bg-slate-50 p-4 mb-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
            />

            <select
                name="status"
                class="w-full bg-slate-50 p-4 mb-6 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
                <option
                    value="pending"
                    selected={modalDate.status === "pending"}>ยังไม่ทำ</option
                >
                <option
                    value="in-progress"
                    selected={modalDate.status === "in-progress"}
                    >กำลังทำ</option
                >
                <option
                    value="completed"
                    selected={modalDate.status === "completed"}>ทำแล้ว</option
                >
            </select>

            <div class="flex gap-3">
                <button
                    class="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition"
                    >บันทึก</button
                >
                {#if modalDate.id}
                    <button
                        formaction="?/delete"
                        class="bg-rose-50 text-rose-600 px-6 py-3 rounded-xl font-bold hover:bg-rose-100 transition"
                        >ลบ</button
                    >
                {/if}
                <button
                    type="button"
                    onclick={() => (modalDate = null)}
                    class="flex-1 bg-slate-100 py-3 rounded-xl hover:bg-slate-200 transition"
                    >ปิด</button
                >
            </div>
        </form>
    </div>
{/if}
