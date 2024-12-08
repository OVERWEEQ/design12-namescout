document.addEventListener("DOMContentLoaded", function () {
    const swappers = document.querySelectorAll('.swapper');

    swappers.forEach(swapper => {
        const scrollLeftButton = swapper.querySelector('.swapper__button-left');
        const scrollRightButton = swapper.querySelector('.swapper__button-right');

        const container = swapper.querySelector('.swapper__container');
        const items = swapper.querySelectorAll('.swapper__item');
        const names = swapper.querySelectorAll('.swapper__name');
        const grad = swapper.querySelector('.swapper__grad');

        const place_actual = swapper.querySelector('.swapper__place__actual');
        const place_max = swapper.querySelector('.swapper__place__max');

        let item_count = items.length;
        let item_actual = 1;

        function updateItemWidths() {
            items.forEach(item => {
                item.style.width = `${swapper.offsetWidth}px`;
            });
            names.forEach(name => {
                name.style.width = `${swapper.offsetWidth}px`;
            });

            scrollContainerToPlace(item_actual);
        }

        grad.style.width = `${container.scrollWidth * items.length}px`;

        place_actual.textContent = item_actual;
        place_max.textContent = item_count;

        function scrollContainerToPlace(place) {
            const itemWidth = swapper.offsetWidth;
            const scrollPosition = (place - 1) * itemWidth;
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }

        scrollLeftButton.addEventListener('click', function () {
            if (item_actual > 1) {
                item_actual -= 1;
                place_actual.textContent = item_actual;
                scrollContainerToPlace(item_actual);
            }
        });
        scrollRightButton.addEventListener('click', function () {
            if (item_actual < item_count) {
                item_actual += 1;
                place_actual.textContent = item_actual;
                scrollContainerToPlace(item_actual);
            }
        });

        updateItemWidths();
        window.addEventListener('resize', updateItemWidths);
    });
});
