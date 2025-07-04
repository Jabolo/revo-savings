
const translations = {
  pl: {
    pageTitle: 'Symulacja Zysków z Oszczędności | Revolut',
    heading: 'Symulacja Zysków z Oszczędności',
    description: 'Ten kalkulator symuluje zyski z oszczędności w Revo Savings, gdzie odsetki naliczane są codziennie.<br>Wprowadź kwotę oszczędności, stawkę podatku oraz koszt utrzymania pozycji (np. koszt pozyczki), aby zobaczyć symulację.<br>Domyślne ustawienia odpowiadają ofercie Revo z 1-dniowym naliczaniem odsetek.',
    savingsLabel: '<i class="fas fa-wallet me-2 text-primary"></i>Kwota oszczędności (PLN):',
    taxRateLabel: '<i class="fas fa-percent me-2 text-primary"></i>Podatek od zysków (%):',
    positionCostLabel: '<i class="fas fa-money-bill-wave me-2 text-primary"></i>Koszt pozyskania/utrzymania pozycji (PLN/mies.):',
    lockPeriodLabel: '<i class="fas fa-calendar-alt me-2 text-primary"></i>Czas lokaty (dni):',
    capitalPercentLabel: '<i class="fas fa-chart-pie me-2 text-primary"></i>Kapitał pracujący:',
    interestPercentLabel: '<i class="fas fa-clock me-2 text-primary"></i>Dni naliczania odsetek (%):',
    showPlans: 'Pokaż szczegóły planów oszczędności',
    plansHeader: 'Plany Oszczędności w Revo',
    planHeader: 'Plan',
    monthlyCostHeader: 'Miesięczny koszt (PLN)',
    annualRateHeader: 'Oprocentowanie roczne (%)',
    calcButton: '<i class="fas fa-calculator me-2"></i>Oblicz',
    calcLoading: '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Obliczanie...',
    modifyParams: 'Modyfikuj parametry symulacji',
    savingsLabelMod: 'Kwota oszczędności (PLN):',
    taxRateLabelMod: 'Podatek od zysków (%):',
    positionCostLabelMod: 'Koszt pozyskania/utrzymania pozycji (PLN/mies.):',
    lockPeriodLabelMod: 'Czas lokaty (dni):',
    capitalPercentLabelMod: 'Kapitał pracujący:',
    interestPercentLabelMod: 'Dni naliczania odsetek (%):',
    recalculate: '<i class="fas fa-sync me-2"></i>Przelicz ponownie',
    resultsHeader: 'Wyniki symulacji',
    monthlyCostResultHeader: 'Koszt miesięczny (PLN)',
    periodCostHeader: 'Koszt za okres (PLN)',
    rateHeader: 'Oprocentowanie (%)',
    grossHeader: 'Zysk brutto (PLN)',
    netHeader: 'Zysk netto (PLN)',
    profitHeader: 'Zysk końcowy (PLN)',
    editData: '<i class="fas fa-edit me-2"></i>Edytuj dane',
    comparePlans: '<i class="fas fa-link me-1"></i>Porównaj plany:',
    officialComparison: 'Oficjalne porównanie <i class="fas fa-external-link-alt ms-1 fa-xs"></i>',
    footerNote: '© 2025 Kalkulator Revo Savings',
    chartLabel: 'Zysk końcowy (PLN)',
    interestRate: 'Oprocentowanie',
    bestPlan: (plan, profit) => `<i class="fas fa-trophy me-2"></i>Najlepszy plan: <strong>${plan}</strong> (Zysk końcowy: <strong>${profit} PLN</strong>)`,
    allLosses: (plan, loss) => `<i class="fas fa-exclamation-triangle me-2"></i>Uwaga: Wszystkie plany generują straty. Najlepsza opcja: <strong>${plan}</strong> (Strata: <strong>${loss} PLN</strong>)`
  },
  en: {
    pageTitle: 'Savings Profit Simulation | Revolut',
    heading: 'Savings Profit Simulation',
    description: 'This calculator simulates profits in Revo Savings where interest is calculated daily.<br>Enter the savings amount, tax rate and position cost (e.g. loan cost) to see the simulation.<br>Default settings reflect the Revo offer with daily interest.',
    savingsLabel: '<i class="fas fa-wallet me-2 text-primary"></i>Savings amount (PLN):',
    taxRateLabel: '<i class="fas fa-percent me-2 text-primary"></i>Tax on gains (%):',
    positionCostLabel: '<i class="fas fa-money-bill-wave me-2 text-primary"></i>Position cost (PLN/month):',
    lockPeriodLabel: '<i class="fas fa-calendar-alt me-2 text-primary"></i>Lock duration (days):',
    capitalPercentLabel: '<i class="fas fa-chart-pie me-2 text-primary"></i>Working capital:',
    interestPercentLabel: '<i class="fas fa-clock me-2 text-primary"></i>Interest days (%):',
    showPlans: 'Show savings plan details',
    plansHeader: 'Revo Savings Plans',
    planHeader: 'Plan',
    monthlyCostHeader: 'Monthly cost (PLN)',
    annualRateHeader: 'Annual rate (%)',
    calcButton: '<i class="fas fa-calculator me-2"></i>Calculate',
    calcLoading: '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Calculating...',
    modifyParams: 'Modify simulation parameters',
    savingsLabelMod: 'Savings amount (PLN):',
    taxRateLabelMod: 'Tax on gains (%):',
    positionCostLabelMod: 'Position cost (PLN/month):',
    lockPeriodLabelMod: 'Lock duration (days):',
    capitalPercentLabelMod: 'Working capital:',
    interestPercentLabelMod: 'Interest days (%):',
    recalculate: '<i class="fas fa-sync me-2"></i>Recalculate',
    resultsHeader: 'Simulation Results',
    monthlyCostResultHeader: 'Monthly cost (PLN)',
    periodCostHeader: 'Cost for period (PLN)',
    rateHeader: 'Rate (%)',
    grossHeader: 'Gross interest (PLN)',
    netHeader: 'Net interest (PLN)',
    profitHeader: 'Final profit (PLN)',
    editData: '<i class="fas fa-edit me-2"></i>Edit data',
    comparePlans: '<i class="fas fa-link me-1"></i>Compare plans:',
    officialComparison: 'Official comparison <i class="fas fa-external-link-alt ms-1 fa-xs"></i>',
    footerNote: '© 2025 Revo Savings Calculator',
    chartLabel: 'Final profit (PLN)',
    interestRate: 'Interest rate',
    bestPlan: (plan, profit) => `<i class="fas fa-trophy me-2"></i>Best plan: <strong>${plan}</strong> (Final profit: <strong>${profit} PLN</strong>)`,
    allLosses: (plan, loss) => `<i class="fas fa-exclamation-triangle me-2"></i>Warning: All plans yield losses. Best option: <strong>${plan}</strong> (Loss: <strong>${loss} PLN</strong>)`
  }
};

let currentLang = localStorage.getItem('lang') || 'pl';

function applyTranslations() {
  const t = translations[currentLang];
  document.documentElement.lang = currentLang;
  document.querySelector('[data-i18n="pageTitle"]').innerHTML = t.pageTitle;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!t[key]) return;
    if (el.tagName === 'INPUT' && el.type !== 'submit') {
      el.placeholder = t[key];
    } else {
      el.innerHTML = t[key];
    }
  });
  document.getElementById('langDropdown').textContent = currentLang.toUpperCase();
}

document.addEventListener('DOMContentLoaded', function() {
  const recalcButton = document.getElementById('recalculateBtn');
  recalcButton.addEventListener('click', function() {
    syncModifyToMain();
    showLoadingIndicator(recalcButton);
    setTimeout(calculateResults, 600);
  });
  // Add event listener for form submission
  const simulationForm = document.getElementById('simulationForm');
  simulationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading indicator
    const submitButton = simulationForm.querySelector('button[type="submit"]');
    showLoadingIndicator(submitButton);
    
    // Simulate processing delay (for UX)
    setTimeout(calculateResults, 600);
  });
  
  // Add event listener for edit button
  document.getElementById('editFormBtn').addEventListener('click', function() {
    showSimulationForm();
  });

  // Sync numeric inputs with range sliders
  setupRangeSync('capitalInput', 'capitalRange');
  setupRangeSync('interestInput', 'interestRange');
  setupRangeSync('capitalModifyInput', 'capitalModifyRange');
  setupRangeSync('interestModifyInput', 'interestModifyRange');
  updateCapitalRange('capitalInput', 'capitalRange', document.getElementById('capitalMode').value);
  updateCapitalRange('capitalModifyInput', 'capitalModifyRange', document.getElementById('capitalModifyMode').value);

  // Update range settings when capital mode changes
  document.getElementById('capitalMode').addEventListener('change', function() {
    updateCapitalRange('capitalInput', 'capitalRange', this.value);
    triggerAutoCalc();
  });
  document.getElementById('capitalModifyMode').addEventListener('change', function() {
    updateCapitalRange('capitalModifyInput', 'capitalModifyRange', this.value);
    triggerAutoCalc();
  });

  // Auto recalc when modify fields change
  ['savingsAmountModify','taxRateModify','positionCostModify','lockPeriodModify','capitalModifyInput','interestModifyInput'].forEach(id => {
    document.getElementById(id).addEventListener('input', triggerAutoCalc);
  });
  ['capitalModifyRange','interestModifyRange'].forEach(id => {
    document.getElementById(id).addEventListener('input', triggerAutoCalc);
  });
  
  // Initialize any tooltips or popovers if needed
  initializeTooltips();

  // Language selector
  document.querySelectorAll('.lang-option').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      currentLang = el.getAttribute('data-lang');
      localStorage.setItem('lang', currentLang);
      applyTranslations();
      if (!document.getElementById('resultSection').classList.contains('d-none')) {
        calculateResults();
      }
    });
  });

  applyTranslations();
});

let loadingButton = null;

function showLoadingIndicator(targetButton) {
  loadingButton = targetButton || document.querySelector('#simulationForm button[type="submit"]');
  loadingButton.innerHTML = translations[currentLang].calcLoading;
  loadingButton.disabled = true;
}

function hideLoadingIndicator() {
  const button = loadingButton || document.querySelector('#simulationForm button[type="submit"]');
  button.innerHTML = translations[currentLang].calcButton;
  button.disabled = false;
  loadingButton = null;
}

function calculateResults() {
  // Pobierz dane wejściowe
  const savings = parseFloat(document.getElementById('savingsAmount').value);
  const taxRate = parseFloat(document.getElementById('taxRate').value);
  const positionCost = parseFloat(document.getElementById('positionCost').value); // New field
  const lockPeriod = parseFloat(document.getElementById('lockPeriod').value);
  const capitalMode = document.getElementById('capitalMode').value;
  const capitalValue = parseFloat(document.getElementById('capitalInput').value);
  const capitalPercent = capitalMode === 'days' ? (capitalValue / 30) : (capitalValue / 100);
  const interestPercent = parseFloat(document.getElementById('interestInput').value) / 100;

  // Pobierz dane dla poszczególnych planów
  const plans = [
    { planName: 'Standard', cost: parseFloat(document.getElementById('costStandard').value), rate: parseFloat(document.getElementById('rateStandard').value) },
    { planName: 'Plus (19,99)', cost: parseFloat(document.getElementById('costPlus').value), rate: parseFloat(document.getElementById('ratePlus').value) },
    { planName: 'Premium (33,33)', cost: parseFloat(document.getElementById('costPremium').value), rate: parseFloat(document.getElementById('ratePremium').value) },
    { planName: 'Metal (55,99)', cost: parseFloat(document.getElementById('costMetal').value), rate: parseFloat(document.getElementById('rateMetal').value) },
    { planName: 'Ultra (210)', cost: parseFloat(document.getElementById('costUltra').value), rate: parseFloat(document.getElementById('rateUltra').value) }
  ];

  let results = [];

  // Obliczenia dla każdego planu
  plans.forEach(function(plan) {
    const totalMonthlyCost = plan.cost + positionCost; // includes position cost
    const periodCost = totalMonthlyCost * (lockPeriod / 30);
    const grossInterest = savings * capitalPercent * (plan.rate / 100) * (lockPeriod / 365) * interestPercent;
    const netInterest = grossInterest * (1 - taxRate / 100);
    const profitAfterCost = netInterest - periodCost;

    results.push({
      plan: plan.planName,
      monthlyCost: totalMonthlyCost.toFixed(2),
      periodCost: periodCost.toFixed(2),
      rate: plan.rate.toFixed(2),
      grossInterest: grossInterest.toFixed(2),
      netInterest: netInterest.toFixed(2),
      profitAfterCost: profitAfterCost.toFixed(2)
    });
  });

  // Wyznacz najlepszy plan (najwyższy zysk końcowy)
  let bestPlan = results[0];
  results.forEach(function(r) {
    if (parseFloat(r.profitAfterCost) > parseFloat(bestPlan.profitAfterCost)) {
      bestPlan = r;
    }
  });

  // Hide loading indicator
  hideLoadingIndicator();

  // Wypełnij tabelę wyników
  populateResultsTable(results, bestPlan);

  // Create chart visualization
  createProfitChart(results);

  // Show results section
  showResultsSection();

  // Populate the modify panel fields with current values
  document.getElementById('savingsAmountModify').value = document.getElementById('savingsAmount').value;
  document.getElementById('taxRateModify').value = document.getElementById('taxRate').value;
  document.getElementById('positionCostModify').value = document.getElementById('positionCost').value;
  document.getElementById('lockPeriodModify').value = document.getElementById('lockPeriod').value;
  document.getElementById('capitalModifyInput').value = document.getElementById('capitalInput').value;
  document.getElementById('capitalModifyMode').value = document.getElementById('capitalMode').value;
  document.getElementById('capitalModifyRange').value = document.getElementById('capitalRange').value;
  document.getElementById('interestModifyInput').value = document.getElementById('interestInput').value;
  document.getElementById('interestModifyRange').value = document.getElementById('interestRange').value;
}

function populateResultsTable(results, bestPlan) {
  let tableBody = document.getElementById('resultTableBody');
  tableBody.innerHTML = "";
  
  results.forEach(function(r) {
    let row = document.createElement('tr');
    // Wyróżnij najlepszy plan
    if (r.plan === bestPlan.plan) {
      row.classList.add('best-plan');
    }
    
    // Format profit value with color and icon
    const profitClass = parseFloat(r.profitAfterCost) >= 0 ? 'positive-profit' : 'negative-profit';
    const profitIcon = parseFloat(r.profitAfterCost) >= 0 ? 
      '<i class="fas fa-arrow-up text-success me-1"></i>' : 
      '<i class="fas fa-arrow-down text-danger me-1"></i>';
    
    row.innerHTML = `
      <td class="fw-medium">${r.plan}</td>
      <td>${r.monthlyCost} PLN</td>
      <td>${r.periodCost} PLN</td>
      <td class="rate-cell">${r.rate}%</td>
      <td>${r.grossInterest} PLN</td>
      <td>${r.netInterest} PLN</td>
      <td class="profit-value ${profitClass}">${profitIcon}${r.profitAfterCost} PLN</td>
    `;
    tableBody.appendChild(row);
  });
  
  // Set best plan message with icon
  const profitAmount = parseFloat(bestPlan.profitAfterCost);
  const profitIcon = profitAmount >= 0 ? 
    '<i class="fas fa-trophy me-2"></i>' : 
    '<i class="fas fa-exclamation-triangle me-2"></i>';
  
  const bestPlanMessage = profitAmount >= 0 ?
    translations[currentLang].bestPlan(bestPlan.plan, bestPlan.profitAfterCost) :
    translations[currentLang].allLosses(bestPlan.plan, bestPlan.profitAfterCost);
  
  document.getElementById('bestPlan').innerHTML = bestPlanMessage;
}

function createProfitChart(results) {
  // Get the canvas element
  const ctx = document.getElementById('profitChart').getContext('2d');
  
  // Destroy previous chart if exists
  if (window.profitChart instanceof Chart) {
    window.profitChart.destroy();
  }
  
  // Prepare data for chart
  const labels = results.map(r => r.plan);
  const profitData = results.map(r => parseFloat(r.profitAfterCost));
  const interestRates = results.map(r => parseFloat(r.rate));
  
  // Determine colors based on profit values
  const backgroundColors = profitData.map(value => 
    value >= 0 ? 'rgba(6, 102, 235, 0.6)' : 'rgba(220, 53, 69, 0.6)'
  );
  
  const borderColors = profitData.map(value => 
    value >= 0 ? 'rgba(6, 102, 235, 1)' : 'rgba(220, 53, 69, 1)'
  );
  
  window.profitChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: translations[currentLang].chartLabel,
        data: profitData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const idx = context.dataIndex;
              return `${translations[currentLang].interestRate}: ${interestRates[idx]}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function showResultsSection() {
  const simSection = document.getElementById('simulationSection');
  const resSection = document.getElementById('resultSection');
  
  // Fade out the simulation form
  simSection.classList.add('fade-out');
  
  setTimeout(function() {
    simSection.classList.add('d-none'); // hide simulation section
    resSection.classList.remove('d-none'); // show results section
    
    // Delay to allow DOM update before fade-in
    setTimeout(function() {
      resSection.classList.add('fade-in');
      // Scroll to the results section
      resSection.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, 400);
}

function showSimulationForm() {
  // Show simulation form again, hide results with smooth transitions
  const simSection = document.getElementById('simulationSection');
  const resSection = document.getElementById('resultSection');
  
  // Fade out results section
  resSection.classList.remove('fade-in');
  resSection.classList.add('fade-out');
  
  setTimeout(function() {
    resSection.classList.add('d-none');
    simSection.classList.remove('d-none');
    simSection.classList.remove('fade-out');
    
    // Delay to allow DOM update before fade-in
    setTimeout(function() {
      simSection.classList.add('fade-in');
      // Scroll back to the simulation form
      simSection.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, 400);
}

function initializeTooltips() {
  // Any tooltips initialization can go here if needed
  // For example, if using Bootstrap's tooltips:
  // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  //   return new bootstrap.Tooltip(tooltipTriggerEl)
  // })
}

function setupRangeSync(inputId, rangeId) {
  const input = document.getElementById(inputId);
  const range = document.getElementById(rangeId);
  if (!input || !range) return;
  range.value = input.value;
  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      const min = parseFloat(range.min);
      const max = parseFloat(range.max);
      range.value = Math.min(Math.max(val, min), max);
    }
  });
  range.addEventListener('input', () => {
    input.value = range.value;
  });
}

function updateCapitalRange(inputId, rangeId, mode) {
  const input = document.getElementById(inputId);
  const range = document.getElementById(rangeId);
  if (!input || !range) return;
  if (mode === 'days') {
    range.min = 0;
    range.max = 30;
    range.step = 1;
    input.value = ((parseFloat(input.value) || 0) / 100 * 30).toFixed(1);
  } else {
    range.min = 0;
    range.max = 100;
    range.step = 0.1;
    input.value = ((parseFloat(input.value) || 0) / 30 * 100).toFixed(1);
  }
  range.value = Math.min(Math.max(parseFloat(input.value), range.min), range.max);
}

function syncModifyToMain() {
  document.getElementById('savingsAmount').value = document.getElementById('savingsAmountModify').value;
  document.getElementById('taxRate').value = document.getElementById('taxRateModify').value;
  document.getElementById('positionCost').value = document.getElementById('positionCostModify').value;
  document.getElementById('lockPeriod').value = document.getElementById('lockPeriodModify').value;
  document.getElementById('capitalInput').value = document.getElementById('capitalModifyInput').value;
  document.getElementById('capitalMode').value = document.getElementById('capitalModifyMode').value;
  document.getElementById('capitalRange').value = document.getElementById('capitalModifyRange').value;
  document.getElementById('interestInput').value = document.getElementById('interestModifyInput').value;
  document.getElementById('interestRange').value = document.getElementById('interestModifyRange').value;
  updateCapitalRange('capitalInput', 'capitalRange', document.getElementById('capitalMode').value);
}

function triggerAutoCalc() {
  if (!document.getElementById('resultSection').classList.contains('d-none')) {
    syncModifyToMain();
    calculateResults();
  }
}
