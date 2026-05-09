/* --- FILINGS4U PORTAL STATE ENGINE --- */
const PortalState = {
    // Current App State
    state: {
        activeEntityId: localStorage.getItem('active_entity_id') || '4242',
        lockedPrice: localStorage.getItem('locked_price') || '0.00',
        userRole: 'admin', // or 'client'
        isMobile: window.innerWidth  {
            el.innerText = names[this.state.activeEntityId] || 'All Entities';
        });
    },

    // Handle Entity Switching across ALL pages
    handleSwitch(id) {
        // Trigger the State-of-the-Art AJAX Overlay (from previous code)
        const overlay = document.getElementById('switcher-overlay');
        if (overlay) overlay.style.display = 'flex';

        localStorage.setItem('active_entity_id', id);
        this.state.activeEntityId = id;

        // Smart Redirect: Stay on same page but refresh data
        setTimeout(() => {
            const currentPage = window.location.pathname;
            window.location.href = currentPage + "?eid=" + id;
        }, 600);
    },

    // Logic for Step-by-Step Intakes
    saveStepData(stepNumber, data) {
        const key = `llc_intake_step_${stepNumber}`;
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Price Guardrail: Locks the price during checkout
    lockPrice(amount) {
        localStorage.setItem('locked_price', amount);
        this.state.lockedPrice = amount;
    }
};

document.addEventListener('DOMContentLoaded', () => PortalState.init());
