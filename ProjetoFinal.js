//Bruna Custódio e Letícia Oliveira
var x = 360;

var y = 300;

var raioP = 25;

var raioO = 25;

var vidas = 3;

var pontos = 0;

var nivel = 1;

var xo = 100;

var yo = 120;

var vx = [];

var vy = 408;

var tam = 2;

var vt = [];

var bar = 500;

var tela = 1;

var pulo = false; 

var yp = 0; 

var xdo, ydo;

var contFrames = 0; 

var colidiu;

let img;

let back;
 
let girl;

let books;

let girl1;

let inivel;

let ganhei;

let perdi;

let cenario;

let sombateu;

let fim;

let pare;

let vitoria;

function preload() {

  back = loadImage('com sombra.jpg');
  girl = loadImage('Parada2 (2).png');
  books = loadImage('book (1).png');
  girl1 = loadImage('Pulandook.png');
  inivel = loadImage('zumbi.jpg');
  ganhei = loadImage('ganhou.jpg');
  perdi = loadImage('perdeu.jpg');
  cenario = loadImage('cenario.jpg');
  soundFormats('mp3', 'ogg', 'wav');
  sombateu = loadSound('pulo.wav');
  fim = loadSound('fim.mp3');
  pare = loadSound('Pica-Pau onibus.mp3');
  vitoria = loadSound('vitoria.mp3');

}

function setup() {
   createCanvas(500, 500);
   xdo = 50;	
   ydo = 440; 
   frameRate(30);
   
   for(var i = 0; i < tam; i++){
      vx[i] = 700+i*1000;
      vt[i] = 50; 
   }
}

function draw() {
  
   //Inicio do jogo
   if(tela == 1){
      background(cenario);
      //tecla para iniciar
      if(keyIsDown(ENTER)){
          pare.play();
          tela = 2;
     }
   }

   if(tela == 2) { 
      jogo();
   } // fim da tela 2
  
   if (tela == 3) {
        //Game Over
        background(perdi);
      if(keyIsDown(ENTER)){
         vidas = 3;
         bar = 500;
         pontos = 0;
         nivel = 1;
         tela = 2;
         }
    }
   if (tela == 4) {
        //Venceu
        background(ganhei);
      if(keyIsDown(ENTER)){
         vidas = 3;
         bar = 500;
         pontos = 0;
         nivel = 1;
         tela = 2;
         }
    }
}


function jogo(){

        if(nivel == 1 || nivel == 3 || nivel == 5){
        background(back);
        }  
        if(nivel == 2 || nivel == 4){
        background(inivel);
        } 
            // Tratamento das teclas 
         if (keyIsDown(UP_ARROW) && (! pulo) ){ 
            sombateu.play();
            pulo = true; 
            contFrames = 0; 
         }
        // movimentação do pulo 
        // se o pulo estiver ativo 
        if (pulo) {
            contFrames++; 
            // movimenta o pulo  
            yp = 0.5*(contFrames)*(contFrames - 30);
          //Se o valor da amplitude do pulo for menor que zero
            if (yp > 0) {
                            // O pulo deve ser finalizado 
                // habilida a ocorrência de um novo pulo 
                pulo = false;
                yp = 0; 		
            }
        }
     
        for (var i = 0; i < tam; i++){             
             if(nivel == 1){
                vx[i] = vx[i] - 6;
             }  
             if(nivel == 2){
                vx[i] = vx[i] - 7;
             } 
             if(nivel ==3){
                vx[i] = vx[i] - 8;
             }
             if(nivel ==4){
                vx[i] = vx[i] - 9;
             }
             if(nivel ==5){
                vx[i] = vx[i] - 10;
             }
             if (vx[i] < 0) {
                 vx[i] = 700;    
             } 
             
            // objetos        
           //ellipse(vx[i], vy, vt[i], vt[i]);
            image(books,vx[i],vy);
        }     
     
         //jogador
        //ellipse(xdo, 430+yp, 200, 200)
       if(y<375+yp){
         image(girl,xdo,375+yp);
       }
         else{
       image(girl1,xdo, 375+yp);
         }

        pontos = pontos + 1;
        if (pontos > bar) {
           nivel++;
           bar = bar + 500;
        }

       fill(0, 0, 0);

       textSize(18);
        //Placar
       text('Vidas: '+vidas, 20, 30);

       text('Pontos: '+pontos, 200, 30);

       text('Nível: '+nivel, 420, 30);


      for(i = 0; i < tam; i++){  
     
        if(dist(xdo, 430+yp, vx[i], vy) < raioP + raioO){
           xdo = 40;
           ydo = 430;
           colidiu = true;
           vx[i] = 700;
        
        }

     }   
     if (colidiu == true){
       
           vidas--;
           colidiu = false;
     } 
     if (vidas == 0){
         tela = 3;
         fim.play();
       
     }
     if (nivel == 6){
        tela = 4;
        vitoria.play();
     }
  
  
}  
  
