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


### Tecnologias

Frontend: React + JavaScript.

Backend/API: recomendado backend em Node.js com TypeScript para intermediar autenticação, banco e chamadas à API do Gemini.

Banco de dados: PostgreSQL.

IA: Gemini API, da Google AI for Developers.


### Processo do sistema

O fluxo principal do sistema começa com o acesso do usuário. Primeiro, ele cria sua conta ou entra com seus dados já cadastrados. Se houver erro no login, no cadastro ou na recuperação de senha, o sistema deve informar de maneira objetiva o que precisa ser corrigido.

Depois de entrar na plataforma, o usuário informa o tema que deseja estudar. O sistema valida esse tema e, se estiver tudo certo, gera um quiz com 10 perguntas. Caso o tema esteja vazio, seja inválido ou aconteça alguma falha na geração, o usuário deve receber uma mensagem clara sem perder a navegação da plataforma.

Com o quiz pronto, o usuário responde uma pergunta por vez, acompanha seu progresso e pode voltar ou avançar entre as questões antes de finalizar. Se tentar enviar o quiz com alguma pergunta em branco, o sistema deve bloquear a ação e orientar o preenchimento.

Ao concluir a atividade, o sistema apresenta o resultado com acertos e erros, permite revisar as respostas e entender os motivos de cada alternativa correta. Durante essa revisão, o usuário também pode consultar fontes e tirar dúvidas específicas sobre cada pergunta.

Por fim, o sistema salva o quiz no histórico do usuário, mantendo apenas os 3 registros mais recentes, para que ele possa revisar conteúdos estudados anteriormente e acompanhar sua evolução. Quando quiser encerrar o uso, o usuário pode sair da conta mediante confirmação.


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


### Testes

Testes principais
1. Cadastro de usuário
Será testado se o sistema aceita e-mail e senha válidos, e se bloqueia campos vazios ou e-mail duplicado.
No código, o teste verifica se a função de cadastro retorna sucesso quando os dados estão corretos e retorna erro quando falta informação.
Também será verificado se a senha é salva de forma segura, usando hash, e não em texto puro.
​

2. Login
Será testado se o sistema autentica o usuário com dados corretos e rejeita dados inválidos.
No código, o teste confere se a resposta do login gera sessão ou token quando as credenciais estão certas.
Também será testado se aparece mensagem de erro quando o e-mail ou a senha estiverem incorretos.

3. Geração do quiz
Será testado se, ao informar um tema válido, o sistema gera um quiz com exatamente 10 perguntas.
No código, o teste confere se a resposta da função de geração sempre traz 10 itens e se o tema vazio ou muito longo é bloqueado.
Também será testado se o sistema mostra erro quando a API do Gemini falhar.
​

4. Perguntas, respostas e fontes
Será testado se cada pergunta possui alternativas identificadas, resposta correta e explicação.
No código, o teste valida se a estrutura da pergunta segue o formato esperado.
Também será testado se as fontes aparecem com título, descrição e link, e se a resposta da dúvida fica vinculada à pergunta certa.

5. Histórico e revisão
Será testado se o sistema salva os quizzes e mostra apenas os últimos 3 por usuário.
No código, o teste verifica se o histórico vem ordenado do mais recente para o mais antigo e se aparece a mensagem quando não houver quiz salvo.
Também será testado se o usuário consegue abrir um quiz antigo para revisão.
​

6. Finalização e logout
Será testado se o sistema impede o envio do quiz quando faltar resposta e se pede confirmação antes de finalizar.
No código, o teste confere se a função de envio retorna alerta quando existir pergunta sem resposta.
Também será testado se o logout encerra a sessão e volta para a tela de login.





