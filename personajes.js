// personajes.js - VERSIÓN FINAL INDESTRUCTIBLE (Funciona con Rook Blonko y todos)
document.addEventListener("DOMContentLoaded", () => {

    // ==================== SLIDER INTELIGENTE ====================
    document.querySelectorAll(".sliderpjs").forEach(sliderContainer => {
        const track = sliderContainer.querySelector(".slider-track");
        const slides = track.querySelectorAll(".slide");
        const dotsContainer = sliderContainer.querySelector("#sliderDots");
        const titulo = sliderContainer.querySelector("#tituloSlider");

        if (slides.length <= 1) {
			dotsContainer.style.display = "none";
			titulo.style.display = "block";        
			titulo.style.position = "static";         
			titulo.style.marginTop = "12px";          
			titulo.style.opacity = "1";
			track.style.transition = "none";
			track.style.transform = "translateX(0)";

			const unicaImagen = slides[0].querySelector("img");
			if (unicaImagen && unicaImagen.alt) {
				titulo.textContent = unicaImagen.alt.toUpperCase();
			}

			return;
		}	

        let index = 0;
        const titulos = Array.from(slides).map(slide => slide.querySelector("img").alt || "BEN 10");

        dotsContainer.innerHTML = "";
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.onclick = () => {
                index = i;
                updateSlider();
            };
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".dot");

        function updateSlider() {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle("active", i === index));
            titulo.textContent = titulos[index];
        }

        function nextSlide() {
            index = (index + 1) % slides.length;
            updateSlider();
        }

        let autoPlay = setInterval(nextSlide, 4000);
        sliderContainer.onmouseenter = () => clearInterval(autoPlay);
        sliderContainer.onmouseleave = () => autoPlay = setInterval(nextSlide, 4000);

        updateSlider();
    });

    // ==================== IMÁGENES DE APARICIÓN (FUNCIONA CON CUALQUIER ESTRUCTURA) ====================
    document.querySelectorAll(".aparicionpjs").forEach(container => {
        // Detectar TODAS las imágenes dentro del contenedor
        let images = Array.from(container.querySelectorAll("img"));
        if (images.length === 0) return;

        // Asegurarse de que cada imagen tenga su .recuadropjs
        images.forEach(img => {
            if (!img.closest(".recuadropjs")) {
                const wrapper = document.createElement("div");
                wrapper.classList.add("recuadropjs");
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            }
        });

        const recuadros = container.querySelectorAll(".recuadropjs");
        const total = recuadros.length;

        // Crear filas si no existen
        let r1 = container.querySelector(".r1");
        let r2 = container.querySelector(".r2");

        if (!r1) {
            r1 = document.createElement("div");
            r1.className = "r1";
            container.appendChild(r1);
        }
        if (!r2) {
            r2 = document.createElement("div");
            r2.className = "r2";
            container.appendChild(r2);
        }

        // Limpiar filas
        r1.innerHTML = "";
        r2.innerHTML = "";

        // DISTRIBUCIÓN EXACTA SEGÚN CANTIDAD
        if (total === 5) {
            r1.append(recuadros[0], recuadros[1], recuadros[2]);
            r2.append(recuadros[3], recuadros[4]);
            [0,1,2].forEach(i => recuadros[i].style.width = "28%");
            [3,4].forEach(i => recuadros[i].style.width = "45%");

        } else if (total === 4) {
            r1.append(recuadros[0], recuadros[1], recuadros[2]);
            r2.append(recuadros[3]);
            [0,1,2].forEach(i => recuadros[i].style.width = "28%");
            recuadros[3].style.width = "28%";

        } else if (total === 3) {
            r1.append(...recuadros);
            recuadros.forEach(r => r.style.width = "32%");

        } else if (total === 2) {
            r1.append(...recuadros);
            recuadros.forEach(r => r.style.width = "45%");

        } else if (total === 1) {
            r1.append(recuadros[0]);
            recuadros[0].style.width = "80%";
        }

        // Estilos finales
        recuadros.forEach(rec => {
            rec.style.margin = "0.5%";
            rec.style.display = "flex";
            rec.style.justifyContent = "center";
            const img = rec.querySelector("img");
            if (img) {
                img.style.height = "290px";
                img.style.width = "auto";
                img.style.maxWidth = "100%";
                img.style.objectFit = "contain";
            }
        });

        r1.style.justifyContent = "center";
        r2.style.justifyContent = "center";
        r2.style.display = r2.children.length > 0 ? "flex" : "none";
    });
});