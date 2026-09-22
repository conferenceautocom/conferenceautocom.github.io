export const renderAbout = (config) => {
  const about = config.site.about || {};
  return `
    <section class="about-section">
      <div class="container">
        <h2 class="section-title">${about.heading || 'About Us'}</h2>
        <div class="about-content">
          ${(about.paragraphs || []).map(p => `<p class="about-para">${p}</p>`).join('')}
          
          <div class="about-objectives" style="${(!about.objectives || about.objectives.length === 0) ? 'display: none;' : ''}">
            <h3 class="objectives-title">${about.objectivesHeading || ''}</h3>
            <ul class="objectives-list">
              ${(about.objectives || []).map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>

          <div class="about-takeaways" style="${(!about.takeaways || about.takeaways.length === 0) ? 'display: none;' : ''}">
            <h3 class="takeaways-title">Key Takeaways of AutoCom-26</h3>
            <ul class="takeaways-list">
              ${(about.takeaways || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
};

export const renderRegistration = (data) => {
  if (!data) return '<section class="section-placeholder"><div class="container"><p>Registration details unavailable.</p></div></section>';

  const { importantDates, fees, bankDetails } = data;

  return `
    <section class="registration-section">
      <div class="container">
        <h2 class="section-title">Registration</h2>
        
        <div class="registration-grid">
          <!-- Important Dates -->
          <div class="registration-card dates-card">
            <h3 class="card-title">📅 Important Dates</h3>
            <ul class="dates-list">
              ${importantDates.map(d => `
                <li>
                  <span class="date-label">${d.label}</span>
                  <span class="date-value">${d.date}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Registration Fees -->
          <div class="registration-card fees-card">
            <h3 class="card-title">💰 Registration Fees</h3>
            <div class="table-responsive">
              <table class="fees-table">
                <thead>
                  <tr>
                    ${fees.columns.map(col => `<th>${col}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${fees.rows.map(row => `
                    <tr>
                      <td>${row.category}</td>
                      <td class="price">${row.indian}</td>
                      <td class="price">${row.international}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bank Details -->
          <div class="registration-card bank-card">
            <h3 class="card-title">🏦 Bank / Payment Details</h3>
            <div class="table-responsive">
              <table class="bank-table">
                <tbody>
                  <tr>
                    <th>Beneficiary Name</th>
                    <td>${bankDetails.beneficiaryName}</td>
                  </tr>
                  <tr>
                    <th>Bank Name</th>
                    <td>${bankDetails.bankName}</td>
                  </tr>
                  <tr>
                    <th>Branch</th>
                    <td>${bankDetails.branch}</td>
                  </tr>
                  <tr>
                    <th>IFSC Code</th>
                    <td class="code">${bankDetails.ifscCode}</td>
                  </tr>
                  <tr>
                    <th>Account Number</th>
                    <td class="code">${bankDetails.accountNumber}</td>
                  </tr>
                  <tr>
                    <th>Branch Code</th>
                    <td class="code">${bankDetails.branchCode}</td>
                  </tr>
                  <tr>
                    <th>Bank Address</th>
                    <td>${bankDetails.bankAddress}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};

export const renderGuidelines = (data) => {
  if (!data) return '<section class="section-placeholder"><div class="container"><p>Guidelines unavailable.</p></div></section>';

  return `
    <section class="guidelines-section">
      <div class="container">
        <h2 class="section-title">Conference Guidelines</h2>
        
        <div class="guidelines-grid">
          ${data.sections.map(section => `
            <div class="guidelines-card">
              <h3 class="card-title">${section.title}</h3>
              <ul class="guidelines-list">
                ${section.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
              
              ${section.subsections ? section.subsections.map(sub => `
                <div class="guidelines-subsection">
                  <h4 class="subsection-title">${sub.title}</h4>
                  <ul class="guidelines-list compact">
                    ${sub.items.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
              `).join('') : ''}

              ${section.actions ? `
                <div class="card-actions">
                  ${section.actions.map(act => `
                    <a href="${act.url}" class="btn btn-outline btn-sm" target="_blank">
                      ${act.text}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

export const renderHero = (config) => `
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <span class="tag">${config.site.year} | ${config.site.location}</span>
        ${config.site.ieeeRecordNumber ? `<span class="tag ieee-tag">IEEE Record Number: ${config.site.ieeeRecordNumber}</span>` : ''}
        <h1>${config.site.fullName}</h1>
        <p class="tagline">${config.site.tagline}</p>
        <p class="dates">${config.site.dates}</p>
        ${config.site.articleSubmissionDeadline ? `<p class="deadline">Article Submission: ${config.site.articleSubmissionDeadline}</p>` : ''}
        ${config.site.mode ? `<p class="hero-mode">Conference Mode: <strong>${config.site.mode}</strong></p>` : ''}
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="window.navigate('registration')">Register Now</button>
          <button class="btn btn-primary hero-btn-itinerary" onclick="window.navigate('itinerary')">🗓️ (Tentative) Conference Itinerary</button>
          <button class="btn btn-primary hero-btn-schedule" onclick="window.navigate('schedule')">📑 (Tentative) Presentation Schedule Summary</button>
        </div>
      </div>
    </div>
  </section>
`;

export const parseSpeakersCSV = (csvText) => {
  if (!csvText || typeof csvText !== 'string') return [];
  const lines = parseCSVRows(csvText);
  if (lines.length < 2) return [];

  const headers = lines[0].map(h => h.trim().toLowerCase());
  const getIndex = (names) => headers.findIndex(h => names.some(n => h === n || h.includes(n)));

  const idIdx = getIndex(['id']);
  const nameIdx = getIndex(['name', 'speaker', 'speaker name']);
  const roleIdx = getIndex(['role', 'type', 'designation']);
  const affIdx = getIndex(['affiliation', 'institution', 'organization', 'org']);
  const bioIdx = getIndex(['bio', 'description', 'biography', 'about']);
  const imgIdx = getIndex(['image', 'photo', 'avatar', 'img']);

  const speakers = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    const name = (nameIdx !== -1 && row[nameIdx]) ? row[nameIdx].trim() : '';
    if (!name) continue;

    speakers.push({
      id: (idIdx !== -1 && row[idIdx]) ? row[idIdx].trim() : String(i),
      name: name,
      role: (roleIdx !== -1 && row[roleIdx]) ? row[roleIdx].trim() : 'Keynote Speaker',
      affiliation: (affIdx !== -1 && row[affIdx]) ? row[affIdx].trim() : '',
      bio: (bioIdx !== -1 && row[bioIdx]) ? row[bioIdx].trim() : '',
      image: (imgIdx !== -1 && row[imgIdx]) ? row[imgIdx].trim() : ''
    });
  }
  return speakers;
};

export const renderSpeakers = (rawInput) => {
  const speakers = typeof rawInput === 'string' ? parseSpeakersCSV(rawInput) : (rawInput || []);

  if (!Array.isArray(speakers) || speakers.length === 0) {
    return `
      <section class="speakers-page">
        <div class="container" style="text-align: center; padding: 4rem 0;">
          <h2 class="section-title">Distinguished Speakers</h2>
          <div class="coming-soon-banner" style="max-width: 600px; margin: 0 auto; background: var(--surface); padding: 4rem; border-radius: 1.5rem; border: 1px dashed var(--accent);">
            <span style="font-size: 4rem; display: block; margin-bottom: 1.5rem;">🎙️</span>
            <h3>Distinguished Speakers Coming Soon</h3>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-top: 1rem;">
              We are currently in the process of inviting leading experts and pioneers in the fields of Automation and Computation. The full list of speakers will be announced shortly.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="speakers-page">
      <div class="container">
        <div class="schedule-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="schedule-badge">KEYNOTES & LECTURES</span>
          <h2 class="section-title">Distinguished Speakers</h2>
          <p class="schedule-subtitle">Eminent academicians, researchers, and industry leaders presenting at AutoCom-26</p>
        </div>
        <div class="data-grid speakers-grid">
          ${speakers.map(s => `
            <div class="card speaker-card">
              ${s.image ? `
                <div class="speaker-avatar-wrap">
                  <img src="${s.image}" alt="${s.name}" class="speaker-avatar" onerror="this.style.display='none'">
                </div>
              ` : ''}
              <div class="speaker-role">${s.role}</div>
              <h3 class="speaker-name">${s.name}</h3>
              ${s.affiliation ? `<p class="affiliation">${s.affiliation}</p>` : ''}
              ${s.bio ? `<p class="bio">${s.bio}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

export const renderTracks = (tracks) => `
  <section class="tracks">
    <div class="container">
      <h2 class="section-title">Technical Tracks</h2>
      <div class="data-grid tracks-grid">
        ${tracks.map(t => `
          <div class="card track-card">
            <div class="track-header">
              <div class="track-id">${t.id}</div>
              <h3>${t.title}</h3>
            </div>
            ${t.description ? `<p class="track-desc">${t.description}</p>` : ''}
            <div class="track-topics">
              <h4>Topics include:</h4>
              <ul>
                ${t.topics.map(topic => `<li>${topic}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

export const renderCommittees = (data) => {
  const categories = data.categories;

  return `
    <section class="committee">
      <div class="container">
        <h2 class="section-title">Committee</h2>
        
        ${categories.map(cat => `
          <div class="committee-category" id="cat-${cat.id}">
            <h3 class="category-title">${cat.title}</h3>
            
            ${cat.roles ? cat.roles.map(role => `
              <div class="role-group">
                <h4 class="role-title">${role.role_name}</h4>
                <div class="member-grid">
                  ${role.members.map(m => `
                    <div class="member-card">
                      <h5>${m.name}</h5>
                      <p>${m.affiliation}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('') : ''}
            
            ${cat.subgroups ? `
              <div class="subgroups-container">
                ${cat.subgroups.map(sub => `
                  <div class="committee-subgroup">
                    <h4 class="subgroup-title">${sub.name}</h4>
                    <div class="member-list-compact">
                      ${sub.members.map(m => `
                        <div class="compact-member">
                          <strong>${m.name}</strong>, <span class="affiliation-text">${m.affiliation}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cat.members ? `
              <div class="member-grid">
                ${cat.members.map(m => `
                  <div class="member-card">
                    <h5>${m.name}</h5>
                    <p>${m.affiliation}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
        
      </div>
    </section>
  `;
};

export const renderPartners = (config) => {
  const branding = config.site.branding || {};
  if (!branding.logo_ieee && !branding.logo_drdo) return '';

  return `
    <section class="partner-strip">
      <div class="container">
        <div class="partner-logos">
          ${branding.logo_ieee ? `
            <div class="partner-item">
              <p style="margin-bottom: 1.25rem; color: var(--text-muted); font-weight: 600; line-height: 1.4;">Technically Co-sponsored by<br><span style="color: var(--primary); font-weight: 700;">IEEE Uttar Pradesh Section</span></p>
              <img src="${branding.logo_ieee}" alt="IEEE UP Section" class="logo-partner">
            </div>
          ` : ''}
          ${branding.logo_drdo ? `
            <div class="partner-item">
              <p style="margin-bottom: 1.25rem; color: var(--text-muted); font-weight: 600; line-height: 1.4;">Financially Supported by<br><span style="color: var(--primary); font-weight: 700;">DRDO (IRDE)</span></p>
              <img src="${branding.logo_drdo}" alt="DRDO" class="logo-partner">
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;
};

export const renderFooter = (config) => `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>${config.site.title}</h3>
          <p>${config.site.fullName}</p>
        </div>
        <div class="footer-contact">
          <h4>Contact Us</h4>
          <p>${config.contact.email}</p>
          <p>${config.contact.address}</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} AUTOCOM. All rights reserved.
      </div>
    </div>
  </footer>
`;

export const renderCFP = (data) => `
  <section class="cfp-section">
    <div class="container">
      <h2 class="section-title">${data.title}</h2>
      <div class="cfp-content">
        <h3 class="cfp-subtitle">${data.subtitle}</h3>
        <p class="cfp-description">${data.description}</p>
        
        <div class="cfp-tracks">
          <h4>${data.tracksHeading}</h4>
          <ul class="tracks-list">
            ${data.tracks.map(track => `<li>${track}</li>`).join('')}
          </ul>
        </div>
        
        <p class="cfp-closing">${data.closing}</p>
        
        <div class="cfp-awards">
          <h4>${data.awards.heading}</h4>
          <ul class="awards-list">
            ${data.awards.items.map(award => `<li>${award}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

export const renderGallery = (data) => {
  const conferencePhotos = data.conference || [];
  const nearbyPhotos = data.nearby || [];
  let autoplayIntervals = {};

  // Define tab switching function in global scope
  window.switchGalleryTab = (category) => {
    // Update button states
    document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.gallery-tab-btn[onclick*="${category}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update content visibility
    document.querySelectorAll('.gallery-category-content').forEach(content => {
      content.classList.remove('active');
    });
    const activeContent = document.getElementById(`gallery-${category}`);
    if (activeContent) activeContent.classList.add('active');

    // Handle autoplay: stop all and start current
    stopAllAutoplay();
    startAutoplay(category);
  };

  // Define scroll function in global scope
  window.scrollGallery = (category, direction) => {
    const slider = document.querySelector(`#gallery-${category} .gallery-slider`);
    if (!slider) return;

    const items = slider.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    // Calculate item width including gap
    const itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(slider).gap);
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction === 'next') {
      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    } else {
      if (slider.scrollLeft <= 10) {
        slider.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }
  };

  const startAutoplay = (category) => {
    if (autoplayIntervals[category]) return;
    autoplayIntervals[category] = setInterval(() => {
      window.scrollGallery(category, 'next');
    }, 4500); // Slightly slower for better experience
  };

  const stopAutoplay = (category) => {
    if (autoplayIntervals[category]) {
      clearInterval(autoplayIntervals[category]);
      delete autoplayIntervals[category];
    }
  };

  const stopAllAutoplay = () => {
    Object.keys(autoplayIntervals).forEach(cat => stopAutoplay(cat));
  };

  // Expose for hover events
  window.pauseGallery = (category) => stopAutoplay(category);
  window.resumeGallery = (category) => {
    const activeContent = document.getElementById(`gallery-${category}`);
    if (activeContent && activeContent.classList.contains('active')) {
      startAutoplay(category);
    }
  };

  // Initialize first autoplay
  setTimeout(() => startAutoplay('conference'), 2000);

  return `
    <section class="gallery-section">
      <div class="container">
        <h2 class="section-title">Photo Gallery</h2>
        
        <div class="gallery-tabs">
          <button class="gallery-tab-btn active" onclick="switchGalleryTab('conference')">Conference Gallery</button>
          ${nearbyPhotos.length > 0 ? `<button class="gallery-tab-btn" onclick="switchGalleryTab('nearby')">Nearby Places to Visit</button>` : ''}
        </div>

        <div id="gallery-conference" class="gallery-category-content active">
          <div class="slider-container" 
               onmouseenter="pauseGallery('conference')" 
               onmouseleave="resumeGallery('conference')">
            <button class="slider-nav-btn prev" onclick="scrollGallery('conference', 'prev')">❮</button>
            <div class="gallery-slider">
              ${conferencePhotos.map(p => `
                <div class="gallery-item">
                  <img src="${p.url}" alt="${p.caption}" loading="lazy">
                  <div class="gallery-overlay">
                    <p>${p.caption}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="slider-nav-btn next" onclick="scrollGallery('conference', 'next')">❯</button>
          </div>
        </div>
        
        ${nearbyPhotos.length > 0 ? `
          <div id="gallery-nearby" class="gallery-category-content">
            <div class="slider-container"
                 onmouseenter="pauseGallery('nearby')" 
                 onmouseleave="resumeGallery('nearby')">
              <button class="slider-nav-btn prev" onclick="scrollGallery('nearby', 'prev')">❮</button>
              <div class="gallery-slider">
                ${nearbyPhotos.map(p => `
                  <div class="gallery-item">
                    <img src="${p.url}" alt="${p.caption}" loading="lazy">
                    <div class="gallery-overlay">
                      <p>${p.caption}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
              <button class="slider-nav-btn next" onclick="scrollGallery('nearby', 'next')">❯</button>
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `;
};





export const renderContact = (config) => {
  const contact = config.contact || {};
  return `
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">Contact Us</h2>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-card">
              <div class="card-icon">📍</div>
              <h4>Local Address</h4>
              <p>${contact.address}</p>
            </div>
            <div class="contact-card">
              <div class="card-icon">📧</div>
              <h4>Email Support</h4>
              <p><a href="mailto:${contact.email}">${contact.email}</a></p>
            </div>
            <div class="contact-card">
              <div class="card-icon">📞</div>
              <h4>Phone Number</h4>
              <p>${contact.phone}</p>
            </div>
          </div>
          
          <div class="contact-queries">
            <h3 class="queries-title">Specific Queries</h3>
            ${(contact.queries || []).map(q => `
              <div class="query-group">
                <h4>${q.type}</h4>
                <ul>
                  ${q.contacts.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>

        ${contact.howToReach ? `
          <div class="how-to-reach" style="margin-top: 4rem;">
            <h3 class="section-title" style="font-size: 1.8rem; margin-bottom: 2rem;">How to Reach</h3>
            <div class="reach-graph" style="max-width: 800px; margin: 0 auto; background: var(--surface); padding: 2.5rem; border-radius: 1rem; border: 1px solid var(--border); box-shadow: var(--shadow);">
              ${contact.howToReach.map(item => `
                <div class="reach-item" style="margin-bottom: 2rem;">
                  <div class="reach-label" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; font-weight: 500;">
                    <span style="font-size: 1.1rem; display: flex; align-items: center; gap: 0.8rem;">
                      <span style="font-size: 1.5rem; background: var(--bg); padding: 0.5rem; border-radius: 0.5rem;">${item.icon}</span> 
                      ${item.mode}
                    </span>
                    <span style="color: var(--accent); font-weight: bold; font-size: 1.2rem; background: var(--primary-light); padding: 0.2rem 0.8rem; border-radius: 1rem;">${item.distance}</span>
                  </div>
                  <div class="reach-timeline" style="display: flex; justify-content: space-between; position: relative; margin-top: 1.5rem; padding-top: 1rem;">
                    <!-- Connecting Line -->
                    <div style="position: absolute; top: 1.6rem; left: ${(100 / (item.nodes.length * 2))}%; right: ${(100 / (item.nodes.length * 2))}%; height: 4px; background: var(--border); z-index: 1;">
                       <div style="height: 100%; width: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); opacity: 0.8;"></div>
                    </div>
                    
                    <!-- Nodes -->
                    ${(item.nodes || []).map((node, i) => `
                      <div class="timeline-node" style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; width: ${100 / item.nodes.length}%; text-align: center;">
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--surface); border: 5px solid ${i === 0 ? 'var(--primary)' : (i === item.nodes.length - 1 ? 'var(--accent)' : 'var(--border)')}; margin-bottom: 0.8rem; box-shadow: 0 0 0 4px var(--surface);"></div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text); line-height: 1.2; margin-bottom: 0.3rem;">${node.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${node.detail}</div>
                        
                        ${node.distanceToNext ? `
                          <!-- Edge weight -->
                          <div style="position: absolute; top: 0.8rem; right: 0; transform: translateX(50%); background: var(--surface); border: 1px solid var(--accent); color: var(--accent); font-size: 0.75rem; font-weight: 700; padding: 0.1rem 0.5rem; border-radius: 12px; z-index: 5; box-shadow: 0 2px 4px rgba(0,0,0,0.05); white-space: nowrap;">
                            ${node.distanceToNext}
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
              <p style="margin-top: 2rem; padding-top: 1rem; border-top: 1px dashed var(--border); font-size: 0.95rem; color: var(--text-muted); text-align: center;">Distances listed are approximate distances to the Graphic Era Hill University campus.</p>
            </div>
          </div>
        ` : ''}

      </div>
    </section>
  `;
};

export const renderDownloads = (config) => {
  const downloads = config.site.importantDownloads || {};
  return `
    <section class="downloads-section">
      <div class="container" style="text-align: center; padding: 3rem 0;">
        <h2 class="section-title">Important Downloads</h2>
        <div class="downloads-grid" style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
          ${downloads.brochure ? `<a href="${downloads.brochure}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Brochure</a>` : ''}
          ${downloads.paperTemplate ? `<a href="${downloads.paperTemplate}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Paper Template</a>` : ''}
        </div>
      </div>
    </section>
  `;
};

export const renderNearbyGallery = (data) => {
  const nearbyPhotos = data.nearby || [];
  if (nearbyPhotos.length === 0) return '';
  
  if (!window.scrollMiniGallery) {
    window.scrollMiniGallery = (direction) => {
      const slider = document.querySelector('#home-nearby-gallery .gallery-slider');
      if (!slider) return;
      const items = slider.querySelectorAll('.gallery-item');
      if (items.length === 0) return;
      const itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(slider).gap || 0);
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (direction === 'next') {
        if (slider.scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      } else {
        if (slider.scrollLeft <= 10) {
          slider.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
      }
    };
    
    window.homeAutoplayInterval = null;
    window.startHomeAutoplay = () => {
      if (window.homeAutoplayInterval) return;
      window.homeAutoplayInterval = setInterval(() => {
        window.scrollMiniGallery('next');
      }, 4000);
    };
    window.stopHomeAutoplay = () => {
      if (window.homeAutoplayInterval) {
        clearInterval(window.homeAutoplayInterval);
        window.homeAutoplayInterval = null;
      }
    };
  }

  setTimeout(() => {
    if (window.startHomeAutoplay) window.startHomeAutoplay();
  }, 1000);

  return `
    <section class="gallery-section home-nearby-section" style="padding-top: 1rem; padding-bottom: 4rem;">
      <div class="container">
        <h2 class="section-title">Nearby Places to Visit</h2>
        <div id="home-nearby-gallery" class="gallery-category-content active">
          <div class="slider-container"
               onmouseenter="stopHomeAutoplay()" 
               onmouseleave="startHomeAutoplay()">
            <button class="slider-nav-btn prev" onclick="scrollMiniGallery('prev')">❮</button>
            <div class="gallery-slider">
              ${nearbyPhotos.map(p => `
                <div class="gallery-item">
                  <img src="${p.url}" alt="${p.caption}" loading="lazy">
                  <div class="gallery-overlay">
                    <p>${p.caption}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="slider-nav-btn next" onclick="scrollMiniGallery('next')">❯</button>
          </div>
        </div>
      </div>
    </section>
  `;
};

// Helper to parse standard CSV text respecting quotes and line breaks
export const parseCSVRows = (csvText) => {
  if (!csvText || typeof csvText !== 'string') return [];
  const lines = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(cell.trim());
      if (row.some(c => c.length > 0)) {
        lines.push(row);
      }
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    if (row.some(c => c.length > 0)) {
      lines.push(row);
    }
  }
  return lines;
};

export const parseItineraryCSV = (csvText) => {
  if (!csvText || typeof csvText !== 'string') {
    return { title: '(Tentative) Conference Itinerary', days: [] };
  }

  const lines = parseCSVRows(csvText);
  if (lines.length < 2) return { title: '(Tentative) Conference Itinerary', days: [] };

  const headers = lines[0].map(h => h.trim().toLowerCase());
  const getIndex = (possibleNames) => {
    return headers.findIndex(h => possibleNames.some(p => h === p || h.includes(p)));
  };

  const dayIdx = getIndex(['day']);
  const dateIdx = getIndex(['date']);
  const themeIdx = getIndex(['theme', 'topic']);
  const timeIdx = getIndex(['time', 'slot']);
  const titleIdx = getIndex(['title', 'session title', 'name']);
  const typeIdx = getIndex(['type', 'category']);
  const locationIdx = getIndex(['location', 'venue', 'hall', 'room']);
  const descIdx = getIndex(['description', 'desc', 'details', 'detail']);
  const parallelIdx = getIndex(['parallel tracks', 'parallel', 'tracks']);

  const daysMap = new Map();

  for (let i = 1; i < lines.length; i++) {
    const r = lines[i];
    const dayName = (dayIdx !== -1 && r[dayIdx]) ? r[dayIdx].trim() : 'Day 1';
    const dateStr = (dateIdx !== -1 && r[dateIdx]) ? r[dateIdx].trim() : '';
    const themeStr = (themeIdx !== -1 && r[themeIdx]) ? r[themeIdx].trim() : '';
    const time = (timeIdx !== -1 && r[timeIdx]) ? r[timeIdx].trim() : '';
    const title = (titleIdx !== -1 && r[titleIdx]) ? r[titleIdx].trim() : '';
    const type = (typeIdx !== -1 && r[typeIdx]) ? r[typeIdx].trim() : 'General';
    const location = (locationIdx !== -1 && r[locationIdx]) ? r[locationIdx].trim() : '';
    const description = (descIdx !== -1 && r[descIdx]) ? r[descIdx].trim() : '';
    const parallelRaw = (parallelIdx !== -1 && r[parallelIdx]) ? r[parallelIdx].trim() : '';

    if (!title && !time) continue;

    if (!daysMap.has(dayName)) {
      daysMap.set(dayName, {
        day: dayName,
        date: dateStr,
        theme: themeStr,
        sessions: []
      });
    }

    const dayObj = daysMap.get(dayName);
    if (!dayObj.date && dateStr) dayObj.date = dateStr;
    if (!dayObj.theme && themeStr) dayObj.theme = themeStr;

    // Parse parallel tracks if present
    const parallel = [];
    if (parallelRaw) {
      const trackSegments = parallelRaw.split(/[\n;]+/).map(s => s.trim()).filter(Boolean);
      for (const seg of trackSegments) {
        let trackName = seg;
        let hallName = '';
        let focusText = '';

        const hallMatch = seg.match(/\[(.*?)\]/);
        if (hallMatch) {
          hallName = hallMatch[1].trim();
          trackName = trackName.replace(hallMatch[0], '').trim();
        }

        const focusMatch = trackName.match(/(?:\(?\s*focus\s*:\s*)([^\)]+)\)?/i);
        if (focusMatch) {
          focusText = focusMatch[1].trim();
          trackName = trackName.replace(/(?:\(?\s*focus\s*:\s*)[^\)]+\)?/i, '').trim();
        }

        trackName = trackName.replace(/[\(\)\[\]\-]+$/, '').trim();

        parallel.push({
          track: trackName || seg,
          hall: hallName || location,
          focus: focusText || 'Oral Presentations & Research Discussions'
        });
      }
    }

    dayObj.sessions.push({
      time: time,
      title: title,
      type: type,
      location: location,
      description: description,
      ...(parallel.length > 0 ? { parallel } : {})
    });
  }

  const defaultGuidelines = [
    {
      icon: "⏱️",
      title: "Presentation Timing",
      detail: "Each oral presentation is allotted 15 minutes total: 10–12 minutes for presentation and 3–5 minutes for Q&A."
    },
    {
      icon: "💻",
      title: "Slide Preparation",
      detail: "Please prepare slides in standard 16:9 widescreen PPTX or PDF format. Laptops with projectors and presentation clickers are provided in all halls."
    },
    {
      icon: "📍",
      title: "Reporting Time",
      detail: "Presenting authors are requested to report to their designated session hall at least 15 minutes prior to session commencement and upload their slides."
    },
    {
      icon: "📜",
      title: "Presentation Certificates",
      detail: "Certificate of Presentation will be issued to the registered presenting author during the Valedictory Ceremony upon successful presentation."
    }
  ];

  return {
    title: '(Tentative) Conference Itinerary',
    subtitle: '4th International Conference on Automation & Computation (AutoCom-26)',
    overview: {
      dates: '22–24 October 2026',
      venue: 'Graphic Era Hill University, Dehradun, India',
      mode: 'Physical / In-Person Mode',
      duration: '15 Minutes per Paper (10–12 min presentation + 3 min Q&A)'
    },
    days: Array.from(daysMap.values()),
    guidelines: defaultGuidelines
  };
};

export const renderItinerary = (rawInput) => {
  if (!rawInput) return '<section class="section-placeholder"><div class="container"><p>Itinerary details unavailable.</p></div></section>';

  // Parse if CSV text string is passed
  const data = typeof rawInput === 'string' ? parseItineraryCSV(rawInput) : rawInput;

  // Register interactive tab switching in window
  window.switchItineraryDay = (dayKey) => {
    document.querySelectorAll('.itinerary-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-day') === String(dayKey));
    });
    document.querySelectorAll('.itinerary-day-block').forEach(block => {
      if (dayKey === 'all') {
        block.style.display = 'block';
      } else {
        block.style.display = block.getAttribute('data-day') === String(dayKey) ? 'block' : 'none';
      }
    });
  };

  const typeConfig = {
    'Keynote': { class: 'type-keynote', icon: '🎙️', label: 'Keynote' },
    'Technical': { class: 'type-technical', icon: '📊', label: 'Technical Session' },
    'Ceremony': { class: 'type-ceremony', icon: '🏆', label: 'Ceremony' },
    'Break': { class: 'type-break', icon: '☕', label: 'Break / Networking' },
    'Panel': { class: 'type-panel', icon: '👥', label: 'Panel' },
    'General': { class: 'type-general', icon: '📋', label: 'General' }
  };

  return `
    <section class="schedule-page">
      <div class="container">
        <div class="schedule-header">
          <span class="schedule-badge">CONFERENCE PROGRAM</span>
          <h2 class="section-title">${data.title || '(Tentative) Conference Itinerary'}</h2>
          <p class="schedule-subtitle">${data.subtitle || '4th International Conference on Automation & Computation (AutoCom-26)'}</p>
          
          <div class="schedule-meta-grid">
            <div class="meta-card">
              <span class="meta-icon">📅</span>
              <div class="meta-info">
                <span class="meta-label">Dates</span>
                <strong>${data.overview?.dates || '22–24 October 2026'}</strong>
              </div>
            </div>
            <div class="meta-card">
              <span class="meta-icon">📍</span>
              <div class="meta-info">
                <span class="meta-label">Venue</span>
                <strong>${data.overview?.venue || 'Graphic Era Hill University, Dehradun'}</strong>
              </div>
            </div>
            <div class="meta-card">
              <span class="meta-icon">🏛️</span>
              <div class="meta-info">
                <span class="meta-label">Mode</span>
                <strong>${data.overview?.mode || 'Physical (In-Person)'}</strong>
              </div>
            </div>
            <div class="meta-card">
              <span class="meta-icon">⏱️</span>
              <div class="meta-info">
                <span class="meta-label">Slot Duration</span>
                <strong>${data.overview?.duration || '15 Mins / Paper'}</strong>
              </div>
            </div>
          </div>

          <div class="schedule-switch-banner">
            <span>Looking for day-wise accepted papers and presentation slots?</span>
            <button class="btn btn-sm btn-outline-accent" onclick="window.navigate('schedule')">
              📑 View (Tentative) Presentation Schedule Summary
            </button>
          </div>
        </div>

        <!-- Day Filter Tabs -->
        <div class="schedule-tabs-container">
          <div class="schedule-tabs">
            <button class="schedule-tab-btn itinerary-tab-btn active" data-day="all" onclick="window.switchItineraryDay('all')">
              <span class="tab-icon">📑</span>
              <span class="tab-text">All Days (Full Overview)</span>
            </button>
            ${(data.days || []).map((d, index) => `
              <button class="schedule-tab-btn itinerary-tab-btn" data-day="${index}" onclick="window.switchItineraryDay(${index})">
                <span class="tab-icon">🗓️</span>
                <span class="tab-text">${d.day} <small>(${d.date.split(',')[1]?.trim() || d.date})</small></span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Day Timelines -->
        <div class="schedule-timeline-wrapper">
          ${(data.days || []).map((d, index) => `
            <div class="schedule-day-block itinerary-day-block" data-day="${index}">
              <div class="day-banner">
                <div class="day-badge">${d.day}</div>
                <div class="day-title-info">
                  <h3>${d.date}</h3>
                  <p class="day-theme">${d.theme}</p>
                </div>
              </div>

              <div class="timeline-list">
                ${(d.sessions || []).map(session => {
                  const type = typeConfig[session.type] || typeConfig['General'];
                  return `
                    <div class="timeline-item ${type.class}">
                      <div class="timeline-marker">
                        <span class="marker-dot"></span>
                        <span class="marker-line"></span>
                      </div>
                      
                      <div class="timeline-card">
                        <div class="session-top">
                          <span class="session-time">⏰ ${session.time}</span>
                          <span class="session-badge ${type.class}">${type.icon} ${session.type}</span>
                        </div>
                        
                        <h4 class="session-title">${session.title}</h4>
                        
                        ${session.location ? `
                          <div class="session-location">
                            <span>📍 ${session.location}</span>
                          </div>
                        ` : ''}

                        ${session.description ? `
                          <p class="session-desc">${session.description}</p>
                        ` : ''}

                        ${session.parallel && session.parallel.length > 0 ? `
                          <div class="parallel-sessions">
                            <div class="parallel-heading">Parallel Technical Tracks:</div>
                            <div class="parallel-grid">
                              ${session.parallel.map(p => `
                                <div class="parallel-card">
                                  <div class="parallel-track">${p.track}</div>
                                  <div class="parallel-hall">📍 ${p.hall}</div>
                                  <div class="parallel-focus">💡 <strong>Focus:</strong> ${p.focus}</div>
                                </div>
                              `).join('')}
                            </div>
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Presenter Guidelines Section -->
        ${data.guidelines && data.guidelines.length > 0 ? `
          <div class="presenter-guidelines-section">
            <h3 class="guidelines-heading">📌 Important Guidelines for Presenters</h3>
            <div class="presenter-guidelines-grid">
              ${data.guidelines.map(g => `
                <div class="presenter-guideline-card">
                  <div class="guideline-icon">${g.icon}</div>
                  <h4>${g.title}</h4>
                  <p>${g.detail}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Schedule CTA Buttons -->
        <div class="schedule-cta">
          <button class="btn btn-primary" onclick="window.navigate('schedule')">View (Tentative) Presentation Schedule Summary</button>
          <button class="btn btn-outline" onclick="window.navigate('registration')">Proceed to Registration</button>
          <button class="btn btn-outline" onclick="window.navigate('tracks')">View Technical Tracks</button>
        </div>
      </div>
    </section>
  `;
};

export const parseScheduleCSV = (csvText) => {
  if (!csvText || typeof csvText !== 'string') {
    return { title: '(Tentative) Presentation Schedule Summary', days: [] };
  }

  const lines = parseCSVRows(csvText);
  if (lines.length < 2) return { title: '(Tentative) Presentation Schedule Summary', days: [] };

  const headers = lines[0].map(h => h.trim().toLowerCase());
  
  const getIndex = (possibleNames) => {
    return headers.findIndex(h => possibleNames.some(p => h === p || h.includes(p)));
  };

  const dayIdx = getIndex(['day']);
  const dateIdx = getIndex(['date']);
  const sessionIdx = getIndex(['session', 'sessionname', 'session_name']);
  const trackIdx = getIndex(['track']);
  const hallIdx = getIndex(['hall', 'location', 'room']);
  const timeIdx = getIndex(['time', 'slot']);
  const pidIdx = getIndex(['paper id', 'paperid', 'paper_id', 'id']);
  const titleIdx = getIndex(['title', 'paper title', 'name']);
  const regIdx = getIndex(['registration', 'reg', 'status']);
  const receiptIdx = getIndex(['receipt_link', 'receiptlink', 'receipt', 'receipt_url', 'download_receipt']);
  const commentIdx = getIndex(['session_comment', 'sessioncomment', 'comment', 'session_note', 'note']);

  // Group rows into days and sessions
  const daysMap = new Map();

  for (let i = 1; i < lines.length; i++) {
    const r = lines[i];
    const dayName = (dayIdx !== -1 && r[dayIdx]) ? r[dayIdx].trim() : 'Day 1';
    const dateStr = (dateIdx !== -1 && r[dateIdx]) ? r[dateIdx].trim() : '';
    const sessionName = (sessionIdx !== -1 && r[sessionIdx]) ? r[sessionIdx].trim() : '';
    const track = (trackIdx !== -1 && r[trackIdx]) ? r[trackIdx].trim() : '';
    const hall = (hallIdx !== -1 && r[hallIdx]) ? r[hallIdx].trim() : '';
    const time = (timeIdx !== -1 && r[timeIdx]) ? r[timeIdx].trim() : '';
    const paperId = (pidIdx !== -1 && r[pidIdx]) ? r[pidIdx].trim() : `PAPER-${i}`;
    const paperTitle = (titleIdx !== -1 && r[titleIdx]) ? r[titleIdx].trim() : '';
    const registration = (regIdx !== -1 && r[regIdx]) ? r[regIdx].trim() : '';
    const receiptLink = (receiptIdx !== -1 && r[receiptIdx]) ? r[receiptIdx].trim() : '';
    const sessionComment = (commentIdx !== -1 && r[commentIdx]) ? r[commentIdx].trim() : '';

    if (!daysMap.has(dayName)) {
      daysMap.set(dayName, {
        day: dayName,
        date: dateStr,
        time: time,
        comment: sessionComment,
        sessionsMap: new Map()
      });
    }

    const dayObj = daysMap.get(dayName);
    if (!dayObj.date && dateStr) dayObj.date = dateStr;
    if (!dayObj.time && time) dayObj.time = time;
    if (!dayObj.comment && sessionComment) dayObj.comment = sessionComment;

    const sKey = sessionName || track || 'main_session';
    if (!dayObj.sessionsMap.has(sKey)) {
      dayObj.sessionsMap.set(sKey, {
        sessionName: sessionName,
        track: track,
        hall: hall,
        time: time,
        papers: []
      });
    }

    const sessionObj = dayObj.sessionsMap.get(sKey);
    if (!sessionObj.hall && hall) sessionObj.hall = hall;
    if (!sessionObj.time && time) sessionObj.time = time;

    sessionObj.papers.push({
      paperId: paperId,
      title: paperTitle,
      registration: registration,
      receiptLink: receiptLink
    });
  }

  const days = Array.from(daysMap.values()).map(d => ({
    day: d.day,
    date: d.date,
    time: d.time || (Array.from(d.sessionsMap.values())[0]?.time || ''),
    comment: d.comment || '',
    sessions: Array.from(d.sessionsMap.values())
  }));

  return {
    title: '(Tentative) Presentation Schedule Summary',
    subtitle: 'Day-wise Accepted Paper IDs and Presentation Titles',
    days: days
  };
};

export const renderSchedule = (rawInput) => {
  if (!rawInput) return '<section class="section-placeholder"><div class="container"><p>Presentation schedule unavailable.</p></div></section>';

  // Parse if CSV string is provided
  const data = typeof rawInput === 'string' ? parseScheduleCSV(rawInput) : rawInput;

  // Interactive filtering for day tabs
  window.switchPaperDay = (dayKey) => {
    document.querySelectorAll('.paper-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-day') === String(dayKey));
    });
    document.querySelectorAll('.paper-day-container').forEach(block => {
      if (dayKey === 'all') {
        block.style.display = 'block';
      } else {
        block.style.display = block.getAttribute('data-day') === String(dayKey) ? 'block' : 'none';
      }
    });
  };

  // Interactive search filter
  window.filterPapers = (query) => {
    const q = (query || '').toLowerCase().trim();
    const rows = document.querySelectorAll('.paper-row-item');
    let visibleCount = 0;

    rows.forEach(row => {
      const pid = row.getAttribute('data-pid') || '';
      const title = row.getAttribute('data-title') || '';
      const track = row.getAttribute('data-track') || '';
      const match = pid.includes(q) || title.includes(q) || track.includes(q);

      row.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    // Hide/show empty session blocks
    document.querySelectorAll('.paper-session-block').forEach(sBlock => {
      const visibleRows = sBlock.querySelectorAll('.paper-row-item:not([style*="display: none"])');
      sBlock.style.display = visibleRows.length > 0 ? 'block' : (q ? 'none' : 'block');
    });

    // Hide/show day blocks if empty during search
    document.querySelectorAll('.paper-day-container').forEach(dBlock => {
      const visibleRows = dBlock.querySelectorAll('.paper-row-item:not([style*="display: none"])');
      const activeTab = document.querySelector('.paper-tab-btn.active')?.getAttribute('data-day') || 'all';
      const isDayActive = activeTab === 'all' || dBlock.getAttribute('data-day') === activeTab;
      dBlock.style.display = isDayActive && (visibleRows.length > 0 || !q) ? 'block' : 'none';
    });

    const noResultsMsg = document.getElementById('no-paper-results');
    if (noResultsMsg) {
      noResultsMsg.style.display = (visibleCount === 0 && q) ? 'block' : 'none';
    }
  };

  let totalPapers = 0;
  (data.days || []).forEach(d => {
    (d.sessions || []).forEach(s => {
      totalPapers += (s.papers || []).length;
    });
  });

  return `
    <section class="schedule-page presentation-summary-page">
      <div class="container">
        <div class="schedule-header">
          <h2 class="section-title">${data.title || '(Tentative) Presentation Schedule Summary'}</h2>
          
          <div class="presentation-info-banner">
            <div class="info-pill">
              <span class="info-icon">📍</span>
              <span>Physical Mode at Graphic Era Hill University</span>
            </div>
          </div>

          <div class="schedule-switch-banner">
            <span>Looking for keynotes, inaugural ceremonies, and daily event timeline?</span>
            <button class="btn btn-sm btn-outline-accent" onclick="window.navigate('itinerary')">
              🗓️ View (Tentative) Conference Itinerary
            </button>
          </div>
        </div>

        <!-- Search and Quick Filter Bar -->
        <div class="paper-search-wrapper">
          <div class="paper-search-box">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              id="paper-search-input" 
              class="paper-search-input" 
              placeholder="Search by Paper ID (e.g. 91, 104) or Paper Title..." 
              oninput="window.filterPapers(this.value)"
            />
            <button class="clear-search-btn" onclick="document.getElementById('paper-search-input').value=''; window.filterPapers('');">Clear</button>
          </div>
        </div>

        <!-- Day Filter Tabs -->
        <div class="schedule-tabs-container">
          <div class="schedule-tabs">
            <button class="schedule-tab-btn paper-tab-btn active" data-day="all" onclick="window.switchPaperDay('all')">
              <span class="tab-icon">📚</span>
              <span class="tab-text">All Sessions</span>
            </button>
            ${(data.days || []).map((d, index) => `
              <button class="schedule-tab-btn paper-tab-btn" data-day="${index}" onclick="window.switchPaperDay(${index})">
                <span class="tab-icon">🗓️</span>
                <span class="tab-text">${d.day}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- No Results Fallback -->
        <div id="no-paper-results" class="no-paper-results" style="display: none;">
          <div class="empty-state-card">
            <span class="empty-icon">🔎</span>
            <h3>No Matching Papers Found</h3>
            <p>Try searching with another Paper ID keyword or paper title.</p>
            <button class="btn btn-sm btn-outline" onclick="document.getElementById('paper-search-input').value=''; window.filterPapers('');">Reset Search</button>
          </div>
        </div>

        <!-- Day-wise Paper Sections -->
        <div class="papers-list-container">
          ${(data.days || []).map((d, dIdx) => `
            <div class="paper-day-container" data-day="${dIdx}">
              <div class="paper-day-header">
                <div class="day-pill">${d.day}</div>
                <div class="day-header-meta">
                  <h3>${d.date}${d.time ? ` (${d.time})` : ''}</h3>
                  ${d.comment ? `<span>${d.comment}</span>` : ''}
                </div>
              </div>

              ${(d.sessions || []).map(session => `
                <div class="paper-session-block">
                  ${(session.sessionName || session.track || session.hall) ? `
                    <div class="session-section-header">
                      <div class="session-section-title">
                        ${session.sessionName ? `<h4>${session.sessionName}</h4>` : ''}
                        ${session.track ? `<span class="session-track-badge">${session.track}</span>` : ''}
                      </div>
                      <div class="session-meta-tags">
                        ${session.time ? `<span class="meta-tag">⏰ ${session.time}</span>` : ''}
                        ${session.hall ? `<span class="meta-tag">📍 ${session.hall}</span>` : ''}
                      </div>
                    </div>
                  ` : ''}

                  <div class="papers-table-card">
                    <div class="papers-table-header">
                      <span class="col-pid">Paper ID</span>
                      <span class="col-title">Paper Title</span>
                      <span class="col-reg">Registration</span>
                    </div>
                    <div class="papers-rows-list">
                      ${(session.papers || []).map((paper, pIdx) => `
                        <div class="paper-row-item" 
                             data-pid="${(paper.paperId || '').toLowerCase()}" 
                             data-title="${(paper.title || '').toLowerCase()}" 
                             data-track="${(session.track || '').toLowerCase()}">
                          <div class="col-pid">
                            <span class="paper-id-badge">#${paper.paperId}</span>
                          </div>
                          <div class="col-title">
                            <h5 class="paper-name">${paper.title}</h5>
                            ${(session.track || session.hall) ? `
                              <div class="paper-sub-meta">
                                ${session.track ? `<span class="sub-track">${session.track}</span>` : ''}
                                ${session.hall ? `<span class="sub-hall">📍 ${session.hall}</span>` : ''}
                              </div>
                            ` : ''}
                          </div>
                          <div class="col-reg">
                            ${(paper.registration || '').toLowerCase() === 'verified' ? `
                              <span class="reg-badge reg-verified">Verified</span>
                              <a href="${paper.receiptLink && paper.receiptLink !== '#' ? paper.receiptLink : '#'}" 
                                 class="receipt-download-link" 
                                 ${paper.receiptLink && paper.receiptLink !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''} 
                                 download>
                                Download receipt
                              </a>
                            ` : `
                              <span class="reg-empty">—</span>
                            `}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>

        <!-- Schedule CTA Buttons -->
        <div class="schedule-cta" style="margin-top: 3.5rem;">
          <button class="btn btn-primary hero-btn-itinerary" onclick="window.navigate('itinerary')">🗓️ View (Tentative) Conference Itinerary</button>
          <button class="btn btn-primary" onclick="window.navigate('registration')">Proceed to Registration</button>
          <button class="btn btn-outline" onclick="window.navigate('guidelines')">Author Guidelines</button>
          <button class="btn btn-outline" onclick="window.navigate('tracks')">Technical Tracks</button>
        </div>
      </div>
    </section>
  `;
};

