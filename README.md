# Sistema de Votação

Mesma arquitetura do sistema de reembolsos:

- **Front-end:** GitHub Pages, na pasta `votacao/` do repositório
- **Back-end:** Google Apps Script
- **Dados:** uma planilha Google, separada da de reembolsos

Custo: R$ 0.

## Regras de apuração

| Situação do cargo | Opções na cédula | Como se decide |
|---|---|---|
| **1 candidato** | Sim · Não · Branco | Aprovado se os votos **Sim** chegarem a **75% dos presentes** (o percentual é configurável) |
| **2 ou mais candidatos** | Um dos candidatos · Branco | Vence quem tiver **mais votos**; empate é sinalizado |

**Presentes** = quem votou + quem estiver marcado com **Sim** na coluna *Presente* da aba Votantes.
Assim, quem está na assembleia e não vota conta contra a aprovação de candidatura única. Se ninguém marcar presença manualmente, a base passa a ser só quem votou.

**Registro dos votos:** a aba *Votos* guarda uma linha por cargo com a **identificação do votante**, o cargo e o voto. Assim é fácil conferir na planilha que o voto de alguém foi registrado: basta filtrar pela identificação. Como a planilha mostra em quem cada pessoa votou, o acesso a ela deve ficar restrito.

---

## Passo 1 · Planilha e API

1. Crie uma planilha nova (**sheets.new**), por exemplo *Votação ATECO 2026*.
2. Abra **Extensões → Apps Script**, cole todo o conteúdo de `apps-script/Code.gs` e salve.
3. Selecione a função **configurar** e clique em **Executar**. Autorize quando pedir. Serão criadas as abas:

   - **Config:** título, status (*Fechada / Aberta / Encerrada*), percentual mínimo e se mostra a parcial
   - **Candidatos:** `Cargo | Nome | Número | Descrição | Foto`. Um cargo com uma única linha vira candidatura única (Sim/Não/Branco). Com duas ou mais linhas, vira disputa.
   - **Votantes:** `Nome | Identificação | E-mail | Código | Presente | Votou em`
   - **Votos:** preenchida automaticamente. Não edite.

4. Apague os exemplos da aba **Candidatos** e cadastre os seus. Os cargos aparecem na cédula na ordem da planilha.
5. Cadastre os votantes, preenchendo **Nome**, **Identificação** (matrícula ou CPF) e **E-mail**.
6. Rode a função **gerarCodigos**, que cria um código de 6 caracteres por votante.
   - Para enviar os códigos por e-mail, rode **enviarCodigosPorEmail**. Antes, se quiser que o e-mail leve o link da votação, crie em *Propriedades do script* a propriedade `LINK_SITE` com o endereço do site.
7. Em **⚙ Configurações do projeto → Propriedades do script**, anote a `CHAVE_ADMIN`. Ela permite à comissão ver a parcial.
8. Vá em **Implantar → Nova implantação → App da Web** e configure *Executar como: **Eu*** e *Quem pode acessar: **Qualquer pessoa***. Copie a URL que termina em `/exec`.

### Fotos dos candidatos

A coluna **Foto** aceita duas formas:

- **Arquivo no GitHub (recomendado):** suba as fotos na pasta `votacao/fotos/` e escreva na planilha só o nome do arquivo, por exemplo `maria.jpg`.
- **Link do Google Drive:** compartilhe a foto como *Qualquer pessoa com o link* e cole o link na célula.

Prefira fotos quadradas, de uns 400×400 px. Se a célula ficar vazia ou o arquivo não for encontrado, aparecem as iniciais do candidato no lugar.

> Se a sua planilha foi criada antes desta versão, escreva **Foto** na célula **E1** da aba Candidatos.

## Passo 2 · Front-end

1. Em `votacao/config.js`, cole a URL em `API_URL`.
2. No GitHub, abra o repositório `ateco-ufsc` e clique em **Add file → Upload files**. Arraste a **pasta `votacao` inteira**. A subpasta `apps-script` pode ficar de fora.
3. Clique em **Commit**. O site fica em:

   - Votar: `https://gabrislva.github.io/ateco-ufsc/votacao/`
   - Resultados: `https://gabrislva.github.io/ateco-ufsc/votacao/#resultados`

## No dia da votação

1. **Abrir:** na aba *Config*, mude o **Status** para `Aberta`.
2. **Presença:** quem está presente mas ainda não votou pode ser marcado com `Sim` na coluna *Presente*. Quem vota é marcado automaticamente.
3. **Acompanhar:** a aba *Resultados* mostra em tempo real quantos votaram e quantos estão presentes. O painel se atualiza a cada 20 segundos.
   - Durante a votação, os resultados ficam ocultos. A comissão vê a parcial digitando a `CHAVE_ADMIN` no painel. Para deixar a parcial pública, mude *Mostrar resultado parcial* para `Sim`.
4. **Encerrar:** mude o **Status** para `Encerrada`. O resultado fica público no painel e novos votos são bloqueados.

### Quadro de resultados

Abaixo dos números de participação, os resultados aparecem **um cargo por vez**, num quadro grande:

- **Navegar:** use as setas ou os pontinhos. No teclado, ← e →. No celular, deslize para o lado.
- **▶ Passar sozinho:** troca de cargo a cada 10 segundos, bom para projetar num telão. O tempo fica em `PASSAR_RESULTADOS_SEG` no `config.js`. Para o painel já abrir passando sozinho, use `PASSAR_AUTOMATICO: true`.

### Som

Quando o voto é registrado, toca um som curto estilo urna. Ele é gerado pelo próprio navegador, sem arquivo de áudio. Para desligar, use `SOM_CONFIRMAR: false` no `config.js`.

### Modo urna (votação presencial)

Use um computador ou tablet com a página aberta. Depois de cada voto, a tela volta sozinha para a identificação em 8 segundos, pronta para o próximo votante. O tempo pode ser ajustado em `RETORNO_AUTOMATICO_SEG` no `config.js`; use `0` para desligar.

## Segurança e limites

- **Códigos:** cada código vale um único voto. Se alguém perder o código, apague a célula e rode `gerarCodigos` de novo. Só os códigos vazios são gerados.
- **Correções:** não edite a aba *Votos* nem apague *Votou em* durante a votação. Isso libera um segundo voto.
- **Quem tem acesso à planilha:** quem abrir a planilha vê o voto de cada pessoa. Não compartilhe a planilha.
- **Capacidade:** o Google processa um voto por vez, levando cerca de 1 a 2 segundos cada. Atende bem assembleias de algumas centenas de pessoas. Se houver fila, o sistema espera até 30 segundos antes de dar erro, e o votante pode tentar de novo.
- **Alterações no código:** depois de mudar o `Code.gs`, vá em **Implantar → Gerenciar implantações → Editar → Nova versão** para manter a mesma URL.
- **Validade:** este sistema serve para votações internas de associações. Para eleições com exigência legal ou estatutária de auditoria, confira o estatuto da entidade.
