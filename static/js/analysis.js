document.addEventListener('DOMContentLoaded', function() {
    createRiskChart();
    createSeverityChart();
    lucide.createIcons();
});

function createRiskChart() {
    const ctx = document.getElementById('riskChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Financial', 'Compliance', 'Termination', 'Liability'],
            datasets: [{
                data: [75, 55, 30, 60],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(13, 148, 136, 0.8)'
                ],
                borderColor: [
                    '#ef4444',
                    '#f59e0b',
                    '#10b981',
                    '#0d9488'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

function createSeverityChart() {
    const ctx = document.getElementById('severityChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Financial', 'Compliance', 'Termination', 'Liability'],
            datasets: [{
                label: 'Risk Severity',
                data: [75, 55, 30, 60],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(245, 158, 11, 0.6)',
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(13, 148, 136, 0.6)'
                ],
                borderColor: [
                    '#ef4444',
                    '#f59e0b',
                    '#10b981',
                    '#0d9488'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Severity: ' + context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });
}
