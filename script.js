const TRASH_POOL = [
    { id: 't1', label: 'Bouteille en plastique', type: 'plastic' },
    { id: 't2', label: 'Bocal en verre', type: 'glass' },
    { id: 't3', label: 'Journaux', type: 'paper' },
    { id: 't4', label: 'Peau de banane', type: 'compost' }
  ];
  
  let score = 0;
  let round = 0;
  let targetToPlace = 4;
  let activeTrash = [];
  
  const trashRow = document.getElementById('trashRow');
  const scoreEl = document.getElementById('score');
  const progbar = document.getElementById('progbar');
  const badgeArea = document.getElementById('badgeArea');
  
  function startGame() {
    round = 0;
    activeTrash = [...TRASH_POOL];
    renderTrash();
    updateScoreDisplay();
    showMessage(false);
  }
  
  function renderTrash() {
    trashRow.innerHTML = '';
    activeTrash.forEach(item => {
      const el = document.createElement('div');
      el.className = 'trash';
      el.id = item.id;
      el.dataset.type = item.type;
      el.textContent = item.label;
      el.draggable = true;
      el.addEventListener('dragstart', onDragStart);
      trashRow.appendChild(el);
    });
    progbar.style.width = (round / targetToPlace * 100) + '%';
  }
  
  function onDragStart(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }
  
  const bins = document.querySelectorAll('.bin');
  bins.forEach(bin => {
    bin.addEventListener('dragover', ev => ev.preventDefault());
    bin.addEventListener('drop', ev => {
      ev.preventDefault();
      const id = ev.dataTransfer.getData('text/plain');
      handleDrop(id, bin);
    });
  });
  
  function handleDrop(itemId, binEl) {
    const index = activeTrash.findIndex(t => t.id === itemId);
    if (index === -1) return;
  
    const item = activeTrash[index];
    if (item.type === binEl.dataset.accept) {
      score += 10;
      round++;
      activeTrash.splice(index, 1);
      document.getElementById(itemId).remove();
      alert('Bravo ! Tu as trié correctement.');
    } else {
      score = Math.max(0, score - 4);
      alert('Oups… mauvaise poubelle. Essaie encore !');
    }
  
    updateScoreDisplay();
    progbar.style.width = (round / targetToPlace * 100) + '%';
  }
  
  function updateScoreDisplay() {
    scoreEl.textContent = 'Score: ' + score;
  }
  
  document.getElementById('startBtn').addEventListener('click', startGame);