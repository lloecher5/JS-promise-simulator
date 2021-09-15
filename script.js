import { data } from "./mocks/data.js";
import { isCode200 } from "./utils/index.js";

//select elements from the DOM
const button = document.getElementById("button");
const namesTable = document.querySelector(".names");
const resetButton = document.querySelector(".reset-button");
//add event listener to the button that calls getStudentNames function
button.addEventListener("click", getStudentNames);

document.addEventListener("click", (e) => {
  e.preventDefault();

  //if the target that is selected contains a "reset" class, add a reload feature when the button is clicked
  if (e.target.classList.contains("reset")) {
    location.reload();
  }
});

function getStudentNames() {
  fetchMockData()
    //what happens when the promise resolves, giving you access to the data
    .then((names) => {
      namesTable.innerHTML = renderNames(names);
      resetButton.innerHTML = `<button class = "reset" > Reset </button>`;
    })

    //what happens when the promise rejects
    .catch((error) => {
      namesTable.innerHTML = error;
      resetButton.innerHTML = `<button class ="reset"> Reset </button>`;
    });

  button.disabled = true;
}

//function that creates a promise
const fetchMockData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isCode200()) {
        resolve(data);
      } else {
        reject("There was an error. Click reset and then try again.");
      }
    }, 500);
  });
};

//function that renders the name in a list
const renderNames = (arr) => {
  const html = arr.map((fullName) => {
    return `
        <li> ${fullName.name} </li>
        
        `;
  });

  return html.join("");
};
