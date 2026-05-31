<script lang="ts">
  import { onMount } from 'svelte';
  import SVGRuler from './SVGRuler.svelte';

  let { 
    isEmbedded = false,
    showTop = true,
    showBottom = false,
    showLeft = true,
    showRight = false
  } = $props();

  let windowWidth = $state(0);
  let windowHeight = $state(0);
  let container: HTMLDivElement;

  function updateDimensions() {
    if (isEmbedded && container) {
      windowWidth = container.clientWidth;
      windowHeight = container.clientHeight;
    } else {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    }
  }

  onMount(() => {
    updateDimensions();
    if (!isEmbedded) {
      window.addEventListener('resize', updateDimensions);
    } else {
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }
    return () => window.removeEventListener('resize', updateDimensions);
  });
</script>

<!-- Rulers are individually positioned to ensure they don't block the center of the screen -->
<div bind:this={container} class="absolute inset-0 pointer-events-none">
  {#if showTop}
    <div class="{isEmbedded ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-10 pointer-events-auto shadow-sm">
      <SVGRuler orientation="horizontal" side="top" lengthPx={windowWidth} />
    </div>
  {/if}

  {#if showBottom}
    <div class="{isEmbedded ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 z-10 pointer-events-auto shadow-sm">
      <SVGRuler orientation="horizontal" side="bottom" lengthPx={windowWidth} />
    </div>
  {/if}

  {#if showLeft}
    <div class="{isEmbedded ? 'absolute' : 'fixed'} top-0 left-0 bottom-0 z-10 pointer-events-auto shadow-sm">
      <SVGRuler orientation="vertical" side="left" lengthPx={windowHeight} />
    </div>
  {/if}

  {#if showRight}
    <div class="{isEmbedded ? 'absolute' : 'fixed'} top-0 right-0 bottom-0 z-10 pointer-events-auto shadow-sm">
      <SVGRuler orientation="vertical" side="right" lengthPx={windowHeight} />
    </div>
  {/if}
</div>
