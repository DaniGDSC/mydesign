document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentIndex = 0;

    function focusYear(index) {
        timelineItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('animate-fade-in');
                item.classList.remove('animate-fade-out', 'opacity-20', 'blur-sm');
            } else {
                item.classList.add('animate-fade-out', 'opacity-20', 'blur-sm');
                item.classList.remove('animate-fade-in');
            }
        });
    }

    function changeYear(direction) {
        if (direction === 'up') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : timelineItems.length - 1;
        } else if (direction === 'down') {
            currentIndex = (currentIndex < timelineItems.length - 1) ? currentIndex + 1 : 0;
        }
        focusYear(currentIndex);
    }

    function updateEvents() {
        timelineItems.forEach(item => {
            const events = item.querySelectorAll('.timeline-event');
            const isFocused = item.classList.contains('focused');
            
            events.forEach((event, index) => {
                if (isFocused || index === events.length - 1) {
                    event.style.display = 'block';
                } else {
                    event.style.display = 'none';
                }
            });
        });
    }

    // Initial focus on the first item
    focusYear(currentIndex);
    updateEvents();

    // Modified wheel event listener
    window.addEventListener('wheel', function(event) {
        if (event.deltaY < 0 && currentIndex > 0) {
            event.preventDefault();
            changeYear('up');
            updateEvents();
        } else if (event.deltaY > 0 && currentIndex < timelineItems.length - 1) {
            event.preventDefault();
            changeYear('down');
            updateEvents();
        }
    }, { passive: false });

    // Add touch events for mobile devices
    let touchStartY = 0;
    window.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener('touchmove', function(event) {
        const touchEndY = event.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;

        if (deltaY > 50 && currentIndex > 0) {
            event.preventDefault();
            changeYear('up');
            updateEvents();
        } else if (deltaY < -50 && currentIndex < timelineItems.length - 1) {
            event.preventDefault();
            changeYear('down');
            updateEvents();
        }
    }, { passive: false });

    // Modified keydown event listener
    window.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp' && currentIndex > 0) {
            event.preventDefault();
            changeYear('up');
            updateEvents();
        } else if (event.key === 'ArrowDown' && currentIndex < timelineItems.length - 1) {
            event.preventDefault();
            changeYear('down');
            updateEvents();
        }
    });
});
