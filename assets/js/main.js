/* ==========================================================================
🟢 GLOBAL CHROMIUM MOBILE BROWSER COLOR INJECTION ENGINE
========================================================================== */
(function() {
    "use strict";

    function injectGlobalBrowserThemeColor() {
        // Target emerald accent color configuration
        const targetColorHex = "#10b981"; 
        
        // Safety checklist: update or append theme-color meta tag
        let existingMetaTag = document.querySelector('meta[name="theme-color"]');
        if (existingMetaTag) {
            existingMetaTag.setAttribute("content", targetColorHex);
        } else {
            const newMetaTag = document.createElement('meta');
            newMetaTag.name = "theme-color";
            newMetaTag.content = targetColorHex;
            document.head.appendChild(newMetaTag);
        }

        // Inject Microsoft mobile status bar fallback anchor compatibility properties
        const metaStatusBarName = "msapplication-navbutton-color";
        let existingMsMeta = document.querySelector(`meta[name="${metaStatusBarName}"]`);
        if (!existingMsMeta) {
            const msMeta = document.createElement('meta');
            msMeta.name = metaStatusBarName;
            msMeta.content = targetColorHex;
            document.head.appendChild(msMeta);
        }
    }

    // Execute the theme bar injection instantly as the page loads across views
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectGlobalBrowserThemeColor);
    } else {
        injectGlobalBrowserThemeColor();
    }
})();

/* ==========================================================================
📰 AUTOMATED THEME HANDLING MODULE (Stellar by HTML5 UP | @ajlkn)
========================================================================== */
(function($) {
    var $window = $(window),
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
            var $this = $(this),
                id = $this.attr('href'),
                $section = $(id);

            if ($section.length < 1) return;

            $section.scrollex({
                mode: 'middle',
                initialize: function() { if (browser.canUse('transition')) $section.addClass('inactive'); },
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

})(jQuery);

/* ==========================================================================
📱 UNIFIED MOBILE MENU CONTROLLER (FIXED DOUBLE-TOGGLE GLITCH)
========================================================================== */
(function() {
    "use strict";

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

    /* ==========================================================================
    🔄 FIXED MOBILE DROPDOWN ACCORDION ENGINE (WINDOW EXPOSED)
    ========================================================================== */
    window.toggleMobileDropdown = function(event, element) {
        if (window.innerWidth <= 991) { // Synchronized width threshold with stylesheets
            event.preventDefault();
            event.stopPropagation();
            
            const parentBlock = element.parentElement;
            if (!parentBlock) return;
            
            parentBlock.classList.toggle('active-toggle');
            
            // Auto-closes other open dropdown categories so only one accordion pane stays active
            document.querySelectorAll('.nav-item-dropdown').forEach(card => {
                if (card !== parentBlock) {
                    card.classList.remove('active-toggle');
                }
            });
        }
    };
})();

/* ==========================================================================
📰 AUTOMATED SUPABASE BLOG SYNC MODULE (FOUNDER INSIGHTS)
========================================================================== */
(function($) {
    "use strict";

    document.addEventListener('DOMContentLoaded', async () => {
        const gridTarget = document.getElementById('public-homepage-blog-grid-target');
        
        // 🚀 SAFETY GUARD RAIL: Prevents script crashes on secondary wizard lines
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
            // Validate if Supabase SDK is loaded
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

            if (!posts || posts.length === 0) {
                if (spinner) spinner.remove();
                gridTarget.innerHTML = fallbackStaticCardsHTML;
                return;
            }

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
})(jQuery);
