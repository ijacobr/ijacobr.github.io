document.addEventListener('DOMContentLoaded', function() {
  /************************************************************
   * Helper: Normalize a string (remove non-alphanumeric, lower-case)
   ************************************************************/
  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  /************************************************************
   * 1) HAMBURGER MENU TOGGLE
   ************************************************************/
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.style.display = (nav.style.display === 'block') ? 'none' : 'block';
    });
  }

  /************************************************************
   * 2) LOCALSTORAGE - LOAD OR INIT DECKS
   * Each deck: { name: string, description: string, cards: [] }
   ************************************************************/
  let decks = JSON.parse(localStorage.getItem('decks')) || [
    { name: 'Deck 1', description: 'Description for Deck 1', cards: [] },
    { name: 'Deck 2', description: 'Description for Deck 2', cards: [] }
  ];

  function saveDecks() {
    localStorage.setItem('decks', JSON.stringify(decks));
  }

  /************************************************************
   * 3) MY DECKS PAGE - CREATE/EDIT/DELETE
   ************************************************************/
  const deckForm = document.getElementById('deckForm');
  const deckNameInput = document.getElementById('deckName');
  const deckDescInput = document.getElementById('deckDescription');
  const deckUl = document.getElementById('deck-ul');

  if (deckForm && deckNameInput && deckDescInput && deckUl) {
    function renderDecks() {
      deckUl.innerHTML = '';
      decks.forEach((deck, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${deck.name}</strong>
          <button class="edit-deck" data-index="${index}">Edit</button>
          <button class="delete-deck" data-index="${index}">Delete</button>
          <p>${deck.description}</p>
          <p>Cards in deck: ${deck.cards.length}</p>
        `;
        deckUl.appendChild(li);
      });
    }

    deckForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const newDeck = {
        name: deckNameInput.value.trim(),
        description: deckDescInput.value.trim(),
        cards: []
      };
      if (newDeck.name && newDeck.description) {
        decks.push(newDeck);
        saveDecks();
        renderDecks();
        deckForm.reset();
      }
    });

    deckUl.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-deck')) {
        const idx = e.target.getAttribute('data-index');
        decks.splice(idx, 1);
        saveDecks();
        renderDecks();
      } else if (e.target.classList.contains('edit-deck')) {
        const idx = e.target.getAttribute('data-index');
        const deckToEdit = decks[idx];
        deckNameInput.value = deckToEdit.name;
        deckDescInput.value = deckToEdit.description;
        decks.splice(idx, 1);
        saveDecks();
        renderDecks();
        deckNameInput.focus();
      }
    });

    renderDecks();
  }

  /************************************************************
   * 4) BROWSE PAGE - SORTING + ADD CARDS TO DECK
   * Dynamically load all cards from JSON.
   ************************************************************/
  const sortButtons = document.querySelectorAll('.sort-button');
  const cardGallery = document.getElementById('card-gallery');
  const deckSelect = document.getElementById('deckSelect');

  // Populate deck dropdown if on Browse page
  if (deckSelect) {
    function populateDeckSelect() {
      deckSelect.innerHTML = '<option value="">-- Select a deck --</option>';
      decks.forEach((deck, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = deck.name;
        deckSelect.appendChild(opt);
      });
    }
    populateDeckSelect();
  }

  // Dynamically load cards from JSON if cardGallery exists
  if (cardGallery) {
    fetch('/projects/json/cards.json')
      .then(response => response.json())
      .then(cards => {
        cardGallery.innerHTML = '';
        cards.forEach(card => {
          const cardItem = document.createElement('div');
          cardItem.classList.add('card-item');
          cardItem.setAttribute('data-name', card.name);
          cardItem.setAttribute('data-cost', card.cost);
          cardItem.setAttribute('data-attack', card.attack);
          cardItem.setAttribute('data-health', card.health);
          cardItem.innerHTML = `
            <a href="preview.html?card=${normalize(card.name)}">
              <img src="/${card.img}" alt="${card.name}" />
            </a>
            <p>${card.name}</p>
            <button class="add-to-deck">Add</button>
          `;
          cardGallery.appendChild(cardItem);
        });
      })
      .catch(err => console.error("Error loading cards:", err));
  }

  // Sort functionality for browse page
  if (sortButtons && cardGallery) {
    sortButtons.forEach(button => {
      button.addEventListener('click', function() {
        sortButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const sortMetric = button.getAttribute('data-sort');
        const cardItems = Array.from(cardGallery.querySelectorAll('.card-item'));
        cardItems.sort((a, b) => {
          const aValue = parseInt(a.getAttribute('data-' + sortMetric)) || 0;
          const bValue = parseInt(b.getAttribute('data-' + sortMetric)) || 0;
          return bValue - aValue;
        });
        cardItems.forEach(item => cardGallery.removeChild(item));
        cardItems.forEach(item => cardGallery.appendChild(item));
      });
    });
  }

  // Add card to deck event listener
  if (cardGallery) {
    cardGallery.addEventListener('click', function(e) {
      if (e.target.classList.contains('add-to-deck')) {
        const selectedDeckIndex = deckSelect.value;
        if (selectedDeckIndex === '') {
          alert('Please select a deck first.');
          return;
        }
        const cardItem = e.target.closest('.card-item');
        const cardName = cardItem.getAttribute('data-name');
        const cost = parseInt(cardItem.getAttribute('data-cost'));
        const attack = parseInt(cardItem.getAttribute('data-attack'));
        const health = parseInt(cardItem.getAttribute('data-health'));

        decks[selectedDeckIndex].cards.push({
          name: cardName,
          cost: cost,
          attack: attack,
          health: health
        });
        saveDecks();
        alert(`${cardName} added to deck: ${decks[selectedDeckIndex].name}`);
      }
    });
  }

  /************************************************************
   * 5) DECK ANALYSIS PAGE - EXPANDED DESCRIPTIONS
   ************************************************************/
  const analysisDeckSelect = document.getElementById('analysisDeckSelect');
  const analyzeDeckBtn = document.getElementById('analyzeDeckBtn');
  const analysisDeckList = document.getElementById('analysis-deck-list');

  if (analysisDeckSelect && analyzeDeckBtn && analysisDeckList) {
    function populateAnalysisSelect() {
      analysisDeckSelect.innerHTML = '<option value="">-- Select a deck --</option>';
      decks.forEach((deck, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = deck.name;
        analysisDeckSelect.appendChild(opt);
      });
    }
    populateAnalysisSelect();

    analyzeDeckBtn.addEventListener('click', function() {
      const idx = analysisDeckSelect.value;
      if (idx === '') {
        alert('Please select a deck to analyze.');
        return;
      }
      const deck = decks[idx];
      analysisDeckList.innerHTML = '';
      deck.cards.forEach(card => {
        const div = document.createElement('div');
        div.innerHTML = `
          <strong>${card.name}</strong>
          <p>Cost: ${card.cost}, Attack: ${card.attack}, Health: ${card.health}</p>
        `;
        analysisDeckList.appendChild(div);
      });

      let totalCost = 0, totalAttack = 0, totalHealth = 0;
      deck.cards.forEach(card => {
        totalCost += card.cost;
        totalAttack += card.attack;
        totalHealth += card.health;
      });
      const cardCount = deck.cards.length;
      const avgCost = cardCount ? (totalCost / cardCount).toFixed(1) : 0;
      const avgAttack = cardCount ? (totalAttack / cardCount).toFixed(1) : 0;
      const avgHealth = cardCount ? (totalHealth / cardCount).toFixed(1) : 0;

      document.getElementById('avg-cost').textContent = avgCost;
      document.getElementById('avg-attack').textContent = avgAttack;
      document.getElementById('avg-health').textContent = avgHealth;

      let analysisPoints = [];
      if (cardCount === 0) {
        analysisPoints.push("This deck has no cards yet.");
      } else {
        if (avgCost < 4) {
          analysisPoints.push("This deck is a low-cost, aggressive build, great at early pressure. It typically excels against slower, late-game strategies but can struggle if the opponent stabilizes.");
        } else if (avgCost < 7) {
          analysisPoints.push("This deck is a balanced midrange build, effective in both early and late stages. It can handle fast decks decently while still pressuring slower control decks.");
        } else {
          analysisPoints.push("This deck is a high-cost control build, relying on powerful late-game minions. It's strong against midrange or other slow decks, but may be vulnerable to hyper-aggro.");
        }
        if (avgAttack >= 7) {
          analysisPoints.push("Your deck's high average Attack suggests it can deliver strong burst damage, dominating trades and pressuring life totals.");
        } else if (avgAttack <= 3 && avgAttack > 0) {
          analysisPoints.push("Your deck's low average Attack indicates it may rely on other win conditions or spells to close out games.");
        }
        if (avgHealth >= 7) {
          analysisPoints.push("Your minions have high average Health, making them resilient to common removal and favorable in board trades.");
        } else if (avgHealth <= 3 && avgHealth > 0) {
          analysisPoints.push("Your minions have relatively low Health, so area-of-effect spells and efficient enemy trades could be problematic.");
        }
        const attackHealthDiff = avgAttack - avgHealth;
        if (attackHealthDiff >= 3) {
          analysisPoints.push("This deck leans heavily on offense, so you might struggle to keep minions alive. Consider adding more defensive options.");
        } else if (attackHealthDiff <= -3) {
          analysisPoints.push("This deck is very defensive, which can prolong the game but may lack finishing power if you can't pressure the opponent.");
        }
      }
      document.getElementById('deck-description').textContent = analysisPoints.join(" ");
    });
  }

  /************************************************************
   * 6) OPTIONAL: MODAL PREVIEW (IF YOU USE ANY MODALS)
   ************************************************************/
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-content");
  const closeBtn = document.getElementById("close");
  if (modal && modalImg && closeBtn) {
    document.querySelectorAll(".preview-image").forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.dataset.fullsize;
      });
    });
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
