//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let finish = document.getElementById("finish");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 60;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "O que é phishing?",
    options: [
      "Um tipo de peixe.",
      "Uma técnica de pesca.",
      "Uma tentativa de fraude online para obter informações pessoais.",
      "Uma forma de jardinagem.",
    ],
    correct: "Uma tentativa de fraude online para obter informações pessoais.",
  },
  {
    id: "1",
    question:
      "Criar senhas fortes é fundamental para se prevenir contra golpes. Sendo assim, assinale a alternativa incorreta:",
    options: [
      "É recomendado não utilizar a mesma senha para todos os cadastros.",
      "Para o acesso mais seguro em sites ou aplicativos, é importante utilizar informações que tenham referência com você ou com algum familiar.",
      "As senhas dos diferentes aplicativos e plataformas precisam ser diferentes.",
      "Senhas fortes devem conter letras maiúsculas e minúsculas, números e caracteres especiais.",
    ],
    correct:
      "Para o acesso mais seguro em sites ou aplicativos, é importante utilizar informações que tenham referência com você ou com algum familiar.",
  },
  {
    id: "2",
    question:
      "O envio de links é uma forma muito utilizada para aplicação de golpes. Para não se expor a esse tipo de tentativa de fraude, é recomendável que:",
    options: [
      "Não clique em links desconhecidos.",
      "Desconfie de mensagens suspeitas.",
      "Nunca instale aplicativos que tenham sido enviados por e-mail.",
      "Todas as alternativas estão corretas.",
    ],
    correct: "Todas as alternativas estão corretas.",
  },
  {
    id: "3",
    question:
      "Sobre a segurança e confiabilidade de sites e portais, assinale a alternativa incorreta:",
    options: [
      "O `s` do `https` é um indicativo de que o endereço é seguro e é uma forma de certificar que a comunicação entre seu computador e o site seja criptografada e mais segura, protegendo seus dados.",
      "O cadeado que aparece antes do endereço é um modo de validar que o site é seguro.",
      "O cadeado que aparece antes do endereço do site é uma forma de alertar que o site é inseguro.",
      "Nem todos os sites que aparecem no topo das pesquisas são oficiais e seguros.",
    ],
    correct:
      "O cadeado que aparece antes do endereço do site é uma forma de alertar que o site é inseguro.",
  },
  {
    id: "4",
    question:
      "Em relação ao uso seguro do cartão de crédito, é incorreto afirmar que:",
    options: [
      "As instituições financeiras não enviam e-mail e nem ligam para os clientes solicitando a senha do cartão de crédito ou o seu código de segurança.",
      "As informações são pessoais e intransferíveis e não devem ser divulgadas para terceiros.",
      "É recomendável portar a senha anotada para não esquecer.",
      "Deve-se sempre conferir se estão corretos os valores cobrados na maquininha, antes de realizar o pagamento.",
    ],
    correct: "É recomendável portar a senha anotada para não esquecer.",
  },
  {
    id: "5",
    question:
      "Quanto à inutilização ou bloqueio do seu cartão, marque a opção incorreta:",
    options: [
      "Os bancos nunca solicitam a devolução de cartões, mesmo em caso de bloqueio ou cancelamento.",
      "Os cartões de crédito inutilizados são retirados na residência dos clientes.",
      "O cartão de crédito inutilizado deve ter seu chip destruído.",
      "Caso a tentativa de fraude aconteça por telefone, devo desligar imediatamente e entrar em contato com a central de relacionamento da instituição financeira.",
    ],
    correct:
      "Os cartões de crédito inutilizados são retirados na residência dos clientes.",
  },
  {
    id: "6",
    question: "O que é Engenharia Social?",
    options: [
      "Técnica de manipulação que explora erros humanos para obter informações privadas, acessos ou coisas de valor.",
      "Área que estuda projetos voltados para as Ciências Sociais.",
      "Conjunto de técnicas de convivência social.",
      "Estratégia de marketing para convencer potenciais consumidores.",
    ],
    correct:
      "Técnica de manipulação que explora erros humanos para obter informações privadas, acessos ou coisas de valor.",
  },
  {
    id: "7",
    question: "Sobre o Spoofing é correto afirmar que:",
    options: [
      "Spoofing vem do termo `spoof`, que em inglês significa enganar.",
      "O spoofing envolve a falsificação de informações, identidades ou origens de dados para enganar sistemas e obter acesso indevido.",
      "Devo desconfiar sempre que pedirem meus dados pessoais, códigos, senhas ou pagamentos.",
      "Todas as alternativas estão corretas.",
    ],
    correct: "Todas as alternativas estão corretas.",
  },
  {
    id: "8",
    question:
      "Caso não reconheça uma compra realizada no cartão, o mais recomendável é:",
    options: [
      "Comunicar à sua instituição financeira.",
      "Ignorar.",
      "Enviar um e-mail para a loja ou site.",
      "Denunciar nas redes sociais.",
    ],
    correct: "Comunicar à sua instituição financeira.",
  },
  {
    id: "9",
    question: "O que é a Semana ENEF?",
    options: [
      "Semana da Feiraço.",
      "Semana Nacional de Educação Financeira.",
      "Semana de Educação Física.",
      "Semana do aniversário de Ipatinga.",
    ],
    correct: "Semana Nacional de Educação Financeira.",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Finalizar Quiz
finish.addEventListener("click", () => {
  // Dados que você quer enviar para o arquivo PHP
  const dados = {
    id: 0,
    nome: "Pierre",
    email: "pierrecarlos1@hotmail.com",
    pontos: 10,
  };

  // Configuração da solicitação
  const options = {
    method: "POST", // Método HTTP
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo
    },
    body: JSON.stringify(dados), // Dados a serem enviados (convertidos para JSON)
  };

  // URL do arquivo PHP
  const url = "conexao-banco.php";

  // Solicitação POST usando Fetch API
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o arquivo PHP");
      }
      return response.text();
    })
    .then((data) => {
      // Manipular a resposta do arquivo PHP
      console.log(data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Sua pontuação é : " + scoreCount + " de " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " de " + quizArray.length + " Questões";
      //display quiz
      quizDisplay(questionCount);
      count = 60;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " de " + quizArray.length + " Questões";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 60;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
