import { useState, useRef } from "react";
import "./App.css";
import ArrowDownIcon from "./assets/icon-arrow.svg";
import { useCalculateAge } from "./customHooks/useCalculateAge";

type ReusltT = {
  days: number;
  months: number;
  years: number;
};

enum InputKeyE {
  days = "DAYS",
  months = "MONTHS",
  years = "YEARS",
}

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [submit, setSubmit] = useState(false);

  const [result, setResult] = useState<ReusltT | null>(null);

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const { calculateAge } = useCalculateAge({ day, month, year });

  const handleCalAge = () => {
    if (day === "" || month === "" || year === "") {
      setSubmit(true);
      return;
    }

    const { days, months, years } = calculateAge();

    setSubmit(false);

    setResult({
      days,
      months,
      years,
    });
  };

  const handleFocusChange = (key: InputKeyE, value: string) => {
    if (key === InputKeyE.days) {
      setDay(value);
      if (dayRef.current?.value.length === 2) {
        monthRef.current?.focus();
      }
    }
    if (key === InputKeyE.months) {
      setMonth(value);
      if (monthRef.current?.value.length === 2) {
        yearRef.current?.focus();
      }
      if (monthRef.current?.value.length === 0) {
        dayRef.current?.focus();
      }
    }
    if (key === InputKeyE.years) {
      setYear(value);
      if (yearRef.current?.value.length === 0) {
        monthRef.current?.focus();
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-section">
          <div className="input-contain">
            <span className={submit && day === "" ? "error" : ""}>DAY</span>
            <input
              ref={dayRef}
              className={submit && day === "" ? "error" : ""}
              type="text"
              maxLength={2}
              placeholder="DD"
              value={day}
              onChange={(e) => handleFocusChange(InputKeyE.days, e.target.value)}
            />
            {submit && day === "" && (
              <span className="text-error error">Must be a valid day</span>
            )}
          </div>
          <div className="input-contain">
            <span className={submit && month === "" ? "error" : ""}>MONTH</span>
            <input
              ref={monthRef}
              className={submit && month === "" ? "error" : ""}
              type="text"
              maxLength={2}
              placeholder="MM"
              value={month}
              onChange={(e) => handleFocusChange(InputKeyE.months, e.target.value)}
            />
            {submit && month === "" && (
              <span className="text-error error">Must be a valid month</span>
            )}
          </div>
          <div className="input-contain">
            <span className={submit && year === "" ? "error" : ""}>YEAR</span>
            <input
              ref={yearRef}
              className={submit && year === "" ? "error" : ""}
              type="text"
              maxLength={4}
              placeholder="YYYY"
              value={year}
              onChange={(e) => handleFocusChange(InputKeyE.years, e.target.value)}
            />
            {submit && year === "" && (
              <span className="text-error error">Must be a valid year</span>
            )}
          </div>
        </div>
        <div className="button-section">
          <div className="line"></div>
          <button onClick={() => handleCalAge()}>
            <img src={ArrowDownIcon} alt="arrowIcon" width={"100%"} />
          </button>
        </div>
        <div className="result-section">
          <div>
            <span className="prefix-res">{result?.years ?? "--"}</span>
            <span className="prefix-title">years</span>
          </div>
          <div>
            <span className="prefix-res">{result?.months ?? "--"}</span>
            <span className="prefix-title">months</span>
          </div>
          <div>
            <span className="prefix-res">{result?.days ?? "--"}</span>
            <span className="prefix-title">days</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
