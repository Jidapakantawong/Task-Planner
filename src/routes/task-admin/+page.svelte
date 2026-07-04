<script>
    let { data } = $props();
    let currentMonth = $state(new Date());
    let selectedUserId = $state('all');

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

<div class="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
    <div class="max-w-5xl mx-auto">
        <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div>
                <h1 class="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                <p class="text-sm text-slate-500">Overview of team productivity</p>
            </div>
            <div class="text-sm font-medium bg-slate-100 px-4 py-2 rounded-full text-slate-600">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
        </div>

        <select bind:value={selectedUserId} class="w-full bg-white p-4 rounded-2xl border border-slate-200 mb-8 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option value="all">View all employees</option>
            {#each data.users as u}
                <option value={u.id}>{u.name}</option>
            {/each}
        </select>

        <div class="grid grid-cols-7 gap-3">
            {#each ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] as d}
                <div class="text-center text-xs font-bold text-slate-400 uppercase tracking-widest py-2">{d}</div>
            {/each}
            
            {#each Array(days.firstDay) as _}<div></div>{/each}
            
            {#each Array(days.totalDays) as _, i}
                {@const day = i + 1}
                {@const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`}
                
                <div class="h-32 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm hover:border-blue-200 transition-colors">
                    <span class="text-sm font-semibold text-slate-400">{day}</span>
                    <div class="space-y-1.5 mt-2 overflow-y-auto max-h-24 custom-scrollbar">
                        {#each filteredTasks.filter(t => getTaskDate(t.due_date) === dateStr) as task (task.id)}
                            <div class="p-2 rounded-lg text-[10px] bg-slate-50 border border-slate-100 {task.status === 'completed' ? 'border-l-4 border-l-emerald-400' : 'border-l-4 border-l-amber-400'}">
                                <p class="font-bold text-slate-700 truncate">{task.user_name}</p>
                                <p class="text-slate-500 truncate">{task.title}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* ซ่อน scrollbar เพื่อความมินิมอล */
    .custom-scrollbar::-webkit-scrollbar {
        width: 0px;
    }
</style>