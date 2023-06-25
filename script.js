const lienzo = document.querySelector(".lienzo");
const divRecord = document.querySelector(".record");

let finalizarJuego = false;
let posComidaX, posComidaY;
let posculebraX = 5, posculebraY = 5;
let cuerpo = [];
let velocidadX = 0, velocidadY = 0;
let intervalo;
let puntaje = 0;
let divPuntaje = document.querySelector(".puntaje");
let puntajeMax = localStorage.getItem(".record") || 0;
divRecord.innerHTML = `Record: ${puntajeMax}`;

const posicionComida = () =>
{
  posComidaX = Math.floor(Math.random() * 40) + 1;
  posComidaY = Math.floor(Math.random() * 20) + 1;
}

const fin = () =>
{
  clearInterval(intervalo);
  alert("|🍎💥|💀¡HAS PERDIDO!💀|💥🐍|");
  location.reload();
}

const altDireccion = (e) =>
{
  if(e.key === "ArrowUp" && velocidadY != 1)
  {
    velocidadX = 0;
    velocidadY = -1;
  }
  else if (e.key === "ArrowDown" && velocidadY != -1)
  {
    velocidadX = 0;
    velocidadY = 1;
  }
  else if (e.key === "ArrowLeft" && velocidadX != 1)
  {
    velocidadX = -1;
    velocidadY = 0;
  }
  else if (e.key === "ArrowRight" && velocidadX != -1)
  {
    velocidadX = 1;
    velocidadY = 0;
  }
  comenzarJuego();
  console.log(e);
}

const comenzarJuego = () =>
{
  if(finalizarJuego) return fin();
  let hmtlMarkup = `<div class="comida" style="grid-area: ${posComidaY} / ${posComidaX}"></div>`;

  if(posculebraX === posComidaX && posculebraY === posComidaY)
  {
    posicionComida();
    cuerpo.push([posComidaX, posculebraY]);
    puntaje++;
    puntajeMax = puntaje >= puntajeMax ? puntaje : puntajeMax;
    localStorage.setItem(".record", puntajeMax);
    divPuntaje.innerHTML = `Puntaje: ${puntaje}`;
    divRecord.innerHTML = `Record: ${puntajeMax}`;
  }

  for(let i = cuerpo.length -1; i > 0; i--)
  {
    cuerpo[i] = cuerpo[i - 1];
  }

  cuerpo[0] = [posculebraX, posculebraY];

  /*Pos. Alterada de la culebra*/
  posculebraX += velocidadX;
  posculebraY += velocidadY;

  if(posculebraX <= 0 || posculebraX > 40 || posculebraY <= 0 || posculebraY > 20)
  {
    finalizarJuego = true;
  }


  for(let i = 0; i < cuerpo.length; i++)
  {
    hmtlMarkup += `<div class="cabeza" style="grid-area: ${cuerpo[i][1]} / ${cuerpo[i][0]}"></div>`;
    if (i != 0 && cuerpo[0][1] === cuerpo[i][1] && cuerpo[0][0] === cuerpo[i][0]) {
      finalizarJuego = true;
    }
  }
  lienzo.innerHTML = hmtlMarkup;
}

posicionComida();
/*comenzarJuego();*/ 
/*añadir movimiento*/
intervalo = setInterval(comenzarJuego, 125);

document.addEventListener("keydown", altDireccion);
