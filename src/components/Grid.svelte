<script lang="ts">
  import { calibrationStore, preferencesStore, mmToPx } from '../lib/store';

  $: ppi = $calibrationStore.ppi;
  $: unit = $preferencesStore.unit;
  $: gridType = $preferencesStore.gridType;

  // Grid spacing in pixels
  $: spacing = unit === 'in' ? ppi : mmToPx(10, ppi); // 1 inch or 1 cm
  $: subdivision = spacing / 10; // mm grid or 1/10th inch
</script>

<div class="fixed inset-0 pointer-events-none z-0 transition-all duration-300">
  {#if gridType === 'dots'}
    <div 
      class="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]"
      style="
        background-image: radial-gradient(circle, var(--fg) 1.5px, transparent 1.5px);
        background-size: {spacing}px {spacing}px;
      "
    ></div>
  {:else if gridType === 'lines'}
    <div 
      class="absolute inset-0 opacity-[0.1] dark:opacity-[0.2]"
      style="
        background-image: 
            linear-gradient(to right, var(--fg) 1px, transparent 1px),
            linear-gradient(to bottom, var(--fg) 1px, transparent 1px);
        background-size: {spacing}px {spacing}px;
      "
    ></div>
  {:else if gridType === 'subdivisions'}
    <div 
      class="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
      style="
        background-image: 
            linear-gradient(to right, var(--fg) 1px, transparent 1px),
            linear-gradient(to bottom, var(--fg) 1px, transparent 1px);
        background-size: {subdivision}px {subdivision}px;
      "
    ></div>
    <div 
      class="absolute inset-0 opacity-[0.15] dark:opacity-[0.3]"
      style="
        background-image: 
            linear-gradient(to right, var(--fg) 1px, transparent 1px),
            linear-gradient(to bottom, var(--fg) 1px, transparent 1px);
        background-size: {spacing}px {spacing}px;
      "
    ></div>
  {/if}
</div>

<style>
    /* Use tailwind classes for theme-specific opacity if possible, otherwise keep manual */
</style>
