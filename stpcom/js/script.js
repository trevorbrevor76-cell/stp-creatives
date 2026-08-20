const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40));
const menu = document.getElementById('menu'),
    nav = document.getElementById('nav');
menu.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
const filters = document.querySelectorAll('.filters button'),
    works = document.querySelectorAll('.work');
filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    works.forEach(w => w.classList.toggle('hide', f !== 'all' && !w.classList.contains(f)))
}));
const observer = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('show');
        observer.unobserve(e.target)
    }
}), { threshold: .12 });
document.querySelectorAll('.reveal,.service,.work,.process-grid>div').forEach(e => observer.observe(e));
const form = document.getElementById('contactForm'),
    msg = document.getElementById('formMessage');
form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = encodeURIComponent('STP Creatives Project Inquiry — ' + d.get('service'));
    const body = encodeURIComponent(`Hello STP Creatives,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nService: ${d.get('service')}\n\nProject details:\n${d.get('message')}`);
    window.location.href = `mailto:hello@stpcreatives.com?subject=${subject}&body=${body}`;
    msg.textContent = 'Opening your email app…'
});
document.getElementById('year1').textContent = new Date().getFullYear();
document.getElementById('year2').textContent = new Date().getFullYear();

/* =========================================================
   Inline video playback on the videography service card
   Clicking the play button plays the video in the card
   with the native controls; clicking again / closing pauses.
   ========================================================= */
const previewImg = document.getElementById('previewImg');
const previewVideo = document.getElementById('previewVideo');
const playBtn = document.getElementById('playBtn');

if (previewImg && previewVideo && playBtn) {
    // Show the video and hide the preview image, then play
    const playVideo = () => {
        previewVideo.controls = true; // show native play/pause/volume bar
        document.getElementById('videoTrigger').classList.add('playing');
        previewImg.style.display = 'none';
        playBtn.style.display = 'none';
        document.querySelector('.preview-hint').style.display = 'none';
        previewVideo.play().then(() => {
            playBtn.textContent = '❚❚';
        }).catch(() => {});
    };

    // When user clicks the play button, start playing
    playBtn.addEventListener('click', e => {
        e.stopPropagation();
        playVideo();
    });

    // Also allow clicking anywhere on the preview to play
    const trigger = document.getElementById('videoTrigger');
    if (trigger) {
        trigger.addEventListener('click', e => {
            if (e.target !== previewVideo) playVideo();
        });
    }

    // When playback ends, show the poster again
    previewVideo.addEventListener('ended', () => {
        document.getElementById('videoTrigger').classList.remove('playing');
        previewImg.style.display = '';
        playBtn.style.display = '';
        document.querySelector('.preview-hint').style.display = '';
        previewVideo.controls = false;
        playBtn.textContent = '▶';
    });
}