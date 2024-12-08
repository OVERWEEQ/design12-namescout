document.addEventListener("DOMContentLoaded", function() {
    const blocks = document.querySelectorAll('.countries'); // Родительский контейнер для каждого блока

    blocks.forEach(block => {
        const container = block.querySelector('.countries__container');
        const button = block.querySelector('.countries__button');
        const items = block.querySelectorAll('.countries__item');
        let isOpened = false;
        let maxCount = 0;

        let strokes = 0;
        let container_height = 0;

        const container_rowGap = parseFloat(getComputedStyle(container).rowGap);

        function updateItemCounts() {
            if (container.classList.contains('countries__three-rows')) {
                if (container.offsetWidth > 800) {
                    maxCount = 14;
                } else if (container.offsetWidth > 659 && container.offsetWidth <= 800) {
                    maxCount = 11;
                } else if (container.offsetWidth <= 659) {
                    maxCount = 8;
                }
            } 
            else if (container.classList.contains('countries__one-rows')) {
                if (container.offsetWidth > 800) {
                    maxCount = 4;
                } else if (container.offsetWidth > 659 && container.offsetWidth <= 800) {
                    maxCount = 3;
                } else if (container.offsetWidth <= 659) {
                    maxCount = 2;
                }
            }
            else {
                if (container.offsetWidth > 800) {
                    maxCount = 9;
                } else if (container.offsetWidth > 659 && container.offsetWidth <= 800) {
                    maxCount = 7;
                } else if (container.offsetWidth <= 659) {
                    maxCount = 5;
                }
            }
            items.forEach((item, index) => {
                if (index == maxCount) {
                    item.style.display = 'none';
                }
                else if (index > maxCount) {
                    item.style.order = 1;
                }
                else {
                    item.style.order = 'unset';
                    item.style.display = 'flex';
                }
                if (container.offsetWidth <= 800 && container.offsetWidth >= 660) {
                    item.classList.add('countries__four');
                    button.classList.add('countries__four');
                    item.classList.remove('countries__three');
                    button.classList.remove('countries__three');
                }
                else if (container.offsetWidth <= 659) {
                    item.classList.add('countries__three');
                    button.classList.add('countries__three');
                }
                else {
                    item.classList.remove('countries__four');
                    button.classList.remove('countries__four');
                    item.classList.remove('countries__three');
                    button.classList.remove('countries__three');
                }
            });
        }

        function updateContainerHeight() {
            if (!isOpened) {
                if (container.classList.contains('countries__three-rows')) {
                    strokes = 3;
                }
                else if (container.classList.contains('countries__one-rows')) {
                    strokes = 1;
                }
                else {
                    strokes = 2;
                }
            } 
            else {
                strokes = Math.ceil((items.length + 1) / ((maxCount + 1) / strokes));
            }
            container_height = (strokes * items[0].offsetHeight) + ((strokes - 1) * (container_rowGap));
            container.style.maxHeight = `${container_height}px`;
        }

        function updateItemOpacity() {
            items.forEach((item, index) => {
                if (index >= maxCount) {
                    item.style.opacity = isOpened ? 1 : 0;
                } else {
                    item.style.opacity = 1;
                }
            });
        }

        button.addEventListener('click', function() {
            if (isOpened) {
                items.forEach((item, index) => {
                    if (index == maxCount) {
                        item.style.display = 'none';
                    }
                    else if (index > maxCount) {
                        item.style.order = 1;
                    }
                });
                button.style.order = 'unset';
                isOpened = false;
            } else {
                items.forEach((item, index) => {
                    if (index = maxCount) {
                        item.style.display = 'flex';
                    }
                    else if (index > maxCount) {
                        item.style.order = 'unset';
                    }
                });
                button.style.order = 1;
                isOpened = true;
            }
            updateContainerHeight();
            updateItemOpacity();
        });

        updateContainerHeight();
        updateItemCounts();
        updateItemOpacity();
        window.addEventListener('resize', () => {
            items.forEach((item, index) => {
                if (index == maxCount) {
                    item.style.display = 'none';
                }
                else if (index > maxCount) {
                    item.style.order = 1;
                }
            });
            button.style.order = 'unset';
            isOpened = false;
            updateItemCounts();
            updateContainerHeight();
            updateItemOpacity();;
        });
    });
});