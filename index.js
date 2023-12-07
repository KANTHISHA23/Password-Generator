

let slider= document.querySelector(".pass-length input");
let checkBoxes = document.querySelectorAll(".option input");
let copyIcon = document.querySelector(".text-box button");
let passInput = document.querySelector(".text-box input");
let passIndicator = document.querySelector(".pass-indicator");
let generateBtn = document.querySelector(".generate");

const characters = { //object of letters, numbers & symbols
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}


let generatePassword = () => 
{
  let staticPassword="",
      randomPassword="",
      excludeDuplicate=false, // includes duplicate by default
      passLength= slider.value;

  checkBoxes.forEach(option=>   //traversing through all the checkboxes and select class is take as parameter for the callback function
  {
    if(option.checked)// if any option is selected
    {
      if(option.id !=="exclude-duplicate" && option.id!=="include-spaces") //if no duplicates needed but want spaces
      {
          staticPassword = staticPassword + characters[option.id]; //adding all the possible characters after selecting checkboxes
      }
      else if (option.id==="include-spaces")
      {
         staticPassword= staticPassword+ ` ${staticPassword} `; //use of backticks to add space possibe spaces
      }
      else
     {
        excludeDuplicate= true; // to be handled later
     }
   }
  });

  for(let i=0; i<passLength; i++)
  {
    //getting random character from the static password
    let randomChar= staticPassword[Math.floor(Math.random()*staticPassword.length)];//
    if(excludeDuplicate){
        //if randomPassword doesn't contains the current random character or randomChar is equal
            // to space " " then add random character to randomPassword else decrement i by -1
        if(!randomPassword.includes(randomChar) || randomChar == " ")
              randomPassword += randomChar; 
        else
              i--;
    }
        else { // else add random character to randomPassword
              randomPassword += randomChar;
          }
  }
    passInput.value = randomPassword; // passing randomPassword to passwordInput value
 }
 

  // document.addEventListener("DOMContentLoaded",function(){
  //   let homebtn= document.querySelector(".home");
  //   let aboutbtn= document.querySelector(".about");

  //   // // Highlight Home button by default on the Home page
  //   // homebtn.classList.add('active');
  //   // aboutbtn.classList.remove('active');

  // });


    const updatePassIndicator = () => {
      passIndicator.id = slider.value <= 8 ? "weak" : slider.value <= 16 ? "medium" : "strong";
  }
  
  const updateSlider = () => {
      // passing slider value as counter text
      document.querySelector(".pass-length span").innerText = slider.value;
      generatePassword();
      updatePassIndicator();
  }
  
  updateSlider();
  
  const copyPassword = () => {
      navigator.clipboard.writeText(passInput.value); //copying random password
      copyIcon.innerText = "clicked";
      setTimeout(() => { // after 1500 ms, changing tick icon back to copy
          copyIcon.innerText = "copied!";
      },1500);
  }
  
  copyIcon.addEventListener("click", copyPassword);
  slider.addEventListener("input", updateSlider);
  generateBtn.addEventListener("click", generatePassword);




