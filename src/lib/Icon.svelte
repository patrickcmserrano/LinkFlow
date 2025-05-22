<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  export let icon: typeof SvelteComponent;
  export let size: number = 24;
  export let color: string = 'currentColor';
  export let ariaLabel: string = '';
  
  // Componentes svelte-icons têm uma API específica
  // Eles esperam que suas props sejam passadas de uma certa maneira
  const svelteIconsProps = {
    width: size,
    height: size,
    fill: color,
    style: `color: ${color};`
  };
</script>

<div class="icon-wrapper" 
     style={`width: ${size}px; height: ${size}px;`} 
     aria-label={ariaLabel}
     role="img">
  <svelte:component
    this={icon}
    {...svelteIconsProps}
  />
</div>

<style>
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<!-- Este é o arquivo existente Icon.svelte. Estou verificando seu conteúdo. -->
