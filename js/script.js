function css(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function randomRGB() {
  return Math.floor(Math.random() * 360);
}

function createGrid(numberOfSquarePerSide) {
  let divOfContainer;

  container.style.cssText = `grid-template-columns: repeat(${numberOfSquarePerSide}, 1fr);
        grid-template-rows: repeat(${numberOfSquarePerSide}, 1fr)`;
  container.style.width = css(container, "height");

  let numberOfSquare = numberOfSquarePerSide * numberOfSquarePerSide;
  for (let i = 0; i < numberOfSquare; i++) {
    divOfContainer = document.createElement(`div`);
    divOfContainer.setAttribute("data-lightness", "55");
    container.appendChild(divOfContainer);
  }

  divs = container.querySelectorAll(`div`);
  divs.forEach((div) => {
    div.addEventListener(`mousemove`, (event) => {
      if (lineColorOption === "colorlines"){
        if (previousDiv != div) {
          let lightness = +event.target.getAttribute("data-lightness");
          if (lightness > 0) lightness -= 5;
          event.target.style.cssText = `background-color: hsl(${randomRGB()},100%,${lightness}%); 
              box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`;
          event.target.setAttribute(`data-lightness`, `${lightness}`);
          previousDiv = div;
        }
      }
      else{
        event.target.style.cssText = `background-color: black; 
              box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`;
      }
      
    });
  });
}

function changeLineColorOption()
{
  var radios = document.querySelectorAll('input[name="lineoption-radio"]');
  for (var i = 0, max = radios.length; i < max; i++) {
    radios[i].addEventListener("click",function () {
      lineColorOption = this.value;
    });
  }
}

function saveCanvasToFile()
{
  let saveBtn = document.getElementById("saveCanvasBtn");
  saveBtn.addEventListener("click", function () {
    var node = document.getElementById("container");

    domtoimage
      .toBlob(node, {
        style: {
          left: "0px",
          top: "0px",
        },
      })
      .then(function (blob) {
        window.saveAs(blob, "my-sketch.png");
      });
  });
}


window.onload = function () {
  let numberOfSquareBtn = document.getElementById(`numberOfSquareBtn`);
  let container = document.getElementById(`container`);
  let divs;
  numberOfSquarePerSide = 20;
  previousDiv = 0;
  lineColorOption = document.querySelector(
    'input[name="lineoption-radio"]:checked'
  ).value;
  createGrid(numberOfSquarePerSide);

  container.classList.add(`container`);
  container.style.width = css(container, "height");
  numberOfSquareBtn.addEventListener(`click`, () => {
    divs = container.querySelectorAll(`div`);
    while (container.firstElementChild)
      container.removeChild(container.lastChild);
    numberOfSquarePerSide = +document.getElementById("numberOfSquareInput")
      .value;
    createGrid(numberOfSquarePerSide);
    document.getElementById("numberOfSquareDisp").textContent = `${numberOfSquarePerSide} x ${numberOfSquarePerSide}`;
  });

  changeLineColorOption();

  saveCanvasToFile();
 
};
