// In renderer process (web page).
const { ipcRenderer, remote } = require('electron')

const commands = require('./commands.js');


var conectado = 'nao';


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


ipcRenderer.on('novoComando', (event, arg) => {
  //novoComando = arg;
  commands.ReceberNovoComando(arg);
  gravarChat();
})


// gravação dos comandos enviados pelo chat
function gravarChat() {

  commands.ExibeComandos();

  ipcRenderer.send('enviaRes', commands.GetResTxt());
  ipcRenderer.send('enviaCom', commands.GetComTxt());

  commands.ZerarResCom();

}