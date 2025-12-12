class Example {
    constructor(options) {
        this.root = options.root;

        this.init();

        // Delay showing images slightly after initialization
        setTimeout(this.showImages.bind(this), 1000);
    }

    init() {
        // Initialize Locomotive Scroll for horizontal movement
        this.scroll = new LocomotiveScroll({
            el: this.root,
            direction: 'horizontal',
            smooth: true,
            lerp: 0.05,
            tablet: {
                smooth: true
            },
            smartphone: {
                smooth: true
            }
        });

        this.images = this.root.querySelectorAll('.image');

        // Add click listener to images for the "clicked" effect
        [].forEach.call(this.images, (image) => {
            image.addEventListener('click', () => {
                image.classList.add('-clicked');
                this.hideImages();
            });
        });
    }

    showImages() {
        // Add '-active' class to fade images in
        [].forEach.call(this.images, (image) => {
            image.classList.remove('-clicked');
            image.classList.add('-active');
        });
    }

    hideImages() {
        // Remove '-active' class to fade images out
        [].forEach.call(this.images, (image) => {
            image.classList.remove('-active');
        });

        // Re-show images after a delay
        setTimeout(this.showImages.bind(this), 2000);
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    // Only initialize the scroll example if the element exists
    const scrollContainer = document.querySelector('.scroll-animations-example');
    if (scrollContainer) {
        const example = new Example({
            root: scrollContainer
        });
    }
});