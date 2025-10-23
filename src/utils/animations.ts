// Animation utilities for enhanced UI interactions

export class AnimationUtils {
    static fadeIn(element: HTMLElement, duration: number = 300): Promise<void> {
        return new Promise((resolve) => {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            const start = performance.now();
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.opacity = progress.toString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static fadeOut(element: HTMLElement, duration: number = 300): Promise<void> {
        return new Promise((resolve) => {
            const start = performance.now();
            const startOpacity = parseFloat(getComputedStyle(element).opacity);
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.opacity = (startOpacity * (1 - progress)).toString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static slideIn(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'right', duration: number = 300): Promise<void> {
        return new Promise((resolve) => {
            const startPosition = this.getSlideStartPosition(direction);
            
            element.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px)`;
            element.style.display = 'block';
            
            const start = performance.now();
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentX = startPosition.x * (1 - easeOutCubic);
                const currentY = startPosition.y * (1 - easeOutCubic);
                
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = 'translate(0, 0)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static slideOut(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'right', duration: number = 300): Promise<void> {
        return new Promise((resolve) => {
            const endPosition = this.getSlideStartPosition(direction);
            
            const start = performance.now();
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeInCubic = Math.pow(progress, 3);
                const currentX = endPosition.x * easeInCubic;
                const currentY = endPosition.y * easeInCubic;
                
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    element.style.transform = 'translate(0, 0)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static bounceIn(element: HTMLElement, duration: number = 600): Promise<void> {
        return new Promise((resolve) => {
            element.style.transform = 'scale(0.3)';
            element.style.opacity = '0';
            element.style.display = 'block';
            
            const start = performance.now();
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                let scale, opacity;
                
                if (progress < 0.5) {
                    // First half: scale up quickly
                    const t = progress * 2;
                    scale = 0.3 + (1.05 - 0.3) * t;
                    opacity = t;
                } else {
                    // Second half: settle down
                    const t = (progress - 0.5) * 2;
                    scale = 1.05 - (1.05 - 1) * t;
                    opacity = 1;
                }
                
                element.style.transform = `scale(${scale})`;
                element.style.opacity = opacity.toString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = 'scale(1)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static pulse(element: HTMLElement, duration: number = 1000, iterations: number = 3): Promise<void> {
        return new Promise((resolve) => {
            const start = performance.now();
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - start;
                const progress = (elapsed % duration) / duration;
                
                const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.1;
                element.style.transform = `scale(${scale})`;
                
                if (elapsed < duration * iterations) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = 'scale(1)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static shake(element: HTMLElement, intensity: number = 10, duration: number = 500): Promise<void> {
        return new Promise((resolve) => {
            const start = performance.now();
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const shakeX = Math.sin(elapsed * 0.1) * intensity * (1 - progress);
                element.style.transform = `translateX(${shakeX}px)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = 'translateX(0)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static staggerIn(elements: HTMLElement[], staggerDelay: number = 100, animationDuration: number = 300): Promise<void> {
        return new Promise((resolve) => {
            let completed = 0;
            const total = elements.length;
            
            elements.forEach((element, index) => {
                setTimeout(() => {
                    this.fadeIn(element, animationDuration).then(() => {
                        completed++;
                        if (completed === total) {
                            resolve();
                        }
                    });
                }, index * staggerDelay);
            });
        });
    }

    private static getSlideStartPosition(direction: 'left' | 'right' | 'up' | 'down'): { x: number; y: number } {
        switch (direction) {
            case 'left':
                return { x: -100, y: 0 };
            case 'right':
                return { x: 100, y: 0 };
            case 'up':
                return { x: 0, y: -100 };
            case 'down':
                return { x: 0, y: 100 };
        }
    }

    static createLoadingSpinner(size: number = 40): HTMLElement {
        const spinner = document.createElement('div');
        spinner.className = 'animate-spin rounded-full border-4 border-gray-300 border-t-blue-600';
        spinner.style.width = `${size}px`;
        spinner.style.height = `${size}px`;
        return spinner;
    }

    static createProgressBar(progress: number = 0): HTMLElement {
        const container = document.createElement('div');
        container.className = 'w-full bg-gray-200 rounded-full h-2';
        
        const bar = document.createElement('div');
        bar.className = 'bg-blue-600 h-2 rounded-full transition-all duration-300';
        bar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
        
        container.appendChild(bar);
        return container;
    }

    static updateProgressBar(bar: HTMLElement, progress: number): void {
        const progressElement = bar.querySelector('div');
        if (progressElement) {
            progressElement.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
        }
    }
}
