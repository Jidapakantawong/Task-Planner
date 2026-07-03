<script>
    let { data } = $props();
    let currentMonth = $state(new Date());
    let selectedUserId = $state('all');

    // ใช้การเปรียบเทียบแบบ string ตัดเวลาทิ้ง เพื่อความแม่นยำ
    function getTaskDate(dateValue) {
        if (!dateValue) return "";
        return new Date(dateValue).toISOString().split("T")[0];
    }

    let filteredTasks = $derived(
        selectedUserId === 'all' 
            ? data.tasks 
            : data.tasks.filter(t => String(t.assigned_to) === String(selectedUserId))
    );

    let days = $derived.by(() => {
        const y = currentMonth.getFullYear();
        const m = currentMonth.getMonth();
        return { firstDay: new Date(y, m, 1).getDay(), totalDays: new Date(y, m + 1, 0).getDate() };
    });
</script>

<div class="min-h-screen bg-[#050b21] p-6 text-white font-sans">
    <div class="max-w-5xl mx-auto">
        <div class="flex justify-between items-center mb-8 bg-[#111c40] p-6 rounded-2xl border border-[#1e295d]">
            <div>
                <h1 class="text-2xl font-bold text-[#00f2fe]">Admin Dashboard</h1>
                <p class="text-xs text-gray-400">ระบบตรวจสอบงานพนักงาน</p>
            </div>
        </div>

        <select bind:value={selectedUserId} class="w-full bg-[#111c40] p-4 rounded-xl border border-[#23357a] mb-6 text-white">
            <option value="all">ดูงานของพนักงานทุกคน</option>
            {#each data.users as u}
                <option value={u.id}>{u.name}</option>
            {/each}
        </select>

        <div class="grid grid-cols-7 gap-1">
            {#each ['อา','จ','อ','พ','พฤ','ศ','ส'] as d}<div class="text-center font-bold text-[#23357a] py-2">{d}</div>{/each}
            {#each Array(days.firstDay) as _}<div></div>{/each}
            
            {#each Array(days.totalDays) as _, i}
                {@const day = i + 1}
                {@const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`}
                <div class="h-32 bg-[#111c40] border border-[#1e295d] p-1 rounded-lg">
                    <span class="text-xs text-gray-500">{day}</span>
                    <div class="space-y-1 mt-1">
                        {#each filteredTasks.filter(t => getTaskDate(t.due_date) === dateStr) as task (task.id)}
                            <div class="p-1 rounded text-[9px] bg-[#0b1329] border-l-2 {task.status === 'completed' ? 'border-green-500' : 'border-yellow-500'}">
                                <b>{task.user_name}</b>: {task.title}
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>