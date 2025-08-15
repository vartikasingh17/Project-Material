const transactions = document.querySelectorAll(".transaction-card");
const topButtons = document.querySelectorAll(".mode-btn");
const bottomButtons = document.querySelectorAll(".bottom-btn");
const singleNav = document.querySelector(".single-nav");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function updateSingleView() {
  transactions.forEach((t, i) => {
    t.style.display = i === currentIndex ? "flex" : "none";
  });
}

function showMultipleView() {
  transactions.forEach((t) => (t.style.display = "flex"));
}

function setActive(viewType) {
  [...topButtons, ...bottomButtons].forEach((btn) =>
    btn.classList.remove("active")
  );
  topButtons.forEach((btn) => {
    if (btn.dataset.view === viewType) btn.classList.add("active");
  });
  bottomButtons.forEach((btn) => {
    if (btn.dataset.view === viewType) btn.classList.add("active");
  });

  if (viewType === "single") {
    singleNav.style.display = "flex";
    currentIndex = 0;
    updateSingleView();
  } else {
    singleNav.style.display = "none";
    showMultipleView();
  }
}

[...topButtons, ...bottomButtons].forEach((btn) => {
  btn.addEventListener("click", () => {
    setActive(btn.dataset.view);
  });
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSingleView();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < transactions.length - 1) {
    currentIndex++;
    updateSingleView();
  }
});


