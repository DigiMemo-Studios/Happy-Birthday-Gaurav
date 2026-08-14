/* =======================================================
   DigiMemo Anniversary Frontend Engine
   Awwwards-worthy premium experience (Apple + Pinterest + Ghibli)
   Strictly configuration-driven. Handcrafted with love.
======================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Theme variables
    initTheme();

    // 2. Initialize Website Dynamic Content
    renderContent();

    // 3. Setup Sky Effects (Stars, Clouds, Sparkles, Butterflies)
    initSkyEffects();

    // 4. Initialize Core Web Mechanics (Scroll reveals, Lightbox, etc.)
    initInteractions();

    // 5. Initialize Relationship Counter
    initCounter();

    // 6. Initialize Custom Music Player
    initMusicPlayer();
});

/* =======================================================
   1. THEME ENGINE INITIALIZATION
======================================================= */
function initTheme() {
    if (typeof THEME === "undefined") return;
    const root = document.documentElement;
    
    // Inject all theme properties as CSS variables at runtime
    root.style.setProperty('--bg-color', THEME.background);
    root.style.setProperty('--bg-color-2', THEME.background2);
    root.style.setProperty('--primary-color', THEME.primary);
    root.style.setProperty('--secondary-color', THEME.secondary);
    root.style.setProperty('--accent-color', THEME.accent);
    root.style.setProperty('--white-color', THEME.white);
    root.style.setProperty('--glass-bg', THEME.glass);
    root.style.setProperty('--glass-border', THEME.glassBorder);
    root.style.setProperty('--text-color', THEME.text);
    root.style.setProperty('--text-light', THEME.textLight);
    root.style.setProperty('--heart-color', THEME.heart);
    root.style.setProperty('--glow-color', THEME.glow);
    root.style.setProperty('--shadow-color', THEME.shadow);
}

/* =======================================================
   2. DYNAMIC CONTENT RENDERING FROM CONFIG
======================================================= */
function renderContent() {
    if (typeof CONFIG === "undefined") return;

    // Header initials
    const initials = CONFIG.coupleNames.split(/❤️|&|\band\b/i).map(name => name.trim().charAt(0));
    document.getElementById("header-initials").textContent = initials.join(" & ");

    // Hero Section
    document.getElementById("hero-title").textContent = CONFIG.title;
    document.getElementById("hero-subtitle").textContent = CONFIG.subtitle;
    document.getElementById("hero-quote").textContent = `"${CONFIG.heroQuote}"`;
    document.getElementById("hero-btn-text").textContent = CONFIG.buttonText;
    document.getElementById("hero-image").src = CONFIG.storyPhoto; // fallback or story photo

    // Our Story Section
    document.getElementById("story-header-title").textContent = CONFIG.storyTitle;
    document.getElementById("story-title").textContent = CONFIG.storyTitle;
    document.getElementById("story-photo").src = CONFIG.storyPhoto;
    document.getElementById("story-text").textContent = CONFIG.storyText;

    // Timeline Milestones
    const timelineContainer = document.getElementById("timeline-container");
    // Clear dynamic children but keep the timeline progress elements
    const timelineProgress = document.getElementById("timeline-progress");
    const timelineLine = timelineContainer.querySelector(".timeline-line");
    timelineContainer.innerHTML = '';
    timelineContainer.appendChild(timelineLine); // re-append line

    CONFIG.timeline.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `timeline-item timeline-item-${index + 1}`;
        itemDiv.innerHTML = `
            <div class="timeline-node"></div>
            <div class="timeline-card glass-card">
                <img class="timeline-card-image" src="${item.image}" alt="${item.title}">
                <span class="timeline-card-date">${item.date}</span>
                <h3 class="timeline-card-title">${item.title}</h3>
                <p class="timeline-card-desc">${item.description}</p>
            </div>
        `;
        timelineContainer.appendChild(itemDiv);
    });

    // Polaroid Gallery Section
    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.innerHTML = '';
    CONFIG.gallery.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "gallery-item";
        itemDiv.innerHTML = `
            <div class="gallery-polaroid">
                <img src="${item.image}" alt="${item.caption}">
                <span class="polaroid-caption">${item.caption}</span>
            </div>
        `;
        galleryContainer.appendChild(itemDiv);
    });

    // Love Letters Section
    const lettersContainer = document.getElementById("letters-container");
    lettersContainer.innerHTML = '';
    CONFIG.letters.forEach((item, index) => {
        const envelopeWrapper = document.createElement("div");
        envelopeWrapper.className = "envelope-wrapper";
        envelopeWrapper.innerHTML = `
            <div class="envelope" data-index="${index}">
                <div class="envelope-flap"></div>
                <div class="envelope-pocket"></div>
                <div class="envelope-pocket-left"></div>
                <div class="envelope-pocket-right"></div>
                <div class="envelope-heart"><i data-lucide="heart"></i></div>
                <span class="envelope-title">${item.title}</span>
                <div class="letter-paper">
                    <div class="paper-content">${item.text}</div>
                </div>
            </div>
        `;
        lettersContainer.appendChild(envelopeWrapper);
    });

    // Reasons I Love You Section
    const reasonsContainer = document.getElementById("reasons-container");
    reasonsContainer.innerHTML = '';
    CONFIG.reasons.forEach(item => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "reason-card-container";
        cardContainer.innerHTML = `
            <div class="reason-card">
                <div class="reason-front">
                    <span class="reason-emoji">${item.emoji}</span>
                    <span class="reason-tap-hint">Tap to Reveal</span>
                </div>
                <div class="reason-back">
                    <p>${item.reason}</p>
                </div>
            </div>
        `;
        reasonsContainer.appendChild(cardContainer);
    });

    // Music Player Section
    document.getElementById("music-title").textContent = CONFIG.music.title;
    document.getElementById("music-artist").textContent = CONFIG.music.artist;
    document.getElementById("music-art").src = CONFIG.music.albumArt;
    
    const audio = document.getElementById("bg-music");
    audio.src = CONFIG.music.file;

    // Promises Section
    const promisesContainer = document.getElementById("promises-container");
    promisesContainer.innerHTML = '';
    CONFIG.promises.forEach(item => {
        const card = document.createElement("div");
        card.className = "promise-card glass-card";
        
        // Define SVG strings dynamically based on icons requested
        let iconSvg = `<i data-lucide="heart"></i>`;
        if (item.icon === "compass") iconSvg = `<i data-lucide="compass"></i>`;
        if (item.icon === "smile") iconSvg = `<i data-lucide="smile"></i>`;
        if (item.icon === "sun") iconSvg = `<i data-lucide="sun"></i>`;
        
        card.innerHTML = `
            <div class="promise-icon-wrapper">
                ${iconSvg}
            </div>
            <h3 class="promise-card-title">${item.title}</h3>
            <p class="promise-card-desc">${item.description}</p>
        `;
        promisesContainer.appendChild(card);
    });

    // Final Message Section
    document.getElementById("final-title").textContent = CONFIG.finalMessage.title;
    document.getElementById("final-text").textContent = CONFIG.finalMessage.text;
    document.getElementById("footer-note").innerHTML = `${CONFIG.coupleNames} &bull; Made with Love &bull; &copy; ${new Date().getFullYear()}`;

    // Reload Lucide Icons to render new tags
    lucide.createIcons();
}

/* =======================================================
   3. SKY EFFECTS GENERATOR (ALIVE BACKGROUND)
======================================================= */
function initSkyEffects() {
    const starsContainer = document.getElementById("stars-container");
    const cloudsContainer = document.getElementById("clouds-container");
    const sparklesContainer = document.getElementById("sparkles-container");

    // A. Generate Twinkling Stars
    const starCount = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "bg-star";
        
        const size = Math.random() * 2 + 1; // 1px to 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 5;
        star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;
        
        starsContainer.appendChild(star);
    }

    // B. Generate Ghibli Clouds
    const cloudCount = window.innerWidth < 768 ? 4 : 8;
    for (let i = 0; i < cloudCount; i++) {
        spawnCloud(cloudsContainer, true); // initial clouds distributed
    }
    // Spawn cloud loop
    setInterval(() => {
        if (cloudsContainer.children.length < 12) {
            spawnCloud(cloudsContainer, false); // spawn on right edge
        }
    }, 15000);

    // C. Generate Subtle Sparkles
    const sparkleCount = window.innerWidth < 768 ? 10 : 25;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle-element";
        sparkle.innerHTML = "✦";
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.left = `${Math.random() * 100}vw`;
        
        const duration = Math.random() * 4 + 4; // 4s to 8s
        const delay = Math.random() * 10;
        sparkle.style.animation = `sparkleAnim ${duration}s ease-in-out ${delay}s infinite`;
        
        sparklesContainer.appendChild(sparkle);
    }

    // D. Spawn Floating Butterflies
    const butterflyCount = window.innerWidth < 768 ? 2 : 4;
    for (let i = 0; i < butterflyCount; i++) {
        spawnButterfly(true);
    }
    setInterval(() => {
        spawnButterfly(false);
    }, 12000);
}

function spawnCloud(container, distributeInitially) {
    const cloud = document.createElement("div");
    cloud.className = "bg-cloud";
    
    const width = Math.random() * 200 + 150; // 150px to 350px
    const height = width * 0.45;
    cloud.style.width = `${width}px`;
    cloud.style.height = `${height}px`;
    
    const topPos = Math.random() * 50; // top 50% of the screen
    cloud.style.top = `${topPos}vh`;
    
    const startLeft = distributeInitially ? (Math.random() * 120 - 20) : 110;
    cloud.style.left = `${startLeft}vw`;
    
    const speed = Math.random() * 40 + 60; // 60s to 100s across screen
    cloud.style.transition = `left ${speed}s linear`;
    
    container.appendChild(cloud);
    
    // Animate movement via transform-free left transitions to allow easy recycling
    setTimeout(() => {
        cloud.style.left = `-50vw`;
    }, 100);

    // Remove when offscreen
    setTimeout(() => {
        cloud.remove();
    }, speed * 1000);
}

function spawnButterfly(initial) {
    const parent = document.body;
    const butterfly = document.createElement("div");
    butterfly.className = "butterfly";
    
    butterfly.innerHTML = `
        <div class="butterfly-wing left"></div>
        <div class="butterfly-wing right"></div>
    `;
    
    const startX = initial ? (Math.random() * 100) : -5;
    const startY = Math.random() * 80 + 10;
    
    butterfly.style.left = `${startX}vw`;
    butterfly.style.top = `${startY}vh`;
    
    // Tiny scale variation
    const scale = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
    butterfly.style.transform = `scale(${scale})`;
    
    parent.appendChild(butterfly);
    
    // Slow drift animation
    const duration = Math.random() * 15 + 15; // 15s to 30s
    let currentX = startX;
    let currentY = startY;
    
    const interval = setInterval(() => {
        currentX += 0.4; // move right
        currentY -= Math.sin(currentX / 2) * 0.5 + 0.1; // gentle weave up
        
        butterfly.style.left = `${currentX}vw`;
        butterfly.style.top = `${currentY}vh`;
        
        if (currentX > 105 || currentY < -5) {
            clearInterval(interval);
            butterfly.remove();
        }
    }, 50);
}

/* =======================================================
   4. CORE INTERACTIONS AND CINEMATIC OPENING
======================================================= */
function initInteractions() {
    const giftBox = document.getElementById("gift-box");
    const openingOverlay = document.getElementById("opening-overlay");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    
    // A. CINEMATIC GIFT BOX OPENING
    giftBox.addEventListener("click", () => {
        // Trigger untie
        giftBox.classList.add("opening");
        
        // Ribbon components slide away
        const bow = document.getElementById("satin-bow");
        const ribbonV = document.querySelector(".ribbon-vertical");
        const ribbonH = document.querySelector(".ribbon-horizontal");
        
        bow.style.transform = "scale(0) rotate(45deg)";
        bow.style.opacity = "0";
        
        setTimeout(() => {
            ribbonV.style.transform = "translateY(-200px)";
            ribbonV.style.opacity = "0";
            ribbonH.style.transform = "translateX(200px)";
            ribbonH.style.opacity = "0";
        }, 300);
        
        // Lid flies off
        setTimeout(() => {
            const lid = document.querySelector(".box-lid");
            lid.style.transform = "translateY(-400px) rotate(-60deg) scale(0.7)";
            lid.style.opacity = "0";
        }, 800);
        
        // Glowing light bursts out
        setTimeout(() => {
            const glow = document.getElementById("box-glow");
            glow.style.transform = "translate(-50%, -50%) scale(22)";
            glow.style.background = "radial-gradient(circle, rgba(166, 212, 255, 0.95) 0%, rgba(255,255,255,1) 70%)";
            glow.style.filter = "blur(0)";
            
            // Spawn rapid particles explosion from the center box
            explodeBoxParticles();
        }, 1100);
        
        // Fade in main site, start music, fade overlay
        setTimeout(() => {
            openingOverlay.classList.add("zoom-fade");
            mainContent.classList.remove("hidden");
            
            // Force browser reflow to allow smooth layout fade-in
            mainContent.offsetHeight;
            mainContent.classList.add("visible");
            
            // Audio starts playing
            bgMusic.volume = 0.6;
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay blocked, waiting for next user touch to play music.");
                });
            }
            
            // Scroll to top just in case
            window.scrollTo(0,0);
        }, 2200);

        // Terminate overlay entirely after transition
        setTimeout(() => {
            openingOverlay.remove();
        }, 4000);
    });

    // B. HERO BUTTON SCROLL
    document.getElementById("hero-action-btn").addEventListener("click", () => {
        const counterSection = document.getElementById("counter-section");
        counterSection.scrollIntoView({ behavior: 'smooth' });
    });

    // C. SCROLL REVEAL OBSERVER
    const reveals = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => revealObserver.observe(el));

    // D. TIMELINE PROGRESS SCROLL BAR
    const timelineContainer = document.getElementById("timeline-container");
    const timelineProgress = document.getElementById("timeline-progress");
    const timelineItems = document.querySelectorAll(".timeline-item");
    
    window.addEventListener("scroll", () => {
        if (!timelineContainer) return;
        const rect = timelineContainer.getBoundingClientRect();
        const winHeight = window.innerHeight;
        
        // Calculate progress percentage
        let progress = 0;
        if (rect.top < winHeight / 2) {
            const totalHeight = rect.height - 100;
            const scrolled = (winHeight / 2) - rect.top;
            progress = Math.min(Math.max((scrolled / totalHeight) * 100, 0), 100);
        }
        timelineProgress.style.height = `${progress}%`;
        
        // Active timeline node thresholds
        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < winHeight * 0.65) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    });

    // E. SCRAPBOOK POLAROID LIGHTBOX
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const lightboxCap = document.getElementById("lightbox-caption");
    const galleryItems = document.querySelectorAll(".gallery-item");
    
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            const caption = item.querySelector(".polaroid-caption");
            
            lightboxImg.src = img.src;
            lightboxCap.textContent = caption.textContent;
            
            lightbox.classList.add("active");
        });
    });

    document.getElementById("lightbox-close").addEventListener("click", () => {
        lightbox.classList.remove("active");
    });
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
    });

    // F. ENVELOPES CLICK CONTROLS (Handwriting Modal Typewriter effect)
    const envelopes = document.querySelectorAll(".envelope");
    
    // Create temporary modal overlay for detailed fullscreen reading of letters
    const letterModal = document.createElement("div");
    letterModal.className = "letter-modal";
    letterModal.innerHTML = `
        <div class="letter-modal-paper">
            <button class="letter-modal-close"><i data-lucide="x"></i></button>
            <div class="letter-modal-text"></div>
        </div>
    `;
    document.body.appendChild(letterModal);
    lucide.createIcons({ attrs: { class: 'letter-modal-close-icon' } }); // refresh icon

    // letter closing trigger
    letterModal.querySelector(".letter-modal-close").addEventListener("click", () => {
        letterModal.classList.remove("active");
        document.querySelectorAll(".envelope-wrapper").forEach(w => w.classList.remove("open"));
    });

    envelopes.forEach(envelope => {
        envelope.addEventListener("click", (e) => {
            const index = envelope.getAttribute("data-index");
            const wrapper = envelope.closest(".envelope-wrapper");
            
            // toggle open envelope classes
            wrapper.classList.add("open");
            
            // Delay typing animation until envelope flap completes sliding paper up
            setTimeout(() => {
                const text = CONFIG.letters[index].text;
                letterModal.classList.add("active");
                typeWriterEffect(letterModal.querySelector(".letter-modal-text"), text);
            }, 1000);
        });
    });

    // G. REASONS CARD FLIP CONTROLS
    const reasonCards = document.querySelectorAll(".reason-card");
    reasonCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });

    // H. FINALメッセージ HEARTS CLIMAX GENERATION
    setInterval(() => {
        const finalSec = document.getElementById("final-section");
        const container = document.getElementById("heart-burst-container");
        
        // Only run when Final section is in viewport
        const rect = finalSec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            spawnFinalHeart(container);
        }
    }, 450);
}

// Sparkle/butterfly explosion particles generator
function explodeBoxParticles() {
    const parent = document.getElementById("magical-particles");
    const rect = document.getElementById("gift-container").getBoundingClientRect();
    const boxX = rect.left + rect.width / 2;
    const boxY = rect.top + rect.height / 2;

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        
        const size = Math.random() * 6 + 4; // 4px to 10px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random pastel blue/white tones
        const colors = ["#FFFFFF", "#A6D4FF", "#6AAEFF", "#EAF5FF"];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${THEME.glow}`;
        
        particle.style.left = `${boxX}px`;
        particle.style.top = `${boxY}px`;
        
        parent.appendChild(particle);
        
        // Speed and direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 4;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        let x = boxX;
        let y = boxY;
        let opacity = 1;
        
        const pInterval = setInterval(() => {
            x += cos * velocity;
            y += sin * velocity - 0.25; // float slightly up
            opacity -= 0.02;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(pInterval);
                particle.remove();
            }
        }, 16);
    }
}

// Letter Typewriter handwriting effect
let typingTimer = null;
function typeWriterEffect(element, text) {
    element.innerHTML = "";
    element.classList.add("typewriter-cursor");
    
    if (typingTimer) clearInterval(typingTimer);
    
    let charIndex = 0;
    typingTimer = setInterval(() => {
        if (charIndex < text.length) {
            // Replace newlines with break elements
            if (text[charIndex] === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += text[charIndex];
            }
            charIndex++;
        } else {
            clearInterval(typingTimer);
            element.classList.remove("typewriter-cursor");
        }
    }, 35); // handwriting speed
}

// Final Messages floating heart spawner
function spawnFinalHeart(container) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "❤️";
    
    // Random sizes and positions
    const size = Math.random() * 1.5 + 0.8; // 0.8rem to 2.3rem
    heart.style.fontSize = `${size}rem`;
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.bottom = `-20px`;
    
    const duration = Math.random() * 4 + 4; // 4s to 8s
    heart.style.animation = `floatHeart ${duration}s linear forwards`;
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

/* =======================================================
   5. RELATIONSHIP COUNTER LOOP
======================================================= */
function initCounter() {
    if (typeof CONFIG === "undefined") return;

    const countY = document.getElementById("count-years");
    const countM = document.getElementById("count-months");
    const countD = document.getElementById("count-days");
    const countH = document.getElementById("count-hours");
    const countMin = document.getElementById("count-minutes");
    const countSec = document.getElementById("count-seconds");

    function calculateTime() {
        const start = new Date(CONFIG.relationshipDate);
        const now = new Date();
        
        let diffMs = now - start;
        if (diffMs < 0) diffMs = 0;

        // Calculate exact calendar-based breakdown for years and months
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();

        if (days < 0) {
            // borrow days from previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        // Remaining exact time breakdown for the final day
        const msInSec = 1000;
        const msInMin = msInSec * 60;
        const msInHour = msInMin * 60;
        
        // Grab start time values
        const startSecs = start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
        const nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        let timeDiffSecs = nowSecs - startSecs;

        if (now.getDate() !== start.getDate() && timeDiffSecs < 0) {
            // adjusted days and count details
            timeDiffSecs += 86400; // seconds in day
        }

        // calculate precise hours, mins, secs remaining
        const hours = Math.floor(timeDiffSecs / 3600);
        const minutes = Math.floor((timeDiffSecs % 3600) / 60);
        const seconds = Math.floor(timeDiffSecs % 60);

        // Update DOM values
        countY.textContent = String(years).padStart(2, '0');
        countM.textContent = String(months).padStart(2, '0');
        countD.textContent = String(days).padStart(2, '0');
        countH.textContent = String(hours).padStart(2, '0');
        countMin.textContent = String(minutes).padStart(2, '0');
        countSec.textContent = String(seconds).padStart(2, '0');
    }

    calculateTime();
    setInterval(calculateTime, 1000);
}

/* =======================================================
   6. CUSTOM MUSIC PLAYER
======================================================= */
function initMusicPlayer() {
    const audio = document.getElementById("bg-music");
    const headerToggle = document.getElementById("music-toggle");
    const playBtn = document.getElementById("player-play-btn");
    const vinyl = document.getElementById("vinyl-disc");
    
    const progressTrack = document.getElementById("progress-track");
    const progressFill = document.getElementById("progress-fill");
    const progressHandle = document.getElementById("progress-handle");
    
    const volumeTrack = document.getElementById("volume-track");
    const volumeFill = document.getElementById("volume-fill");

    const timeCurrent = document.getElementById("time-current");
    const timeTotal = document.getElementById("time-total");

    // helper play pause toggles
    function togglePlayback() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    // Playback state synchronization
    function syncPlaybackState(isPlaying) {
        if (isPlaying) {
            // Header Toggle button icon playing
            headerToggle.querySelector(".icon-playing").classList.remove("hidden");
            headerToggle.querySelector(".icon-paused").classList.add("hidden");
            
            // Player Play button play icon toggled to pause
            playBtn.querySelector(".btn-play-icon").classList.add("hidden");
            playBtn.querySelector(".btn-pause-icon").classList.remove("hidden");
            
            // Spin vinyl
            vinyl.classList.add("playing");
        } else {
            // Header toggle paused
            headerToggle.querySelector(".icon-playing").classList.add("hidden");
            headerToggle.querySelector(".icon-paused").classList.remove("hidden");
            
            // Player Play pause icons toggled
            playBtn.querySelector(".btn-play-icon").classList.remove("hidden");
            playBtn.querySelector(".btn-pause-icon").classList.add("hidden");
            
            // Stop spinning vinyl
            vinyl.classList.remove("playing");
        }
    }

    // click event handlers
    headerToggle.addEventListener("click", togglePlayback);
    playBtn.addEventListener("click", togglePlayback);

    audio.addEventListener("play", () => syncPlaybackState(true));
    audio.addEventListener("pause", () => syncPlaybackState(false));

    // Audio time update formats
    audio.addEventListener("timeupdate", () => {
        const cur = audio.currentTime;
        const dur = audio.duration || 0;
        
        // Update seekbar percents
        const pct = dur > 0 ? (cur / dur) * 100 : 0;
        progressFill.style.width = `${pct}%`;
        progressHandle.style.left = `${pct}%`;
        
        // Update timers text
        timeCurrent.textContent = formatTime(cur);
        if (dur) timeTotal.textContent = formatTime(dur);
    });

    audio.addEventListener("loadedmetadata", () => {
        timeTotal.textContent = formatTime(audio.duration);
    });

    // Seek track functionality
    progressTrack.addEventListener("click", (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        
        if (audio.duration) {
            audio.currentTime = pct * audio.duration;
        }
    });

    // Volume fill adjustment
    volumeTrack.addEventListener("click", (e) => {
        const rect = volumeTrack.getBoundingClientRect();
        const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        
        audio.volume = pct;
        volumeFill.style.width = `${pct * 100}%`;
    });

    function formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }
}
