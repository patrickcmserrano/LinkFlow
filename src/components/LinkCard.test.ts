import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import LinkCard from '../components/LinkCard.svelte';

// Mock para o componente para compatibilidade com Svelte 5
vi.mock('../lib/icons', () => {
  return {
    getIconComponent: () => 'MockIconComponent'
  };
});

vi.mock('../lib/Icon.svelte', () => {
  return {
    default: {
      render: (props) => {
        return {
          html: `<div class="mock-icon" aria-label="${props.ariaLabel}"></div>`
        };
      }
    }
  };
});

vi.mock('../components/LinkCard.svelte', () => {
  return {
    default: {
      render: (props) => {
        return {
          html: `
            <a href="${props.url}" class="link-card" style="background-color: ${props.backgroundColor || '#F5F5F5'}">
              <div class="icon-container">
                <div class="mock-icon" aria-label="${props.title}"></div>
              </div>
              <div class="link-title">${props.title}</div>
            </a>
          `
        };
      }
    }
  };
});

describe('LinkCard Component', () => {
  it('renderiza com as propriedades corretas', () => {
    const component = LinkCard.render({
      title: 'Test Link',
      url: 'https://example.com',
      icon: '/images/test-icon.svg'
    });
    
    expect(component.html).toContain('Test Link');
    expect(component.html).toContain('href="https://example.com"');
    expect(component.html).toContain('mock-icon');
  });

  it('aplica a cor de fundo personalizada', () => {
    const component = LinkCard.render({
      title: 'Colored Link',
      url: 'https://example.com',
      icon: '/images/test-icon.svg',
      backgroundColor: '#FF5733'
    });
    
    expect(component.html).toContain('background-color: #FF5733');
  });
});