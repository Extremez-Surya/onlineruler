<script lang="ts">
  import { preferencesStore, calibrationStore } from '../lib/store';
  import RulerLayout from './RulerLayout.svelte';
  import FloatingToolbox from './FloatingToolbox.svelte';
  import Crosshair from './Crosshair.svelte';
  import Grid from './Grid.svelte';
  import CalibrationWizard from './calibration/CalibrationWizard.svelte';
  import Modal from './ui/Modal.svelte';
  import { onMount } from 'svelte';

  let { initialUnit = null, isEmbedded = false } = $props<{ initialUnit?: string | null, isEmbedded?: boolean }>();
  let showCalibration = $state(false);

  // Sync theme with document element
  $effect(() => {
    const currentTheme = $preferencesStore.theme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', currentTheme);
      document.documentElement.style.backgroundColor = currentTheme === 'dark' ? '#000000' : '#ffffff';
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (isEmbedded) return; // Disable shortcuts in embedded mode to avoid conflicts
    // ... rest of handleKeydown

    switch (key) {
      case 'r': // Toggle Rulers (Cycles through Top+Left -> All -> None)
        const currentRulers = preferencesStore.get().rulers;
        if (currentRulers.top && currentRulers.left && !currentRulers.bottom) {
          preferencesStore.setKey('rulers', { top: true, bottom: true, left: true, right: true });
        } else if (currentRulers.top && currentRulers.bottom) {
          preferencesStore.setKey('rulers', { top: false, bottom: false, left: false, right: false });
        } else {
          preferencesStore.setKey('rulers', { top: true, bottom: false, left: true, right: false });
        }
        break;
      case 'g': // Toggle Grid
        preferencesStore.setKey('showGrid', !$preferencesStore.showGrid);
        break;
      case 'c': // Toggle Crosshair
        preferencesStore.setKey('showCrosshair', !$preferencesStore.showCrosshair);
        break;
      case 'u': // Cycle Units
        const units = ['cm', 'mm', 'in', 'px'];
        const currentIndex = units.indexOf($preferencesStore.unit);
        const nextUnit = units[(currentIndex + 1) % units.length];
        preferencesStore.setKey('unit', nextUnit as any);
        break;
      case 't': // Toggle Theme
        const newTheme = $preferencesStore.theme === 'light' ? 'dark' : 'light';
        preferencesStore.setKey('theme', newTheme);
        break;
      case 'k': // Open Calibration (K for Kalibrate)
        showCalibration = !showCalibration;
        break;
      case '?': // Toggle all UI for clean view
        // Potential future feature: Clean mode
        break;
    }
  }

  onMount(() => {
    // Initial Unit Setup
    if (initialUnit && (initialUnit === 'cm' || initialUnit === 'mm' || initialUnit === 'in' || initialUnit === 'px')) {
      preferencesStore.setKey('unit', initialUnit as any);
    }

    // Handle external triggers
    const handleOpenCalibration = () => {
      showCalibration = true;
    };

    window.addEventListener('open-calibration', handleOpenCalibration);
    return () => window.removeEventListener('open-calibration', handleOpenCalibration);
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Master Application Layer -->
<div class={isEmbedded ? "relative w-full h-[600px] sm:h-[80vh] overflow-hidden border border-hairline rounded-xl shadow-2xl bg-canvas" : "fixed inset-0 overflow-hidden bg-canvas"}>
  
  <!-- Layer 0: Grid/Texture -->
  <div class="absolute inset-0 z-0">
    {#if $preferencesStore.showGrid}
      <Grid />
    {:else}
      <div class="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    {/if}
  </div>

  <!-- Layer 1: Rulers -->
  <div class="absolute inset-0 z-10 pointer-events-none">
    <RulerLayout 
        showTop={$preferencesStore.rulers.top} 
        showBottom={$preferencesStore.rulers.bottom} 
        showLeft={$preferencesStore.rulers.left} 
        showRight={$preferencesStore.rulers.right} 
        isEmbedded={isEmbedded}
    />
  </div>

  <!-- Layer 2: Tools (Crosshair marks are interactive) -->
  {#if $preferencesStore.showCrosshair}
    <div class="absolute inset-0 z-20 pointer-events-none">
        <Crosshair />
    </div>
  {/if}

  <!-- Layer 3: Interaction Surface -->
  <!-- This invisible layer ensures clicks for crosshair marking work without blocking rulers -->
  <div class="absolute inset-0 z-[5] cursor-crosshair"></div>

  <!-- Layer 4: Global Interface (Highest) -->
  <FloatingToolbox isEmbedded={isEmbedded} onOpenCalibration={() => { showCalibration = true; }} />

  <!-- Layer 5: Modals -->
  <Modal 
      show={showCalibration} 
      title="Control Center" 
      onClose={() => { showCalibration = false; }}
  >
      <CalibrationWizard />
  </Modal>
</div>
