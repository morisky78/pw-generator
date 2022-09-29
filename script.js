// Assignment Code
var generateBtn = document.querySelector("#generate");

var minLength = 8;
var maxLength = 128;

// global variables.
var lowercaseString = 'abcdefghijklmnopqrstuvwxyz'; // 26
var uppercaseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 26
var numString = '0123456789'; // 10
// special String includes two backslashes, infont of " and \ itself. README
var specialString = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // 33

// boolean values to check character criteria user wants
// have false default value to check user selected at least one.
var includeLow, includeUpp, includeNum, includeChar; 
includeLow = includeUpp = includeNum = includeChar = false; 


function getValidLengh () {
  var lengthInput;
  // get a input for length. 
  // check if it is a valid number. 
  // if the input is not valid, alert msg and loop until you get a valid one.
  // if user cancels, return null;
  while ( lengthInput = prompt(`Please choose the length of the password. (${minLength} - ${maxLength})`) ) {
    
    if ( lengthInput >= minLength && lengthInput <= maxLength ) {
        console.log(`Valid input inserted: ${lengthInput}`);
        break; 
    } else {
      alert("OOPS! Please give me a valid number.");
    }
  }
  return lengthInput;
}

// this will store the boolean values and return if it is valid inputs.
// this will return false when user select no for all char type
function getValidCharCriteria() {
  // get boolean inputs ;
  includeLow = confirm("Do you want to include lowercase letters?");
  console.log("lowercase? "+ includeLow);
  includeUpp = confirm("Do you want to include uppercase letters?");
  console.log("uppercase? "+includeUpp);
  includeNum = confirm("Do you want to include numbers?");
  console.log("numbers? "+includeNum);
  includeChar = confirm("Do you want to include special charactors?");
  console.log("specials? "+includeChar);
  
  if (!includeLow && !includeUpp && !includeNum && !includeChar  ) {
    return false;
  } else {
    return true;
  }
}

function generatePassword() {
  var finalPassword = '';  

  var pwLength = getValidLengh(); 

  // pw will be generated only when user didn't cancel the prompt
  if ( !pwLength )  return null;

  // continue ask until user select at least one criteria.
  while ( !getValidCharCriteria() ) {
    alert( "OOPS! You need to select at least one character type!") ;
  }

  // based on the responses build available pool of charactoers
  var charPool = '';
  if ( includeLow ) charPool = lowercaseString;  
  if ( includeUpp ) charPool += uppercaseString;
  if ( includeNum ) charPool += numString;
  if ( includeChar ) charPool += specialString;
  console.log('totalletters of '+ charPool + 'is '+charPool.length);

  for (let i = 0; i < pwLength; i++) {
    // generate random number within range of available chars length
    var randomNum = Math.floor(Math.random()*charPool.length);
    console.log (`R-Num ${i} : ${randomNum}`);
    // get the charactor from the pool and add it to the final password
    finalPassword += charPool[randomNum];
    
  }

  return finalPassword;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
