/* Logic for the State-of-the-Art Switcher */
function switchEntity(entityName) {
    // 1. Show the Transition Overlay
    const overlay = document.getElementById('switcher-overlay');
    overlay.style.display = 'flex';
    
    // 2. Simulate AJAX Data Fetch
    setTimeout(() => {
        // In a real app, this would be: fetch('/api/switch-entity?id=' + id)
        console.log("Switching context to: " + entityName);
        
        // 3. Update the UI Elements without reload
        document.getElementById('active-entity-display').innerText = entityName;
        
        // 4. Trigger Real-Time Calculations (like the DE Optimizer)
        calculateTax(); 
        
        // 5. Hide Overlay
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; overlay.style.opacity = '1'; }, 300);
        
        // 6. Show Success Toast
        showToast("Context switched to " + entityName);
    }, 800);
}
