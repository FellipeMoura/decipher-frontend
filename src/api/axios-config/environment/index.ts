
export const Environment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  LIMITE_DE_LINHAS: 20,
  /**
   * Placeholder exibido nas inputs
   */
  INPUT_DE_BUSCA: 'Pesquisar...',
  /**
   * Texto exibido quando nenhum registro é encontrado em uma listagem
   */
  LISTAGEM_VAZIA: 'Nenhum registro encontrado.',
  /**
   * Url base de consultado dos dados dessa aplicação
   */
  URL_BASE: import.meta.env.VITE_API_BASE_URL || 'https://cb.sysnode.com.br',
};
