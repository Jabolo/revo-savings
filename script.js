document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for form submission
  document.getElementById('simulationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading indicator
    showLoadingIndicator();
    
    // Simulate processing delay (for UX)
    setTimeout(calculateResults, 600);
  });
  
  // Add event listener for edit button
  document.getElementById('editFormBtn').addEventListener('click', function() {
    showSimulationForm();
  });
  
  // Initialize any tooltips or popovers if needed
  initializeTooltips();
});

function showLoadingIndicator() {
  const button = document.querySelector('#simulationForm button[type="submit"]');
  button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Obliczanie...';
  button.disabled = true;
}

function hideLoadingIndicator() {
  const button = document.querySelector('#simulationForm button[type="submit"]');
  button.innerHTML = '<i class="fas fa-calculator me-2"></i>Oblicz';
  button.disabled = false;
}

function calculateResults() {
  // Pobierz dane wejściowe
  const savings = parseFloat(document.getElementById('savingsAmount').value);
  const taxRate = parseFloat(document.getElementById('taxRate').value);
  const positionCost = parseFloat(document.getElementById('positionCost').value); // Now fetching position cost

  // Pobierz dane dla poszczególnych planów
  const plans = [
    { planName: 'Standard', cost: parseFloat(document.getElementById('costStandard').value), rate: parseFloat(document.getElementById('rateStandard').value) },
    { planName: 'Plus (19,99)', cost: parseFloat(document.getElementById('costPlus1').value), rate: parseFloat(document.getElementById('ratePlus1').value) },
    { planName: 'Premium (33,33)', cost: parseFloat(document.getElementById('costPremium').value), rate: parseFloat(document.getElementById('ratePremium').value) },
    { planName: 'Plus (55,99)', cost: parseFloat(document.getElementById('costPlus2').value), rate: parseFloat(document.getElementById('ratePlus2').value) },
    { planName: 'Plus (210)', cost: parseFloat(document.getElementById('costPlus3').value), rate: parseFloat(document.getElementById('ratePlus3').value) }
  ];

  let results = [];

  // Obliczenia dla każdego planu
  plans.forEach(function(plan) {
    const totalMonthlyCost = plan.cost + positionCost; // Now includes position cost
    const annualCost = totalMonthlyCost * 12;
    const grossInterest = savings * (plan.rate / 100);
    const netInterest = grossInterest * (1 - taxRate / 100);
    const profitAfterCost = netInterest - annualCost;

    results.push({
      plan: plan.planName,
      monthlyCost: totalMonthlyCost.toFixed(2), // Updated monthly cost
      annualCost: annualCost.toFixed(2),
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
      <td>${r.annualCost} PLN</td>
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
    `${profitIcon}Najlepszy plan: <strong>${bestPlan.plan}</strong> (Zysk końcowy: <strong>${bestPlan.profitAfterCost} PLN</strong>)` :
    `${profitIcon}Uwaga: Wszystkie plany generują straty. Najlepsza opcja: <strong>${bestPlan.plan}</strong> (Strata: <strong>${bestPlan.profitAfterCost} PLN</strong>)`;
  
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
        label: 'Zysk końcowy (PLN)',
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
              return `Oprocentowanie: ${interestRates[idx]}%`;
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