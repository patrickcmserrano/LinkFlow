<script lang="ts">
  import './styles/global.css';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import LanguageSelector from './components/LanguageSelector.svelte';
  import Section from './components/Section.svelte';
  import { _ } from './lib/i18n';
  import { onMount } from 'svelte';
  import { Link } from '@lucide/svelte';

  // Inicializa o suporte a idiomas
  import { i18n } from './lib/i18n';
  i18n.initialize();

  // Carrega os dados do arquivo links.json
  import * as linksDataModule from './data/links.json';
  
  // Use o modulo importado como objeto
  const linksData = linksDataModule;
  
  let profile = linksData.profile;
  let sections = linksData.sections;
  
  // Função para ajustar caminhos de imagens com o caminho base
  const getImagePath = (path) => {
    // Remover a barra inicial se existir
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    // Usar uma string vazia como fallback se BASE_URL não estiver definido
    const baseUrl = import.meta.env?.BASE_URL || '';
    return baseUrl + cleanPath;
  };

  // Calcular o layout baseado na largura da tela
  let windowWidth = 0;
  let currentLayout: 'grid' | 'list' = 'list';
  let layoutTransitioning = false;
  
  // Define o layout atual com base na largura da janela
  $: {
    const newLayout = windowWidth >= 1024 ? ('grid' as const) : ('list' as const);
    if (currentLayout !== newLayout) {
      layoutTransitioning = true;
      setTimeout(() => {
        currentLayout = newLayout;
        layoutTransitioning = false;
      }, 300);
    }
  }
  
  // Atualizar a largura da janela quando redimensionar
  onMount(() => {
    // Define a largura inicial
    windowWidth = window.innerWidth;
    currentLayout = windowWidth >= 1024 ? ('grid' as const) : ('list' as const);
    
    // Adiciona um event listener para redimensionamento com debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        windowWidth = window.innerWidth;
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<main class="min-h-screen mx-auto px-4 py-6 space-y-6 app-container">
  <div class="flex justify-between items-center mb-8">
    <div class="language-selector">
      <LanguageSelector />
    </div>
    <div class="theme-toggle">
      <ThemeToggle />
    </div>
  </div>
  
  <div class="profile mb-8 transition-all duration-300 ease-in-out">
    <div class="profile-container">
      <div class="avatar-section">
        <div class="avatar-container rounded-full overflow-hidden">
          <img src={getImagePath(profile.avatar)} alt={profile.name} class="w-full h-full object-cover" />
        </div>
      </div>
      <div class="info-section">
        <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
          <Link size={24} class="text-blue-500" />
          <h1 class="h1 text-2xl md:text-3xl font-bold">{$_('app.title')}</h1>
        </div>
        <p class="text-base opacity-80 max-w-xs mx-auto md:mx-0">{$_('app.subtitle')}</p>
      </div>
    </div>
  </div>
  
  <div class="sections-container" class:transitioning={layoutTransitioning}>
    {#each sections as section}
      <Section 
        name={section.name} 
        color={section.color} 
        links={section.links.map(link => ({
          ...link,
          icon: getImagePath(link.icon)
        }))}
        layout={currentLayout}
      />
    {/each}
  </div>
  
  <footer class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
    <p class="text-sm text-gray-600 dark:text-gray-400">{$_('footer.copyright')}</p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Roboto', system-ui, sans-serif;
  }
  
  .app-container {
    width: 100%;
    max-width: 420px; /* Mobile first */
  }
  
  @media (min-width: 768px) {
    .app-container {
      max-width: 720px;
    }
  }
  
  @media (min-width: 1024px) {
    .app-container {
      max-width: 960px;
    }
  }
  
  @media (min-width: 1280px) {
    .app-container {
      max-width: 1140px;
    }
  }
  
  @media (min-width: 1536px) {
    .app-container {
      max-width: 1400px;
    }
  }
  
  .sections-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    transition: all 0.3s ease-in-out;
  }
  
  .sections-container.transitioning {
    opacity: 0.8;
    transform: scale(0.98);
  }
  
  @media (min-width: 768px) {
    .sections-container {
      grid-template-columns: repeat(1, 1fr);
      gap: 1.25rem;
    }
  }
  
  @media (min-width: 1024px) {
    .sections-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }
  
  @media (min-width: 1536px) {
    .sections-container {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.75rem;
    }
  }
  
  /* Estilos para o perfil responsivo */
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease-in-out;
  }
  
  .avatar-section {
    margin-bottom: 1rem;
  }
  
  .avatar-container {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
  }
  
  /* Layout responsivo para telas médias e maiores */
  @media (min-width: 768px) {
    .profile-container {
      flex-direction: row;
      text-align: left;
      gap: 2rem;
      align-items: center;
    }
    
    .avatar-section {
      margin-bottom: 0;
    }
    
    .avatar-container {
      width: 6rem;
      height: 6rem;
    }
    
    .info-section {
      flex: 1;
    }
  }
  
  /* Layout para telas grandes (desktop) */
  @media (min-width: 1280px) {
    .avatar-container {
      width: 7rem;
      height: 7rem;
    }
  }
</style>
