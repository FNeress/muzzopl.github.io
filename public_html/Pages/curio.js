document.addEventListener('DOMContentLoaded', () => {
    const ends = document.querySelectorAll('.end');

    const checkVisibility = () => {
        ends.forEach(end => {
            const rect = end.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                end.classList.add('visible');
            } else {
                end.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Initial check in case the elements are already in view
    checkVisibility();
});

document.addEventListener('DOMContentLoaded', () => {
    const ends = document.querySelectorAll('.start');

    const checkVisibility = () => {
        ends.forEach(start => {
            const rect = start.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                start.classList.add('visible');
            } else {
                start.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Initial check in case the elements are already in view
    checkVisibility();
});