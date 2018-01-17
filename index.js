var mqtt = require('mqtt');

var five  = require('johnny-five');
var board = new five.Board({
    port:'COM3'
});

board.on('ready', function(){
    console.log('Placa pronta para ser usada');
    // Criando a var do led
    var led = new five.Led(13); 
    // Criando as var do botao
    var button = new five.Button(4);
    var estadoBotao = false;
    // Criando a var do servo motor
    var servo = new five.Servo({
        pin:'10',
        startAt: 19
    });
    
    // Função para abrir o portão
    function abrirPortao(){
        servo.to(90, 1 * 1000);
        estadoBotao = true;
        console.log('Portao aberto');
    }

    // Função para fechar o portão
    function fecharPortao(){
        servo.to(19, 1 * 1000);
        estadoBotao = false;
        console.log('Portao fechado');
    }

    button.on('down', function() {
        if (estadoBotao) {
            fecharPortao();
        } else {
            abrirPortao();
        }
    });

    var client  = mqtt.connect('mqtt://m10.cloudmqtt.com', {
        username: 'teste',
        password: 'teste',
        port: '16815'
    });
    
    client.on('connect', function () {
        console.log('Conectado ao mqtt');
        client.subscribe('codexp99-portao');

        function callback(topic, payload) {
            var msg = payload.toString();

            if (msg === '1') {
                abrirPortao();
            } else if (msg === '0') {
                fecharPortao();
            } else {
                console.error('mensagem não reconhecida');
                console.error('topic: ' + topic);
                console.error('msg: ' + msg);
            }
        }
        client.on('message', callback);
    });
});