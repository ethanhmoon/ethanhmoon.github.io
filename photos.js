/* ============================================================
   ADD YOUR PHOTOS HERE
   One line per photo. Example with a real file:
     { src: "images/beach.jpg", caption: "ocean city, july 2026" },
   Put your image files in an "images" folder next to index.html.
   The order below is the order they appear in.
   Delete the demo() helper once you're using real photos.
   ============================================================ */
const photos = [

  { src: "Images/soccer.JPG", caption: "Soccer!" },
  { src: "Images/golf.png", caption: "soo close... >:(" },
  { src: "Images/strava.jpg", caption: "Running!!" },
  { src: "Images/thailand.jpg", caption: "Traveling w/ some buds" },
  { src: "Images/grad.jpg", caption: "Graduated 2026!" },
];

// makes a colored placeholder image — delete once you use real photos
function demo(color, label) {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">' +
    '<rect width="600" height="600" fill="' + color + '"/>' +
    '<text x="300" y="312" font-family="sans-serif" font-size="34" fill="#777" text-anchor="middle">' + label + '</text></svg>';
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

/* ============================================================
   Stack logic — you shouldn't need to touch anything below
   ============================================================ */
const stack = document.getElementById("stack");
const angles = [-2, 4, -6, 3, -5, 6];   // resting tilt of each card
const cards = [];                        // last one in the list = on top
let drag = null;                         // info about the current drag
let busy = false;                        // true while a card is flying

// build one card per photo
photos.forEach(function (photo, i) {
  const card = document.createElement("div");
  card.className = "polaroid " + (i % 2 === 0 ? "tape-tr" : "tape-bl");

  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.caption;
  img.draggable = false;

  const caption = document.createElement("div");
  caption.className = "caption";
  caption.textContent = photo.caption;

  card.appendChild(img);
  card.appendChild(caption);
  stack.appendChild(card);
  cards.push(card);
});

restack();

// put every card in its resting spot (rotation + layer order)
function restack() {
  cards.forEach(function (card, i) {
    card.style.zIndex = i;
    card.style.transform = "rotate(" + angles[i % angles.length] + "deg)";
  });
}

// throw the top card off, then slide it back in at the bottom
function flick(card, dx, dy) {
  busy = true;
  const length = Math.hypot(dx, dy) || 1;
  const throwX = (dx / length) * 480;
  const throwY = (dy / length) * 480;
  const spin = dx >= 0 ? 24 : -24;
  card.style.transform = "translate(" + throwX + "px, " + throwY + "px) rotate(" + spin + "deg)";

  setTimeout(function () {
    cards.pop();            // take it off the top
    cards.unshift(card);    // put it at the bottom
    restack();              // it slides back under the pile
    setTimeout(function () { busy = false; }, 450);
  }, 300);
}

// --- dragging ---
stack.addEventListener("pointerdown", function (e) {
  if (busy || cards.length < 2) return;
  if (!e.target.closest(".polaroid")) return;
  const top = cards[cards.length - 1];
  drag = { card: top, startX: e.clientX, startY: e.clientY, dx: 0, dy: 0 };
  top.classList.add("dragging");
});

window.addEventListener("pointermove", function (e) {
  if (!drag) return;
  drag.dx = e.clientX - drag.startX;
  drag.dy = e.clientY - drag.startY;
  drag.card.style.transform =
    "translate(" + drag.dx + "px, " + drag.dy + "px) rotate(" + drag.dx * 0.06 + "deg)";
});

window.addEventListener("pointerup", function () {
  if (!drag) return;
  const card = drag.card;
  const dx = drag.dx;
  const dy = drag.dy;
  card.classList.remove("dragging");
  drag = null;

  const distance = Math.hypot(dx, dy);
  if (distance > 70) {
    flick(card, dx, dy);       // a real pull — send it flying that way
  } else if (distance < 6) {
    flick(card, 1, 0);         // a simple tap flips to the next one
  } else {
    restack();                 // small nudge — settle back into place
  }
});

// --- keyboard ---
stack.addEventListener("keydown", function (e) {
  if (busy || cards.length < 2) return;
  if (e.key === "ArrowRight" || e.key === "Enter") flick(cards[cards.length - 1], 1, 0);
  if (e.key === "ArrowLeft") flick(cards[cards.length - 1], -1, 0);
});
