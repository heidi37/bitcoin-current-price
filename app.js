document.getElementById("copyrightYear").innerText = new Date().getFullYear();

const button = document.getElementById("btn");
const price = document.getElementById("price");
const container = document.querySelector(".container")
const currencyRadioButtons = document.querySelectorAll('input[name="currency"]');
let selectedCurrency;

button.addEventListener("click", getPrices);

function getSelectedCurrency() {

  currencyRadioButtons.forEach(function(radioButton) {
    if (radioButton.checked) {
      selectedCurrency = radioButton.value;
    }
  });

}

function getPrices() {

  getSelectedCurrency()
  const XHR = new XMLHttpRequest();
  XHR.open("GET", 'https://api.coindesk.com/v1/bpi/currentprice.json');
  XHR.send();
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
      const response = JSON.parse(XHR.responseText)
      const currencyData = response.bpi[selectedCurrency];
      price.innerHTML = `
        ${currencyData.symbol}
        ${currencyData.rate}
      `;
    } else if (XHR.readyState == 4) {
      console.log("There is a problem")
    }
  }
}
