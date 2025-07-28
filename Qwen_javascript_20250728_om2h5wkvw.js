const quizData = {
  questions: [
    {
      id: 1,
      text: "What's your ideal way to spend a Saturday morning?",
      options: [
        { text: "Sleeping in until noon", points: { A: 1 } },
        { text: "Getting an early workout at the gym", points: { B: 1 } },
        { text: "Binge-watching Netflix", points: { C: 1 } },
        { text: "Planning next week's outfits", points: { D: 1 } }
      ],
      response: "Okay, totally normal so far...",
      chaosLevel: 1
    },
    {
      id: 2,
      text: "Which emoji best describes your vibe?",
      options: [
        { text: "😴", points: { A: 1 } },
        { text: "💪", points: { B: 1 } },
        { text: "📺", points: { C: 1 } },
        { text: "👗", points: { D: 1 } }
      ],
      response: "Still vibing...",
      chaosLevel: 1
    },
    {
      id: 3,
      text: "What's your go-to snack?",
      options: [
        { text: "Cookies", points: { A: 1 } },
        { text: "Protein bar", points: { B: 1 } },
        { text: "Popcorn", points: { C: 1 } },
        { text: "Avocado toast", points: { D: 1 } }
      ],
      response: "Hmm, interesting...",
      chaosLevel: 2
    },
    {
      id: 4,
      text: "If you were a TV show character, who would it be?",
      options: [
        { text: "Chandler from Friends", points: { A: 1 } },
        { text: "Monica from Friends", points: { B: 1 } },
        { text: "Joey from Friends", points: { C: 1 } },
        { text: "Rachel from Friends", points: { D: 1 } }
      ],
      response: "Sup bro? 😏",
      chaosLevel: 3
    },
    {
      id: 5,
      text: "What's your favorite ice cream flavor?",
      options: [
        { text: "Vanilla", points: { A: 1 } },
        { text: "Chocolate", points: { B: 1 } },
        { text: "Strawberry Cheesecake", points: { C: 1 } },
        { text: "Rainbow Sherbet", points: { D: 1 } }
      ],
      response: "Slay queen 👑",
      chaosLevel: 4
    },
    {
      id: 6,
      text: "How do you handle stress?",
      options: [
        { text: "Ignore it", points: { A: 1 } },
        { text: "Work out", points: { B: 1 } },
        { text: "Talk to friends", points: { C: 1 } },
        { text: "Buy new clothes", points: { D: 1 } }
      ],
      response: "Chill vibes only 🌈",
      chaosLevel: 5
    },
    {
      id: 7,
      text: "Pick a song that matches your energy:",
      options: [
        { text: "Stayin' Alive - Bee Gees", points: { A: 1 } },
        { text: "Eye of the Tiger - Survivor", points: { B: 1 } },
        { text: "Don't Stop Me Now - Queen", points: { C: 1 } },
        { text: "Vogue - Madonna", points: { D: 1 } }
      ],
      response: "You're living!",
      chaosLevel: 6
    },
    {
      id: 8,
      text: "What's your spirit animal?",
      options: [
        { text: "Sloth", points: { A: 1 } },
        { text: "Eagle", points: { B: 1 } },
        { text: "Dolphin", points: { C: 1 } },
        { text: "Peacock", points: { D: 1 } }
      ],
      response: "Wild card detected 🔥",
      chaosLevel: 7
    },
    {
      id: 9,
      text: "Choose a quote that defines you:",
      options: [
        { text: "I'm not lazy, I'm on energy-saving mode.", points: { A: 1 } },
        { text: "Hard work beats talent when talent doesn't work hard.", points: { B: 1 } },
        { text: "Life is short, smile while you still have teeth.", points: { C: 1 } },
        { text: "I woke up like this.", points: { D: 1 } }
      ],
      response: "This is peak chaos.",
      chaosLevel: 9
    },
    {
      id: 10,
      text: "What would your ideal weekend look like?",
      options: [
        { text: "Netflix and chill", points: { A: 1 } },
        { text: "Hiking with friends", points: { B: 1 } },
        { text: "Partying all night", points: { C: 1 } },
        { text: "Shopping spree", points: { D: 1 } }
      ],
      response: "MAXIMUM CHAOS MODE ACTIVATED 🚨",
      chaosLevel: 10
    }
  ],
  results: {
    A: {
      title: "The Chill Sloth 🦥",
      description: "You're the king of low-key living. Nothing fazes you. You prefer comfort over chaos and know how to enjoy the simple pleasures of life. Your energy is calm, collected, and refreshingly honest."
    },
    B: {
      title: "The Fitness Fanatic 💪",
      description: "Discipline is your middle name. You're unstoppable when you set your mind to something. Whether it's hitting the gym or conquering life goals, you approach everything with determination and focus. You inspire others just by being you!"
    },
    C: {
      title: "The Party Animal 🎉",
      description: "You bring the fun wherever you go. Life of the party! Your energy is infectious, your laugh is contagious, and your ability to make any situation exciting is unmatched. You know how to live life to the fullest and aren't afraid to be yourself."
    },
    D: {
      title: "The Fashionista 👗",
      description: "Style is your language. You slay every outfit and know how to make an entrance. Your attention to detail and creative flair make you stand out in any crowd. You're not just following trends - you're setting them!"
    }
  }
};

let currentQuestionIndex = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 };
let isMusicPlaying = false;
let audioElement = null;

// Initialize audio
document.addEventListener('DOMContentLoaded', function() {
  audioElement = document.getElementById('background-music');
  
  // Set up music toggle buttons
  const toggleButtons = document.querySelectorAll('.music-toggle-button');
  toggleButtons.forEach(button => {
    button.addEventListener('click', toggleMusic);
  });
  
  // Try to set up audio
  try {
    audioElement.volume = 0.3;
  } catch (e) {
    console.log('Audio setup error:', e);
  }
});

function toggleMusic() {
  if (!audioElement) return;
  
  if (isMusicPlaying) {
    audioElement.pause();
    isMusicPlaying = false;
    updateMusicButtons(false);
  } else {
    audioElement.play()
      .then(() => {
        isMusicPlaying = true;
        updateMusicButtons(true);
      })
      .catch(e => {
        console.log('Playback failed:', e);
        updateMusicButtons(false);
      });
  }
}

function updateMusicButtons(isPlaying) {
  const buttons = document.querySelectorAll('.music-toggle-button');
  buttons.forEach(button => {
    if (isPlaying) {
      button.textContent = '🔊 Music On';
      button.classList.add('playing');
    } else {
      button.textContent = '🔇 Music Off';
      button.classList.remove('playing');
    }
  });
}

function startQuiz() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('question-container').classList.remove('hidden');
  showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
  const question = quizData.questions[index];
  const container = document.getElementById('question-container');
  const progressBar = document.querySelector('.progress-fill');
  const questionCounter = document.getElementById('question-counter');
  const questionText = document.getElementById('question-text');
  const answerOptions = document.getElementById('answer-options');
  const sisterResponse = document.getElementById('sister-response');

  // Update chaos level
  container.className = 'screen';
  container.classList.add(`chaos-${question.chaosLevel}`);

  // Progress bar
  const percent = ((index + 1) / quizData.questions.length) * 100;
  progressBar.style.width = `${percent}%`;

  // Question counter
  questionCounter.textContent = `Question ${index + 1} of ${quizData.questions.length}`;

  // Question text
  questionText.textContent = question.text;

  // Answer options
  answerOptions.innerHTML = '';
  question.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.onclick = () => selectAnswer(option.points);
    answerOptions.appendChild(button);
  });

  // Sister's response
  sisterResponse.textContent = question.response || '';
}

function selectAnswer(points) {
  Object.keys(points).forEach(key => {
    scores[key] += points[key];
  });

  if (currentQuestionIndex < quizData.questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  } else {
    calculateResult();
  }
}

function calculateResult() {
  let maxKey = 'A';
  let maxValue = scores[maxKey];

  Object.keys(scores).forEach(key => {
    if (scores[key] > maxValue) {
      maxValue = scores[key];
      maxKey = key;
    }
  });

  showResults(maxKey);
}

function showResults(type) {
  document.getElementById('question-container').classList.add('hidden');
  document.getElementById('results-screen').classList.remove('hidden');

  const result = quizData.results[type];
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-description').textContent = result.description;
  
  // Play victory sound effect
  playVictorySound();
}

function playVictorySound() {
  // Create a victory sound effect using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log('Web Audio API not supported for victory sound');
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  scores = { A: 0, B: 0, C: 0, D: 0 };
  document.getElementById('results-screen').classList.add('hidden');
  document.getElementById('welcome-screen').classList.remove('hidden');
  // Reset music button state
  updateMusicButtons(isMusicPlaying);
}