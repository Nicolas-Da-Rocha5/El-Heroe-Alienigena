document.addEventListener("DOMContentLoaded", () => {
  const gallery    = document.getElementById("gallery");
  const reader     = document.getElementById("reader");
  const container  = document.getElementById("pagesContainer");
  const backBtn    = document.getElementById("backBtn");
  const prevBtn    = document.getElementById("prevBtn");
  const nextBtn    = document.getElementById("nextBtn");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const speedSlider  = document.getElementById("speedSlider");
  const speedValue   = document.getElementById("speedValue");
  const iconPause    = document.getElementById("iconPause");
  const iconPlay     = document.getElementById("iconPlay");
  const mainContent  = document.querySelector(".contenido"); 

  let current = 0;
  let total   = 0;
  let timer   = null;
  let folder  = "";

  document.querySelectorAll(".comic-card").forEach(card => {
    card.addEventListener("click", () => {
      folder = "imagenes/comics/" + card.dataset.folder + "/";
      total  = parseInt(card.dataset.pages) + 1; 
      current = 0;
      container.innerHTML = "";

      const comicNumber = card.dataset.folder.replace("comic", ""); 
      const portada = new Image();
      portada.src = "imagenes/comics/portada" + comicNumber + ".png";
      portada.classList.add("active");
      container.appendChild(portada);

      for (let i = 1; i < total; i++) {
        const img = new Image();
        img.src = folder + i + ".png";
        container.appendChild(img);
      }

      gallery.style.display = "none";
      reader.style.display  = "flex";
      mainContent.classList.add("reader-open"); 
      play();
    });
  });

  function show(n) {
    container.querySelectorAll("img").forEach((img, i) => {
      img.classList.toggle("active", i === n);
    });
    current = n;
  }

  function next() {
    if (current < total - 1) show(current + 1);
    else pause();
  }

  function prev() {
    if (current > 0) show(current - 1);
  }

  function play() {
    clearInterval(timer);
    timer = setInterval(next, speedSlider.value * 1000);
    iconPause.style.display = "block";
    iconPlay.style.display  = "none";
  }

  function pause() {
    clearInterval(timer);
    timer = null; 
    iconPause.style.display = "none";
    iconPlay.style.display  = "block";
  }

  backBtn.onclick = () => {
    reader.style.display = "none";
    gallery.style.display = "grid";
    mainContent.classList.remove("reader-open"); 
    pause();
  };

  prevBtn.onclick = () => { pause(); prev(); };
  nextBtn.onclick = () => { pause(); next(); };
  playPauseBtn.onclick = () => { timer ? pause() : play(); };
  speedSlider.oninput = () => {
    speedValue.textContent = speedSlider.value + "s";
    if (timer) play();
  };

  // === TECLAS ===
  document.addEventListener("keydown", e => {
    if (reader.style.display !== "flex") return;
    if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); pause(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); pause(); prev(); }
    if (e.key === "Escape") backBtn.click();
  });
});