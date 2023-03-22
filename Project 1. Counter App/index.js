let countValue = document.getElementById("counter");
let negativeButton = document.getElementById("negative-btn");
let postiveButton = document.getElementById("postive-btn");

function decrement() {
  // get the value from UI
  let value = parseInt(countValue.innerText);
  //update the value
  value -= 1;
  // set the value to UI
  countValue.innerText = value;
}

function increment() {
  // get the value from UI
  let value = parseInt(countValue.innerText);
  //update the value
  value += 1;
  // set the value to UI
  countValue.innerText = value;
}

// adding eventListener

negativeButton.addEventListener("click", decrement);
postiveButton.addEventListener("click", increment);
