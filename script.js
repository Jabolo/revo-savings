document.getElementById('simulationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Pobierz dane wejściowe
  const savings = parseFloat(document.getElementById('savingsAmount').value);
  const taxRate = parseFloat(document.getElementById('taxRate').value);
  
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
    const annualCost = plan.cost * 12;
    const grossInterest = savings * (plan.rate / 100);
    const netInterest = grossInterest * (1 - taxRate / 100);
    const profitAfterCost = netInterest - annualCost;
    
    results.push({
      plan: plan.planName,
      monthlyCost: plan.cost.toFixed(2),
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
  
  // Wypełnij tabelę wyników
  let tableBody = document.getElementById('resultTableBody');
  tableBody.innerHTML = "";
  results.forEach(function(r) {
    let row = document.createElement('tr');
    // Wyróżnij najlepszy plan
    if (r.plan === bestPlan.plan) {
      row.classList.add('best-plan');
    }
    
    row.innerHTML = `
      <td>${r.plan}</td>
      <td>${r.monthlyCost}</td>
      <td>${r.annualCost}</td>
      <td>${r.rate}</td>
      <td>${r.grossInterest}</td>
      <td>${r.netInterest}</td>
      <td>${r.profitAfterCost}</td>
    `;
    tableBody.appendChild(row);
  });
  
  // Wyświetl informację o najlepszym planie
  document.getElementById('bestPlan').innerText = 
    "Najlepszy plan: " + bestPlan.plan + " (Zysk końcowy: " + bestPlan.profitAfterCost + " PLN)";
  
  // UI/UX: Hide the simulation form and show results with smooth transitions
  const simSection = document.getElementById('simulationSection');
  const resSection = document.getElementById('resultSection');
  
  // Fade out the simulation form
  simSection.classList.add('fade-out');
  setTimeout(function() {
    simSection.classList.add('d-none'); // hide simulation section
    resSection.classList.remove('d-none'); // show results section
    resSection.classList.add('fade-in');
    // Scroll to the results section
    resSection.scrollIntoView({ behavior: 'smooth' });
  }, 300);
});

document.getElementById('editFormBtn').addEventListener('click', function() {
  // Show simulation form again, hide results with smooth transitions
  const simSection = document.getElementById('simulationSection');
  const resSection = document.getElementById('resultSection');
  
  // Fade out results section
  resSection.classList.add('fade-out');
  setTimeout(function() {
    resSection.classList.add('d-none');
    simSection.classList.remove('d-none');
    simSection.classList.add('fade-in');
    // Scroll back to the simulation form
    simSection.scrollIntoView({ behavior: 'smooth' });
  }, 300);
});