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

<div class="min-h-screen bg-[#050b21] p-4 text-white">
    <div class="max-w-5xl mx-auto">
        <div
            class="flex justify-between items-center mb-6 bg-[#111c40] p-4 rounded-2xl border border-[#1e295d]"
        >
            <button
                onclick={() =>
                    (currentMonth = new Date(
                        currentMonth.setMonth(currentMonth.getMonth() - 1),
                    ))}
                class="p-2 hover:bg-[#1e295d] rounded">◀</button
            >
            <h2 class="text-xl font-bold">
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
                class="p-2 hover:bg-[#1e295d] rounded">▶</button
            >
        </div>

        <div class="grid grid-cols-7 gap-1">
            {#each ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"] as d}<div
                    class="text-center font-bold text-[#23357a] py-2"
                >
                    {d}
                </div>{/each}
            {#each Array(calendarDays.firstDay) as _}<div></div>{/each}
            {#each Array(calendarDays.totalDays) as _, i}
                {@const day = i + 1}
                {@const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`}
                <div
                    class="h-32 bg-[#111c40] border border-[#1e295d] p-1 cursor-pointer hover:border-[#00f2fe] transition"
                    onclick={() => (modalDate = { date: dateStr })}
                >
                    <span class="text-xs">{day}</span>
                    {#each data.tasks.filter((t) => getTaskDate(t.due_date) === dateStr) as task}
                        <button
                            onclick={(e) => {
                                e.stopPropagation();
                                modalDate = task;
                            }}
                            class="w-full text-left text-[9px] truncate bg-[#0b1329] p-1 mt-1 border-l-2
                            {task.status === 'completed'
                                ? 'border-green-500'
                                : task.status === 'in-progress'
                                  ? 'border-yellow-500'
                                  : 'border-red-500'}"
                        >
                            {task.title}
                        </button>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

{#if modalDate}
    <div
        class="fixed inset-0 text-amber-50 flex items-center justify-center p-4 z-50"
    >
        <form
            method="POST"
            action={modalDate.id ? "?/update" : "?/create"}
            class="bg-[#031346] p-8 rounded-2xl border border-[#00f2fe] w-full max-w-sm"
        >
            <h2 class="text-lg font-bold mb-4">
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
                class="w-full bg-[#6377ad] p-2 mb-4 rounded border border-[#23357a]"
                required
            />

            <select
                name="status"
                class="w-full text-amber-50 bg-[#6377ad] p-2 mb-4 rounded border border-[#23357a]"
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

            <div class="flex gap-2">
                <button
                    class="flex-1 bg-[#00f2fe] text-[#050b21] font-bold py-2 rounded"
                    >บันทึก</button
                >
                {#if modalDate.id}
                    <button
                        formaction="?/delete"
                        class="bg-red-900 px-6 py-2 rounded font-bold"
                        >ลบ</button
                    >
                {/if}
                <button
                    type="button"
                    onclick={() => (modalDate = null)}
                    class="flex-1 bg-gray-700 py-2 rounded">ปิด</button
                >
            </div>
        </form>
    </div>
{/if}
