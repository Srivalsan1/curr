const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Uploading Country Code and Currency
for (let select of dropdowns) {
  for (currCode in countryList) {
	let newOption = document.createElement("option");
	newOption.innerText = currCode;
	newOption.value = currCode;
	

	if (select.name === "from" && currCode === "USD") {
	 newOption.selected = "selected";
	} else if (select.name === "to" && currCode === "INR") {
	 newOption.selected = "selected";
	} 
	select.append(newOption);
	}

	// Updating the country Flag.

	select.addEventListener("change", (evt) => {
	updateFlag(evt.target);
});
  }

  const updateFlag = (element) => {
  	let currCode = element.value;
  	let countryCode = countryList[currCode];
  	let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  	let img = element.parentElement.querySelector("img");
  	img.src = newSrc;
  };


// Getting the Exchange rate (fetching from currency API)

btn.addEventListener("click",  (evt) => {
	evt.preventDefault();
	let amount = document.querySelector("form input");
	let amtVal = amount.value;
	

	console.log(fromCurr.value, toCurr.value);
	const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
	fetch(URL)
  .then(response => {
    
    return response.json();
    console.log(response);
  })
  .then(data => {
	let dataFromCurr = data[fromCurr.value.toLowerCase()];
  	let rate = dataFromCurr[toCurr.value.toLowerCase()];
  	let finalAmt = amtVal * rate;
  	msg.innerText = `${amtVal} ${fromCurr.value} is equal to ${finalAmt} ${toCurr.value}`;
    console.log(finalAmt);
  })
});




