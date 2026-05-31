<script lang="ts">
  import { preferencesStore, calibrationStore, type Unit } from '../lib/store';
  import { fade, fly } from 'svelte/transition';

  let { onOpenCalibration, isEmbedded = false } = $props<{ onOpenCalibration: () => void, isEmbedded?: boolean }>();
  
  const units: Unit[] = ['cm', 'mm', 'in', 'px'];
  
  let activeMenu = $state<'none' | 'rulers' | 'grid'>('none');

  function toggleUnit(unit: Unit) {
    preferencesStore.setKey('unit', unit);
  }

  function togglePreference(key: 'showGrid' | 'showCrosshair') {
    preferencesStore.setKey(key, !$preferencesStore[key]);
  }

  function toggleRuler(side: 'top' | 'bottom' | 'left' | 'right') {
    const current = preferencesStore.get().rulers;
    preferencesStore.setKey('rulers', { ...current, [side]: !current[side] });
  }

  function setGridType(type: 'dots' | 'lines' | 'subdivisions') {
    preferencesStore.setKey('gridType', type);
    preferencesStore.setKey('showGrid', true);
  }

  function toggleTheme() {
    const current = preferencesStore.get().theme;
    preferencesStore.setKey('theme', current === 'light' ? 'dark' : 'light');
  }

  function toggleMenu(menu: 'rulers' | 'grid') {
    activeMenu = activeMenu === menu ? 'none' : menu;
  }
</script>

<div class="{isEmbedded ? 'absolute bottom-4' : 'fixed bottom-4 md:bottom-8'} left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 w-full px-4 max-w-5xl pointer-events-none z-[100]">
  
  <!-- Sub-menus (popovers) -->
  <div class="flex gap-4 items-end w-full justify-center min-h-[80px] md:min-h-[100px]">
      {#if activeMenu === 'rulers'}
        <div 
            transition:fly={{ y: 10, duration: 200 }}
            class="bg-canvas/90 backdrop-blur-xl border border-hairline p-2 md:p-3 rounded-md shadow-2xl pointer-events-auto"
        >
            <div class="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-mute mb-2 px-2">Active Edges</div>
            <div class="grid grid-cols-2 gap-1 md:gap-1.5">
                {#each ['top', 'bottom', 'left', 'right'] as side}
                    <button 
                        class="px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase rounded-sm border transition-all { $preferencesStore.rulers[side] ? 'bg-ink text-canvas border-ink' : 'bg-canvas-soft-2 text-mute border-hairline hover:text-ink hover:border-ink'}"
                        onclick={() => toggleRuler(side as any)}
                    >
                        {side}
                    </button>
                {/each}
            </div>
        </div>
      {/if}

      {#if activeMenu === 'grid'}
        <div 
            transition:fly={{ y: 10, duration: 200 }}
            class="bg-canvas/90 backdrop-blur-xl border border-hairline p-2 md:p-3 rounded-md shadow-2xl pointer-events-auto min-w-[120px] md:min-w-[140px]"
        >
            <div class="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-mute mb-2 px-2">Grid Type</div>
            <div class="flex flex-col gap-1">
                {#each ['dots', 'lines', 'subdivisions'] as type}
                    <button 
                        class="px-4 md:px-5 py-1.5 md:py-2 text-left text-[9px] md:text-[10px] font-black uppercase rounded-sm transition-all { $preferencesStore.gridType === type && $preferencesStore.showGrid ? 'bg-ink text-canvas' : 'hover:bg-canvas-soft-2 text-body'}"
                        onclick={() => setGridType(type as any)}
                    >
                        {type}
                    </button>
                {/each}
                <div class="h-px bg-hairline my-1"></div>
                <button 
                    class="px-4 md:px-5 py-1.5 md:py-2 text-left text-[9px] md:text-[10px] font-black uppercase text-error hover:bg-error/10 rounded-sm transition-all"
                    onclick={() => preferencesStore.setKey('showGrid', false)}
                >
                    Disable
                </button>
            </div>
        </div>
      {/if}
  </div>

  <!-- Main Expanded Dock -->
  <div class="bg-canvas/80 backdrop-blur-2xl border border-hairline rounded-md shadow-2xl p-1 md:p-1.5 flex items-center gap-0.5 md:gap-1 overflow-x-auto no-scrollbar max-w-full pointer-events-auto">
    
    <!-- Home Button -->
    <a 
      href="/"
      class="p-2 md:p-2.5 rounded-md transition-all text-ink hover:bg-canvas-soft-2 shrink-0"
      title="Back to Home"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-[18px] md:h-[18px]"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </a>

    <div class="w-px h-5 md:h-6 bg-hairline mx-0.5 md:mx-1 shrink-0"></div>

    <!-- Calibration (Device Selector) -->
    <button 
      class="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-md transition-all bg-ink text-canvas shadow-xl hover:opacity-90 active:scale-95 relative border border-ink shrink-0"
      onclick={onOpenCalibration}
      title="Calibrate / Device Selector"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-[15px] md:h-[15px]"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] hidden sm:inline">Calibrate</span>
      
      {#if !$calibrationStore.isVerified}
        <span class="absolute -top-1 -right-1 flex h-2.5 w-2.5 md:h-3 md:w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-error"></span>
        </span>
      {/if}
    </button>

    <div class="w-px h-5 md:h-6 bg-hairline mx-0.5 md:mx-1 shrink-0"></div>

    <!-- Units -->
    <div class="flex bg-canvas-soft-2 rounded-md p-0.5 md:p-1 border border-hairline gap-0.5 shrink-0">
      {#each units as u}
        <button 
          class="px-2.5 md:px-3 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black rounded-sm transition-all {u === $preferencesStore.unit ? 'bg-canvas text-ink shadow-sm' : 'text-mute hover:text-ink'}"
          onclick={() => toggleUnit(u)}
        >
          {u.toUpperCase()}
        </button>
      {/each}
    </div>

    <div class="w-px h-5 md:h-6 bg-hairline mx-0.5 md:mx-1 shrink-0"></div>

    <!-- Features -->
    <div class="flex gap-0.5 md:gap-1 shrink-0">
        <!-- Ruler Settings -->
        <button 
          class="p-2 md:p-2.5 rounded-md transition-all {activeMenu === 'rulers' ? 'bg-ink text-canvas' : 'text-ink hover:bg-canvas-soft-2'}"
          onclick={() => toggleMenu('rulers')}
          title="Rulers"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-[18px] md:h-[18px]"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>
        </button>

        <!-- Grid Settings -->
        <button 
          class="p-2 md:p-2.5 rounded-md transition-all {activeMenu === 'grid' || $preferencesStore.showGrid ? 'bg-ink text-canvas' : 'text-ink hover:bg-canvas-soft-2'}"
          onclick={() => toggleMenu('grid')}
          title="Grid"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-[18px] md:h-[18px]"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
        </button>

        <!-- Crosshair Toggle -->
        <button 
          class="p-2 md:p-2.5 rounded-md transition-all {$preferencesStore.showCrosshair ? 'bg-ink text-canvas' : 'text-ink hover:bg-canvas-soft-2'}"
          onclick={() => togglePreference('showCrosshair')}
          title="Crosshairs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-[18px] md:h-[18px]"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
        </button>
    </div>

    <div class="w-px h-5 md:h-6 bg-hairline mx-0.5 md:mx-1 shrink-0"></div>

    <!-- Theme -->
    <button 
      class="p-2 md:p-2.5 rounded-md transition-all hover:bg-canvas-soft-2 text-ink shrink-0"
      onclick={toggleTheme}
      title="Toggle Theme"
    >
      {#if $preferencesStore.theme === 'light'}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-[18px] md:h-[18px]"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="md:w-[18px] md:h-[18px]"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      {/if}
    </button>
  </div>
</div>

<style>
  button {
    cursor: pointer;
  }
</style>
