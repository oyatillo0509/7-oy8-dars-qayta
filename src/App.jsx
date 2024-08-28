import React, { useState } from "react";
import countries from "./assets/data/country-currency.json";
import Form1 from "./components/To";
import Form2 from "./components/Form2";
import Amount from "./components/Res";

function App() {
  const [amoutValue, setAmountValue] = useState("1000.00");
  const [convertedValue, setConvertedValue] = useState(null);
  const [selectedCountryFrom, setSelectedCountryFrom] = useState(countries[0]);
  const [selectedCountryTo, setSelectedCountryTo] = useState(countries[1]);

  function handleAmout(e) {
    setAmountValue(e.target.value);
  }

  function handleConvert() {
    const fromCurrencyRate =
      selectedCountryFrom?.currencies[
        Object.keys(selectedCountryFrom.currencies)[0]
      ]?.rateToUSD;

    const toCurrencyRate =
      selectedCountryTo?.currencies[
        Object.keys(selectedCountryTo.currencies)[0]
      ]?.rateToUSD;

    if (fromCurrencyRate && toCurrencyRate) {
      const converted =
        (parseFloat(amoutValue) * parseFloat(toCurrencyRate)) /
        parseFloat(fromCurrencyRate);
      setConvertedValue(converted.toFixed(3));
    }
  }

  return (
    <div className="w-full border-2 border-blue-500 h-96 flex flex-col justify-center items-center p-2 mt-60 relative">
      <div className="flex gap-5 items-center ">
        <Amount
          selectedCountryFrom={selectedCountryFrom}
          handleAmout={handleAmout}
          amoutValue={amoutValue}
          convertedValue={convertedValue}
        />
        <Form2
          countries={countries}
          setSelectedCountryFrom={setSelectedCountryFrom}
          selectedCountryFrom={selectedCountryFrom}
        />
        <div className="flex items-center">
          <button
            onClick={() => {
              const temp = selectedCountryFrom;
              setSelectedCountryFrom(selectedCountryTo);
              setSelectedCountryTo(temp);
            }}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            ↔
          </button>
        </div>
        <Form1
          countries={countries}
          setSelectedCountryTo={setSelectedCountryTo}
          selectedCountryTo={selectedCountryTo}
        />
      </div>
      <button
        onClick={handleConvert}
        className="btn btn-outline btn-info bg-blue-500 py-3 px-8 font-medium hover:bg-blue-600 rounded-md text-white mt-20  flex"
      >
        Convert
      </button>
    </div>
  );
}

export default App;
