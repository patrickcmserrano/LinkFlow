import { describe, it, expect, vi } from 'vitest';
import { getIconComponent } from './icons';

// Mock dos componentes de ícone
vi.mock('svelte-icons/fa', () => ({
  FaLink: 'FaLink', 
  FaHome: 'FaHome',
  FaCode: 'FaCode',
  FaBlog: 'FaBlog',
  FaLinkedin: 'FaLinkedin',
  FaGithub: 'FaGithub',
  FaYoutube: 'FaYoutube',
  FaWallet: 'FaWallet',
  FaBitcoin: 'FaBitcoin'
}));

// Mock do iconMap para testes
vi.mock('./icons', async (importOriginal) => {
  const module = await importOriginal() as any;
  return {
    ...module,
    iconMap: {
      'default-icon': 'FaLink',
      'portfolio-icon': 'FaCode',
      'blog-icon': 'FaBlog',
      'weboasis-icon': 'FaHome',
      'linkedin-icon': 'FaLinkedin',
      'github-icon': 'FaGithub',
      'youtube-icon': 'FaYoutube',
      'moneyflow-icon': 'FaWallet',
      'bitcoin-icon': 'FaBitcoin',
      'linkflow-icon': 'FaLink'
    }
  };
});

describe('Icons Utility', () => {
  it('deve retornar o ícone corretamente pelo nome direto', () => {
    const portfolioIcon = getIconComponent('portfolio-icon');
    expect(portfolioIcon).toBe('FaCode');
    
    const linkedinIcon = getIconComponent('linkedin-icon');
    expect(linkedinIcon).toBe('FaLinkedin');
  });

  it('deve lidar com caminhos de arquivo legados por compatibilidade', () => {
    const portfolioIcon = getIconComponent('/images/portfolio-icon.svg');
    expect(portfolioIcon).toBe('FaCode');
    
    const linkedinIcon = getIconComponent('/images/linkedin-icon.svg');
    expect(linkedinIcon).toBe('FaLinkedin');
  });

  it('deve retornar o ícone padrão para entradas inválidas', () => {
    const defaultIcon1 = getIconComponent('');
    expect(defaultIcon1).toBe('FaLink');
    
    const defaultIcon2 = getIconComponent(undefined as any);
    expect(defaultIcon2).toBe('FaLink');
    
    const defaultIcon3 = getIconComponent('icone-inexistente');
    expect(defaultIcon3).toBe('FaLink');
  });
});
