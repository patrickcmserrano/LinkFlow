<script lang="ts">
  import { onMount } from 'svelte';
  import { FaSun, FaMoon } from 'svelte-icons/fa';
  import Icon from '../lib/Icon.svelte';

  let isDarkMode = $state(false);

  onMount(() => {
    // Sincroniza o estado do toggle com o modo atual do tema
    const storedMode = localStorage.getItem('mode') || 'light';
    isDarkMode = storedMode === 'dark';
    
    // Garante que o tema inicial seja aplicado
    document.documentElement.setAttribute('data-mode', storedMode);
  });

  function handleThemeChange() {
    isDarkMode = !isDarkMode;
    const mode = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('mode', mode);
  }

  // Garante que o componente exporte algo
  export {};
</script>

<svelte:head>
  <script>
    // Aplicar tema salvo no carregamento da página
    const mode = localStorage.getItem('mode') || 'light';
    document.documentElement.setAttribute('data-mode', mode);
  </script>
</svelte:head>

<div class="theme-toggle-container">
  <button 
    type="button"
    class="theme-toggle"
    id="theme-toggle"
    aria-pressed={isDarkMode}
    aria-label="Alternar tema claro/escuro"
    onclick={handleThemeChange}
  >
    <span class="icon">
      {#if isDarkMode}
        <Icon icon={FaSun} size={20} ariaLabel="Tema claro" />
      {:else}
        <Icon icon={FaMoon} size={20} ariaLabel="Tema escuro" />
      {/if}
    </span>
  </button>
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  .theme-toggle-container {
    display: flex;
    align-items: center;
  }
  
  .theme-toggle {
    background: transparent;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-color, #333);
  }
  
  :global(.dark) .theme-toggle {
    border-color: var(--dark-border, #555);
    color: var(--dark-text, #eee);
  }
  
  .theme-toggle:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  :global(.dark) .theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>