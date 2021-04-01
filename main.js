
const { app, BrowserWindow, ipcRenderer } = require('electron')

const sh = require('./modulos/sh.js');
const other = require('./modulos/other.js');
const commands = require('./modulos/commands.js');
const tts = require('./modulos/tts.js');
const ad = require('./modulos/ad.js');
const obs = require('./modulos/obs.js');
var comandos = [];

var ad_start = false; // habilita/desabilita ads automáticos

//cria janela globalmente para poder ser acessada por outras funções além da createWindow
var win;
function createWindow() {
  win = new BrowserWindow({
    width: 380,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }

})

/// ------------------------ -- Código do twitchBOT -- -----------------------
const tmi = require('tmi.js');

var BOT_USERNAME;
var CHANNEL_NAME;
var OAUTH_TOKEN;

var client;
var conectado = 'nao';


//------------------------- Recebe dados da página web -----------------------
const { ipcMain } = require('electron')
var dados = [];

ipcMain.on('enviadados', (event, arg) => {
  dados = arg;
  if (conectado)
    event.reply('asynchronous-reply', `Conectado Corretamente com o servidor`);
  else
    event.reply('asynchronous-reply', `Falha ao conectar com o servidor`);


  BOT_USERNAME = dados[0];
  CHANNEL_NAME = dados[1];
  OAUTH_TOKEN = dados[2];

  // Define configuration options
  const opts = {
    identity: {
      username: BOT_USERNAME,
      password: OAUTH_TOKEN //https://twitchapps.com/
    },
    channels: [
      CHANNEL_NAME
    ]
  };

  // Create a client with our options
  client = new tmi.client(opts);

  //pega os comandos do arquivo e coloca 'online'

  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);
  client.on('disconnected', onDisconnected);
  client.on('join', (channel, username, self) => {
    try {
      sh.onJoin(channel, username, self, client);
    } catch (err) {
      console.log('Erro ao acessar SH!');
    }
  });




  // Connect to Twitch:

  client.connect();

})

// Called every time a message comes in ------------------------------------
function onMessageHandler(target, context, msg, self) {
  // Ignore messages from the bot
  if (self) { return; }

  // pega característica da mensagem pelo "context" [para novas recompensas]
  //console.log(context["custom-reward-id"]);

  //----------------- opções que rodam automaticamente ------------------------------
  if (ad_start) {
    ad.RodarAd(30, 20);
    console.log('Iniciando ads automaticos');
    ad_start = false;
  }

  //----------------- opções baseadas em recompensas do canal -----------------------

  //recompensa "Crie seu comando": 
  if (context["custom-reward-id"] === "422b87c3-9feb-4802-9fda-a110e31d3259") {
    commands.CriarComandos(msg, client, target, win);
  }

  //recompensa "TestBott"
  else if (context["custom-reward-id"] === "ecb72e34-7f0f-4277-b917-c48685899fd5") {
    client.say(target, `RECOMPENSA TestBott RECEBIDA!!!`);

  }
  // Recompensa "Quero Falar!"
  else if (context["custom-reward-id"] === "b2978d23-f360-420f-82d0-47981919bd5e") {
    tts.LerTexto(msg, tts.TocarSom());
    console.log("Recompensa \"Falar Texto\" resgatada");
  }

  //------------------- comandos diretos no chat ------------------------------------

  // limpa espaços vazios na mensagem
  const commandName = msg.trim();

  if (commandName == '!comandosOn' || commandName == '!comandoson') {
    client.say(target, '/me Comandos mostrados na tela');
    obs.TelaComandos(true);
  }
  else if (commandName == '!comandosOff' || commandName == '!comandosoff') {
    client.say(target, '/me Comandos tirados da tela');
    obs.TelaComandos(false);
  }

  //chama função tabuada
  other.tabuada(target, msg, commandName, client);
  //chama função hello
  other.hello(target, msg, commandName, client);

  //chama os comantos criados
  commands.AtivarComandos(commandName, client, target);

}

// preenche os arrays com os dados recebidos do cliente

ipcMain.on('enviaCom', (event, arg) => {
  commands.AtualizaCom(arg);
});

ipcMain.on('enviaRes', (event, arg) => {
  commands.AtualizaRes(arg);
});


// Chamado quando o bot se conecta ao chat da twitch
function onConnectedHandler(addr, port) {

  console.log(`* Connected to ${addr}:${port}`);
  conectado = 'sim';
  confirmaConexao(win);
  conectado = 'nao';
  commands.LerArquivo(false);
  ad_start = true;
}

function confirmaConexao(window) {
  window.webContents.send('conectado', "sim");
}

function onDisconnected(reason) {
  console.log(`Bot desconectado da Twitch... \n ${reason}`);
}