<script lang="ts">
  import { calibrationStore, preferencesStore } from '../lib/store';

  let { 
    orientation = 'horizontal', 
    side = 'top', 
    lengthPx = 500, 
    showLabels = true 
  } = $props();

  // Use physical PPI and DPR from store to calculate CSS PPI for accurate drawing
  let ppi = $derived($calibrationStore.ppi);
  let dpr = $derived($calibrationStore.dpr);
  let cssPpi = $derived(ppi / dpr);
  let unit = $derived($preferencesStore.unit);

  // Generate tick marks
  interface Tick {
    pos: number;
    height: number;
    label?: string;
    isMajor: boolean;
  }

  function getTicks(totalPx: number, currentCssPpi: number, currentUnit: string): Tick[] {
    const ticks: Tick[] = [];
    
    if (currentUnit === 'cm' || currentUnit === 'mm') {
      const totalMm = (totalPx / currentCssPpi) * 25.4;
      for (let mm = 0; mm <= totalMm; mm++) {
        const pos = (mm / 25.4) * currentCssPpi;
        if (pos > totalPx) break;

        let height = 8;
        let label = "";
        let isMajor = false;

        if (mm % 10 === 0) {
          height = 20;
          label = currentUnit === 'cm' ? (mm / 10).toString() : mm.toString();
          isMajor = true;
        } else if (mm % 5 === 0) {
          height = 14;
        }
        ticks.push({ pos, height, label, isMajor });
      }
    } else if (currentUnit === 'in') {
      const totalIn = totalPx / currentCssPpi;
      // 1/16th inch intervals
      const steps = totalIn * 16;
      for (let i = 0; i <= steps; i++) {
        const pos = (i / 16) * currentCssPpi;
        if (pos > totalPx) break;

        let height = 8;
        let label = "";
        let isMajor = false;

        if (i % 16 === 0) {
          height = 20;
          label = (i / 16).toString();
          isMajor = true;
        } else if (i % 8 === 0) {
          height = 14;
        } else if (i % 4 === 0) {
          height = 11;
        }
        ticks.push({ pos, height, label, isMajor });
      }
    } else if (currentUnit === 'px') {
      for (let px = 0; px <= totalPx; px += 10) {
        let height = 8;
        let label = "";
        let isMajor = false;

        if (px % 100 === 0) {
          height = 20;
          label = px.toString();
          isMajor = true;
        } else if (px % 50 === 0) {
          height = 14;
        }
        ticks.push({ pos: px, height, label, isMajor });
      }
    }
    
    return ticks;
  }

  let ticks = $derived(getTicks(lengthPx, cssPpi, unit));
</script>

<div 
  role="img"
  aria-label="Online ruler showing {lengthPx} pixels in {unit} unit"
  class="relative bg-canvas select-none border-hairline transition-colors duration-200"
  style="
    {orientation === 'horizontal' ? `width: ${lengthPx}px; height: var(--ruler-thickness);` : `width: var(--ruler-thickness); height: ${lengthPx}px;`}
    {side === 'top' ? 'border-b' : side === 'bottom' ? 'border-t' : side === 'left' ? 'border-r' : 'border-l'}
  "
>
  <style>
    :root {
      --ruler-thickness: 48px;
    }
    @media (min-width: 640px) {
      :root {
        --ruler-thickness: 64px;
      }
    }
  </style>
  <svg 
    width={orientation === 'horizontal' ? lengthPx : undefined} 
    height={orientation === 'vertical' ? lengthPx : undefined}
    style="width: {orientation === 'horizontal' ? lengthPx + 'px' : '100%'}; height: {orientation === 'vertical' ? lengthPx + 'px' : '100%'};"
    class="overflow-visible"
  >
    {#each ticks as tick}
      {#if orientation === 'horizontal'}
        <line 
          x1={tick.pos} 
          y1={side === 'top' ? 0 : '100%'} 
          x2={tick.pos} 
          y2={side === 'top' ? (tick.isMajor ? '35%' : '20%') : side === 'bottom' ? (tick.isMajor ? '65%' : '80%') : ''}
          class="stroke-ink {tick.isMajor ? 'stroke-[1.5px]' : 'stroke-[1px]'}"
        />
        {#if tick.label && showLabels}
          <text 
            x={tick.pos} 
            y={side === 'top' ? '65%' : '35%'}
            text-anchor="middle"
            class="fill-ink font-mono text-[9px] font-black"
          >
            {tick.label}
          </text>
        {/if}
      {:else}
        <line 
          x1={side === 'left' ? 0 : '100%'} 
          y1={tick.pos} 
          x2={side === 'left' ? (tick.isMajor ? '35%' : '20%') : side === 'right' ? (tick.isMajor ? '65%' : '80%') : ''} 
          y2={tick.pos}
          class="stroke-ink {tick.isMajor ? 'stroke-[1.5px]' : 'stroke-[1px]'}"
        />
        {#if tick.label && showLabels}
          <text 
            x={side === 'left' ? '65%' : '35%'} 
            y={tick.pos}
            dominant-baseline="middle"
            text-anchor="middle"
            class="fill-ink font-mono text-[9px] font-black"
          >
            {tick.label}
          </text>
        {/if}
      {/if}
    {/each}
  </svg>
  
  {#if showLabels}
    <div class="absolute {orientation === 'horizontal' ? 'bottom-1 right-2' : 'bottom-2 right-1 rotate-90 origin-bottom-right'} text-[8px] font-mono font-black text-ink opacity-30 uppercase tracking-[0.2em]">
      {unit}
    </div>
  {/if}
</div>
