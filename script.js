const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;

  if (!includeLowercase && !includeUppercase && !includeSymbols) {
    alert("Please Select Atleast One Char Type!");
    return;
  }

  const newPassword = createPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );
  passwordInput.value = newPassword;

  updateStrengthMeter(newPassword);
}

function createPassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) {
  let allcharacters = "";

  if (includeUppercase) allcharacters += uppercaseLetters;
  if (includeLowercase) allcharacters += lowercaseLetters;
  if (includeNumbers) allcharacters += numberCharacters;
  if (includeSymbols) allcharacters += symbolCharacters;
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allcharacters.length);
    password += allcharacters[randomIndex];
  }
  return password;
}

function updateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?/]/.test(password);

  let strengthScore = 0;

  strengthScore += Math.min(passwordLength * 2, 40);
  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumber) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  const safeScore = Math.max(5, Math.min(100, strengthScore));
  strengthBar.style.width = safeScore + "%";

  let strengthLabelText = "";
  let barColor = "";

  if (strengthScore < 40) {
    barColor = "#fc8181";
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    barColor = "#fbd38d";
    strengthLabelText = "Medium";
  } else {
    barColor = "#68d391";
    strengthLabelText = "Strong";
  }

  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText;
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch((error) => {
      console.log(error);
    });
});

function showCopySuccess() {
  copyButton.classList.remove("fa-solid", "fa-copy");
  copyButton.classList.add("fa-regular", "fa-circle-check");
  copyButton.style.color = "#48bb78";
  setTimeout(() => {
    copyButton.classList.remove("fa-regular", "fa-circle-check");
    copyButton.classList.add("fa-solid", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}
passwordInput.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch((error) => {
      console.log(error);
    });
});
