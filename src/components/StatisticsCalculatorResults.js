const StatisticsCalculatorResults = ({ calculationType, result }) => {
  const getFormula = () => {
    switch (calculationType) {
      case 'salesTax':
        return 'Total = Price + (Price * Tax Rate)';
      case 'propertyTax':
        return 'Property Tax = Property Value * (Tax Rate / 100)';
      case 'compoundInterest':
        return 'A = P(1 + r/n)^(nt)';
      case 'moleCalculation':
        return 'Moles = Mass / Molar Mass';
      default:
        return '';
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white text-center">Results</h2>
      {result !== null ? (
        <>
          <p className="mt-2 text-white text-center">
            Calculated Result: <span className="font-semibold">{result.toFixed(2)}</span>
          </p>
          <p className="mt-2 text-white text-center">
            Formula Used: 
            <span className="font-semibold text-yellow-400"> {getFormula()}</span>
          </p>
        </>
      ) : (
        <p className="mt-2 text-red-500 text-center">
          No result available. Please enter valid inputs and perform a calculation.
        </p>
      )}
    </div>
  );
};

export default StatisticsCalculatorResults;
