import React, { useState } from "react";

const transactionsData = [
  {
    id: "SCB-2024-001234",
    reference: "REF-ABC123456",
    status: "completed",
    mode: "Standard Chartered Online Banking",
    amount: "$1,250.75",
    beneficiary: "John Smith",
    companyName: "Acme Technologies Pvt Ltd",
    payeeBankBranch: "Standard Chartered Mumbai Fort Branch",
    date: "Aug 7, 2024, 04:00 PM",
    payeeBankAddress: "123 Fort Road, Mumbai, MH 400001",
  },
  {
    id: "SCB-2024-001235",
    reference: "REF-DEF789012",
    status: "pending",
    mode: "Standard Chartered Mobile App",
    amount: "$500.00",
    beneficiary: "Sarah Johnson",
    companyName: "GreenLeaf Retail LLP",
    payeeBankBranch: "Standard Chartered Connaught Place Branch",
    date: "Aug 7, 2024, 07:45 PM",
    payeeBankAddress: "45 CP Lane, New Delhi, DL 110001",
  },
  {
    id: "SCB-2024-001236",
    reference: "REF-GHI345678",
    status: "failed",
    mode: "Standard Chartered ATM Transfer",
    amount: "$750.25",
    beneficiary: "Michael Brown",
    companyName: "BlueOcean Logistics Ltd",
    payeeBankBranch: "Standard Chartered MG Road Branch",
    date: "Aug 6, 2024, 10:15 PM",
    payeeBankAddress: "56 MG Road, Bengaluru, KA 560001",
  },
  {
    id: "SCB-2024-001237",
    reference: "REF-JKL987654",
    status: "completed",
    mode: "UPI Transfer",
    amount: "$320.00",
    beneficiary: "Priya Sharma",
    companyName: "Sunrise Consulting Services",
    payeeBankBranch: "Standard Chartered T Nagar Branch",
    date: "Aug 6, 2024, 08:20 AM",
    payeeBankAddress: "78 T Nagar Main Rd, Chennai, TN 600017",
  },
  {
    id: "SCB-2024-001238",
    reference: "REF-MNO456321",
    status: "completed",
    mode: "Debit Card",
    amount: "$2,000.00",
    beneficiary: "Amit Kumar",
    companyName: "EduTech Services Pvt Ltd",
    payeeBankBranch: "Standard Chartered Banjara Hills Branch",
    date: "Aug 5, 2024, 02:15 PM",
    payeeBankAddress: "89 Banjara Hills Rd, Hyderabad, TS 500034",
  },
];

function App() {
  const [view, setView] = useState("single");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const handleDownload = () => {
    const element = document.getElementById("transactionSection");
    if (typeof window !== "undefined" && window.html2pdf && element) {
      const opt = {
        margin: 0.5,
        filename: "Transaction_Statement.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      window.html2pdf().from(element).set(opt).save();
    } else {
      const content = JSON.stringify(
        filter === "all"
          ? transactionsData
          : transactionsData.filter((t) => t.status === filter),
        null,
        2
      );
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  };

  const filteredTransactions =
    filter === "all"
      ? transactionsData
      : transactionsData.filter((t) => t.status === filter);

  const safeIndex =
    filteredTransactions.length === 0
      ? 0
      : Math.min(currentIndex, filteredTransactions.length - 1);

  const transactionsToShow =
    view === "single"
      ? filteredTransactions.length > 0
        ? [filteredTransactions[safeIndex]]
        : []
      : filteredTransactions;

  // Hover helpers
  const hoverToBlue = (e) => {
    e.currentTarget.style.backgroundColor = "#0072ce";
    e.currentTarget.style.color = "#fff";
  };
  const hoverToWhite = (e) => {
    e.currentTarget.style.backgroundColor = "#fff";
    e.currentTarget.style.color = "#0072ce";
  };

  const statusPillStyle = (status) => {
    const map = {
      completed: { c: "#00b140", bg: "rgba(0,177,64,0.12)" },
      pending: { c: "#0072ce", bg: "rgba(0,114,206,0.12)" },
      failed: { c: "#b00020", bg: "rgba(176,0,32,0.12)" },
    };
    const { c, bg } = map[status] || map.pending;
    return {
      padding: "6px 12px",
      borderRadius: "999px",
      border: `1px solid ${c}`,
      background: bg,
      color: c,
      fontWeight: 600,
      fontSize: "12px",
      textTransform: "capitalize",
      cursor: "default",
    };
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Arial, sans-serif",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          backgroundColor: "#0072ce",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
          }}
        >
          <a href="#" style={{ display: "inline-flex" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Standard_Chartered_Logo_%282021%2C_Logo_only%29.svg"
              alt="Website Logo"
              style={{ height: "34px", width: "auto" }}
            />
          </a>
          Standard Chartered
        </div>
      </nav>

      {/* Page Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Transaction Preview</h1>
        <div>
          <button
            style={{
              margin: "0 6px",
              padding: "8px 15px",
              background: "#ddd",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            onClick={() => window.print()}
            style={{
              margin: "0 6px",
              padding: "8px 15px",
              background: "#ddd",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Print
          </button>
          <button
            onClick={handleDownload}
            style={{
              margin: "0 6px",
              padding: "8px 15px",
              background: "#00b140",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download
          </button>
        </div>
      </header>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background: "#fff",
          borderBottom: "1px solid #ddd",
          borderRadius: "6px",
          margin: "0 20px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Access Level fixed as Full Access */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "14px" }}>Access Level:</label>
          <span
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              background: "#0072ce",
              color: "#fff",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Full Access
          </span>
        </div>

        {/* View + Filter */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => {
              setView("single");
              setCurrentIndex(0);
            }}
            onMouseEnter={(e) => {
              if (view !== "single") hoverToBlue(e);
            }}
            onMouseLeave={(e) => {
              if (view !== "single") hoverToWhite(e);
            }}
            style={{
              padding: "8px 16px",
              border: "1px solid #0072ce",
              borderRadius: "4px",
              background: view === "single" ? "#0072ce" : "#fff",
              color: view === "single" ? "#fff" : "#0072ce",
              fontWeight: 500,
              cursor: "pointer",
              transition: "0.3s ease",
            }}
          >
            Single Transaction
          </button>

          <button
            onClick={() => setView("multiple")}
            onMouseEnter={(e) => {
              if (view !== "multiple") hoverToBlue(e);
            }}
            onMouseLeave={(e) => {
              if (view !== "multiple") hoverToWhite(e);
            }}
            style={{
              padding: "8px 16px",
              border: "1px solid #0072ce",
              borderRadius: "4px",
              background: view === "multiple" ? "#0072ce" : "#fff",
              color: view === "multiple" ? "#fff" : "#0072ce",
              fontWeight: 500,
              cursor: "pointer",
              transition: "0.3s ease",
            }}
          >
            Multiple Transactions
          </button>

          {/* Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentIndex(0);
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Section */}
      <main id="transactionSection" style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Transaction Statement
        </h2>

        {transactionsToShow.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No transactions found for filter: {filter}
          </p>
        ) : (
          transactionsToShow.map((t, i) => (
            <div
              key={t.id + "-" + i}
              style={{
                background: "#fff",
                padding: "16px",
                marginBottom: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                display: "flex",
                gap: "20px",
                alignItems: "stretch",
              }}
            >
              {/* Left: details (two columns) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px 20px",
                  flex: 1,
                }}
              >
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Transaction ID:</strong> {t.id}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Reference Number:</strong> {t.reference}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Payment Mode:</strong> {t.mode}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Amount:</strong> {t.amount}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Beneficiary:</strong> {t.beneficiary}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Company Name:</strong> {t.companyName}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Payee Bank Branch:</strong> {t.payeeBankBranch}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Date:</strong> {t.date}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Payee Bank Address:</strong> {t.payeeBankAddress}
                  </p>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="button" style={statusPillStyle(t.status)}>
                    {t.status}
                  </button>
                </div>
              </div>

              {/* Right: Prev/Next (only show in single view) */}
              {view === "single" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "stretch",
                    gap: "10px",
                    minWidth: "160px",
                    borderLeft: "1px solid #eee",
                    paddingLeft: "16px",
                  }}
                >
                  <button
                    disabled={safeIndex === 0}
                    onClick={() =>
                      setCurrentIndex((prev) => Math.max(prev - 1, 0))
                    }
                    onMouseEnter={(e) => {
                      if (safeIndex !== 0) hoverToBlue(e);
                    }}
                    onMouseLeave={(e) => {
                      if (safeIndex !== 0) hoverToWhite(e);
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: "1px solid #0072ce",
                      background: "#fff",
                      color: "#0072ce",
                      cursor: safeIndex === 0 ? "not-allowed" : "pointer",
                      opacity: safeIndex === 0 ? 0.6 : 1,
                      fontWeight: 600,
                    }}
                  >
                    Previous
                  </button>
                  <button
                    disabled={safeIndex === filteredTransactions.length - 1}
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(prev + 1, filteredTransactions.length - 1)
                      )
                    }
                    onMouseEnter={(e) => {
                      if (safeIndex !== filteredTransactions.length - 1)
                        hoverToBlue(e);
                    }}
                    onMouseLeave={(e) => {
                      if (safeIndex !== filteredTransactions.length - 1)
                        hoverToWhite(e);
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: "1px solid #0072ce",
                      background: "#fff",
                      color: "#0072ce",
                      cursor:
                        safeIndex === filteredTransactions.length - 1
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        safeIndex === filteredTransactions.length - 1 ? 0.6 : 1,
                      fontWeight: 600,
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>

      {/* Bottom View Switcher */}
      <footer
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          padding: "14px",
        }}
      >
        <button
          onClick={() => {
            setView("single");
            setCurrentIndex(0);
          }}
          onMouseEnter={(e) => {
            if (view !== "single") hoverToBlue(e);
          }}
          onMouseLeave={(e) => {
            if (view !== "single") hoverToWhite(e);
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "1px solid #0072ce",
            background: view === "single" ? "#0072ce" : "#fff",
            color: view === "single" ? "#fff" : "#0072ce",
            cursor: "pointer",
            fontWeight: 500,
            transition: "0.3s",
          }}
        >
          Single Transaction View
        </button>

        <button
          onClick={() => setView("multiple")}
          onMouseEnter={(e) => {
            if (view !== "multiple") hoverToBlue(e);
          }}
          onMouseLeave={(e) => {
            if (view !== "multiple") hoverToWhite(e);
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "1px solid #0072ce",
            background: view === "multiple" ? "#0072ce" : "#fff",
            color: view === "multiple" ? "#fff" : "#0072ce",
            cursor: "pointer",
            fontWeight: 500,
            transition: "0.3s",
          }}
        >
          Multiple Transactions View
        </button>
      </footer>
    </div>
  );
}

export default App;
