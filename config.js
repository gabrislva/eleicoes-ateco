// Configuração da votação — edite estes valores
window.CONFIG = {
  // URL do App da Web do Apps Script DA PLANILHA DE VOTAÇÃO (termina em /exec)
  API_URL: 'https://script.google.com/macros/s/AKfycbxdP3UNxKjP1_WOgJjYlxxGEkejvbVyHuhqVHAFoBwNbFN71yn4B_s2K6sk3gi6RH7ECA/exec',

  // Nome que aparece no topo
  NOME_ORGANIZACAO: 'ATECO UFSC',

  // Logo: suba o arquivo na pasta assets com este nome (PNG, SVG ou JPG).
  // Se o arquivo não existir, aparece a sigla da organização no lugar.
  LOGO: 'assets/logo.png',

  // Modo urna: após votar, a tela volta sozinha para a identificação (segundos). 0 = desligado
  RETORNO_AUTOMATICO_SEG: 8,

  // Atualização automática do painel de resultados (segundos)
  ATUALIZAR_PAINEL_SEG: 20
};
