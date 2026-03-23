# Visão geral do projeto

O projeto consiste em uma aplicação web de estudo que gera quizzes com auxílio de IA e permite que o usuário tire dúvidas sobre as questões. A aplicação utilizará a API do Gemini para geração de conteúdo e um banco de dados PostgreSQL para cadastro, autenticação, persistência de histórico e armazenamento dos quizzes. O frontend será desenvolvido em React com JavaScript.


### Requisitos funcionais

RF01 — Cadastro de usuário: O sistema deve permitir que um usuário crie uma conta informando, no mínimo, e-mail ou usuário e senha, validando campos obrigatórios.

RF02 — Login e autenticação: O sistema deve permitir login com credenciais válidas e manter a sessão do usuário autenticado para acesso às funcionalidades do quiz.

RF03 — Geração de quiz (10 perguntas): O sistema deve permitir que o usuário informe um tema e, a partir dele, gerar um quiz contendo exatamente 10 perguntas relacionadas ao tema.

RF04 — Persistência do histórico: O sistema deve salvar no banco de dados os últimos 3 quizzes gerados por usuário, incluindo pelo menos tema, lista de perguntas, data e hora de criação e fontes.

RF05 — Consulta de histórico: O sistema deve permitir que o usuário visualize os últimos 3 quizzes salvos e selecione um deles para revisão.

RF06 — Perguntar sobre uma pergunta: Em cada pergunta do quiz, o sistema deve permitir que o usuário envie uma pergunta de esclarecimento e receba uma resposta da IA vinculada à questão.

RF07 — Exibição de fontes: O sistema deve apresentar uma aba para as fontes utilizadas para montar o quiz, exibindo ao menos título, descrição e link.

RF08 — Obtenção de respostas do quiz: O sistema deve gerar e apresentar as respostas das perguntas do quiz, como gabarito e/ou explicação curta, vinculando cada resposta à respectiva pergunta.

RF09 — Critério de confiabilidade das fontes: O sistema deve priorizar fontes confiáveis, como domínios institucionais, publicações científicas e repositórios acadêmicos, ao montar o quiz e ao justificar respostas.

RF10 — Logout: O sistema deve permitir que o usuário faça logout e retorne para a tela de login.

RF11 — Mensagem de erro no login: O sistema deve mostrar uma mensagem quando o usuário informar dados incorretos.

RF12 — Exibição do resultado do quiz: Após responder as perguntas, o sistema deve exibir a quantidade de acertos e erros do usuário.

RF13 — Mostrar progresso do quiz: O sistema deve mostrar quantas perguntas já foram respondidas, por exemplo: Pergunta 4 de 10.

RF14 — Validação do tema: O sistema deve verificar se o usuário informou um tema válido antes de gerar o quiz, exibindo mensagem de erro quando necessário.

RF15 — Limitar tamanho do tema: O sistema deve limitar o campo de tema para até 100 caracteres.

RF16 — Visualização das perguntas: O sistema deve apresentar uma pergunta por vez, permitindo navegar entre elas com botões de próxima e anterior.

RF17 — Confirmar envio do quiz: Antes de finalizar o quiz, o sistema deve pedir confirmação do usuário.

RF18 — Mensagem quando não houver histórico: Caso o usuário não tenha quizzes salvos, o sistema deve exibir a mensagem: “Você ainda não gerou nenhum quiz.”

RF19 — Atualização de dados do usuário: O sistema deve permitir que o usuário altere seus dados cadastrais básicos, como e-mail e senha, mediante confirmação da senha atual.

RF20 — Recuperação de senha: O sistema deve permitir que o usuário solicite recuperação de senha por meio do e-mail cadastrado, enviando instruções para redefinição.

RF21 — Regeração de quiz: O sistema deve permitir que o usuário gere novamente um quiz sobre o mesmo tema, criando um novo conjunto de perguntas sem reutilizar automaticamente o anterior.

RF22 — Associação de respostas às alternativas: O sistema deve garantir que cada pergunta possua alternativas claramente identificadas, como A, B, C e D, e que a resposta correta esteja explicitamente associada a uma delas.

RF23 — Bloqueio de envio sem resposta: O sistema deve impedir que o usuário finalize o quiz caso exista alguma pergunta não respondida, exibindo uma mensagem de alerta.

RF24 — Revisão das respostas: Após finalizar o quiz, o sistema deve permitir que o usuário revise todas as perguntas, respostas escolhidas, respostas corretas e explicações.

RF25 — Identificação visual de acertos e erros: O sistema deve destacar visualmente as respostas corretas e incorretas durante a revisão do quiz.

RF26 — Registro do desempenho: O sistema deve armazenar, junto ao quiz, o desempenho do usuário, incluindo quantidade de acertos e erros.

RF27 — Ordenação do histórico: O sistema deve exibir o histórico de quizzes ordenado do mais recente para o mais antigo.

RF28 — Mensagem de erro na geração do quiz: O sistema deve exibir mensagens claras caso ocorra falha na comunicação com a API do Gemini, como timeout ou erro de autenticação.

RF29 — Visualização de fontes por pergunta: O sistema deve permitir que o usuário visualize as fontes específicas utilizadas para cada pergunta do quiz.

RF30 — Confirmação de logout: O sistema deve solicitar confirmação do usuário antes de efetuar o logout.

RF31 — Controle de acesso ao histórico: O sistema deve garantir que cada usuário visualize apenas seus próprios quizzes e históricos.

RF32 — Padronização do formato das perguntas: O sistema deve garantir que todas as perguntas sigam um formato padronizado, com enunciado, alternativas, resposta correta e explicação.

RF33 — Registro de data e hora das interações: O sistema deve registrar a data e a hora das interações do usuário no quiz.


### Requisitos não funcionais

RNF01 — Usabilidade: A interface deve ser simples e permitir gerar um quiz em poucos passos.

RNF02 — Desempenho: O sistema deve responder às ações principais em tempo adequado, com login e cadastro em até 3 segundos, e geração do quiz em até 20 segundos.

RNF03 — Segurança: As senhas devem ser armazenadas de forma segura, com hash, e a aplicação deve proteger rotas autenticadas e dados do usuário.


### Tecnologias

Frontend: React + JavaScript.

Backend/API: recomendado backend em Node.js com TypeScript para intermediar autenticação, banco e chamadas à API do Gemini.

Banco de dados: PostgreSQL.

IA: Gemini API, da Google AI for Developers.


### Processo do sistema

O usuário realiza cadastro informando e-mail e senha, e o sistema valida e armazena os dados com segurança. Em seguida, realiza login com credenciais válidas, iniciando uma sessão autenticada.

Após autenticado, o usuário informa um tema para estudo e solicita a geração do quiz. O backend envia a solicitação para a API do Gemini, que retorna exatamente 10 perguntas com respostas e fontes confiáveis. O sistema deve respeitar o limite máximo de 20 segundos para essa geração.

O sistema salva no PostgreSQL o quiz gerado, incluindo tema, perguntas, data e hora e fontes, mantendo apenas os últimos 3 quizzes por usuário. O usuário pode acessar e revisar quizzes anteriores pelo histórico.

Em cada pergunta, o usuário pode enviar uma dúvida, que será respondida pela IA com base na questão e nas fontes utilizadas. O sistema também exibe as fontes vinculadas ao quiz para garantir transparência e confiabilidade.

Por fim, o usuário pode realizar logout, encerrando sua sessão e retornando à tela de login.


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





