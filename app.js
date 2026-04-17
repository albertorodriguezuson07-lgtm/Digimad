// =====================================================
// DigiMad — App logic
// TFG UCAM 2026 — Alberto Rodríguez Usón
// =====================================================

let allQuestions = [];
let currentQuestion = 0;
let answers = {};
let radarChart = null;

// Build flat questions list with metadata
function buildQuestions() {
  allQuestions = [];
  DIMENSIONS.forEach((dim, dimIdx) => {
    dim.questions.forEach((q, qIdx) => {
      allQuestions.push({
        ...q,
        dimensionId: dim.id,
        dimensionName: dim.name,
        dimensionIcon: dim.icon,
        dimensionIdx: dimIdx,
        questionIdxInDim: qIdx,
        globalIdx: allQuestions.length
      });
    });
  });
}

function startAssessment() {
  buildQuestions();
  document.getElementById('intro').classList.add('hidden');
  document.querySelector('.hero').classList.add('hidden');
  document.getElementById('assessment').classList.remove('hidden');
  currentQuestion = 0;
  answers = {};
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
  const q = allQuestions[currentQuestion];
  const container = document.getElementById('questionContainer');
  const dim = DIMENSIONS[q.dimensionIdx];

  // Update progress
  document.getElementById('currentDimension').textContent = `Dimensión ${q.dimensionIdx + 1} de ${DIMENSIONS.length}`;
  document.getElementById('currentDimensionName').textContent = `${q.dimensionIcon} ${q.dimensionName}`;

  const totalQuestions = allQuestions.length;
  const percent = Math.round((currentQuestion / totalQuestions) * 100);
  document.getElementById('progressFill').style.width = percent + '%';
  document.getElementById('progressPercent').textContent = `Pregunta ${currentQuestion + 1} de ${totalQuestions} (${percent}%)`;

  // Render question
  const selected = answers[q.globalIdx];
  let optionsHtml = q.options.map((opt, idx) => `
    <div class="option ${selected === idx ? 'selected' : ''}" onclick="selectOption(${idx})">
      <div class="option-radio"></div>
      <div class="option-text">${opt.text}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="question-card">
      <div class="question-number">Pregunta ${currentQuestion + 1} de ${totalQuestions}</div>
      <h2 class="question-text">${q.text}</h2>
      <p class="question-help">${q.help}</p>
      <div class="options">${optionsHtml}</div>
    </div>
  `;

  // Update navigation buttons
  document.getElementById('prevBtn').disabled = currentQuestion === 0;
  document.getElementById('nextBtn').disabled = answers[q.globalIdx] === undefined;

  if (currentQuestion === totalQuestions - 1) {
    document.getElementById('nextBtn').innerHTML = 'Ver resultados →';
  } else {
    document.getElementById('nextBtn').innerHTML = 'Siguiente →';
  }
}

function selectOption(idx) {
  const q = allQuestions[currentQuestion];
  answers[q.globalIdx] = idx;
  renderQuestion();
}

function nextQuestion() {
  if (currentQuestion < allQuestions.length - 1) {
    currentQuestion++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    showResults();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// =====================================================
// SCORING
// =====================================================
function calculateScores() {
  const dimensionScores = {};
  DIMENSIONS.forEach(dim => {
    let dimScore = 0;
    let dimMaxScore = 0;
    dim.questions.forEach((q, qIdx) => {
      const globalIdx = allQuestions.findIndex(aq => aq.dimensionId === dim.id && aq.questionIdxInDim === qIdx);
      const selectedIdx = answers[globalIdx];
      if (selectedIdx !== undefined) {
        dimScore += q.options[selectedIdx].score;
      }
      dimMaxScore += 3;
    });
    dimensionScores[dim.id] = {
      score: dimScore,
      maxScore: dimMaxScore,
      percent: Math.round((dimScore / dimMaxScore) * 100)
    };
  });

  // Global score: average of percentages (normalized 0-100)
  const globalPercent = Math.round(
    Object.values(dimensionScores).reduce((sum, d) => sum + d.percent, 0) / DIMENSIONS.length
  );

  return { dimensions: dimensionScores, global: globalPercent };
}

function getMaturityLevel(globalScore) {
  return MATURITY_LEVELS.find(l => globalScore >= l.min && globalScore <= l.max);
}

function getPriorities(dimensionScores) {
  // Sort dimensions by lowest score (most need improvement)
  const sorted = DIMENSIONS
    .map(dim => ({
      ...dim,
      score: dimensionScores[dim.id].percent,
      recommendation: PRIORITY_RECOMMENDATIONS[dim.id]
    }))
    .sort((a, b) => a.score - b.score);

  return sorted.slice(0, 3);
}

function getRoadmap(dimensionScores) {
  // Personalize roadmap: skip phases where score is high
  return ROADMAP_BASE.map(phase => ({
    ...phase,
    needed: dimensionScores[phase.dimension].percent < 75,
    currentScore: dimensionScores[phase.dimension].percent
  }));
}

function getRecommendedStack(dimensionScores) {
  // Build stack based on weakest dimensions (only include tools for areas needing work)
  const stack = [];
  const seen = new Set();

  DIMENSIONS.forEach(dim => {
    const dimScore = dimensionScores[dim.id].percent;
    const tools = STACK_BY_DIMENSION[dim.id] || [];
    tools.forEach(tool => {
      // Add if mandatory or if dimension is below 75%
      if ((tool.mandatory || dimScore < 75) && !seen.has(tool.tool)) {
        stack.push(tool);
        seen.add(tool.tool);
      }
    });
  });

  return stack;
}

// =====================================================
// RESULTS RENDERING
// =====================================================
function showResults() {
  const scores = calculateScores();
  const level = getMaturityLevel(scores.global);
  const priorities = getPriorities(scores.dimensions);
  const roadmap = getRoadmap(scores.dimensions);
  const stack = getRecommendedStack(scores.dimensions);

  document.getElementById('assessment').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');

  // Date
  const now = new Date();
  document.getElementById('resultsDate').textContent = `Diagnóstico generado el ${now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;

  // Global score
  setTimeout(() => {
    animateScore(scores.global);
  }, 100);
  document.getElementById('maturityLevel').textContent = level.name;
  document.getElementById('maturityLevel').style.color = level.color;
  document.getElementById('maturityDescription').textContent = level.description;

  // Radar chart
  renderRadarChart(scores.dimensions);

  // Dimensions detail
  renderDimensions(scores.dimensions);

  // Priorities
  renderPriorities(priorities);

  // Roadmap
  renderRoadmap(roadmap);

  // Stack
  renderStack(stack);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function animateScore(target) {
  const scoreEl = document.getElementById('globalScore');
  const arcEl = document.getElementById('scoreArc');
  const circumference = 2 * Math.PI * 72;

  let current = 0;
  const duration = 1500;
  const steps = 50;
  const increment = target / steps;
  const stepTime = duration / steps;

  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    scoreEl.textContent = Math.round(current);
    const offset = circumference - (circumference * current / 100);
    arcEl.style.strokeDashoffset = offset;
  }, stepTime);
}

function renderRadarChart(dimensionScores) {
  const ctx = document.getElementById('radarChart').getContext('2d');
  if (radarChart) radarChart.destroy();

  const labels = DIMENSIONS.map(d => d.name.split(' ')[0]); // shorter labels
  const data = DIMENSIONS.map(d => dimensionScores[d.id].percent);

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Tu puntuación',
        data: data,
        backgroundColor: 'rgba(204, 0, 0, 0.2)',
        borderColor: '#cc0000',
        borderWidth: 2,
        pointBackgroundColor: '#cc0000',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 25,
            color: '#737373',
            backdropColor: 'transparent'
          },
          grid: { color: '#e5e7eb' },
          angleLines: { color: '#e5e7eb' },
          pointLabels: {
            font: { size: 12, weight: '600', family: 'Inter' },
            color: '#1a1a1a'
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.r}/100`
          }
        }
      }
    }
  });
}

function renderDimensions(dimensionScores) {
  const container = document.getElementById('dimensionsList');
  container.innerHTML = DIMENSIONS.map(dim => {
    const score = dimensionScores[dim.id].percent;
    let color = '#dc2626';
    if (score >= 75) color = '#16a34a';
    else if (score >= 50) color = '#0891b2';
    else if (score >= 25) color = '#f59e0b';

    return `
      <div class="dim-result">
        <span class="dim-result-icon">${dim.icon}</span>
        <div class="dim-result-info">
          <h4>${dim.name}</h4>
          <p>${dim.description}</p>
        </div>
        <div class="dim-result-bar">
          <div class="dim-result-fill" style="width: ${score}%; background: ${color};"></div>
        </div>
        <div class="dim-result-score">${score}/100</div>
      </div>
    `;
  }).join('');
}

function renderPriorities(priorities) {
  const container = document.getElementById('prioritiesList');
  container.innerHTML = priorities.map((p, idx) => `
    <div class="priority-item">
      <div class="priority-number">${idx + 1}</div>
      <div class="priority-content">
        <h4>${p.icon} ${p.recommendation.title}</h4>
        <p>${p.recommendation.description}</p>
        <div class="priority-meta">${p.recommendation.impact}</div>
      </div>
    </div>
  `).join('');
}

function renderRoadmap(roadmap) {
  const container = document.getElementById('roadmapTimeline');
  container.innerHTML = roadmap.map((step, idx) => {
    const status = step.needed ? '' : ' ✓ Ya cubierto';
    const opacity = step.needed ? '1' : '0.55';
    return `
      <div class="roadmap-step" style="opacity: ${opacity}">
        <div class="roadmap-marker">
          <div class="roadmap-circle">${idx + 1}</div>
          <div class="roadmap-line"></div>
        </div>
        <div class="roadmap-content">
          <h4>${step.title}${status}</h4>
          <p>${step.description}</p>
          <span class="roadmap-time">${step.duration} · puntuación actual: ${step.currentScore}/100</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderStack(stack) {
  const tbody = document.getElementById('stackTableBody');
  tbody.innerHTML = stack.map(t => `
    <tr>
      <td><strong>${t.tool}</strong></td>
      <td>${t.function}</td>
      <td>${t.plan}</td>
      <td>${t.cost === 0 ? 'Gratis' : '$' + t.cost}</td>
    </tr>
  `).join('');

  const total = stack.reduce((sum, t) => sum + t.cost, 0);
  document.getElementById('stackTotal').innerHTML = `Coste mensual total recomendado: <strong>~$${total} USD/mes</strong> (~${Math.round(total * 0.92)} €/mes)`;
}

// =====================================================
// ACTIONS
// =====================================================
function downloadReport() {
  window.print();
}

function restartAssessment() {
  document.getElementById('results').classList.add('hidden');
  document.querySelector('.hero').classList.remove('hidden');
  document.getElementById('intro').classList.remove('hidden');
  currentQuestion = 0;
  answers = {};
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareResults() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('Enlace copiado al portapapeles. Compártelo con cualquier persona que quiera hacer el diagnóstico.');
  }).catch(() => {
    prompt('Copia el enlace:', url);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  buildQuestions();
});
