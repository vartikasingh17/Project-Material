import React, { useState } from "react";
import "./App.css";

const transactionsData = [
  {
    id: "SCB-2024-001234",
    reference: "REF-ABC123456",
    status: "completed",
    mode: "Standard Chartered Online Banking",
    amount: "$1,250.75",
    beneficiary: "John Smith",
    date: "Aug 7, 2024, 04:00 PM",
  },
  {
    id: "SCB-2024-001235",
    reference: "REF-DEF789012",
    status: "pending",
    mode: "Standard Chartered Mobile App",
    amount: "$500.00",
    beneficiary: "Sarah Johnson",
    date: "Aug 7, 2024, 07:45 PM",
  },
  {
    id: "SCB-2024-001236",
    reference: "REF-GHI345678",
    status: "failed",
    mode: "Standard Chartered ATM Transfer",
    amount: "$750.25",
    beneficiary: "Michael Brown",
    date: "Aug 6, 2024, 10:15 PM",
  },
  {
    id: "SCB-2024-001237",
    reference: "REF-JKL987654",
    status: "completed",
    mode: "UPI Transfer",
    amount: "$320.00",
    beneficiary: "Priya Sharma",
    date: "Aug 6, 2024, 08:20 AM",
  },
  {
    id: "SCB-2024-001238",
    reference: "REF-MNO456321",
    status: "completed",
    mode: "Debit Card",
    amount: "$2,000.00",
    beneficiary: "Amit Kumar",
    date: "Aug 5, 2024, 02:15 PM",
  },
];

function App() {
  const [view, setView] = useState("single"); // "single" or "multiple"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("all"); // "all" | "completed" | "pending" | "failed"

  const handleDownload = () => {
    const element = document.getElementById("transactionSection");
    const opt = {
      margin: 0.5,
      filename: "Transaction_Statement.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    window.html2pdf().from(element).set(opt).save();
  };

  // Apply filter
  const filteredTransactions =
    filter === "all"
      ? transactionsData
      : transactionsData.filter((t) => t.status === filter);

  // Transactions to display
  const transactionsToShow =
    view === "single"
      ? filteredTransactions.length > 0
        ? [filteredTransactions[currentIndex]]
        : []
      : filteredTransactions;

  // Adjust navigation when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentIndex(0);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Standard_Chartered_Logo_%282021%2C_Logo_only%29.svg"
              alt="Website Logo"
            />
          </a>
          Standard Chartered
        </div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Transactions</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
        </ul>
      </nav>

      {/* Page Header */}
      <header className="page-header">
        <h1>Transaction Preview</h1>
        <div className="header-buttons">
          <button className="btn secondary">Back</button>
          <button className="btn secondary" onClick={() => window.print()}>
            Print
          </button>
          <button className="btn primary" onClick={handleDownload}>
            Download
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="controls">
        <span className="access-level">
          Access Level: <strong>Full Access</strong>
        </span>
        <div className="view-modes">
          <button
            className={`mode-btn ${view === "single" ? "active" : ""}`}
            onClick={() => {
              setView("single");
              setCurrentIndex(0);
            }}
          >
            Single Transaction
          </button>
          <button
            className={`mode-btn ${view === "multiple" ? "active" : ""}`}
            onClick={() => setView("multiple")}
          >
            Multiple Transactions
          </button>

          {/* Filter dropdown */}
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Section */}
      <main className="transactions" id="transactionSection">
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Transaction Statement
        </h2>

        {transactionsToShow.length > 0 ? (
          transactionsToShow.map((t, i) => (
            <div className="transaction-card" key={i}>
              <div className="transaction-details">
                <p>
                  <strong>Transaction ID:</strong> {t.id}
                </p>
                <p>
                  <strong>Reference Number:</strong> {t.reference}
                </p>
                <p className={`status ${t.status}`}>{t.status}</p>
                <p>
                  <strong>Payment Mode:</strong> {t.mode}
                </p>
              </div>
              <div className="transaction-info">
                <p>
                  <strong>Amount:</strong> {t.amount}
                </p>
                <p>
                  <strong>Beneficiary Name:</strong> {t.beneficiary}
                </p>
                <p>
                  <strong>Payment Date:</strong> {t.date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>
            No transactions found for this filter.
          </p>
        )}
      </main>

      {/* Single Nav (Prev/Next) */}
      {view === "single" && filteredTransactions.length > 0 && (
        <div className="single-nav">
          <button
            id="prevBtn"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            id="nextBtn"
            disabled={currentIndex === filteredTransactions.length - 1}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      <footer className="bottom-nav">
        <button
          className={`bottom-btn ${view === "single" ? "active" : ""}`}
          onClick={() => {
            setView("single");
            setCurrentIndex(0);
          }}
        >
          Single Transaction View
        </button>
        <button
          className={`bottom-btn ${view === "multiple" ? "active" : ""}`}
          onClick={() => setView("multiple")}
        >
          Multiple Transactions View
        </button>
      </footer>
    </div>
  );
}

export default App;
