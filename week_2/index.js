const guess = document.querySelector("#js-guess"),
  range = document.querySelector("#js-range"),
  title = document.querySelector(".js-title"),
  input = document.querySelector("#inputNum"),
  result = document.querySelector("#js-result");

range.oninput = handleInput;

function handleInput() {
  const rangeVal = range.value;
  const display = title.querySelector("span");
  display.innerText= `${rangeVal}`;

  guess.addEventListener("submit", playgame);
}

const playgame = (e) => {
  e.preventDefault();

  const rangeVal = range.value;
  const mcNumber = Math.floor(Math.random() * rangeVal + 1);

  paintResult(rangeVal, mcNumber);
}

function paintResult(rangeVal, mcNumber) {
    const inputVal = input.value;
    const display = result.querySelector("span");

    if (rangeVal < parseInt(inputVal)) {
        display.innerText = `Please enter a number under ${rangeVal}`;
    } else if (inputVal === "") {
        display.innerText = "Enter a number!";
    } else if (inputVal > mcNumber) {
        display.innerText = `You chose: ${inputVal}, the machine chose: ${mcNumber}.
                            "You Win!" `;
    } else if (inputVal < mcNumber) {
        display.innerText = `You chose: ${inputVal}, the machine chose: ${mcNumber}.
                            "You Lose!"`;
    } else if(inputVal === mcNumber) {
        display.innerText = `You chose: ${inputVal}, the machine chose: ${mcNumber}.
                            "draw!"`
    }
}

