
const cuenta = document.getElementById("cuenta");
// Fecha de estreno (ejemplo: 10 de junio de 2025 a las 22:00)
const estreno = new Date("April 20, 2025 21:00:00").getTime();

function actualizarCuenta() {
  const ahora = new Date().getTime();
  const distancia = estreno - ahora;

  if (distancia < 0) {
    cuenta.innerHTML = "¡Ya comenzó!";
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  cuenta.innerHTML = `${dias} Dias ${horas} h ${minutos} m ${segundos} s`;
}

setInterval(actualizarCuenta, 1000);

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const offsetX = (x - 0.5) * 20; // puedes ajustar el 20 para más o menos movimiento
    const offsetY = (y - 0.5) * 20;

    document.body.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`;
  });
  function mostrarTrailer() {
    document.getElementById("overlayTrailer").classList.add("active");
}

function cerrarTrailer() {
    document.getElementById("overlayTrailer").classList.remove("active");
    // Si querés que el video se detenga al cerrar:
    const iframe = document.querySelector("#overlayTrailer iframe");
    iframe.src = iframe.src;
}


const audio = document.getElementById("musica-fondo");
const panel = document.getElementById("panel-musica");
const playBtn = document.getElementById("btn-play");
const pauseBtn = document.getElementById("btn-pause");
const iconoMusica = document.getElementById("icono-musica");
const iconoImg = document.querySelector(".icono-musica-img");
const leyendaTexto = document.querySelector(".leyenda-musica span");
const overlayTrailer = document.querySelector(".overlay-trailer");

// Latido inicial (al cargar la página)
window.addEventListener("load", () => {
    iconoImg.classList.add("latido");
    setTimeout(() => {
        iconoImg.classList.remove("latido");
    }, 5000);
});

// Mostrar/ocultar panel de música
iconoMusica.addEventListener("click", () => {
    panel.classList.toggle("activo");
});

// PLAY
playBtn.addEventListener("click", () => {
    audio.volume = 0.3;
    audio.play().then(() => {
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
        leyendaTexto.style.animationPlayState = "running";
        iconoImg.classList.add("girando");  // empieza a girar
    }).catch(err => {
        console.log("Autoplay bloqueado por el navegador.");
    });
});

// PAUSE
pauseBtn.addEventListener("click", () => {
    audio.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline";
    leyendaTexto.style.animationPlayState = "paused";
    iconoImg.classList.remove("girando"); // 
});

// Pausar música si se abre el tráiler
const observer = new MutationObserver(() => {
    if (overlayTrailer.classList.contains("active")) {
        audio.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline";
        leyendaTexto.style.animationPlayState = "paused";
        iconoImg.classList.remove("girando"); 
    }
});

if (overlayTrailer) {
    observer.observe(overlayTrailer, {
        attributes: true,
        attributeFilter: ["class"]
    });
}
