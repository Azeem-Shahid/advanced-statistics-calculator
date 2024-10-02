import { useState } from "react";
import StatisticsCalculatorResults from "./StatisticsCalculatorResults";

const StatisticsCalculator = () => {
  const [calculationType, setCalculationType] = useState("salesTax");
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const validateInputs = () => {
    for (const [key, value] of Object.entries(inputs)) {
      if (isNaN(value) || value < 0) {
        setError(
          `Invalid input for ${key}. Please enter a non-negative number.`
        );
        return false;
      }
    }
    if (calculationType === "salesTax" || calculationType === "propertyTax") {
      if (inputs.taxRate < 0 || inputs.taxRate > 100) {
        setError("Tax rate must be between 0 and 100.");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const calculate = () => {
    if (!validateInputs()) return;

    let calculationResult;

    switch (calculationType) {
      case "salesTax":
        calculationResult = inputs.price * (1 + inputs.taxRate / 100);
        break;
      case "propertyTax":
        calculationResult = inputs.propertyValue * (inputs.taxRate / 100);
        break;
      case "compoundInterest":
        calculationResult =
          inputs.principal *
          Math.pow(
            1 + inputs.rate / (100 * inputs.compoundFrequency),
            inputs.compoundFrequency * inputs.time
          );
        break;
      case "moleCalculation":
        calculationResult = inputs.mass / inputs.molarMass;
        break;
      default:
        break;
    }

    setResult(calculationResult);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-lg shadow-black rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Advanced Statistics Calculator
        </h1>

        <select
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value)}
          className="border border-gray-700 rounded-lg p-3 mb-4 bg-gray-700 text-white w-full"
        >
          <option value="salesTax">Sales Tax</option>
          <option value="propertyTax">Property Tax</option>
          <option value="compoundInterest">Compound Interest</option>
          <option value="moleCalculation">Mole Calculation</option>
        </select>

        {/* Input fields based on calculation type */}
        {calculationType === "salesTax" && (
          <div>
            <label className="block mb-2 text-white">Price ($):</label>
            <input
              type="number"
              name="price"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter price"
            />
            <label className="block mb-2 text-white">Tax Rate (%):</label>
            <input
              type="number"
              name="taxRate"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter tax rate"
            />
          </div>
        )}

        {calculationType === "propertyTax" && (
          <div>
            <label className="block mb-2 text-white">Property Value ($):</label>
            <input
              type="number"
              name="propertyValue"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter property value"
            />
            <label className="block mb-2 text-white">Tax Rate (%):</label>
            <input
              type="number"
              name="taxRate"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter tax rate"
            />
          </div>
        )}

        {calculationType === "compoundInterest" && (
          <div>
            <label className="block mb-2 text-white">
              Principal Amount ($):
            </label>
            <input
              type="number"
              name="principal"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter principal amount"
            />
            <label className="block mb-2 text-white">
              Annual Interest Rate (%):
            </label>
            <input
              type="number"
              name="rate"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter interest rate"
            />
            <label className="block mb-2 text-white">
              Compound Frequency (per year):
            </label>
            <input
              type="number"
              name="compoundFrequency"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter compound frequency"
            />
            <label className="block mb-2 text-white">Time (years):</label>
            <input
              type="number"
              name="time"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter time in years"
            />
          </div>
        )}

        {calculationType === "moleCalculation" && (
          <div>
            <label className="block mb-2 text-white">
              Mass of Substance (g):
            </label>
            <input
              type="number"
              name="mass"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter mass"
            />
            <label className="block mb-2 text-white">Molar Mass (g/mol):</label>
            <input
              type="number"
              name="molarMass"
              onChange={handleInputChange}
              className="border border-gray-700 rounded-lg p-3 w-full mb-4 bg-gray-700 text-white"
              placeholder="Enter molar mass"
            />
          </div>
        )}

        <button
          onClick={calculate}
          className="bg-blue-600 text-white rounded-lg p-3 mt-4 w-full hover:bg-blue-700 transition duration-200"
        >
          Calculate
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {/* Removed Calculation Result Section */}
        {/* Keep StatisticsCalculatorResults component */}
        {result !== null && (
          <StatisticsCalculatorResults
            calculationType={calculationType}
            result={result}
          />
        )}
      </div>
    </div>
  );
};

export default StatisticsCalculator;
