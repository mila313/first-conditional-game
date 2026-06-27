let current = 0;
let score = 0;

const questions = [
  {
    q: "If it rains tomorrow, ...",
    a: ["I stay home", "I will stay home", "I stayed home", "I am staying home"],
    correct: 1,
    explanation: "First Conditional = If + Present Simple, will + Verb"
  },
  {
    q: "If she studies hard, ...",
    a: ["she will pass", "she passes", "she passed", "she is pass"],
    correct: 0,
    explanation: "We use 'will' for future result"
  },
  {
    q: "If we leave now, ...",
    a: ["we will catch the bus", "we catch bus", "we caught bus", "we are catching bus"],
    correct: 0,
    explanation: "Correct structure: will + verb"
  },
  {
    q: "If you don’t hurry, ...",
    a: ["you will be late", "you are late", "you were late", "you late"],
    correct: 0,
    explanation: "Future consequence uses 'will'"
  },
  {
    q: "If I see Tom, ...",
    a: ["I will tell him", "I tell him", "I told him", "I am telling him"],
    correct: 0,
    explanation: "Future result → will + verb"
  }
];

function startGame() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];

  document.getElementById("question").innerText = q.q;
  document.getElementById("progress").innerText = `${current + 1} / ${questions.length}`;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  document.getElementById("message").innerText = "";
  document.getElementById("next").style.display = "none";

  q.a.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;

    btn.onclick = () => checkAnswer(index, btn);

    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index, btn) {
  const q = questions[current];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach(b => b.disabled = true);

  if (index === q.correct) {
    btn.classList.add("correct");
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("message").innerText = "✅ Correct! " + q.explanation;
  } else {
    btn.classList.add("wrong");
    buttons[q.correct].classList.add("correct");
    document.getElementById("message").innerText = "❌ Wrong! " + q.explanation;
  }

  document.getElementById("next").style.display = "block";
}

function nextQuestion() {
  current++;

  if (current >= questions.length) {
    document.getElementById("game").innerHTML = `
      <h1>🏆 Game Finished!</h1>
      <p>Your score: ${score} / ${questions.length * 10}</p>
      <button onclick="location.reload()">Play Again</button>
    `;
    return;
  }

  loadQuestion();
}
