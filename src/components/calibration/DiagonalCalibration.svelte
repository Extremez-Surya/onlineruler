<script lang="ts">
  import { calibrationStore } from '../../lib/store';
  import { trackCalibration } from '../../lib/analytics';

  let diagonal = 15.6;
  let resX = 1920;
  let resY = 1080;

  $: calculatedPPI = Math.sqrt(resX**2 + resY**2) / diagonal;

  function applyCalibration() {
    calibrationStore.set({
      ppi: calculatedPPI,
      dpr: window.devicePixelRatio || 1,
      method: 'diagonal',
      confidence: 0.9,
      isVerified: false,
      lastUpdated: new Date().toISOString()
    });
    trackCalibration('diagonal', calculatedPPI);
  }
</script>

<div class="p-4 md:p-8 flex flex-col gap-6 md:gap-8 flex-1">
  <div class="flex items-center justify-between">
    <h3 class="text-[10px] md:text-xs font-bold uppercase tracking-widest text-ink">Scale Calculation</h3>
    <span class="text-[8px] md:text-[9px] font-mono font-bold px-2 py-1 bg-ink text-canvas rounded-sm text-center uppercase">
      MANUAL MATH
    </span>
  </div>

  <div class="grid grid-cols-1 gap-5 md:gap-6">
    <div class="flex flex-col gap-2">
      <label for="diagonal" class="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] text-mute">Diagonal Size (in)</label>
      <input 
        id="diagonal"
        type="number" 
        bind:value={diagonal}
        step="0.1"
        class="bg-canvas-soft-2 w-full border border-hairline rounded-md px-4 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-ink transition-colors font-mono font-bold"
      />
    </div>
    
    <div class="flex flex-col gap-2">
      <label for="res" class="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] text-mute">Active Resolution</label>
      <div class="flex items-center gap-2 md:gap-3">
        <input 
          type="number" 
          bind:value={resX}
          class="bg-canvas-soft-2 w-full border border-hairline rounded-md px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-ink transition-colors font-mono font-bold"
        />
        <span class="text-mute font-mono text-xs">×</span>
        <input 
          type="number" 
          bind:value={resY}
          class="bg-canvas-soft-2 w-full border border-hairline rounded-md px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-ink transition-colors font-mono font-bold"
        />
      </div>
    </div>
  </div>

  <div class="p-4 md:p-5 bg-canvas-soft-2 rounded-md border border-hairline border-dashed flex justify-between items-center">
      <span class="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-mute">Resolved PPI</span>
      <span class="text-lg md:text-xl font-mono font-black text-ink">{calculatedPPI.toFixed(1)}</span>
  </div>

  <button 
    class="btn-black w-full"
    on:click={applyCalibration}
  >
    Apply Resolved Scale
  </button>
</div>
