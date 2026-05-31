<script lang="ts">
  import AutoDetect from './AutoDetect.svelte';
  import DeviceSelector from './DeviceSelector.svelte';
  import ReferenceCalibration from './ReferenceCalibration.svelte';
  import DiagonalCalibration from './DiagonalCalibration.svelte';
  import { calibrationStore, preferencesStore } from '../../lib/store';
  import { fade, fly } from 'svelte/transition';
  
  type MainTab = 'calibration' | 'settings' | 'layout';
  let activeMainTab: MainTab = 'calibration';

  type CalibTab = 'selection' | 'auto' | 'device' | 'reference' | 'diagonal';
  let activeCalibTab: CalibTab = 'selection';

  const calibMethods = [
    { id: 'device', label: 'Manual Selection', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm16 12H4V10h16v8z', desc: 'Find your exact model' },
    { id: 'auto', label: 'Auto Detect', icon: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41', desc: 'Instant system scan' },
    { id: 'reference', label: 'Physical Object', icon: 'M3 10h18v8H3z M7 10v3 M11 10v1 M15 10v3 M19 10v1', desc: 'Use a Credit/ID Card' },
    { id: 'diagonal', label: 'Manual Math', icon: 'M19 20H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2z M8 6v10 M16 6v10 M12 6v10 M8 12h8', desc: 'Size & Resolution' }
  ];

  function togglePreference(key: 'showGrid' | 'showCrosshair') {
    preferencesStore.setKey(key, !$preferencesStore[key]);
  }

  function toggleRuler(side: 'top' | 'bottom' | 'left' | 'right') {
    const current = preferencesStore.get().rulers;
    preferencesStore.setKey('rulers', { ...current, [side]: !current[side] });
  }

  function toggleTheme() {
    const current = preferencesStore.get().theme;
    preferencesStore.setKey('theme', current === 'light' ? 'dark' : 'light');
  }

  $: rulers = $preferencesStore.rulers;
</script>

<div class="w-full flex flex-col min-h-[400px] md:min-h-[500px]">
  <!-- Navigation Bar -->
  <div class="flex border-b border-hairline bg-canvas-soft-2 overflow-x-auto no-scrollbar">
    {#each ['calibration', 'settings', 'layout'] as tab}
      <button 
        on:click={() => activeMainTab = tab as MainTab}
        class="flex-1 min-w-[100px] py-3 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 {activeMainTab === tab ? 'border-ink text-ink bg-canvas' : 'border-transparent text-mute hover:text-ink hover:bg-canvas/50'}"
      >
        {tab}
      </button>
    {/each}
  </div>

  <div class="flex-1 flex flex-col overflow-y-auto max-h-[70vh] md:max-h-[60vh] no-scrollbar">
    {#if activeMainTab === 'calibration'}
        {#if activeCalibTab === 'selection'}
            <div transition:fade={{ duration: 200 }} class="p-4 md:p-8">
                <div class="mb-6 md:mb-8">
                    <h3 class="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-ink mb-2">Calibration Suite</h3>
                    <p class="text-[10px] md:text-[11px] text-body leading-relaxed max-w-sm">
                        Choose a method to ensure 100% real-world accuracy. Manual selection is recommended if auto-detect fails.
                    </p>
                </div>

                <div class="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
                    {#each calibMethods as method}
                        <button 
                            on:click={() => activeCalibTab = method.id as CalibTab}
                            class="flex flex-row xs:flex-col items-center xs:justify-center p-4 md:p-6 bg-canvas-soft-2 border border-hairline rounded-md transition-all hover:border-ink hover:bg-canvas active:scale-95 text-left xs:text-center group {method.id === 'device' ? 'border-ink/30 ring-1 ring-ink/5' : ''}"
                        >
                            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-ink/5 flex items-center justify-center mb-0 xs:mb-4 mr-4 xs:mr-0 group-hover:bg-ink group-hover:text-canvas transition-all shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-6 md:h-6">
                                    <path d={method.icon} />
                                </svg>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-ink mb-0.5 md:mb-1">{method.label}</span>
                                <span class="text-[8px] md:text-[9px] font-bold text-mute uppercase tracking-tight">{method.desc}</span>
                            </div>
                        </button>
                    {/each}
                </div>
            </div>
        {:else}
            <div transition:fly={{ x: 20, duration: 300 }} class="flex flex-col flex-1">
                <button 
                    on:click={() => activeCalibTab = 'selection'}
                    class="px-4 md:px-6 py-2.5 md:py-3 border-b border-hairline flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-mute hover:text-ink transition-colors bg-canvas-soft-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="md:w-3 md:h-3"><path d="m15 18-6-6 6-6"/></svg>
                    Back to Calibration
                </button>
                <div class="flex-1">
                    {#if activeCalibTab === 'auto'}<AutoDetect />
                    {:else if activeCalibTab === 'device'}<DeviceSelector />
                    {:else if activeCalibTab === 'diagonal'}<DiagonalCalibration />
                    {:else if activeCalibTab === 'reference'}<ReferenceCalibration />
                    {/if}
                </div>
            </div>
        {/if}
    {:else if activeMainTab === 'settings'}
        <div transition:fade class="p-6 md:p-8 flex flex-col gap-6 md:gap-8">
            <div class="flex flex-col gap-4">
                <h4 class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-mute">Visual Overlays</h4>
                <div class="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
                    <button 
                        on:click={() => togglePreference('showGrid')}
                        class="p-4 md:p-5 border rounded-md flex flex-row xs:flex-col items-center xs:items-start gap-4 xs:gap-3 transition-all {$preferencesStore.showGrid ? 'border-ink bg-ink text-canvas' : 'border-hairline hover:border-ink'}"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
                        <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Grid Engine</span>
                    </button>
                    <button 
                        on:click={() => togglePreference('showCrosshair')}
                        class="p-4 md:p-5 border rounded-md flex flex-row xs:flex-col items-center xs:items-start gap-4 xs:gap-3 transition-all {$preferencesStore.showCrosshair ? 'border-ink bg-ink text-canvas' : 'border-hairline hover:border-ink'}"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
                        <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Crosshairs</span>
                    </button>
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <h4 class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-mute">Interface Theme</h4>
                <button 
                    on:click={toggleTheme}
                    class="p-4 md:p-5 border border-hairline hover:border-ink rounded-md flex items-center justify-between transition-all"
                >
                    <div class="flex items-center gap-4">
                        {#if $preferencesStore.theme === 'light'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Light Mode</span>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Dark Mode</span>
                        {/if}
                    </div>
                    <span class="text-[8px] md:text-[9px] font-mono font-bold text-mute uppercase">Switch</span>
                </button>
            </div>
        </div>
    {:else if activeMainTab === 'layout'}
        <div transition:fade class="p-6 md:p-8 flex flex-col gap-6">
            <h4 class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-mute">Active Edges</h4>
            <div class="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {#each ['top', 'bottom', 'left', 'right'] as side}
                    <button 
                        on:click={() => toggleRuler(side as any)}
                        class="p-4 md:p-5 border rounded-md flex items-center justify-between transition-all {rulers[side] ? 'border-ink bg-ink text-canvas shadow-xl' : 'border-hairline hover:border-ink text-mute'}"
                    >
                        <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{side}</span>
                        {#if rulers[side]}
                            <div class="w-1.5 h-1.5 rounded-full bg-canvas animate-pulse"></div>
                        {/if}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
  </div>

  {#if activeMainTab === 'calibration' && activeCalibTab === 'selection'}
    <div class="mt-auto border-t border-hairline p-4 md:p-5 bg-ink text-canvas flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-canvas animate-pulse"></div>
        <div class="flex flex-col">
            <span class="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] opacity-60">Engine Status</span>
            <span class="text-[10px] md:text-[11px] font-mono font-bold">{$calibrationStore.ppi.toFixed(1)} PPI</span>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-[7px] md:text-[8px] font-black uppercase tracking-widest opacity-40">Accuracy</span>
        <span class="text-[9px] md:text-[10px] font-mono font-bold text-success">HIGH</span>
      </div>
    </div>
  {/if}
</div>
