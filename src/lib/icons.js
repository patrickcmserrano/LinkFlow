// Este é o arquivo existente. Apenas estou verificando seu conteúdo.
// Importações dos ícones de svelte-icons
import FaLink from 'svelte-icons/fa/FaLink.svelte';
import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte';
import FaMoney from 'svelte-icons/fa/FaMoneyBillAlt.svelte';
import FaCog from 'svelte-icons/fa/FaCog.svelte';
import FaBitcoin from 'svelte-icons/fa/FaBitcoin.svelte';
import FaHome from 'svelte-icons/fa/FaHome.svelte';
import FaLeaf from 'svelte-icons/fa/FaLeaf.svelte'; // Usaremos como lotus
import FaChartBar from 'svelte-icons/fa/FaChartBar.svelte';
import FaDatabase from 'svelte-icons/fa/FaDatabase.svelte';
// Mapeamento dos ícones - adicione novos ícones aqui
const iconMap = {
    'link-icon': FaLink,
    'github-icon': FaGithub,
    'linkedin-icon': FaLinkedin,
    'youtube-icon': FaYoutube,
    'moneyflow-icon': FaMoney,
    'gear-icon': FaCog,
    'bitcoin-icon': FaBitcoin,
    'linkflow-icon': FaLink,
    'home-icon': FaHome,
    'lotus-icon': FaLeaf,
    'financial-post': FaChartBar,
    'data-structure-post': FaDatabase
};
/**
 * Função para obter o componente de ícone correto da biblioteca svelte-icons
 * baseado no caminho do ícone
 * @param iconPath Caminho do ícone (sem a extensão .svg)
 * @returns Componente de ícone do svelte-icons
 */
export function getIconComponent(iconPath) {
    // Se o caminho for vazio, retorna o ícone padrão
    if (!iconPath) {
        return FaLink;
    }
    // Extrai o nome do arquivo sem a extensão
    const fileName = iconPath.split('/').pop()?.split('.')[0] || '';
    // Retorna o componente de ícone correspondente, ou o padrão se não existir
    return iconMap[fileName] || FaLink;
}
//# sourceMappingURL=icons.js.map