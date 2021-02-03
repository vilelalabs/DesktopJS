// In renderer process (web page).
const { ipcRenderer, remote } = require('electron')

/*ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})*/

var conectado = 'nao';

var resTr = []; // resposta para transferencia para o Main.js

// contador para os comandos
function contadorCom() {
  // Check to see if the counter has been initialized
  if (typeof contadorCom.counter == 'undefined' || contadorCom.counter == 8) {
    // It has not... perform the initialization
    contadorCom.counter = -1;
  }
  return (++contadorCom.counter);
}
//contador para as respostas
function contadorRes() {
  // Check to see if the counter has been initialized
  if (typeof contadorRes.counter == 'undefined' || contadorRes.counter == 8) {
    // It has not... perform the initialization
    contadorRes.counter = -1;
  }
  return (++contadorRes.counter);
}
// análise para o login
function analisar() {
  let user = document.getElementById("txtuser");
  let chan = document.getElementById("txtchan");
  let auth = document.getElementById("txtauth");

  if (user.value == "" || chan.value == "" || auth.value == "") {
    alert("Um dos campos está vazio. Digite os dados corretamente!");
    return;
  }

  document.getElementById('btnanalisar').value = "Verificando...";
  document.getElementById('btnanalisar').disabled = true;

  let dados = [user.value, chan.value, auth.value];
  ipcRenderer.send('enviadados', dados);

  setTimeout(function () {
    if (conectado == 'sim') {
      alert("Conexão bem sucedida");
      document.getElementById('btnanalisar').value = "Já Conectado!";
      document.getElementById('config').style.display = "none";
      document.getElementById('connected').style.display = "block";
    }
    else {
      alert("Não conectado! Verifique os dados de acesso");
      document.getElementById('btnanalisar').value = "Conferir Dados...";
      document.getElementById('btnanalisar').disabled = false;
    }

    conectado = 'nao';

  }, 2000);

}

ipcRenderer.on('conectado', (event, arg) => {
  conectado = arg;
});


ipcRenderer.on('conexao', (event, message) => {
  alert(message);
})

var novoComando = []; // talvez inserir como argumento de gravarChat()

ipcRenderer.on('novoComando', (event, arg) => {
  novoComando = arg;
  gravarChat();
})


// gravação dos comandos enviados pelo chat
function gravarChat() {

  //comandos criados pelo chat da twitch
  let command = novoComando[0];
  let response = novoComando[1];

  let com = [];
  for (let i = 1; i <= 9; i++) {
    com.push(document.getElementById(`com${i}`));
  };




  let tr = [];
  for (let i = 1; i <= 9; i++) {
    tr.push(document.getElementById(`tr${i}`));
  };


  //salva os comandos na tabela do HTML
  let comPos = contadorCom();
  let resPos = contadorRes();

  //guarda os valores nos arrays de comando e resposta
  com[comPos].innerText = `!${command}`;

  resTr[resPos] = response;
  //envia os dados de repostas para o Main.js
  let resTxt = [];
  for (let i = 0; i < 9; i++) {
    resTxt.push(resTr[i]);
  };
  console.log(resTxt);
  ipcRenderer.send('enviaRes', resTxt);

  //envia os dados de comandos para o Main.js
  let comTxt = [];
  for (let i = 0; i < 9; i++) {
    comTxt.push(com[i].innerHTML);
  };
  console.log(comTxt);
  ipcRenderer.send('enviaCom', comTxt);


  // organiza a parte gráfica dos comandos ---------------------------
  for (let i = 0; i < 9; i++) {
    if (i % 2 != 0) {
      tr[i].style.backgroundColor = "#4c3beb";
      tr[i].style.color = "white";
    }
    else {
      tr[i].style.backgroundColor = "rgb(90, 28, 148)";
      tr[i].style.color = "white";
    }

    if (i == comPos) {
      tr[i].style.backgroundColor = "rgb(28, 255, 255)";
      tr[i].style.color = "black";
      tr[i].style.font.bold = "true";
    }
  }
}