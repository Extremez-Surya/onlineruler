<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  let { show = false, title = "", onClose, children } = $props<{
    show?: boolean;
    title?: string;
    onClose: () => void;
    children?: any;
  }>();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && show) onClose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if show}
  <div class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        transition:fade={{ duration: 200 }}
        class="absolute inset-0 bg-ink/60 backdrop-blur-md cursor-pointer" 
        onclick={onClose}
    ></div>

    <!-- Modal Content -->
    <div 
        transition:fly={{ y: 20, duration: 300 }}
        class="relative w-full sm:max-w-xl bg-canvas border-t sm:border border-hairline rounded-t-xl sm:rounded-md shadow-2xl flex flex-col overflow-hidden max-h-[95vh] sm:max-h-[none]"
    >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b border-hairline bg-canvas-soft-2">
            <h2 class="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-ink">{title}</h2>
            <button 
                onclick={onClose}
                class="p-2 -mr-2 rounded-md hover:bg-ink hover:text-canvas transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-1 md:p-2 bg-canvas">
            {@render children?.()}
        </div>
    </div>
  </div>
{/if}
