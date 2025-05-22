import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import LinkCard from './LinkCard.svelte';

// Mock para o componente para compatibilidade com Svelte 5
vi.mock('../lib/icons', () => {
  return {
    getIconComponent: () => 'MockIconComponent'
  };
});

vi.mock('../lib/Icon.svelte', () => {
  return {
    default: {
      render: (props: { ariaLabel: any; }) => {
        return {
          html: `<div class="mock-icon" aria-label="${props.ariaLabel}"></div>`
        };
      }
    }
  };
});


describe('LinkCard Component', () => {
  it('renderiza com as propriedades corretas', () => {
    const { container } = render(LinkCard, {
      title: 'Test Link',
      url: 'https://example.com',
      icon: '/images/test-icon.svg'
    });
    
    expect(container.innerHTML).toContain('Test Link');
    expect(container.innerHTML).toContain('href="https://example.com"');
    expect(container.innerHTML).toContain('mock-icon');
  });

  it('aplica a cor de fundo personalizada', () => {
    render(LinkCard, {
      title: 'Colored Link',
      url: 'https://example.com',
      icon: '/images/test-icon.svg',
      backgroundColor: '#FF5733'
    });
    
    expect(screen.getByRole('link')).toHaveStyle('background-color: #FF5733');
  });
});