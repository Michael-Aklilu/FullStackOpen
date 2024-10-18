import { useState } from "react";

const Header = () => <h1>Give feedback</h1>;

const Statistics = ({ good, neutral, bad, total, positive, average }) => {
  if (good === 0 && neutral === 0 && bad === 0)
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  else {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <tr>
              <StatisticsLine value={good} text="Good" />
            </tr>
            <tr>
              <StatisticsLine value={neutral} text="Neutral" />
            </tr>
            <tr>
              <StatisticsLine value={bad} text="Bad" />
            </tr>
            <tr>
              <StatisticsLine value={total} text="All" />
            </tr>
            <tr>
              <StatisticsLine value={average} text="Average" />
            </tr>
            <tr>
              <StatisticsLine value={positive} text="Positive" percent="%" />
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

const StatisticsLine = ({ value, text, percent }) => {
  return (
    <>
      <td>{text}</td>
      <td align="center">
        {value}
        {percent}
      </td>
    </>
  );
};

const Button = ({ state, setState, text }) => (
  <button onClick={() => setState(state + 1)}>{text}</button>
);

const Total = (good, neutral, bad) => {
  if (good === 0 && neutral === 0 && bad === 0) return 0;
  else return good + neutral + bad;
};

const Average = (good, neutral, bad) => {
  const goodScore = good,
    neutralScore = 0,
    badScore = -1 * bad,
    total = good + neutral + bad;
  return (goodScore + neutralScore + badScore) / total;
};

const Positive = (good, neutral, bad) => {
  const total = good + neutral + bad;
  return (good / total) * 100;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = Total(good, neutral, bad);
  const average = Average(good, neutral, bad);
  const positive = Positive(good, neutral, bad);

  return (
    <div>
      <Header />
      <Button state={good} setState={setGood} text={"Good"} />
      <Button state={neutral} setState={setNeutral} text={"Neutral"} />
      <Button state={bad} setState={setBad} text={"Bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
