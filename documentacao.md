# Visão geral do projeto

O projeto propõe uma plataforma de estudos pensada para tornar o aprendizado mais prático, rápido e interessante. A ideia é ajudar o usuário a estudar qualquer tema de forma mais ativa, saindo da leitura passiva e entrando em uma experiência em que ele responde perguntas, acompanha seu desempenho e entende melhor onde está errando e acertando.

Ao informar um assunto que deseja revisar, o usuário recebe um quiz completo e organizado, com perguntas claras, alternativas objetivas, respostas e explicações que facilitam a fixação do conteúdo. Além disso, o sistema também permite tirar dúvidas sobre cada pergunta, funcionando como um apoio durante o estudo e ajudando a transformar dificuldades em entendimento.

Outro diferencial é que a plataforma guarda o histórico dos quizzes realizados, permitindo que o usuário volte aos temas já estudados, revise conteúdos anteriores e acompanhe sua evolução ao longo do tempo. Dessa forma, o sistema não serve apenas para testar conhecimento, mas também para incentivar constância, autonomia e mais confiança na hora de aprender.


### Requisitos funcionais

RF1: O sistema deverá disponibilizar uma tela de login e cadastro, permitindo que o usuário se cadastre e acesse a aplicação por meio de login.
  RF1.1: Para realizar o login e o cadastro, deverão ser utilizados e-mail institucional e senha.

RF2: Após realizar o login, o usuário deverá ser direcionado para a tela inicial (home), que deverá conter um menu no lado esquerdo da tela.
  RF2.1: O menu deverá disponibilizar a opção QUIZ/IA e Logout.

RF3: A tela QUIZ/IA deverá disponibilizar, na parte inferior da aplicação, um campo para digitação do tema.
  RF3.1: Deverá apresenta um aviso ao usuário que o QUIZ está sendo gerado;
  RF3.2: Após a geração e retorno do QUIZ, as questões deverão ser apresentadas na tela de forma sequencial, em cascata, e,
         no canto direito, deverá ser exibida uma área destinada ao esclarecimento de dúvidas relacionadas às questões.
  RF3.3: Ao final de cada questão, deverão ser apresentadas as fontes utilizadas na elaboração da pergunta e das respectivas
         respostas.

RF4: Deverá ser disponibilizado, no canto superior direito, um botão para finalizar o QUIZ antes da sua conclusão.
  RF4.1: Ao acionar essa opção, o sistema deverá redirecionar o usuário para a tela de perguntas do QUIZ, definida no RF3.


### Requisitos não funcionais

RNF01 — Usabilidade: A interface deve ser simples, organizada e intuitiva, permitindo que o usuário consiga navegar pelo sistema, gerar um quiz e visualizar seus resultados sem dificuldade.

RNF02 — Desempenho: O sistema deve responder às ações principais em tempo adequado, garantindo boa fluidez de uso. O login e o cadastro devem ocorrer em até 3 segundos, e a geração do quiz deve acontecer em até 20 segundos.

RNF03 — Segurança: As senhas devem ser armazenadas de forma segura, com hash, e a aplicação deve proteger rotas autenticadas, o histórico dos quizzes e os dados individuais de cada usuário.

RNF04 — Confiabilidade: O sistema deve apresentar perguntas, respostas, explicações e fontes coerentes com o tema informado, buscando reduzir conteúdos inconsistentes ou fora de contexto.

### USE CASE

Casos de Uso

UC01 – Cadastro   
Ator: Usuário  
Pré-condição: Usuário não possui conta  
Fluxo: Acessa cadastro → informa e-mail e senha → sistema valida → cria conta → confirma  
Exceções: Dados inválidos ou e-mail já cadastrado  

UC02 – Login  
Ator: Usuário  
Pré-condição: Usuário cadastrado  
Fluxo: Acessa login → informa dados → sistema valida → autentica → redireciona  
Exceções: Credenciais inválidas  

UC03 – Gerar quiz  
Ator: Usuário  
Pré-condição: Usuário autenticado  
Fluxo: Informa tema → solicita geração → sistema processa → exibe 10 perguntas  
Exceções: Tema inválido ou falha na API  

UC04 – Histórico   
Ator: Usuário   
Pré-condição: Usuário autenticado    
Fluxo: Acessa histórico → visualiza quizzes → seleciona → sistema exibe  
Exceções: Nenhum histórico disponível  

UC05 – Finalizar quiz  
Ator: Usuário  
Pré-condição: Quiz em andamento  
Fluxo: Solicita finalização → sistema pede confirmação → finaliza  
Exceções: Cancelamento ou perguntas sem resposta  

### Cenários BDD

Cenário: Cadastro  
Dado que o e-mail não está cadastrado  
Quando o usuário informa dados válidos  
Então a conta deve ser criada  

Cenário: Cadastro inválido   
Dado que o e-mail já está cadastrado  
Quando o usuário tenta se cadastrar  
Então o sistema deve exibir erro  

Cenário: Login  
Dado que o usuário possui cadastro  
Quando ele informa credenciais corretas  
Então deve acessar o sistema  

Cenário: Login inválido  
Quando o usuário informa dados incorretos  
Então deve receber erro  
  
Cenário: Gerar quiz  
Dado que o usuário está autenticado  
Quando informa um tema válido  
Então o sistema gera 10 perguntas  

Cenário: Erro na geração  
Quando ocorre falha na API  
Então o sistema informa erro  

Cenário: Histórico  
Quando o usuário acessa o histórico   
Então visualiza os últimos 3 quizzes  

Cenário: Finalizar quiz  
Dado que há um quiz em andamento  
Quando o usuário solicita finalizar  
Então o sistema pede confirmação  

### Tecnologias

Frontend: React + JavaScript.

Backend/API: recomendado backend em Node.js com TypeScript para intermediar autenticação, banco e chamadas à API do Gemini.

Banco de dados: PostgreSQL.

IA: Gemini API, da Google AI for Developers.


### DOD

Atende a 100% dos critérios de aceitação definidos.

Regra das 10 perguntas validada.

Histórico limitado aos últimos 3 quizzes.

Fontes exibidas corretamente.

Quiz gerado de acordo com o tema.

Cadastrar e logar com sucesso.


### DOR

Banco de dados PostgreSQL pronto para realizar os testes.

API do Gemini com chave pronta para utilização.

Ambiente de desenvolvimento pronto para iniciar.
