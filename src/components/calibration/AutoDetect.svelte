<script lang="ts">
  import { onMount } from 'svelte';
  import { calibrationStore } from '../../lib/store';
  import { detectDevice } from '../../lib/devices';
  import { trackCalibration } from '../../lib/analytics';

  let detectedName = "Unknown Device";
  let detectedPPI = 96;
  let confidence = 0.5;
  let isChecking = true;

  onMount(() => {
    const device = detectDevice();
    if (device) {
      detectedName = device.name;
      detectedPPI = device.ppi;
      confidence = 0.95;
    } else {
      // Fallback estimate based on DPR
      const dpr = window.devicePixelRatio || 1;
      if (dpr >= 2) {
        detectedPPI = 192;
        confidence = 0.6;
      } else {
        detectedPPI = 96;
        confidence = 0.5;
      }
    }
    isChecking = false;
  });

  function applyCalibration() {
    calibrationStore.set({
      ppi: detectedPPI,
      dpr: window.devicePixelRatio || 1,
      method: 'auto',
      confidence: confidence,
      isVerified: false,
      lastUpdated: new Date().toISOString()
    });
    trackCalibration('auto', detectedPPI);
  }
</script>

<div class="p-4 md:p-8 flex flex-col gap-6 flex-1">
  <div class="flex items-center justify-between">
    <h3 class="text-[10px] md:text-xs font-bold uppercase tracking-widest text-ink">Auto-Detection</h3>
    {#if isChecking}
      <span class="text-[9px] md:text-[10px] font-mono text-mute animate-pulse">SCANNING...</span>
    {:else}
      <span class="text-[8px] md:text-[9px] font-mono font-bold px-2 py-1 bg-ink text-canvas rounded-sm uppercase">
        {Math.round(confidence * 100)}% CONFIDENCE
      </span>
    {/if}
  </div>

  <p class="text-xs md:text-sm text-body leading-relaxed">
    We've identified your hardware as <span class="text-ink font-bold">{detectedName}</span>. 
    Our spec database suggests a density of <span class="text-ink font-bold font-mono">{detectedPPI} PPI</span>.
  </p>

  <div class="mt-auto pt-6">
    <button 
      class="btn-black w-full"
      on:click={applyCalibration}
      disabled={isChecking}
    >
      Initialize Precision
    </button>
  </div>
</div>
