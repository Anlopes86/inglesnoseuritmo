/**
 * Performance Improvements and Additional Features
 * Inglês no seu Ritmo - Enhanced Version
 */

// === SISTEMA DE NOTIFICAÇÕES MELHORADO ===
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
        
        const icon = this.getIcon(type);
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="${icon}" aria-hidden="true"></i>
                <span>${message}</span>
                <button class="ml-auto text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()" aria-label="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

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
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.parentNode?.removeChild(notification), 300);
    }
}

// === SISTEMA DE PROGRESSO MELHORADO ===
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

// === UTILITÁRIOS ===
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

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {
    window.notifications = new NotificationSystem();
    
    // Melhorar busca de alunos
    const studentSearch = document.getElementById('student-search');
    if (studentSearch) {
        const debouncedSearch = debounce((query) => {
            const select = document.getElementById('student-select');
            if (!select) return;
            
            const options = select.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === '') return;
                const matches = option.textContent.toLowerCase().includes(query.toLowerCase());
                option.style.display = matches ? 'block' : 'none';
            });
        }, 300);
        
        studentSearch.addEventListener('input', (e) => debouncedSearch(e.target.value));
    }
    
    // Adicionar feedback visual aos botões
    document.querySelectorAll('.enhanced-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    console.log('✅ Performance improvements loaded!');
});

window.PerformanceUtils = { NotificationSystem, ProgressSystem, debounce };

