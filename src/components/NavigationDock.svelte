<script lang="ts">
  import { preferencesStore } from '../lib/store';
  import { onMount } from 'svelte';

  let { currentPath = '/' } = $props<{ currentPath?: string }>();

  const links = [
    { name: 'Home', href: '/', icon: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { name: 'About', href: '/about', icon: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M12 9l.01 0 M11 12l1 0l0 4l1 0' },
    { name: 'Contact', href: '/contact', icon: 'M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z M3 7l9 6l9 -6' },
    { name: 'Privacy', href: '/privacy', icon: 'M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3' },
    { name: 'Terms', href: '/terms', icon: 'M14 3v4a1 1 0 0 0 1 1h4 M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5 M9 15h2 M12 15h1 M9 18h6' }
  ];

  function toggleTheme() {
    const current = preferencesStore.get().theme;
    const next = current === 'light' ? 'dark' : 'light';
    preferencesStore.setKey('theme', next);
    
    // Immediate DOM update for zero-latency feel
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.style.backgroundColor = next === 'dark' ? '#000000' : '#ffffff';
    }
  }

  // Reactive effect for the store value (handles cross-tab sync and store initialization)
  $effect(() => {
    const currentTheme = $preferencesStore.theme;
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', currentTheme);
        document.documentElement.style.backgroundColor = currentTheme === 'dark' ? '#000000' : '#ffffff';
    }
  });
</script>

<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
    <nav class="flex items-center gap-1 p-1.5 rounded-2xl bg-canvas/80 dark:bg-canvas-soft/80 backdrop-blur-2xl border border-hairline shadow-2xl pointer-events-auto overflow-hidden">
        
        <!-- Navigation Links -->
        <div class="flex items-center gap-1 px-1">
            {#each links as link}
                <a 
                    href={link.href}
                    class="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all group {currentPath === link.href ? 'bg-ink text-canvas shadow-lg scale-105' : 'text-mute hover:bg-canvas-soft-2 hover:text-ink'}"
                    title={link.name}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d={link.icon} />
                    </svg>
                    
                    <!-- Tooltip -->
                    <span class="absolute -top-10 px-3 py-1 rounded-md bg-ink text-canvas text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-hairline shadow-2xl">
                        {link.name}
                    </span>
                    
                    {#if currentPath === link.href}
                        <div class="absolute -bottom-1 w-1 h-1 rounded-full bg-canvas"></div>
                    {/if}
                </a>
            {/each}
        </div>

        <div class="w-px h-6 bg-hairline mx-2"></div>

        <!-- Theme Toggle -->
        <button 
            onclick={toggleTheme}
            class="flex items-center justify-center w-12 h-12 rounded-xl text-mute hover:bg-canvas-soft-2 hover:text-ink transition-all group relative"
            title="Toggle Theme"
        >
            {#if $preferencesStore.theme === 'light'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            {/if}
            
            <span class="absolute -top-10 px-3 py-1 rounded-md bg-ink text-canvas text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-hairline shadow-2xl">
                Theme
            </span>
        </button>

        <div class="w-px h-6 bg-hairline mx-2"></div>

        <!-- Workspace Quick Action -->
        <a 
            href="/measure"
            class="flex items-center gap-3 px-6 h-12 rounded-xl bg-ink text-canvas font-black uppercase text-[10px] tracking-widest shadow-2xl hover:opacity-90 active:scale-95 transition-all group overflow-hidden relative"
        >
            <span class="relative z-10">Workspace</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </a>
    </nav>
</div>

<style>
    nav {
        /* Premium Dock Shadow */
        box-shadow: 
            0 0 0 1px rgba(0,0,0,0.05),
            0 20px 50px -10px rgba(0,0,0,0.2),
            0 10px 30px -15px rgba(0,0,0,0.1);
    }

    :global([data-theme='dark']) nav {
        box-shadow: 
            0 0 0 1px rgba(255,255,255,0.05),
            0 20px 50px -10px rgba(0,0,0,0.4);
    }
</style>
