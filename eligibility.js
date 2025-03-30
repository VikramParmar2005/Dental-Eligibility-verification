// Simulated procedure data
const procedureData = {
    'D0120': {
        delta: {
            covered: true,
            percentage: 100,
            limitations: 'Twice per calendar year',
            waiting_period: 'None',
            notes: 'Includes oral evaluation'
        },
        cigna: {
            covered: true,
            percentage: 80,
            limitations: 'Once every 6 months',
            waiting_period: 'None',
            notes: 'Requires documentation'
        }
    },
    'D0274': {
        delta: {
            covered: true,
            percentage: 50,
            limitations: 'Once every 36 months',
            waiting_period: '6 months',
            notes: 'Bitewing x-rays only'
        },
        cigna: {
            covered: false,
            percentage: 0,
            limitations: 'Not covered',
            waiting_period: 'N/A',
            notes: 'Consider alternative D0220'
        }
    }
};

// Procedure form handler
document.addEventListener('DOMContentLoaded', function() {
    const procedureForm = document.getElementById('procedureForm');
    
    if (procedureForm) {
        procedureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const code = document.getElementById('procedureCode').value.toUpperCase();
            const provider = document.getElementById('insuranceProvider').value;
            
            const results = document.getElementById('coverageResults');
            results.innerHTML = '<div class="loading-spinner">Checking coverage...</div>';
            
            setTimeout(() => {
                const data = procedureData[code] || {};
                results.innerHTML = renderResults(code, provider, data);
            }, 1000);
        });
    }
});

function renderResults(code, provider, data) {
    let html = `<h3>Results for ${code}</h3>`;
    
    if (!Object.keys(data).length) {
        return `<div class="alert-message">No coverage information found for ${code}</div>`;
    }

    html += `<table class="coverage-table">
                <thead>
                    <tr>
                        <th>Provider</th>
                        <th>Coverage</th>
                        <th>Percentage</th>
                        <th>Limitations</th>
                        <th>Waiting Period</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>`;

    if (provider === 'both' || provider === 'delta') {
        html += renderProviderRow('Delta Dental NJ', data.delta);
    }
    if (provider === 'both' || provider === 'cigna') {
        html += renderProviderRow('Cigna Dental', data.cigna);
    }

    html += `</tbody></table>`;
    return html;
}

function renderProviderRow(name, data) {
    if (!data) return '';
    
    return `<tr>
        <td>${name}</td>
        <td><span class="badge ${data.covered ? 'badge-covered' : 'badge-not-covered'}">
            ${data.covered ? 'Covered' : 'Not Covered'}
        </span></td>
        <td>${data.covered ? data.percentage + '%' : 'N/A'}</td>
        <td>${data.limitations}</td>
        <td>${data.waiting_period}</td>
        <td>${data.notes}</td>
    </tr>`;
}