<script lang="ts">
  import { calibrationStore } from '../../lib/store';
  import { trackCalibration } from '../../lib/analytics';
  
  // Standard Credit Card: 85.60 mm x 53.98 mm
  const CARD_WIDTH_MM = 85.60;
  const CARD_HEIGHT_MM = 53.98;

  const dpr = window.devicePixelRatio || 1;
  let sliderValue = calibrationStore.get().ppi / dpr; // Start with current CSS PPI
  
  // Reactive PPI based on slider (this is CSS PPI)
  $: currentCssPPI = sliderValue;

  function applyCalibration() {
    // Convert back to physical PPI for the database/store
    const physicalPPI = currentCssPPI * dpr;
    calibrationStore.set({
      ppi: physicalPPI,
      dpr: dpr,
      method: 'reference',
      confidence: 1.0, 
      isVerified: true,
      lastUpdated: new Date().toISOString()
    });
    trackCalibration('reference', physicalPPI);
  }

  // Calculate pixel dimensions for the reference card (using CSS PPI)
  $: cardWidthPx = (CARD_WIDTH_MM / 25.4) * currentCssPPI;
  $: cardHeightPx = (CARD_HEIGHT_MM / 25.4) * currentCssPPI;
</script>

<div class="p-4 md:p-8 flex flex-col gap-6 md:gap-8 flex-1">
  <div class="flex items-center justify-between">
    <h3 class="text-[10px] md:text-xs font-bold uppercase tracking-widest text-ink">Physical Alignment</h3>
    <span class="text-[8px] md:text-[9px] font-mono font-bold px-2 py-1 bg-ink text-canvas rounded-sm text-center uppercase">
      MASTER ACCURACY
    </span>
  </div>

  <p class="text-[10px] md:text-[11px] text-body leading-relaxed">
    Align a standard ID card against the box below and adjust the slider for a perfect 1:1 match.
  </p>

  <div class="flex justify-center items-center h-40 md:h-48 bg-canvas-soft-2 rounded-md border border-hairline overflow-hidden p-4">
    <div 
      class="bg-canvas border-2 border-ink rounded-md shadow-sm relative transition-all"
      style="width: {cardWidthPx}px; height: {cardHeightPx}px; max-width: 100%; max-height: 100%;"
    >
      <div class="absolute inset-0 flex items-center justify-center opacity-5">
         <div class="w-8 h-6 bg-ink rounded-sm absolute left-4 top-1/2 -translate-y-1/2"></div>
      </div>
      <span class="absolute bottom-1 right-2 text-[6px] font-mono font-black text-ink/30 italic uppercase">Standard Card Reference</span>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <div class="flex justify-between text-[9px] md:text-[10px] font-mono font-black uppercase tracking-widest">
      <span class="text-mute">Fine Tuning</span>
      <span class="text-ink">{currentCssPPI.toFixed(1)} PPI</span>
    </div>
    <input 
      type="range" 
      min="50" 
      max="600" 
      step="0.1" 
      bind:value={sliderValue}
      class="w-full h-1 bg-hairline rounded-lg appearance-none cursor-pointer accent-ink"
    />
  </div>

  <button 
    class="btn-black w-full"
    on:click={applyCalibration}
  >
    Verify & Save Scale
  </button>
</div>

<style>
    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        background: black;
        cursor: pointer;
        border-radius: 50%;
    }
</style>
