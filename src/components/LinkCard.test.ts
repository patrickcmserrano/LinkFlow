import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import LinkCard from './LinkCard.svelte';

// Mock para o componente Icon
vi.mock('../lib/Icon.svelte', () => {
  return {
    default: {
      render: (props: { props: { ariaLabel: any; } }) => {
        return {
          html: `<div class="mock-icon" aria-label="${props.props.ariaLabel || ''}"></div>`
        };
      }
    }
  };
});

// Mock para a função getIconComponent
vi.mock('../lib/icons', () => {
  return {
    getIconComponent: () => 'MockIconComponent'
  };
});


describe('LinkCard Component', () => {
  it('renderiza com as propriedades corretas', () => {
    const { container } = render(LinkCard, {
      props: {
        title: 'Test Link',
        url: 'https://example.com',
        icon: '/images/test-icon.svg'
      }
    });
    
    expect(container.innerHTML).toContain('Test Link');
    expect(container.innerHTML).toContain('href="https://example.com"');
    expect(container.innerHTML).toContain('mock-icon');
  });

  it('aplica a cor de fundo personalizada', () => {
    const { container } = render(LinkCard, {
      props: {
        title: 'Colored Link',
        url: 'https://example.com',
        icon: '/images/test-icon.svg',
        backgroundColor: '#FF5733'
      }
    });
    
    const linkElement = container.querySelector('a');
    expect(linkElement).toHaveStyle('background-color: #FF5733');
  });
});