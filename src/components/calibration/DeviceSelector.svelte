<script lang="ts">
  import { deviceDatabase, type DeviceProfile } from '../../lib/devices';
  import { calibrationStore } from '../../lib/store';
  import { trackCalibration } from '../../lib/analytics';
  import { fade } from 'svelte/transition';

  let selectedDevice: DeviceProfile | null = null;
  let searchTerm = "";

  $: filteredDevices = deviceDatabase.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by brand
  $: groupedDevices = filteredDevices.reduce((acc, device) => {
    const brand = device.brand;
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(device);
    return acc;
  }, {} as Record<string, DeviceProfile[]>);

  $: brands = Object.keys(groupedDevices).sort((a, b) => {
    if (a === 'Generic') return 1;
    if (b === 'Generic') return -1;
    return a.localeCompare(b);
  });

  function applyCalibration() {
    if (!selectedDevice) return;
    
    calibrationStore.set({
      ppi: selectedDevice.ppi,
      dpr: selectedDevice.dpr,
      method: 'manual',
      confidence: 0.95,
      isVerified: false,
      lastUpdated: new Date().toISOString()
    });
    trackCalibration('manual_select', selectedDevice.ppi);
  }
</script>

<div class="p-4 md:p-8 flex flex-col gap-5 md:gap-6 flex-1 h-full max-h-[600px]">
  <div class="flex items-center justify-between">
    <h3 class="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-ink">Manual Selection</h3>
    <span class="text-[8px] md:text-[9px] font-mono font-bold px-2 py-1 bg-ink text-canvas rounded-sm uppercase">
      {deviceDatabase.length} PROFILES
    </span>
  </div>

  <div class="flex flex-col gap-4 flex-1 overflow-hidden">
    <div class="relative">
        <input 
            type="text" 
            placeholder="Search brand or model..."
            bind:value={searchTerm}
            class="bg-canvas-soft-2 w-full border border-hairline rounded-md px-4 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-ink transition-colors font-medium"
        />
        <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-4 md:h-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
    </div>

    <div class="flex-1 overflow-y-auto border border-hairline rounded-md bg-canvas-soft-2 no-scrollbar">
      {#each brands as brand}
        <div class="bg-canvas/50 px-3 md:px-4 py-1.5 md:py-2 border-b border-hairline sticky top-0 z-10 backdrop-blur-sm">
            <span class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-mute">{brand}</span>
        </div>
        {#each groupedDevices[brand] as device}
          <button 
            class="w-full text-left px-4 md:px-5 py-3 md:py-3.5 text-[11px] md:text-xs hover:bg-canvas transition-colors border-b border-hairline last:border-0 {selectedDevice?.name === device.name ? 'bg-canvas font-bold border-l-4 border-l-ink' : 'text-body'}"
            on:click={() => selectedDevice = device}
          >
            <div class="flex justify-between items-center">
              <div class="flex flex-col gap-0.5">
                <span class="tracking-tight">{device.name}</span>
                <span class="text-[9px] md:text-[10px] opacity-40 font-medium uppercase tracking-tighter">{device.category}</span>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-[9px] md:text-[10px] font-mono font-bold">{device.ppi} <span class="opacity-40">PPI</span></span>
                {#if selectedDevice?.name === device.name}
                    <span class="text-[7px] md:text-[8px] text-success font-black uppercase tracking-tighter" in:fade>Selected</span>
                {/if}
              </div>
            </div>
          </button>
        {/each}
      {/each}
      
      {#if brands.length === 0}
        <div class="p-8 md:p-12 text-center flex flex-col items-center gap-4">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-ink/5 flex items-center justify-center text-mute">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <div class="flex flex-col gap-1">
                <span class="text-[10px] md:text-xs font-black uppercase tracking-widest text-ink">No matches found</span>
                <span class="text-[9px] md:text-[10px] text-mute leading-tight max-w-[200px]">Try searching for a different brand or model name.</span>
            </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    {#if selectedDevice}
        <div class="flex items-center gap-3 p-3 md:p-4 bg-ink/5 border border-hairline rounded-md" in:fade>
            <div class="w-7 h-7 md:w-8 md:h-8 rounded bg-ink flex items-center justify-center text-canvas">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-4 md:h-4"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
            </div>
            <div class="flex flex-col">
                <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-ink">{selectedDevice.name}</span>
                <span class="text-[8px] md:text-[9px] font-mono font-bold text-mute">{selectedDevice.ppi} PPI | {selectedDevice.width}x{selectedDevice.height}</span>
            </div>
        </div>
    {/if}

    <button 
        class="btn-black w-full py-3.5 md:py-4 {selectedDevice ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}"
        on:click={applyCalibration}
        disabled={!selectedDevice}
    >
        Apply Selection
    </button>
  </div>
</div>
