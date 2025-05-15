import { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("15");
  const [output, setOutput] = useState("");
  const [schedule, setSchedule] = useState([]);

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

      let balanceRemaining = principal;
      const scheduleArray = [];

      for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balanceRemaining * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balanceRemaining -= principalPayment;

        scheduleArray.push({
          month: i,
          principal: principalPayment.toFixed(2),
          interest: interestPayment.toFixed(2),
          balance: balanceRemaining > 0 ? balanceRemaining.toFixed(2) : "0.00"
        });
      }

      setSchedule(scheduleArray);
    } else {
      setOutput("Please enter valid inputs.");
      setSchedule([]);
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

      {schedule.length > 0 && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>${row.principal}</td>
                <td>${row.interest}</td>
                <td>${row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;