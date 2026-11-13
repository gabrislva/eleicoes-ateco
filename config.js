// Configuração da votação — edite estes valores
window.CONFIG = {
  // URL do App da Web do Apps Script DA PLANILHA DE VOTAÇÃO (termina em /exec)
  API_URL: 'COLE_AQUI_A_URL_DO_APPS_SCRIPT',

  // Nome que aparece no topo
  NOME_ORGANIZACAO: 'ATECO UFSC',

  // Logo: suba o arquivo na pasta assets com este nome (PNG, SVG ou JPG).
  // Se o arquivo não existir, aparece a sigla da organização no lugar.
  LOGO: 'assets/logo.png',

  // Modo urna: após votar, a tela volta sozinha para a identificação (segundos). 0 = desligado
  RETORNO_AUTOMATICO_SEG: 8,

  // A tela de votar confere o status na planilha a cada X segundos
  // (abre sozinha quando você muda para "Aberta" e trava quando muda para "Encerrada")
  ATUALIZAR_STATUS_SEG: 5,

  // Atualização automática do painel de resultados e da apuração (segundos)
  ATUALIZAR_PAINEL_SEG: 10,

  // Quadro de resultados: tempo de cada cargo no "Passar sozinho" (segundos)
  PASSAR_RESULTADOS_SEG: 5,
  // true = o painel já abre passando sozinho (bom para telão)
  PASSAR_AUTOMATICO: false,

  // Som ao registrar o voto (true = liga, false = desliga)
  SOM_CONFIRMAR: true
};
