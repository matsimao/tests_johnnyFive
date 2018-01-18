## MQTT JOHNNY-FIVE

Teste usando a biblioteca do mqtt para integrar com os serviços do CloudMqtt usando o jonnny five e um arduino uno.
Ele irá se inscrever em um topico, e executara um evento quando uma mensagem for enviada para esse topico.  

* 1: Para abrir o portão.
* 2: Para fechar o portão.

Caso a mensagem enviada não seja nenhuma das alternativas acima, ele irá dar print no console, exibindo o topico da mensagem e a mensagem enviada.

## Instalação

Para instalar as libs necessarias para o funcionamento do projeto, basta executar no terminal:
```sh
npm install
```

## Configurações do index.js

Algumas configurações que podem ser necessarias feitas antes da utilização do script.

#### Portas:
Configurando a porta que o arduino esta configurado:

```js
var board = new five.Board({
    port:'COM3'
});
```
No parametro port, será colocado a porta que o arduino foi conectado.  
Configurando as portas das variaveis: led, servo e button:

```js
var led = new five.Led(13); 
var button = new five.Button(4);
var servo = new five.Servo({
    pin:'10',
    startAt: 19
});
```

#### Client MQTT

Configurando a conexão do client mqtt usando os parametros fornecidos pelo CloudMqtt.

```js
var client  = mqtt.connect('mqtt://m10.cloudmqtt.com', {
    username: 'teste',
    password: 'teste',
    port: '16815'
});
```

* 1º parametro é a url da instância criada no CloudMqtt que será usado nesse exemplo é `mqtt://m10.cloudmqtt.com`.
* 2º parametro será enviado um objeto contendo outros parametros necessarios para se connectar no `mqtt://m10.cloudmqtt.com`.  
`username`: usuário que foi adicionado para ler e escrever no topico.  
`password`: Senha do usuario.
`port`: Porta da instância criada no MQTT.
(PS: Os parametros `username` e `password` não são da instancia, e sim do usuario criado para usar o topico na instancia)

Outro exemplo simples que pode ser utilizado e com o test.mosquitto.org, o codigo ficaria da seguinte maneira.

```js
var client  = mqtt.connect('mqtt://test.mosquitto.org');
```

Somente com essa linha é necessario para realizar a conexão.

#### Topico

Agora a aplicação fará a inscrição no topico criado:

```js
client.subscribe('codexp99-portao');
```

Onde está escrito `codexp99-portao`, basta colocar o topico que foi criado na instância do CloudMqtt, no caso do test.mosquitto.org não é necessario um prê cadastro do topico, basta colocar o nome do topico.