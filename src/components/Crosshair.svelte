<script lang="ts">
  import { onMount } from 'svelte';
  import { preferencesStore, formatMeasurement, calibrationStore } from '../lib/store';

  let mouseX = 0;
  let mouseY = 0;
  let isMouseInside = false;

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseInside = true;
  }

  function handleTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      isMouseInside = true;
    }
  }

  function handleMouseLeave() {
    isMouseInside = false;
  }

  function handleClick(e: MouseEvent) {
    // Only mark if we're clicking the background (not UI)
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('aside') || target.closest('.card-marketing')) return;
    
    const newPoints = [...$preferencesStore.markedPoints, { x: e.clientX, y: e.clientY }];
    preferencesStore.setKey('markedPoints', newPoints);
  }

  function handleTouchStart(e: TouchEvent) {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('aside') || target.closest('.card-marketing')) return;
    
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const newPoints = [...$preferencesStore.markedPoints, { x: touch.clientX, y: touch.clientY }];
      preferencesStore.setKey('markedPoints', newPoints);
    }
  }

  function clearPoints() {
    preferencesStore.setKey('markedPoints', []);
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  });

  $: unit = $preferencesStore.unit;
  $: ppi = $calibrationStore.ppi;
  $: markedPoints = $preferencesStore.markedPoints;

  function calcVal(px: number) {
    return unit === 'px' ? px : (px / ppi) * 25.4;
  }
</script>

<div class="fixed inset-0 pointer-events-none z-[50]" on:mouseleave={handleMouseLeave}>
  <!-- Marked Points -->
  {#each markedPoints as point, i}
    <div class="absolute inset-0">
      <div class="absolute border-t border-ink/40 w-full" style="top: {point.y}px;"></div>
      <div class="absolute border-l border-ink/40 h-full" style="left: {point.x}px;"></div>
      <div 
        class="absolute bg-ink text-canvas px-2 py-1 rounded-sm text-[9px] font-mono font-black shadow-lg"
        style="left: {point.x + 8}px; top: {point.y + 8}px;"
      >
        P{i+1} | {formatMeasurement(calcVal(point.x), unit)}, {formatMeasurement(calcVal(point.y), unit)}
      </div>
    </div>
  {/each}

  <!-- Active Cursor Guide -->
  {#if isMouseInside}
    <div class="absolute left-0 right-0 border-t border-link/50" style="top: {mouseY}px;"></div>
    <div class="absolute top-0 bottom-0 border-l border-link/50" style="left: {mouseX}px;"></div>

    <div 
      class="absolute bg-ink text-canvas px-2 py-1 rounded-sm text-[9px] font-mono font-black shadow-2xl"
      style="left: {mouseX + 12}px; top: {mouseY + 12}px;"
    >
      X: {formatMeasurement(calcVal(mouseX), unit)}<br/>
      Y: {formatMeasurement(calcVal(mouseY), unit)}
    </div>
  {/if}

  {#if markedPoints.length > 0}
    <div class="fixed top-16 md:top-20 right-4 md:right-8 pointer-events-auto">
        <button 
            on:click={clearPoints}
            class="px-3 md:px-4 py-1.5 md:py-2 bg-ink text-canvas text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] rounded-md shadow-2xl border border-hairline hover:opacity-90 active:scale-95 transition-all"
        >
            Clear ({markedPoints.length})
        </button>
    </div>
  {/if}
</div>

<style>
    /* Dark mode adjustments are handled via var(--color-ink) which is mapped to 'ink' class in tailwind 4 */
    :global([data-theme='dark']) .border-link\/50 {
        border-color: rgba(255, 255, 255, 0.4);
    }
</style>
