import { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("15");
  const [output, setOutput] = useState("");

  const calculate = (balance, rate, term) => {
    const principal = parseFloat(balance);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const numberOfPayments = parseInt(term) * 12;

    if (principal && monthlyRate && numberOfPayments) {
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
      const monthlyPayment = principal * (numerator / denominator);
      const formatted = monthlyPayment.toFixed(2);
      setOutput(`$${formatted} is your payment`);
    } else {
      setOutput("Please enter valid inputs.");
    }
  };

  return (
    <div className="calculator-container">
      <h1>Mortgage Calculator</h1>

      <label>
        Loan Balance:
        <input
          data-testid="balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </label>

      <label>
        Interest Rate (%):
        <input
          data-testid="rate"
          type="number"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </label>

      <label>
        Loan Term (years):
        <select
          data-testid="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        >
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
      </label>

      <button
        data-testid="submit"
        onClick={() => calculate(balance, rate, term)}
      >
        Calculate
      </button>

      <div id="output" data-testid="output">{output}</div>
    </div>
  );
}

export default App;