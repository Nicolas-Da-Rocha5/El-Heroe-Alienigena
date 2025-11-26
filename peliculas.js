document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.carta');
    const backdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal-video');
    const playerContainer = document.querySelector('.modal-player');
    const closeBtn = document.querySelector('.close-modal');
    const titleEl = document.querySelector('.modal-title');
    const yearEl = document.querySelector('.year');
    const directorEl = document.querySelector('.director');
    const durationEl = document.querySelector('.duration');
    const synopsisEl = document.querySelector('.modal-synopsis');

    cards.forEach(card => {
        const btn = card.querySelector('.btn-trailer');
        btn.addEventListener('click', () => {
            const videoUrl = card.dataset.video;
            const title = card.dataset.title;
            const year = card.dataset.year;
            const director = card.dataset.director;
            const duration = card.dataset.duration;
            const synopsis = card.dataset.synopsis;

            // Llenar información
            titleEl.textContent = title;
            yearEl.textContent = year;
            directorEl.textContent = director;
            durationEl.textContent = duration;
            synopsisEl.textContent = synopsis;

            // Limpiar reproductor
            playerContainer.innerHTML = '';

            // Crear elemento <video> para .mp4
            const video = document.createElement('video');
            video.src = videoUrl;
            video.controls = true;
            video.autoplay = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';
            video.style.background = '#000';

            playerContainer.appendChild(video);

            // Mostrar modal
            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
        playerContainer.innerHTML = ''; // Detiene el video
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
});