import { describe, it, expect, vi } from 'vitest';
import { getIconComponent } from './icons';

// Definindo factory functions para cada mock
vi.mock('svelte-icons/fa/FaLink.svelte', () => {
  return { default: function FaLink() {} };
});
vi.mock('svelte-icons/fa/FaHome.svelte', () => {
  return { default: function FaHome() {} };
});
vi.mock('svelte-icons/fa/FaGithub.svelte', () => {
  return { default: function FaGithub() {} };
});
vi.mock('svelte-icons/fa/FaLinkedin.svelte', () => {
  return { default: function FaLinkedin() {} };
});
vi.mock('svelte-icons/fa/FaYoutube.svelte', () => {
  return { default: function FaYoutube() {} };
});
vi.mock('svelte-icons/fa/FaMoneyBillAlt.svelte', () => {
  return { default: function FaWallet() {} };
});
vi.mock('svelte-icons/fa/FaCog.svelte', () => {
  return { default: function FaCode() {} };
});
vi.mock('svelte-icons/fa/FaBitcoin.svelte', () => {
  return { default: function FaBitcoin() {} };
});
vi.mock('svelte-icons/fa/FaLeaf.svelte', () => {
  return { default: function FaBlog() {} };
});
vi.mock('svelte-icons/fa/FaChartBar.svelte', () => {
  return { default: function FaCode() {} };
});
vi.mock('svelte-icons/fa/FaDatabase.svelte', () => {
  return { default: function FaCode() {} };
});

describe('Icons Utility', () => {
  it('deve retornar o ícone corretamente pelo nome direto', () => {
    const portfolioIcon = getIconComponent('portfolio-icon');
    expect(typeof portfolioIcon).toBe('function');
    expect(portfolioIcon.name).toContain('Fa');
    
    const linkedinIcon = getIconComponent('linkedin-icon');
    expect(typeof linkedinIcon).toBe('function');
    expect(linkedinIcon.name).toContain('Fa');
  });

  it('deve lidar com caminhos de arquivo legados por compatibilidade', () => {
    const portfolioIcon = getIconComponent('/images/portfolio-icon.svg');
    expect(typeof portfolioIcon).toBe('function');
    expect(portfolioIcon.name).toContain('Fa');
    
    const linkedinIcon = getIconComponent('/images/linkedin-icon.svg');
    expect(typeof linkedinIcon).toBe('function');
    expect(linkedinIcon.name).toContain('Fa');
  });

  it('deve retornar o ícone padrão para entradas inválidas', () => {
    const defaultIcon1 = getIconComponent('');
    expect(typeof defaultIcon1).toBe('function');
    expect(defaultIcon1.name).toBe('FaLink');
    
    const defaultIcon2 = getIconComponent(undefined as any);
    expect(typeof defaultIcon2).toBe('function');
    expect(defaultIcon2.name).toBe('FaLink');
    
    const defaultIcon3 = getIconComponent('icone-inexistente');
    expect(typeof defaultIcon3).toBe('function');
    expect(defaultIcon3.name).toBe('FaLink');
  });
});
