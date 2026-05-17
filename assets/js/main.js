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
   📱 UNIFIED MOBILE MENU CONTROLLER (FIXED DOUBLE-TOGGLE GLITCH)
   ========================================================================== */
(function() {
    function initMobileMenuSystem() {
        const triggerButtons = document.querySelectorAll('.mobile-menu-trigger, .mobile-toggle-btn');
        const slideDrawerContainer = document.querySelector('.nav-links');

        // Safety Guard: Re-poll if the page elements are lagging during load
        if (triggerButtons.length === 0 || !slideDrawerContainer) {
            setTimeout(initMobileMenuSystem, 150);
            return;
        }

        triggerButtons.forEach(btn => {
            // Strip out conflicting fallback attributes
            btn.removeAttribute('onclick');

            // 1. Direct Click Interceptor
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation(); // Blocks theme overlays from breaking the toggle
                
                slideDrawerContainer.classList.toggle('active');
                
                if (slideDrawerContainer.classList.contains('active')) {
                    btn.innerHTML = '✕';
                    btn.style.setProperty('color', '#e53e3e', 'important'); // Crimson Exit Icon
                } else {
                    btn.innerHTML = '☰';
                    btn.style.setProperty('color', '#0a1f44', 'important'); // Brand Navy Menu Icon
                }
            });

            // 2. High-Performance Smartphone Touch Integration
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

        console.log("🎯 Mobile Navigation Engine successfully synchronized and isolated.");
    }

    // Execute engine initialization depending on canvas mount states
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMobileMenuSystem);
    } else {
        initMobileMenuSystem();
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

/* ==========================================================================
📰 AUTOMATED SUPABASE BLOG SYNC MODULE (FOUNDER INSIGHTS)
========================================================================== */
(function($) {
    "use strict";

    document.addEventListener('DOMContentLoaded', async () => {
        const gridTarget = document.getElementById('public-homepage-blog-grid-target');
        
        // 🚀 SAFETY GUARD RAIL: Prevents script crashes on contact, pricing, and wizard pages!
        if (!gridTarget) return;

        const spinner = document.getElementById('blog-loading-spinner');

        // Default static placeholder markup cards to display if database tables are empty
        const fallbackStaticCardsHTML = `
            <a href="blog/checklist-2026.html" class="blog-card">
                <div style="height:150px; background:#e2e8f0; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:600;">Launch Core</div>
                <div style="padding:20px;"><span class="hero-tag" style="margin-bottom:5px;">Launch</span><h4>2026 Small Business Checklist</h4></div>
            </a>
            <a href="blog/dot-101.html" class="blog-card">
                <div style="height:150px; background:#e2e8f0; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:600;">Logistics Hub</div>
                <div style="padding:20px;"><span class="hero-tag" style="margin-bottom:5px;">Compliance</span><h4>DOT Authority 101</h4></div>
            </a>
            <a href="blog/depreciation.html" class="blog-card">
                <div style="height:150px; background:#e2e8f0; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:600;">Tax Engine</div>
                <div style="padding:20px;"><span class="hero-tag" style="margin-bottom:5px;">Tax</span><h4>Maximizing Depreciation</h4></div>
            </a>
        `;

        try {
            // Double check if Supabase library framework loaded accurately in window scope
            if (typeof window.supabase === 'undefined') {
                throw new Error("Supabase library not initialized yet.");
            }

            // Fetch latest 3 items from public database table row logs
            const { data: posts, error } = await window.supabase
                .from('blog_posts')
                .select('title, category, image_url, slug')
                .order('created_at', { ascending: false })
                .limit(3);

            if (error) throw error;

            // If no items have been added to the dashboard table yet, paint the design fallbacks
            if (!posts || posts.length === 0) {
                if (spinner) spinner.remove();
                gridTarget.innerHTML = fallbackStaticCardsHTML;
                return;
            }

            // Clean out loading placeholder element frame
            if (spinner) spinner.remove();
            gridTarget.innerHTML = "";

            // Build and append individual dynamic article tiles
            posts.forEach(post => {
                const cardElement = document.createElement('a');
                cardElement.href = `blog/${post.slug}.html`;
                cardElement.className = 'blog-card';
                cardElement.innerHTML = `
                    <div style="height:150px; background: url('${post.image_url}') center/cover no-repeat; background-color: #f1f5f9;"></div>
                    <div style="padding:20px;">
                        <span class="hero-tag" style="margin-bottom:10px; display:inline-block; font-size:0.7rem;">${post.category}</span>
                        <h4 style="margin:0; font-size:1.1rem; color:#0a1f44; font-weight:700; line-height:1.4;">${post.title}</h4>
                    </div>
                `;
                gridTarget.appendChild(cardElement);
            });

        } catch (err) {
            console.warn("Blog module handled connection fallback safely:", err.message);
            if (spinner) spinner.remove();
            gridTarget.innerHTML = fallbackStaticCardsHTML;
        }
    });

})(jQuery); /* 🔄 FIXED: Added the required closing architecture to cleanly define and secure your jQuery reference frameworks */

