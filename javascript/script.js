const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".content-section");

window.addEventListener('DOMContentLoaded',()=>{
  console.log('DOM listo, script.js cargado');

  // Listeners para tabs de música
  document.getElementById('btn-muestra').addEventListener('click', function() {
    document.getElementById('musica-muestra').classList.add('active');
    document.getElementById('musica-publicada').classList.remove('active');
    this.classList.add('active');
    document.getElementById('btn-publicada').classList.remove('active');
  });

  document.getElementById('btn-publicada').addEventListener('click', function() {
    document.getElementById('musica-publicada').classList.add('active');
    document.getElementById('musica-muestra').classList.remove('active');
    this.classList.add('active');
    document.getElementById('btn-muestra').classList.remove('active');
  });

  // Mostrar detalle al hacer click en proyecto
  document.querySelectorAll('.proyecto-card').forEach(card => {
    card.addEventListener('click', function() {
      const id = this.getAttribute('data-proyecto');
      // Oculta todas las secciones principales
      document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
      // Oculta todos los detalles
      document.querySelectorAll('.detalle-proyecto').forEach(sec => sec.style.display = 'none');
      // Muestra el detalle correspondiente
      const detalle = document.getElementById('detalle-' + id);
      if(detalle) detalle.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar detalle
  document.querySelectorAll('.cerrar-detalle').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.detalle-proyecto').style.display = 'none';
      // Vuelve a mostrar la sección de trabajos
      document.getElementById('trabajos').classList.add('active');
      document.body.style.overflow = '';
    });
  });

  // Ampliar imagen de galería en modal flotante
  document.querySelectorAll('.detalle-galeria .miniatura').forEach(img => {
    img.addEventListener('click', function(e) {
      e.preventDefault();
      crearModalImagen(this.src);
    });
  });

  // Ampliar imagen/GIF de galería de INICIO en modal flotante
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', function(e) {
      e.preventDefault();
      crearModalImagen(this.src);
    });
  });

  // Listener para imágenes de carátula de música (track-cards)
  document.querySelectorAll('.caratula-modal').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
      e.preventDefault();
      crearModalImagen(this.src);
    });
  });

  // Mostrar detalle de proyecto secundario
  document.querySelectorAll('.proyecto-bar').forEach(bar => {
    bar.addEventListener('click', function() {
      const id = this.getAttribute('data-proyecto');
      document.querySelectorAll('.detalle-proyecto-sec').forEach(sec => sec.style.display = 'none');
      const detalle = document.getElementById('detalle-' + id);
      if (detalle) detalle.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar detalle de proyecto secundario
  document.querySelectorAll('.cerrar-detalle-sec').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.detalle-proyecto-sec').style.display = 'none';
      document.body.style.overflow = '';
    });
  });

  // Miniaturas de videos tipo Louie Zong
  document.querySelectorAll('.video-thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
      const embedUrl = this.getAttribute('data-embed');
      const iframe = document.createElement('iframe');
      iframe.width = "280";
      iframe.height = "158";
      iframe.src = embedUrl + "?autoplay=1";
      iframe.title = "Video";
      iframe.frameBorder = "0";
      iframe.allowFullscreen = true;
      this.parentNode.replaceChild(iframe, this);
    });
  });
});

// Transiciones suaves entre secciones del menú principal
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const currentSection = document.querySelector('.content-section.active');
    const nextSection = document.getElementById(targetId);

    if (!nextSection || currentSection === nextSection) return;

    // Fade out sección actual
    currentSection.classList.remove('fade-in');
    currentSection.classList.add('fade-out');

    setTimeout(() => {
      currentSection.classList.remove('active', 'fade-out');
      nextSection.classList.add('active', 'fade-in');
    }, 500); // Duración debe coincidir con el CSS
  });
});

document.getElementById("headerLogo").addEventListener("click", () => {
    sections.forEach(section => {
      section.classList.remove("active");
    });
    document.getElementById("inicio").classList.add("active");
  });
    window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 80) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  let lastScroll = 0;
  const header = document.querySelector('header');
  const logoBtn = document.getElementById('headerLogoBtn');

  window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 120) {
      header.classList.add('collapsed');
      header.classList.remove('sidebar');
    } else if (currentScroll < lastScroll || currentScroll < 40) {
      header.classList.remove('collapsed');
      header.classList.remove('sidebar');
    }
    lastScroll = currentScroll;
  });

  logoBtn.addEventListener('mouseenter', function() {
    if (header.classList.contains('collapsed')) {
      header.classList.add('sidebar');
      header.classList.remove('collapsed');
    }
  });

  header.addEventListener('mouseleave', function(e) {
    if (header.classList.contains('sidebar')) {
      header.classList.remove('sidebar');
      header.classList.add('collapsed');
    }
  });
  const logo = document.querySelector(".header-image");
const menu = document.querySelector(".dropdown-menu");

let menuTimeout;

logo.addEventListener("mouseenter", () => {
  clearTimeout(menuTimeout);
  menu.classList.add("show");
});

menu.addEventListener("mouseenter", () => {
  clearTimeout(menuTimeout);
});

logo.addEventListener("mouseleave", () => {
  menuTimeout = setTimeout(() => {
    menu.classList.remove("show");
  }, 300);
});

menu.addEventListener("mouseleave", () => {
  menuTimeout = setTimeout(() => {
    menu.classList.remove("show");
  }, 300);
});

// Ampliar imagen de galería en modal flotante (usado para galería de inicio y carátulas de música)
function crearModalImagen(src) {
  // Elimina cualquier modal anterior
  const anterior = document.getElementById('modal-imagen-ampliada');
  if (anterior) anterior.remove();
  // Crea el modal
  const modal = document.createElement('div');
  modal.id = 'modal-imagen-ampliada';
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.85)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 3000;
  modal.style.cursor = 'zoom-out';
  // Imagen grande
  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '90vw';
  img.style.maxHeight = '90vh';
  img.style.borderRadius = '16px';
  img.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)';
  modal.appendChild(img);
  // Cerrar al hacer click
  modal.addEventListener('click', () => modal.remove());
  document.body.appendChild(modal);
}
