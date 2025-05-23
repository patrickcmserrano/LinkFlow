import { describe, it, expect, vi } from 'vitest';
import { getIconComponent } from './icons';

// Mock dos componentes de ícone
// Criamos funções para representar os componentes em vez de strings
const mockFaLink = function FaLink() {};
const mockFaHome = function FaHome() {};
const mockFaCode = function FaCode() {};
const mockFaBlog = function FaBlog() {};
const mockFaLinkedin = function FaLinkedin() {};
const mockFaGithub = function FaGithub() {};
const mockFaYoutube = function FaYoutube() {};
const mockFaWallet = function FaWallet() {};
const mockFaBitcoin = function FaBitcoin() {};

vi.mock('svelte-icons/fa/FaLink.svelte', () => ({ default: mockFaLink }));
vi.mock('svelte-icons/fa/FaHome.svelte', () => ({ default: mockFaHome }));
vi.mock('svelte-icons/fa/FaGithub.svelte', () => ({ default: mockFaGithub }));
vi.mock('svelte-icons/fa/FaLinkedin.svelte', () => ({ default: mockFaLinkedin }));
vi.mock('svelte-icons/fa/FaYoutube.svelte', () => ({ default: mockFaYoutube }));
vi.mock('svelte-icons/fa/FaMoneyBillAlt.svelte', () => ({ default: mockFaWallet }));
vi.mock('svelte-icons/fa/FaCog.svelte', () => ({ default: mockFaCode }));
vi.mock('svelte-icons/fa/FaBitcoin.svelte', () => ({ default: mockFaBitcoin }));
vi.mock('svelte-icons/fa/FaLeaf.svelte', () => ({ default: mockFaBlog }));
vi.mock('svelte-icons/fa/FaChartBar.svelte', () => ({ default: mockFaCode }));
vi.mock('svelte-icons/fa/FaDatabase.svelte', () => ({ default: mockFaCode }));

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
