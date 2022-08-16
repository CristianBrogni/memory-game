const images=[];
const backImage = "images/img0.png"; //define a imagen de fundo das cartas
for(var i =1;i<=8; i++){  //funçao loop para alterar o valor de I ate <=8
  images.push("images/img"+ i +".png"); // procura a imagen correspondente ao valor de I e adiciona ao array
}

let cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];//pares de cartas e posição
let blockClick = false;
let turnedCard = false;
let cardPosition = -1;
let cardImageValue = 0;
let points = 0;

onload = () =>{
  let objectImage = document.querySelectorAll("#memoria img"); //seleciona todos as imagend dentro do ID Memoria
  objectImage.forEach(function(img, i) {       //função que atribui uma imgagen de fundo para as cartas
    img.src = backImage;  //setando o attr SRC como uma imagen padrao
    img.setAttribute("data-value", i); // gera um novo atributo a ao html de IMG
    img.style.opacity = 0.5; //altera a opacidade da imagen de fundo
  });


document.querySelector("#btnStart").onclick = gameStart;//botao que chama a funçao de iniciar o jogo
};

const gameStart = () =>{
  for(let i=0 ; i<cards.length;i++){                  //loop para embaralhar os numeros do array cards
    let p = Math.trunc(Math.random() * cards.length); //Gera um valor randomico
    let aux = cards[p];                               //salva o valor random em uma variavel e altera o array
    cards[p] = cards[i];
    cards[i] = aux;

  }

  let objectImage = document.querySelectorAll("#memoria img"); //seleciona todos as imagend dentro do ID Memoria
  objectImage.forEach(function(img, i) {       //função que atribui uma imgagen de fundo para as cartas
  img.onclick = changeImage;
  img.style.opacity = 1;
  img.src = backImage;
  });

   blockClick = false;
   turnedCard = false;
   cardPosition = -1;
   cardImageValue = 0;
   points = 0;

   document.querySelector("#btnStart").disabled = true;

};
const changeImage = (e) =>{
  if(blockClick) return;
  const p = +e.target.getAttribute("data-value");
  const value = cards[p];
  e.target.src = images[value-1];
  e.target.onclick = null;

  if(!turnedCard){
    turnedCard = true;
    cardPosition = p;
    cardImageValue =  value;
  }else{
    if(value == cardImageValue){
        points++;
    }else{
      const p0 = cardPosition;
      blockClick = true;
        setTimeout(()=>{              //seta um tempo pra imagen ficar 'desvirada'
          e.target.src = backImage;
          e.target.onclick = changeImage;
          let img = document.querySelector("#memoria #i"+p0);
          img.src = backImage;
          img.onclick = changeImage;
          blockClick = false;
        }, 1500);                     //depois de 1 segundo e meio a carta é virada de cabeça para baixo
    }
    turnedCard = false;
    cardPosition = -1;
    cardImageValue = 0;
  }


  if (points ==8){
    document.querySelector("#btnStart").disabled = false;
  }
};
