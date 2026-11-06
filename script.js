
const translations = {
  pl: {
    pageTitle: 'Symulacja Zysków z Oszczędności | Revolut',
    heading: 'Symulacja Zysków z Oszczędności',
    description: 'Ten kalkulator symuluje zyski z oszczędności w Revo Savings, gdzie odsetki naliczane są codziennie.<br>Wprowadź kwotę oszczędności, stawkę podatku oraz koszt utrzymania pozycji (np. koszt pozyczki), aby zobaczyć symulację.<br>Domyślne ustawienia odpowiadają ofercie Revo z 1-dniowym naliczaniem odsetek.',
    savingsLabel: '<i class="fas fa-wallet me-2 text-primary"></i>Kwota oszczędności (PLN):',
    taxRateLabel: '<i class="fas fa-percent me-2 text-primary"></i>Podatek od zysków (%):',
    positionCostLabel: '<i class="fas fa-money-bill-wave me-2 text-primary"></i>Koszt pozyskania/utrzymania pozycji (PLN/mies.):',
    lockPeriodLabel: '<i class="fas fa-calendar-alt me-2 text-primary"></i>Czas lokaty (dni):',
    billingLabel: 'Okres rozliczenia:',
    billingMonthly: 'Miesi\u0119cznie',
    billingAnnual: 'Rocznie (szacunek: 10 opłat)' ,

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
    recalculate: '<i class="fas fa-sync me-2"></i>Przelicz ponownie',
    resultsHeader: 'Wyniki symulacji',
    monthlyCostResultHeader: 'Koszt miesięczny (PLN)',
    periodCostHeader: 'Koszt za okres (PLN)',
    rateHeader: 'Oprocentowanie (%)',
    grossHeader: 'Zysk brutto (PLN)',
    grossCompoundHeader: 'Zysk brutto (PLN, kapitalizacja dzienna)',
    compoundLabel: 'Kapitalizacja dzienna',
    netHeader: 'Zysk netto (PLN)',
    profitHeader: 'Zysk końcowy (PLN)',
    editData: '<i class="fas fa-edit me-2"></i>Edytuj dane',
    downloadCsv: '<i class="fas fa-download me-2"></i>Pobierz CSV',
    comparePlans: '<i class="fas fa-link me-1"></i>Porównaj plany:',
    officialComparison: 'Oficjalne porównanie <i class="fas fa-external-link-alt ms-1 fa-xs"></i>',
    footerNote: '© 2026 Kalkulator Revo Savings',
    chartLabel: 'Zysk końcowy (PLN)',
    interestRate: 'Oprocentowanie',
    bestPlan: (plan, profit) => `<i class="fas fa-trophy me-2"></i>Najlepszy plan: <strong>${plan}</strong> (Zysk końcowy: <strong>${profit} PLN</strong>)`,
    allLosses: (plan, loss) => `<i class="fas fa-exclamation-triangle me-2"></i>Uwaga: Wszystkie plany generują straty. Najlepsza opcja: <strong>${plan}</strong> (Strata: <strong>${loss} PLN</strong>)`,
    assumptions: 'Symulacja przy stałej stopie i roku 365 dni, bez zaokrągleń dziennych i opóźnienia pierwszej wpłaty. Podatek odejmowany od łącznych odsetek. Koszty proporcjonalne do dni; wariant roczny szacowany jako 10 opłat miesięcznych za rok. Sprawdź cenę planu i własną stawkę w aplikacji.',
    invalidInput: 'Sprawdź liczby: dni 0–36500 (całkowite), podatek 0–100%, pozostałe wartości nieujemne; oprocentowanie do 100%.'
  },
  en: {
    pageTitle: 'Savings Profit Simulation | Revolut',
    heading: 'Savings Profit Simulation',
    description: 'This calculator simulates profits in Revo Savings where interest is calculated daily.<br>Enter the savings amount, tax rate and position cost (e.g. loan cost) to see the simulation.<br>Default settings reflect the Revo offer with daily interest.',
    savingsLabel: '<i class="fas fa-wallet me-2 text-primary"></i>Savings amount (PLN):',
    taxRateLabel: '<i class="fas fa-percent me-2 text-primary"></i>Tax on gains (%):',
    positionCostLabel: '<i class="fas fa-money-bill-wave me-2 text-primary"></i>Position cost (PLN/month):',
    lockPeriodLabel: '<i class="fas fa-calendar-alt me-2 text-primary"></i>Lock duration (days):',
    billingLabel: 'Billing period:',
    billingMonthly: 'Monthly',
    billingAnnual: 'Annually (estimate: 10 fees)' ,
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
    recalculate: '<i class="fas fa-sync me-2"></i>Recalculate',
    resultsHeader: 'Simulation Results',
    monthlyCostResultHeader: 'Monthly cost (PLN)',
    periodCostHeader: 'Cost for period (PLN)',
    rateHeader: 'Rate (%)',
    grossHeader: 'Gross interest (PLN)',
    grossCompoundHeader: 'Gross interest (PLN, daily compound)',
    compoundLabel: 'Daily compounding',
    netHeader: 'Net interest (PLN)',
    profitHeader: 'Final profit (PLN)',
    editData: '<i class="fas fa-edit me-2"></i>Edit data',
    downloadCsv: '<i class="fas fa-download me-2"></i>Download CSV',
    comparePlans: '<i class="fas fa-link me-1"></i>Compare plans:',
    officialComparison: 'Official comparison <i class="fas fa-external-link-alt ms-1 fa-xs"></i>',
    footerNote: '© 2026 Revo Savings Calculator',
    chartLabel: 'Final profit (PLN)',
    interestRate: 'Interest rate',
    bestPlan: (plan, profit) => `<i class="fas fa-trophy me-2"></i>Best plan: <strong>${plan}</strong> (Final profit: <strong>${profit} PLN</strong>)`,
    allLosses: (plan, loss) => `<i class="fas fa-exclamation-triangle me-2"></i>Warning: All plans yield losses. Best option: <strong>${plan}</strong> (Loss: <strong>${loss} PLN</strong>)`,
    assumptions: 'Estimate with a fixed rate and a 365-day year, without daily rounding or initial deposit settlement delay. Tax is deducted from total interest. Costs are prorated by day; annual billing is estimated as 10 monthly fees per year. Check your plan price and personal rate in the app.',
    invalidInput: 'Check numbers: whole days 0–36500, tax 0–100%, other values non-negative; interest up to 100%.'
  }
};

let currentLang = ['pl', 'en'].includes(localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'pl';
let ratesData = null;
let ratesEdited = false;

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
  updateGrossHeader();
  renderRatesStatus();
}

document.addEventListener('DOMContentLoaded', function () {
  const recalcButton = document.getElementById('recalculateBtn');
  if (recalcButton) {
    recalcButton.addEventListener('click', function () {
      // Update main form fields from the modify panel
      document.getElementById('savingsAmount').value = document.getElementById('savingsAmountModify').value;
      document.getElementById('taxRate').value = document.getElementById('taxRateModify').value;
      document.getElementById('positionCost').value = document.getElementById('positionCostModify').value;

      // Recalculate results
      showLoadingIndicator(recalcButton);
      setTimeout(calculateResults, 600);
    });
  }
  // Add event listener for form submission
  const simulationForm = document.getElementById('simulationForm');
  simulationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading indicator
    const submitButton = simulationForm.querySelector('button[type="submit"]');
    showLoadingIndicator(submitButton);

    // Simulate processing delay (for UX)
    setTimeout(calculateResults, 600);
  });

  // Add event listener for edit button
  document.getElementById('editFormBtn').addEventListener('click', function () {
    showSimulationForm();
  });
  document.getElementById('downloadCsv').addEventListener('click', downloadResultsCsv);

  // Sync numeric inputs with range sliders
  setupRangeSync('savingsAmount', 'savingsRange');
  setupRangeSync('lockPeriod', 'lockRange');
  setupRangeSync('savingsAmountModify', 'savingsModifyRange');
  setupRangeSync('lockPeriodModify', 'lockModifyRange');

  // Auto recalc when modify fields change
  ['savingsAmountModify', 'taxRateModify', 'positionCostModify', 'lockPeriodModify'].forEach(id => {
    document.getElementById(id).addEventListener('input', triggerAutoCalc);
  });
  ['savingsModifyRange', 'lockModifyRange'].forEach(id => {
    document.getElementById(id).addEventListener('input', triggerAutoCalc);
  });

  document.querySelectorAll('input[name="billingOption"]').forEach(el => {
    el.addEventListener('change', triggerAutoCalc);
  });
  document.querySelectorAll('input[name="billingOptionModify"]').forEach(el => {
    el.addEventListener('change', triggerAutoCalc);
  });

  document.getElementById('useCompoundInterest').addEventListener('change', () => {
    updateGrossHeader();
    triggerAutoCalc();
  });
  const compoundMod = document.getElementById('useCompoundInterestModify');
  if (compoundMod) {
    compoundMod.addEventListener('change', () => {
      updateGrossHeader();
      triggerAutoCalc();
    });
  }

  // Initialize any tooltips or popovers if needed
  initializeTooltips();

  // Language selector
  document.querySelectorAll('.lang-option').forEach(function (el) {
    el.addEventListener('click', function (e) {
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

  RevoRates.PLANS.forEach(plan => {
    document.getElementById(`rate${plan}`).addEventListener('input', () => {
      ratesEdited = true;
      renderRatesStatus();
      triggerAutoCalc();
    });
    document.getElementById(`cost${plan}`).addEventListener('input', triggerAutoCalc);
  });
  fetchLatestRates();
  setInterval(renderRatesStatus, 60000);
});

function renderRatesStatus() {
  const badge = document.getElementById('liveRatesBadge');
  const details = document.getElementById('ratesStatus');
  if (!badge || !details) return;
  const state = ratesEdited ? 'manual' : RevoRates.freshness(ratesData);
  const labels = currentLang === 'pl'
    ? { verified: 'Zweryfikowane', error: 'Weryfikacja nieudana', stale: 'Wymagają sprawdzenia', unverified: 'Niezweryfikowane', unavailable: 'Dane domyślne', manual: 'Własne stawki' }
    : { verified: 'Verified', error: 'Verification failed', stale: 'Check rates', unverified: 'Unverified', unavailable: 'Default rates', manual: 'Custom rates' };
  badge.className = `badge ${state === 'verified' ? 'bg-success' : 'bg-warning text-dark'} ms-2 fs-6 align-middle`;
  badge.textContent = labels[state];
  const formatDate = value => value ? new Date(value).toLocaleString(currentLang === 'pl' ? 'pl-PL' : 'en-GB', { timeZone: 'UTC' }) + ' UTC' : (currentLang === 'pl' ? 'brak potwierdzenia' : 'not confirmed');
  if (ratesEdited) {
    details.textContent = currentLang === 'pl' ? 'Symulacja korzysta z ręcznie zmienionych stawek.' : 'The simulation uses your manually edited rates.';
  } else if (ratesData) {
    const failed = ratesData.verificationStatus === 'error';
    const reason = /^http_\d{3}$/.test(ratesData.lastError || '') ? ` (HTTP ${ratesData.lastError.slice(5)})` : '';
    details.textContent = currentLang === 'pl'
      ? `${failed ? `Nie udało się sprawdzić źródła${reason}. Zachowano poprzednie stawki. ` : ''}Ostatnia skuteczna weryfikacja: ${formatDate(ratesData.lastVerifiedAt)}. Zapis/zmiana stawek: ${formatDate(ratesData.updatedAt)}.${ratesData.lastAttemptAt ? ` Ostatnia próba: ${formatDate(ratesData.lastAttemptAt)}.` : ''}`
      : `${failed ? `Source verification failed${reason}. Previous rates retained. ` : ''}Last successful verification: ${formatDate(ratesData.lastVerifiedAt)}. Rates saved/changed: ${formatDate(ratesData.updatedAt)}.${ratesData.lastAttemptAt ? ` Last attempt: ${formatDate(ratesData.lastAttemptAt)}.` : ''}`;
  } else {
    details.textContent = currentLang === 'pl'
      ? 'Nie potwierdzono świeżości danych. Używasz stawek domyślnych — sprawdź je w aplikacji Revolut.'
      : 'Data freshness is unconfirmed. Default rates are in use — check them in the Revolut app.';
  }
  badge.title = details.textContent;
}

async function fetchLatestRates() {
  try {
    const response = await fetch('rates.json', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`Rates file: HTTP ${response.status}`);
    const data = RevoRates.validateData(await response.json());
    ratesData = data;
    // A slow response must not overwrite a user's custom inputs.
    if (!ratesEdited) {
      RevoRates.PLANS.forEach(plan => {
        document.getElementById(`rate${plan}`).value = data.rates[plan].toFixed(2);
      });
      triggerAutoCalc();
    }
  } catch (error) {
    console.warn('Stored rates unavailable:', error.message);
  }
  renderRatesStatus();
}

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

function updateGrossHeader() {
  const header = document.getElementById('grossInterestHeader');
  if (!header) return;
  const useCompound = document.getElementById('useCompoundInterest').checked;
  const key = useCompound ? 'grossCompoundHeader' : 'grossHeader';
  header.innerHTML = translations[currentLang][key];
}

function calculateResults() {
  // Hide previous error message
  const errorEl = document.getElementById('inputError');
  if (errorEl) errorEl.classList.add('d-none');

  // Pobierz dane wejściowe
  const savingsInput = document.getElementById('savingsAmount');
  const taxRateInput = document.getElementById('taxRate');
  const positionCostInput = document.getElementById('positionCost');
  const lockPeriodInput = document.getElementById('lockPeriod');

  let savings = parseFloat(savingsInput.value);
  let taxRate = parseFloat(taxRateInput.value);
  let positionCost = parseFloat(positionCostInput.value);
  let lockPeriod = parseFloat(lockPeriodInput.value);

  // Basic validation & user feedback
  let invalid = false;
  [savingsInput, taxRateInput, positionCostInput, lockPeriodInput].forEach(el => el.classList.remove('is-invalid'));
  if (!Number.isFinite(savings) || savings < 0) {
    savingsInput.classList.add('is-invalid');
    invalid = true;
  }
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
    taxRateInput.classList.add('is-invalid');
    invalid = true;
  }
  if (!Number.isFinite(positionCost) || positionCost < 0) {
    positionCostInput.classList.add('is-invalid');
    invalid = true;
  }
  if (!Number.isInteger(lockPeriod) || lockPeriod < 0 || lockPeriod > 36500) {
    lockPeriodInput.classList.add('is-invalid');
    invalid = true;
  }

  if (invalid) {
    if (errorEl) {
      errorEl.textContent = translations[currentLang].invalidInput;
      errorEl.classList.remove('d-none');
    }
    hideLoadingIndicator();
    return;
  }

  const compound = document.getElementById('useCompoundInterest').checked;
  const billingOption = document.querySelector('input[name="billingOption"]:checked').value;

  // Pobierz dane dla poszczególnych planów
  const plans = [
    { planName: 'Standard', cost: parseFloat(document.getElementById('costStandard').value), rate: parseFloat(document.getElementById('rateStandard').value) },
    { planName: 'Plus (19,99)', cost: parseFloat(document.getElementById('costPlus').value), rate: parseFloat(document.getElementById('ratePlus').value) },
    { planName: 'Premium (33,99)', cost: parseFloat(document.getElementById('costPremium').value), rate: parseFloat(document.getElementById('ratePremium').value) },
    { planName: 'Metal (55,99)', cost: parseFloat(document.getElementById('costMetal').value), rate: parseFloat(document.getElementById('rateMetal').value) },
    { planName: 'Ultra (260)', cost: parseFloat(document.getElementById('costUltra').value), rate: parseFloat(document.getElementById('rateUltra').value) }
  ];

  let results;
  try {
    results = plans.map(plan => {
      const result = RevoRates.calculatePlan({ principal: savings, annualRate: plan.rate, days: lockPeriod,
        taxRate, monthlyPlanCost: plan.cost, positionCost, annualBilling: billingOption === 'annual', compound });
      return { plan: plan.planName, rate: plan.rate.toFixed(2),
        ...Object.fromEntries(Object.entries(result).map(([key, value]) => [key, value.toFixed(2)])) };
    });
  } catch (error) {
    errorEl.textContent = translations[currentLang].invalidInput;
    errorEl.classList.remove('d-none');
    hideLoadingIndicator();
    return;
  }

  // Wyznacz najlepszy plan (najwyższy zysk końcowy)
  let bestPlan = results[0];
  results.forEach(function (r) {
    if (parseFloat(r.profitAfterCost) > parseFloat(bestPlan.profitAfterCost)) {
      bestPlan = r;
    }
  });

  // Hide loading indicator
  hideLoadingIndicator();

  updateGrossHeader();

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
  document.getElementById('savingsModifyRange').value = document.getElementById('savingsRange').value;
  document.getElementById('lockModifyRange').value = document.getElementById('lockRange').value;
  const compoundMod = document.getElementById('useCompoundInterestModify');
  if (compoundMod) {
    compoundMod.checked = document.getElementById('useCompoundInterest').checked;
  }
  const billingModAnnual = document.getElementById('billingAnnualModify');
  const billingModMonthly = document.getElementById('billingMonthlyModify');
  if (billingModAnnual && billingModMonthly) {
    const billingMain = document.querySelector('input[name="billingOption"]:checked').value;
    billingModAnnual.checked = billingMain === 'annual';
    billingModMonthly.checked = billingMain === 'monthly';
  }
}

function populateResultsTable(results, bestPlan) {
  let tableBody = document.getElementById('resultTableBody');
  tableBody.innerHTML = "";

  results.forEach(function (r) {
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
            afterLabel: function (context) {
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

  setTimeout(function () {
    simSection.classList.add('d-none'); // hide simulation section
    resSection.classList.remove('d-none'); // show results section

    // Delay to allow DOM update before fade-in
    setTimeout(function () {
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

  setTimeout(function () {
    resSection.classList.add('d-none');
    simSection.classList.remove('d-none');
    simSection.classList.remove('fade-out');

    // Delay to allow DOM update before fade-in
    setTimeout(function () {
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


function syncModifyToMain() {
  document.getElementById('savingsAmount').value = document.getElementById('savingsAmountModify').value;
  document.getElementById('taxRate').value = document.getElementById('taxRateModify').value;
  document.getElementById('positionCost').value = document.getElementById('positionCostModify').value;
  document.getElementById('lockPeriod').value = document.getElementById('lockPeriodModify').value;
  document.getElementById('savingsRange').value = document.getElementById('savingsModifyRange').value;
  document.getElementById('lockRange').value = document.getElementById('lockModifyRange').value;
  const compoundMod = document.getElementById('useCompoundInterestModify');
  if (compoundMod) {
    document.getElementById('useCompoundInterest').checked = compoundMod.checked;
  }
  const billingModVal = document.querySelector('input[name="billingOptionModify"]:checked');
  if (billingModVal) {
    document.getElementById('billingAnnual').checked = billingModVal.value === 'annual';
    document.getElementById('billingMonthly').checked = billingModVal.value === 'monthly';
  }
}

function triggerAutoCalc() {
  if (!document.getElementById('resultSection').classList.contains('d-none')) {
    syncModifyToMain();
    calculateResults();
  }
}

function escapeCsvValue(value) {
  const needsQuotes = /[",\n]/.test(value);
  let escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

function downloadResultsCsv() {
  const table = document.querySelector('.result-table');
  if (!table) return;
  const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  if (rows.length === 0) return;

  let csv = headers.map(escapeCsvValue).join(',') + '\n';
  rows.forEach(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(td => escapeCsvValue(td.textContent.trim()));
    csv += cells.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'results.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
