# Visão geral do projeto

O projeto propõe uma plataforma de estudos pensada para tornar o aprendizado mais prático, rápido e interessante. A ideia é ajudar o usuário a estudar qualquer tema de forma mais ativa, saindo da leitura passiva e entrando em uma experiência em que ele responde perguntas, acompanha seu desempenho e entende melhor onde está errando e acertando.

Ao informar um assunto que deseja revisar, o usuário recebe um quiz completo e organizado, com perguntas claras, alternativas objetivas, respostas e explicações que facilitam a fixação do conteúdo. Além disso, o sistema também permite tirar dúvidas sobre cada pergunta, funcionando como um apoio durante o estudo e ajudando a transformar dificuldades em entendimento.

Outro diferencial é que a plataforma guarda o histórico dos quizzes realizados, permitindo que o usuário volte aos temas já estudados, revise conteúdos anteriores e acompanhe sua evolução ao longo do tempo. Dessa forma, o sistema não serve apenas para testar conhecimento, mas também para incentivar constância, autonomia e mais confiança na hora de aprender.


### Requisitos funcionais

Os requisitos foram organizados abaixo de acordo com o fluxo real de uso do sistema, para facilitar o entendimento do que o usuário faz do início ao fim.

RF01 — Acesso à plataforma  
O sistema deve permitir que o usuário crie conta, entre com seus dados e saia da plataforma com segurança. O cadastro deve solicitar pelo menos e-mail e senha. No login, o sistema deve liberar o acesso apenas com dados válidos e manter o usuário autenticado durante o uso.
Exemplo: o usuário cria uma conta com e-mail e senha, faz login e entra na área principal para gerar quizzes.
Tratativas de erro: caso algum campo esteja vazio, o e-mail já esteja cadastrado ou a senha esteja incorreta, o sistema deve informar o problema de forma clara. No logout, deve haver confirmação antes de encerrar a sessão.

RF02 — Recuperação e atualização de conta  
O sistema deve permitir que o usuário recupere o acesso à conta e atualize seus dados básicos quando necessário. Isso inclui solicitar redefinição de senha e alterar informações cadastrais mediante confirmação da senha atual.
Exemplo: o usuário esquece a senha, solicita recuperação pelo e-mail cadastrado e depois altera sua senha antiga por uma nova.
Tratativas de erro: caso o e-mail informado não exista, a senha atual esteja incorreta ou os novos dados sejam inválidos, o sistema deve avisar o motivo e impedir a alteração.

RF03 — Geração de quiz por tema  
O sistema deve permitir que o usuário informe um tema de estudo e receba um quiz com exatamente 10 perguntas relacionadas ao assunto. O conteúdo precisa vir organizado, com enunciado, quatro alternativas identificadas, resposta correta e explicação curta.
Exemplo: ao digitar "Revolução Francesa", o usuário recebe 10 perguntas objetivas sobre o tema, com alternativas de A a D e explicações para revisão.
Tratativas de erro: o sistema deve bloquear tema vazio, muito genérico ou com mais de 100 caracteres. Se houver falha ao gerar o quiz, deve exibir uma mensagem como "Não foi possível gerar o quiz agora. Tente novamente em instantes."

RF04 — Condução do quiz durante a resolução  
O sistema deve apresentar uma pergunta por vez, mostrando o andamento da atividade e permitindo navegar entre próxima e anterior sem perder respostas já marcadas. Antes de finalizar, o usuário deve confirmar o envio.
Exemplo: durante a resolução, o sistema exibe "Pergunta 4 de 10", permitindo voltar para revisar uma resposta anterior antes de concluir.
Tratativas de erro: o sistema não deve permitir finalizar o quiz com perguntas em branco. Nesse caso, deve alertar o usuário para completar as respostas pendentes antes do envio.

RF05 — Resultado, revisão e apoio ao aprendizado  
Depois da finalização, o sistema deve mostrar o resultado do quiz com quantidade de acertos e erros, além de permitir revisar cada pergunta com a resposta escolhida, a resposta correta e uma explicação. As respostas corretas e incorretas devem ser destacadas visualmente.
Exemplo: ao concluir o quiz, o usuário visualiza que acertou 7 de 10 perguntas e pode abrir a revisão para entender cada erro.
Tratativas de erro: se houver falha ao carregar o resultado ou a revisão, o sistema deve informar que os dados não puderam ser exibidos naquele momento e oferecer nova tentativa.

RF06 — Dúvidas e fontes de apoio  
Em cada pergunta, o sistema deve permitir que o usuário faça uma dúvida específica e receba uma resposta relacionada àquela questão. Também deve apresentar as fontes utilizadas para montar o quiz, com título, descrição e link, incluindo quando possível as fontes ligadas a cada pergunta.
Exemplo: após errar uma questão, o usuário pergunta "Por que a alternativa B está incorreta?" e recebe uma explicação relacionada ao conteúdo da pergunta.
Tratativas de erro: se a resposta da dúvida não puder ser gerada ou se as fontes não estiverem disponíveis no momento, o sistema deve avisar isso ao usuário sem interromper o restante do quiz.

RF07 — Histórico e acompanhamento do usuário  
O sistema deve salvar os últimos 3 quizzes gerados por cada usuário, mantendo o histórico organizado do mais recente para o mais antigo. Cada registro deve guardar tema, perguntas, respostas, fontes, data, hora e desempenho da atividade.
Exemplo: o usuário gera quizzes sobre "Matemática", "Biologia" e "Geografia" e consegue retornar depois para revisar qualquer um deles.
Tratativas de erro: se não houver histórico salvo, o sistema deve exibir a mensagem "Você ainda não gerou nenhum quiz." O sistema também deve garantir que cada usuário visualize apenas o próprio histórico.

RF08 — Nova tentativa de estudo  
O sistema deve permitir que o usuário gere um novo quiz sobre o mesmo tema, criando uma nova tentativa para reforçar o aprendizado, sem simplesmente repetir automaticamente o conjunto anterior.
Exemplo: depois de revisar um quiz sobre "Sistema Solar", o usuário pode gerar uma nova rodada de perguntas para continuar estudando o mesmo assunto.
Tratativas de erro: caso a nova geração não seja concluída, o sistema deve manter o quiz anterior salvo e informar que a nova tentativa não pôde ser criada.

RF09 — Registro das interações  
O sistema deve registrar data e hora das principais ações do usuário, como geração do quiz, finalização da tentativa e interações de dúvida, para manter o acompanhamento organizado.
Exemplo: ao abrir o histórico, o usuário consegue identificar quando cada quiz foi criado e quando foi respondido.
Tratativas de erro: se alguma informação de data e hora não puder ser registrada, o sistema deve preservar o restante do histórico e sinalizar a inconsistência para correção interna.


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





