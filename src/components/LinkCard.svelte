<script lang="ts">
  import Icon from '../lib/Icon.svelte';
  import { getIconComponent } from '../lib/icons';
  
  export let title: string;
  export let url: string;
  export let icon: string;
  export let backgroundColor: string = "#F5F5F5";
  
  // Obtém o componente de ícone correto da biblioteca svelte-icons baseado no caminho do ícone
  const iconComponent = getIconComponent(icon);
  
  // Para debug
  console.log('Icon name:', icon);
  console.log('Icon component:', iconComponent);
</script>

<a 
  href={url} 
  target="_blank" 
  rel="noopener noreferrer"
  class="link-card rounded-lg p-3 flex items-center gap-3 transition-all duration-300 hover:scale-102 focus:scale-102 hover:shadow-md focus:shadow-md"
  style:background-color={backgroundColor}
>
  <div class="icon-container w-11 h-11 flex-shrink-0 flex items-center justify-center">
    <Icon icon={iconComponent} size={24} color="var(--color-primary-500)" ariaLabel={title} />
  </div>
  <div class="link-title text-center flex-grow font-medium truncate">
    {title}
  </div>
</a>

<style>
  .link-card {
    min-height: 44px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    font-family: 'Inter', 'Roboto', sans-serif;
  }

  :global([data-mode="dark"]) .link-card {
    color: var(--app-text);
    background-color: var(--color-surface-100) !important; /* Usando a variável do tema */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .link-card {
    width: 100%;
    height: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    transition: all 0.3s ease;
  }
  
  .link-card:hover, .link-card:focus {
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
  }
  
  @media (min-width: 1024px) {
    .link-card {
      min-height: 64px;
      padding: 0.875rem;
    }
    
    .icon-container {
      width: 3rem;
      height: 3rem;
    }
  }
  
  @media (min-width: 1536px) {
    .link-card {
      min-height: 70px;
      padding: 1rem;
    }
  }
</style>