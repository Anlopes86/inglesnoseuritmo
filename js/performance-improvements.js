/**
 * Performance Improvements and Additional Features
 * Ingles no seu Ritmo - Enhanced Version
 */

class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}-message p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;

        const row = document.createElement('div');
        row.className = 'flex items-center gap-3';

        const icon = document.createElement('i');
        icon.className = this.getIcon(type);
        icon.setAttribute('aria-hidden', 'true');

        const text = document.createElement('span');
        text.textContent = String(message);

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'ml-auto text-current opacity-70 hover:opacity-100';
        closeButton.setAttribute('aria-label', 'Fechar');
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.addEventListener('click', () => this.remove(notification));

        row.append(icon, text, closeButton);
        notification.appendChild(row);
        this.container.appendChild(notification);

        setTimeout(() => notification.classList.remove('translate-x-full'), 100);

        if (duration > 0) {
            setTimeout(() => this.remove(notification), duration);
        }

        return notification;
    }

    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        return icons[type] || icons.info;
    }

    remove(notification) {
        if (!notification || !notification.parentNode) return;
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.parentNode?.removeChild(notification), 300);
    }
}

class ProgressSystem {
    static updateProgress(elementId, percentage, animated = true) {
        const progressBar = document.getElementById(elementId);
        const progressText = document.getElementById(elementId.replace('bar', 'text'));

        if (!progressBar) return;

        if (animated) {
            progressBar.style.transition = 'width 0.8s ease-out';
        }

        progressBar.style.width = `${percentage}%`;

        if (progressText) {
            progressText.textContent = `${Math.round(percentage)}%`;
        }

        if (percentage >= 100) {
            progressBar.classList.add('progress-complete');
        }
    }
}

function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    window.notifications = new NotificationSystem();

    const studentSearch = document.getElementById('student-search');
    if (studentSearch) {
        const debouncedSearch = debounce((query) => {
            const select = document.getElementById('student-select');
            if (!select) return;

            const normalizedQuery = query.trim().toLowerCase();
            let hasVisibleSelectedOption = false;

            Array.from(select.options).forEach((option) => {
                if (!option.value) {
                    option.hidden = false;
                    return;
                }

                const matches = !normalizedQuery || option.textContent.toLowerCase().includes(normalizedQuery);
                option.hidden = !matches;

                if (matches && option.selected) {
                    hasVisibleSelectedOption = true;
                }
            });

            if (!hasVisibleSelectedOption && normalizedQuery) {
                select.value = '';
            }
        }, 300);

        studentSearch.addEventListener('input', (event) => debouncedSearch(event.target.value));
    }

    document.querySelectorAll('.enhanced-btn').forEach((button) => {
        button.addEventListener('click', function handleEnhancedClick() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

window.PerformanceUtils = { NotificationSystem, ProgressSystem, debounce };
