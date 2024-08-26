document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentIndex = 0;

    function focusYear(index) {
        timelineItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('focused');
                item.classList.remove('blurred');
            } else {
                item.classList.add('blurred');
                item.classList.remove('focused');
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
            
            if (isFocused) {
                events.forEach(event => {
                    event.style.display = 'block';
                });
            } else {
                events.forEach((event, index) => {
                    event.style.display = (index === events.length - 1) ? 'block' : 'none';
                });
            }
        });
    }

    // Initial focus on the first item
    focusYear(currentIndex);
    updateEvents();

    // Listen for mouse scroll events
    window.addEventListener('wheel', function(event) {
        if (event.deltaY < 0) {
            changeYear('up');
        } else if (event.deltaY > 0) {
            changeYear('down');
        }
        updateEvents();
    });

    // Listen for arrow key events
    window.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp') {
            changeYear('up');
        } else if (event.key === 'ArrowDown') {
            changeYear('down');
        }
        updateEvents();
    });
});
