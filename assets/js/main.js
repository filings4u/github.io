/* ==========================================================================
    Stellar by HTML5 UP | @ajlkn
   Free for personal and commercial use under the CCA 3.0 license
   ========================================================================== */
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints (Synchronized site-wide at 980px)
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav
	var $nav = $('#nav');
	if ($nav.length > 0) {

		// Shrink effect
		$main.scrollex({
			mode: 'top',
			enter: function() { $nav.addClass('alt'); },
			leave: function() { $nav.removeClass('alt'); }
		});

		// Links
		var $nav_a = $nav.find('a');
		$nav_a.scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		})
		.on('click', function() {
			var $this = $(this);
			if ($this.attr('href').charAt(0) != '#') return;
			$nav_a.removeClass('active').removeClass('active-locked');
			$this.addClass('active').addClass('active-locked');
		})
		.each(function() {
			var	$this = $(this),
				id = $this.attr('href'),
				$section = $(id);

			if ($section.length < 1) return;

			$section.scrollex({
				mode: 'middle',
				initialize: function() {
					if (browser.canUse('transition')) $section.addClass('inactive');
				},
				enter: function() {
					$section.removeClass('inactive');
					if ($nav_a.filter('.active-locked').length == 0) {
						$nav_a.removeClass('active');
						$this.addClass('active');
					} else if ($this.hasClass('active-locked')) {
						$this.removeClass('active-locked');
					}
				}
			});
		});
	}

	// Scrolly
	$('.scrolly').scrolly({ speed: 1000 });

    // 🚀 FIXED: Forces jQuery to intercept and handle the mobile hamburger tap events on index.html
    $(document).on('click', '.mobile-menu-trigger, .mobile-toggle-btn', function(e) {
        e.preventDefault();
        toggleMobileMenu();
    });

})(jQuery);

/* ==========================================================================
   🌐 UNIFIED MOBILE NAVIGATION DRAWER CONTROLLER ENGINE
   ========================================================================== */

/**
 * 1. Primary Drawer Toggle: Handles opening, closing, and action icons transformations
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    // 🚀 FIXED: Dual selector support ensures it catches all button configurations site-wide
    const toggleBtn = document.querySelector('.mobile-menu-trigger') || document.querySelector('.mobile-toggle-btn');
    
    if (navLinks && toggleBtn) {
        navLinks.classList.toggle('active');
        
        // Translate visual states based on the presence of the active layout class
        if (navLinks.classList.contains('active')) {
            toggleBtn.innerHTML = '✕';
            toggleBtn.style.color = '#e53e3e'; /* Crimson alert color on open */
        } else {
            toggleBtn.innerHTML = '☰';
            toggleBtn.style.color = '#0a1f44'; /* Restores brand deep navy on close */
        }
    } else {
        console.warn("Mobile Navigation Hub Warning: Required layout elements missing from DOM tree framework.");
    }
}

/**
 * 2. Mobile Touch Interface Category Dropdown Accordion Item Controller
 */
function toggleMobileDropdown(event, element) {
    if (window.innerWidth <= 980) {
        event.preventDefault();
        event.stopPropagation(); // Stops event bubbling crashes inside the nav block
        
        const dropdownParent = element.parentElement;
        dropdownParent.classList.toggle('active-toggle');
        
        // Close other open tabs to keep mobile navigation clean
        document.querySelectorAll('.nav-item-dropdown').forEach(item => {
            if (item !== dropdownParent) {
                item.classList.remove('active-toggle');
            }
        });
    }
}

/**
 * 3. Resolution Watchdog: Auto-closes open drawer links if screen is resized to desktop width
 */
window.addEventListener('resize', function() {
    if (window.innerWidth > 980) {
        const navLinks = document.querySelector('.nav-links');
        const toggleBtn = document.querySelector('.mobile-menu-trigger') || document.querySelector('.mobile-toggle-btn');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (toggleBtn) {
                toggleBtn.innerHTML = '☰';
                toggleBtn.style.color = '#0a1f44';
            }
        }
        
        document.querySelectorAll('.nav-item-dropdown').forEach(item => {
            item.classList.remove('active-toggle');
        });
    }
});


/* ==========================================================================
   🚨 CRITICAL BLOCKADE OVERRIDE: FORCES MOBILE MENU REVEAL (BYPASSES THEME)
   ========================================================================== */

(function() {
    function forceIgniteMobileMenuDrawer() {
        // Target your explicit buttons and mobile trigger class anchors
        const triggerButtons = document.querySelectorAll('.mobile-menu-trigger, .mobile-toggle-btn');
        const slideDrawerContainer = document.querySelector('.nav-links');

        if (triggerButtons.length === 0 || !slideDrawerContainer) {
            // Re-check in a split second if elements are still loading into place
            setTimeout(forceIgniteMobileMenuDrawer, 200);
            return;
        }

        // Wipe out old duplicate listeners to keep browser memory clean
        triggerButtons.forEach(btn => {
            btn.removeAttribute('onclick'); // Strips out old HTML handlers
            
            // Attach a direct, aggressive listener that the theme cannot block
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation(); // Stops the theme script from catching the click event
                
                // Inject the active visibility status token straight to your navigation drawer wrapper
                slideDrawerContainer.classList.toggle('active');
                
                // Toggle the action button symbols matching open/close states
                if (slideDrawerContainer.classList.contains('active')) {
                    btn.innerHTML = '✕';
                    btn.style.setProperty('color', '#e53e3e', 'important'); // Alert Red accent
                } else {
                    btn.innerHTML = '☰';
                    btn.style.setProperty('color', '#0a1f44', 'important'); // Brand Navy contrast
                }
            });
            
            // Add smartphone touchscreen support to eliminate tap response delays
            btn.addEventListener('touchstart', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                slideDrawerContainer.classList.toggle('active');
                
                if (slideDrawerContainer.classList.contains('active')) {
                    btn.innerHTML = '✕';
                    btn.style.setProperty('color', '#e53e3e', 'important');
                } else {
                    btn.innerHTML = '☰';
                    btn.style.setProperty('color', '#0a1f44', 'important');
                }
            }, { passive: false });
        });
        
        console.log("🎯 Core Override Complete: Mobile navigation handlers successfully armed.");
    }

    // Initialize the override sequence instantly as soon as document layers mount
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", forceIgniteMobileMenuDrawer);
    } else {
        forceIgniteMobileMenuDrawer();
    }
})();


/* ==========================================================================
   🚨 RESPONSIVE CORE INTERCEPTOR: BYPASSES HTML5 UP OVERLAYS
   ========================================================================== */

(function() {
    function armFilings4uMobileMenu() {
        const hamburgerBtn = document.querySelector('.mobile-menu-trigger');
        const linksDrawer = document.querySelector('.nav-links');

        if (!hamburgerBtn || !linksDrawer) {
            // Keep poll indexing alive during canvas mounting lag
            setTimeout(armFilings4uMobileMenu, 150);
            return;
        }

        // Wipe out blocking inline event strings properties
        hamburgerBtn.removeAttribute('onclick');

        // Attach an direct click handler that the theme's default scripts cannot intercept
        hamburgerBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Restricts parent library event bubbling blocks
            
            linksDrawer.classList.toggle('active');
            
            if (linksDrawer.classList.contains('active')) {
                hamburgerBtn.innerHTML = '✕';
                hamburgerBtn.style.setProperty('color', '#e53e3e', 'important'); // Smooth alert crimson on open
            } else {
                hamburgerBtn.innerHTML = '☰';
                hamburgerBtn.style.setProperty('color', '#0a1f44', 'important'); // Restores brand navy on close
            }
        });

        console.log("🎯 Mobile Navigation Triggers armed and synchronized successfully.");
    }

    // Initialize as soon as script compiled loops complete
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", armFilings4uMobileMenu);
    } else {
        armFilings4uMobileMenu();
    }
})();

/**
 * Mobile Touch Accordion Item Dropdowns Controller
 */
function toggleMobileDropdown(event, element) {
    if (window.innerWidth <= 980) {
        event.preventDefault();
        event.stopPropagation();
        
        const parentBlock = element.parentElement;
        parentBlock.classList.toggle('active-toggle');
        
        document.querySelectorAll('.nav-item-dropdown').forEach(card => {
            if (card !== parentBlock) card.classList.remove('active-toggle');
        });
    }
}
