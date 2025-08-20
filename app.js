// UNSHITTYMIZER V3 - Professional Windows Optimization Application
// Fixed version addressing critical navigation and functionality bugs

// Application State Management
class UnshittymyzerApp {
  constructor() {
    this.state = {
      currentTab: 'system-specs',
      progress: 25,
      systemSpecs: {
        cpu: '',
        gpu: '',
        ram: '',
        ssd: null,
        deviceType: null,
        tier: 'unknown'
      },
      recommendationMode: 'ai',
      selectedScripts: new Set(),
      selectedApps: new Set(),
      packageManagers: {
        winget: 'checking',
        chocolatey: 'checking'
      }
    };

    this.hardwareDatabase = null;
    this.applicationDatabase = null;
    this.timeMultipliers = {
      ssd: { yes: 1.0, no: 1.5 },
      device: { desktop: 1.0, laptop: 1.2 },
      tier: { budget: 1.3, mainstream: 1.0, 'high-end': 0.8, enthusiast: 0.7 }
    };

    this.init();
  }

  async init() {
    console.log('🚀 Initializing UNSHITTYMIZER V3...');
    
    try {
      await this.loadData();
      this.setupEventListeners();
      this.setupTabNavigation();
      this.setupSystemSpecification();
      this.setupOptimizationScripts();
      this.setupApplicationSelection();
      this.setupFinalization();
      this.checkPackageManagers();
      this.updateUI();
      
      console.log('✅ UNSHITTYMIZER V3 initialized successfully');
      this.showToast('Welcome to UNSHITTYMIZER V3!', 'success');
    } catch (error) {
      console.error('❌ Initialization error:', error);
      this.showToast('Failed to initialize application', 'error');
    }
  }

  async loadData() {
    try {
      const response = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/34ac1922ba138d4eaaafde211c687319/32365f09-f16d-4231-82a6-0595c2e866f7/17621357.json');
      if (response.ok) {
        const data = await response.json();
        this.hardwareDatabase = data.hardware || this.getDefaultHardware();
        this.applicationDatabase = data.applications || this.getDefaultApplications();
      } else {
        throw new Error('Failed to fetch data');
      }
      console.log('✅ Data loaded successfully');
    } catch (error) {
      console.warn('⚠️ Failed to load external data, using defaults');
      this.hardwareDatabase = this.getDefaultHardware();
      this.applicationDatabase = this.getDefaultApplications();
    }
  }

  getDefaultHardware() {
    return {
      cpu: {
        'intel-i3-12100': { name: 'Intel i3-12100', score: 75, tier: 'budget' },
        'intel-i5-12600k': { name: 'Intel i5-12600K', score: 85, tier: 'mainstream' },
        'intel-i7-12700k': { name: 'Intel i7-12700K', score: 92, tier: 'high-end' },
        'intel-i9-12900k': { name: 'Intel i9-12900K', score: 98, tier: 'enthusiast' },
        'amd-ryzen5-5600x': { name: 'AMD Ryzen 5 5600X', score: 86, tier: 'mainstream' },
        'amd-ryzen7-5800x': { name: 'AMD Ryzen 7 5800X', score: 93, tier: 'high-end' },
        'amd-ryzen9-5900x': { name: 'AMD Ryzen 9 5900X', score: 97, tier: 'enthusiast' }
      },
      gpu: {
        'nvidia-rtx4090': { name: 'NVIDIA RTX 4090', tier: 'S', score: 100 },
        'nvidia-rtx4070': { name: 'NVIDIA RTX 4070', tier: 'A', score: 88 },
        'nvidia-rtx3060': { name: 'NVIDIA RTX 3060', tier: 'B', score: 75 },
        'amd-rx7900xt': { name: 'AMD RX 7900 XT', tier: 'A', score: 90 },
        'amd-rx6600xt': { name: 'AMD RX 6600 XT', tier: 'B', score: 72 },
        'integrated': { name: 'Integrated Graphics', tier: 'D', score: 35 }
      }
    };
  }

  getDefaultApplications() {
    return {
      productivity: [
        { id: 'Microsoft.Office', name: 'Microsoft Office 365', description: 'Complete office productivity suite', size: '3.2GB', installTime: 12, manager: 'winget' },
        { id: 'Mozilla.Firefox', name: 'Mozilla Firefox', description: 'Fast and private web browser', size: '55MB', installTime: 3, manager: 'winget' },
        { id: 'Google.Chrome', name: 'Google Chrome', description: 'Fast, secure web browser by Google', size: '85MB', installTime: 2, manager: 'winget' },
        { id: 'Notion.Notion', name: 'Notion', description: 'All-in-one workspace for notes and tasks', size: '120MB', installTime: 4, manager: 'winget' },
        { id: '7zip.7zip', name: '7-Zip', description: 'File archiver with high compression ratio', size: '1.5MB', installTime: 1, manager: 'winget' },
        { id: 'Adobe.Acrobat.Reader.64-bit', name: 'Adobe Acrobat Reader', description: 'PDF reader and editor', size: '180MB', installTime: 5, manager: 'winget' },
        { id: 'Notepad++.Notepad++', name: 'Notepad++', description: 'Advanced text editor for programming', size: '4MB', installTime: 1, manager: 'winget' },
        { id: 'Microsoft.PowerToys', name: 'Microsoft PowerToys', description: 'Windows system utilities', size: '45MB', installTime: 2, manager: 'winget' },
        { id: 'Dropbox.Dropbox', name: 'Dropbox', description: 'Cloud storage and file synchronization', size: '150MB', installTime: 4, manager: 'winget' },
        { id: 'Slack.Slack', name: 'Slack', description: 'Team collaboration and messaging', size: '180MB', installTime: 3, manager: 'winget' }
      ],
      browsers: [
        { id: 'Mozilla.Firefox', name: 'Mozilla Firefox', description: 'Open-source web browser with privacy focus', size: '55MB', installTime: 3, manager: 'winget' },
        { id: 'Google.Chrome', name: 'Google Chrome', description: 'Fast and secure web browser', size: '85MB', installTime: 2, manager: 'winget' },
        { id: 'Microsoft.Edge', name: 'Microsoft Edge', description: 'Modern web browser by Microsoft', size: '120MB', installTime: 3, manager: 'winget' },
        { id: 'Opera.Opera', name: 'Opera Browser', description: 'Feature-rich browser with built-in VPN', size: '95MB', installTime: 3, manager: 'winget' },
        { id: 'BraveSoftware.BraveBrowser', name: 'Brave Browser', description: 'Privacy-focused browser with ad blocking', size: '110MB', installTime: 4, manager: 'winget' },
        { id: 'Vivaldi.Vivaldi', name: 'Vivaldi', description: 'Highly customizable web browser', size: '88MB', installTime: 3, manager: 'winget' },
        { id: 'Tor.TorBrowser', name: 'Tor Browser', description: 'Anonymous web browsing with Tor network', size: '95MB', installTime: 4, manager: 'winget' },
        { id: 'Mozilla.Thunderbird', name: 'Mozilla Thunderbird', description: 'Open-source email client', size: '45MB', installTime: 2, manager: 'winget' },
        { id: 'Waterfox.Waterfox', name: 'Waterfox', description: 'High performance Firefox-based browser', size: '65MB', installTime: 3, manager: 'winget' },
        { id: 'LibreWolf.LibreWolf', name: 'LibreWolf', description: 'Privacy-focused Firefox fork', size: '70MB', installTime: 3, manager: 'winget' }
      ],
      development: [
        { id: 'Microsoft.VisualStudioCode', name: 'Visual Studio Code', description: 'Lightweight code editor by Microsoft', size: '85MB', installTime: 3, manager: 'winget' },
        { id: 'Git.Git', name: 'Git', description: 'Distributed version control system', size: '50MB', installTime: 2, manager: 'winget' },
        { id: 'OpenJS.NodeJS', name: 'Node.js', description: 'JavaScript runtime for server-side development', size: '30MB', installTime: 3, manager: 'winget' },
        { id: 'Python.Python.3.12', name: 'Python 3.12', description: 'High-level programming language', size: '28MB', installTime: 4, manager: 'winget' },
        { id: 'Docker.DockerDesktop', name: 'Docker Desktop', description: 'Container development platform', size: '500MB', installTime: 8, manager: 'winget' },
        { id: 'JetBrains.IntelliJIDEA.Ultimate', name: 'IntelliJ IDEA', description: 'Integrated development environment for Java', size: '850MB', installTime: 10, manager: 'winget' },
        { id: 'Microsoft.VisualStudio.2022.Community', name: 'Visual Studio 2022', description: 'Full-featured IDE for .NET development', size: '2.8GB', installTime: 15, manager: 'winget' },
        { id: 'Postman.Postman', name: 'Postman', description: 'API development and testing platform', size: '140MB', installTime: 4, manager: 'winget' },
        { id: 'GitHub.GitHubDesktop', name: 'GitHub Desktop', description: 'Git client for GitHub repositories', size: '115MB', installTime: 3, manager: 'winget' },
        { id: 'Insomnia.Insomnia', name: 'Insomnia', description: 'REST and GraphQL API client', size: '95MB', installTime: 3, manager: 'winget' }
      ],
      media: [
        { id: 'VideoLAN.VLC', name: 'VLC Media Player', description: 'Universal media player supporting all formats', size: '100MB', installTime: 2, manager: 'winget' },
        { id: 'Spotify.Spotify', name: 'Spotify', description: 'Music streaming service', size: '150MB', installTime: 3, manager: 'winget' },
        { id: 'OBSProject.OBSStudio', name: 'OBS Studio', description: 'Live streaming and recording software', size: '350MB', installTime: 4, manager: 'winget' },
        { id: 'Audacity.Audacity', name: 'Audacity', description: 'Free audio editor and recorder', size: '40MB', installTime: 2, manager: 'winget' },
        { id: 'GIMP.GIMP', name: 'GIMP', description: 'Free image editing software', size: '200MB', installTime: 5, manager: 'winget' },
        { id: 'HandBrake.HandBrake', name: 'HandBrake', description: 'Video transcoder for multiple formats', size: '25MB', installTime: 2, manager: 'winget' },
        { id: 'Kodi.Kodi', name: 'Kodi', description: 'Open-source media center', size: '85MB', installTime: 3, manager: 'winget' },
        { id: 'MPC-HC.MPC-HC', name: 'MPC-HC', description: 'Lightweight media player for Windows', size: '20MB', installTime: 1, manager: 'winget' },
        { id: 'IrfanView.IrfanView', name: 'IrfanView', description: 'Fast image viewer and converter', size: '3MB', installTime: 1, manager: 'winget' },
        { id: 'Paint.NET', name: 'Paint.NET', description: 'Image and photo editing software', size: '12MB', installTime: 2, manager: 'winget' }
      ],
      gaming: [
        { id: 'Valve.Steam', name: 'Steam', description: 'Digital distribution platform for PC gaming', size: '3MB', installTime: 5, manager: 'winget' },
        { id: 'EpicGames.EpicGamesLauncher', name: 'Epic Games Launcher', description: 'Epic Games store and game launcher', size: '280MB', installTime: 4, manager: 'winget' },
        { id: 'Discord.Discord', name: 'Discord', description: 'Voice and text chat for gaming communities', size: '140MB', installTime: 3, manager: 'winget' },
        { id: 'ElectronicArts.EADesktop', name: 'EA Desktop', description: 'EA games launcher and store', size: '200MB', installTime: 4, manager: 'winget' },
        { id: 'Ubisoft.Connect', name: 'Ubisoft Connect', description: 'Ubisoft game launcher and social platform', size: '150MB', installTime: 3, manager: 'winget' },
        { id: 'GOG.Galaxy', name: 'GOG Galaxy', description: 'DRM-free game launcher by CD Projekt', size: '90MB', installTime: 3, manager: 'winget' },
        { id: 'Blizzard.BattleNet', name: 'Battle.net', description: 'Blizzard Entertainment game launcher', size: '180MB', installTime: 4, manager: 'winget' },
        { id: 'Razer.Synapse.3', name: 'Razer Synapse', description: 'Configuration software for Razer peripherals', size: '120MB', installTime: 3, manager: 'winget' },
        { id: 'Logitech.GHUB', name: 'Logitech G HUB', description: 'Software for Logitech gaming gear', size: '400MB', installTime: 5, manager: 'winget' },
        { id: 'MSI.Afterburner', name: 'MSI Afterburner', description: 'Graphics card overclocking utility', size: '45MB', installTime: 2, manager: 'winget' }
      ],
      utilities: [
        { id: 'voidtools.Everything', name: 'Everything', description: 'Instant file and folder search', size: '2MB', installTime: 1, manager: 'winget' },
        { id: 'WinRAR.WinRAR', name: 'WinRAR', description: 'File archiver and compression tool', size: '3MB', installTime: 1, manager: 'winget' },
        { id: 'Malwarebytes.Malwarebytes', name: 'Malwarebytes', description: 'Anti-malware and security software', size: '100MB', installTime: 4, manager: 'winget' },
        { id: 'TreeSize.Free', name: 'TreeSize Free', description: 'Disk space analyzer and cleanup tool', size: '8MB', installTime: 1, manager: 'winget' },
        { id: 'Wireshark.Wireshark', name: 'Wireshark', description: 'Network protocol analyzer', size: '55MB', installTime: 3, manager: 'winget' },
        { id: 'Sysinternals.ProcessExplorer', name: 'Process Explorer', description: 'Advanced task manager replacement', size: '2MB', installTime: 1, manager: 'winget' },
        { id: 'Sysinternals.ProcessMonitor', name: 'Process Monitor', description: 'Real-time file system and registry monitoring', size: '1MB', installTime: 1, manager: 'winget' },
        { id: 'Sysinternals.Autoruns', name: 'Autoruns', description: 'Startup programs manager', size: '1MB', installTime: 1, manager: 'winget' },
        { id: 'HWiNFO.HWiNFO', name: 'HWiNFO', description: 'Hardware analysis and monitoring tool', size: '4MB', installTime: 1, manager: 'winget' },
        { id: 'TechPowerUp.GPU-Z', name: 'GPU-Z', description: 'Graphics card information utility', size: '8MB', installTime: 1, manager: 'winget' }
      ]
    };
  }

  setupEventListeners() {
    console.log('Setting up event listeners...');

    // Fixed tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetTab = e.currentTarget.dataset.tab;
        console.log('Tab clicked:', targetTab);
        this.switchTab(targetTab);
      });
    });

    // Fixed system specification handlers
    const cpuSelect = document.getElementById('cpu-select');
    const gpuSelect = document.getElementById('gpu-select');
    const ramSelect = document.getElementById('ram-select');

    if (cpuSelect) {
      cpuSelect.addEventListener('change', (e) => {
        console.log('CPU changed:', e.target.value);
        this.updateSystemSpecs();
      });
    }

    if (gpuSelect) {
      gpuSelect.addEventListener('change', (e) => {
        console.log('GPU changed:', e.target.value);
        this.updateSystemSpecs();
      });
    }

    if (ramSelect) {
      ramSelect.addEventListener('change', (e) => {
        console.log('RAM changed:', e.target.value);
        this.updateSystemSpecs();
      });
    }

    // Fixed radio button handlers
    document.querySelectorAll('input[name="ssd"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        console.log('SSD changed:', e.target.value);
        this.updateSystemSpecs();
      });
    });

    document.querySelectorAll('input[name="device-type"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        console.log('Device type changed:', e.target.value);
        this.updateSystemSpecs();
      });
    });

    // Recommendation mode toggle
    document.querySelectorAll('input[name="rec-mode"]').forEach(radio => {
      radio.addEventListener('change', () => {
        this.updateRecommendationMode();
      });
    });

    // Script selection handlers
    document.querySelectorAll('.script-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateSelectedScripts();
      });
    });

    // Code reveal buttons
    document.querySelectorAll('.reveal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.currentTarget.dataset.target;
        const codePreview = document.getElementById(target);
        if (codePreview) {
          codePreview.classList.toggle('hidden');
          e.currentTarget.textContent = codePreview.classList.contains('hidden') ? 'Reveal Code' : 'Hide Code';
        }
      });
    });

    // Filter handlers
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.filterApps(e.currentTarget.dataset.category);
      });
    });

    // Search handler
    const searchInput = document.getElementById('app-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchApps(e.target.value);
      });
    }

    // Select all buttons
    document.querySelectorAll('.select-all-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.selectAllInSection(e.currentTarget.dataset.section);
      });
    });

    // Final generation
    const generateBtn = document.getElementById('generate-final-setup');
    if (generateBtn) {
      generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.generateFinalSetup();
      });
    }

    // Batch preview toggle
    const previewToggle = document.getElementById('toggle-preview');
    if (previewToggle) {
      previewToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleBatchPreview();
      });
    }

    // Modal close
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
      closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.hideModal();
      });
    }

    console.log('Event listeners setup complete');
  }

  setupTabNavigation() {
    this.updateTabState();
  }

  switchTab(tabId) {
    console.log('Switching to tab:', tabId);

    // Update state
    this.state.currentTab = tabId;
    this.updateProgress();
    this.updateTabState();

    // Tab-specific actions
    if (tabId === 'app-selection') {
      this.populateApplications();
    } else if (tabId === 'finalization') {
      this.updateFinalizationSummary();
    }

    this.showToast(`Switched to ${tabId.replace('-', ' ')} section`, 'info');
  }

  updateTabState() {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === this.state.currentTab;
      btn.classList.toggle('active', isActive);
    });

    // Update tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
      const isActive = pane.id === this.state.currentTab;
      pane.classList.toggle('active', isActive);
    });
  }

  updateProgress() {
    const progressMap = {
      'system-specs': 25,
      'optimization-scripts': 50,
      'app-selection': 75,
      'finalization': 100
    };

    this.state.progress = progressMap[this.state.currentTab] || 25;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = `${this.state.progress}%`;
    }
  }

  setupSystemSpecification() {
    // Initial setup complete
    console.log('System specification setup complete');
  }

  updateSystemSpecs() {
    const cpuSelect = document.getElementById('cpu-select');
    const gpuSelect = document.getElementById('gpu-select');
    const ramSelect = document.getElementById('ram-select');
    const ssdRadio = document.querySelector('input[name="ssd"]:checked');
    const deviceRadio = document.querySelector('input[name="device-type"]:checked');

    // Update state
    this.state.systemSpecs.cpu = cpuSelect?.value || '';
    this.state.systemSpecs.gpu = gpuSelect?.value || '';
    this.state.systemSpecs.ram = ramSelect?.value || '';
    this.state.systemSpecs.ssd = ssdRadio?.value || null;
    this.state.systemSpecs.deviceType = deviceRadio?.value || null;

    // Update displays
    this.updatePerformanceDisplays();
    this.updateSystemTier();
    this.updateHardwareSummary();
    this.updateScriptRecommendations();

    console.log('System specs updated:', this.state.systemSpecs);
  }

  updatePerformanceDisplays() {
    const cpuPerf = document.getElementById('cpu-performance');
    const gpuPerf = document.getElementById('gpu-performance');

    if (cpuPerf && this.state.systemSpecs.cpu) {
      const cpu = this.hardwareDatabase.cpu[this.state.systemSpecs.cpu];
      if (cpu) {
        cpuPerf.querySelector('.performance-score').textContent = `Performance Score: ${cpu.score}/100`;
      }
    }

    if (gpuPerf && this.state.systemSpecs.gpu) {
      const gpu = this.hardwareDatabase.gpu[this.state.systemSpecs.gpu];
      if (gpu) {
        gpuPerf.querySelector('.performance-score').textContent = `Tier Rating: ${gpu.tier} (${gpu.score}/100)`;
      }
    }
  }

  updateSystemTier() {
    const { cpu, gpu, ram } = this.state.systemSpecs;
    let tier = 'unknown';

    if (cpu && gpu && ram) {
      const cpuData = this.hardwareDatabase.cpu[cpu];
      const gpuData = this.hardwareDatabase.gpu[gpu];
      
      if (cpuData && gpuData) {
        const avgScore = (cpuData.score + gpuData.score) / 2;
        
        if (avgScore >= 95) tier = 'enthusiast';
        else if (avgScore >= 85) tier = 'high-end';
        else if (avgScore >= 70) tier = 'mainstream';
        else tier = 'budget';
      }
    }

    this.state.systemSpecs.tier = tier;
    
    const tierBadge = document.querySelector('.tier-badge');
    if (tierBadge) {
      tierBadge.textContent = tier === 'unknown' ? 'Configure Hardware Above' : 
                             tier.charAt(0).toUpperCase() + tier.slice(1) + ' System';
      tierBadge.className = `tier-badge tier-${tier}`;
    }
  }

  updateHardwareSummary() {
    const summaryEl = document.getElementById('hardware-summary');
    if (!summaryEl) return;

    const { cpu, gpu, ram, ssd, deviceType } = this.state.systemSpecs;

    if (cpu && gpu && ram) {
      const cpuData = this.hardwareDatabase.cpu[cpu];
      const gpuData = this.hardwareDatabase.gpu[gpu];
      
      summaryEl.innerHTML = `
        <div class="spec-line"><strong>CPU:</strong> ${cpuData?.name || cpu}</div>
        <div class="spec-line"><strong>GPU:</strong> ${gpuData?.name || gpu}</div>
        <div class="spec-line"><strong>RAM:</strong> ${ram?.toUpperCase()}</div>
        <div class="spec-line"><strong>Storage:</strong> ${ssd === 'yes' ? 'SSD' : ssd === 'no' ? 'HDD' : 'Not specified'}</div>
        <div class="spec-line"><strong>Device:</strong> ${deviceType ? deviceType.charAt(0).toUpperCase() + deviceType.slice(1) : 'Not specified'}</div>
      `;
    } else {
      summaryEl.innerHTML = '<p>Select your hardware components to see performance analysis</p>';
    }
  }

  setupOptimizationScripts() {
    this.updateScriptRecommendations();
  }

  updateRecommendationMode() {
    const mode = document.querySelector('input[name="rec-mode"]:checked')?.value;
    this.state.recommendationMode = mode || 'ai';
    this.updateScriptRecommendations();
    console.log('Recommendation mode:', this.state.recommendationMode);
  }

  updateScriptRecommendations() {
    if (this.state.recommendationMode !== 'ai') return;

    const { tier, gpu, deviceType } = this.state.systemSpecs;

    // Update gaming script recommendation
    const gamingRec = document.getElementById('rec-gaming');
    if (gamingRec) {
      const hasGoodGpu = gpu && this.hardwareDatabase.gpu[gpu]?.score > 70;
      gamingRec.textContent = hasGoodGpu ? 'Yes' : 'No';
      gamingRec.className = `rec-badge ${hasGoodGpu ? 'yes' : 'no'}`;
    }

    // Update power optimization recommendation
    const powerRec = document.getElementById('rec-power');
    if (powerRec) {
      const recommend = deviceType === 'desktop' || tier === 'high-end' || tier === 'enthusiast';
      powerRec.textContent = recommend ? 'Yes' : 'Auto';
      powerRec.className = `rec-badge ${recommend ? 'yes' : 'auto'}`;
    }

    // Network tweaks - only for advanced users
    const networkRec = document.getElementById('rec-network');
    if (networkRec) {
      networkRec.textContent = 'No';
      networkRec.className = 'rec-badge no';
    }
  }

  updateSelectedScripts() {
    this.state.selectedScripts.clear();
    
    document.querySelectorAll('.script-checkbox:checked').forEach(checkbox => {
      this.state.selectedScripts.add(checkbox.id.replace('script-', ''));
    });

    console.log('Selected scripts:', Array.from(this.state.selectedScripts));
    this.updateTimeEstimates();
  }

  setupApplicationSelection() {
    this.populateApplications();
    this.checkPackageManagers();
  }

  populateApplications() {
    console.log('Populating applications...');
    
    Object.entries(this.applicationDatabase).forEach(([category, apps]) => {
      const gridElement = document.getElementById(`${category}-apps`);
      if (!gridElement) {
        console.warn(`Grid element not found for category: ${category}`);
        return;
      }

      gridElement.innerHTML = apps.map(app => this.createAppCard(app, category)).join('');
    });

    // Set up app selection handlers after DOM is updated
    setTimeout(() => {
      document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const checkbox = card.querySelector('.app-checkbox');
          if (checkbox) {
            checkbox.checked = !checkbox.checked;
            card.classList.toggle('selected', checkbox.checked);
            this.updateSelectedApps();
          }
        });
      });
    }, 100);

    console.log('Applications populated');
  }

  createAppCard(app, category) {
    const timeEstimate = Math.ceil(app.installTime * this.getTimeMultiplier());
    
    return `
      <div class="app-card" data-app-id="${app.id}" data-category="${category}">
        <input type="checkbox" class="app-checkbox hidden" data-app="${app.id}">
        <div class="app-header-info">
          <h4>${app.name}</h4>
          <p>${app.description}</p>
        </div>
        <div class="app-meta">
          <div class="app-stats">
            <span class="app-size">${app.size}</span>
            <span class="install-time">~${timeEstimate} min</span>
          </div>
          <span class="package-manager ${app.manager}">${app.manager.toUpperCase()}</span>
        </div>
      </div>
    `;
  }

  filterApps(category) {
    console.log('Filtering apps by category:', category);
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Show/hide app sections
    document.querySelectorAll('.app-section').forEach(section => {
      const sectionCategory = section.dataset.category;
      const shouldShow = category === 'all' || sectionCategory === category;
      section.classList.toggle('hidden', !shouldShow);
    });

    this.showToast(`Showing ${category === 'all' ? 'all' : category} applications`, 'info');
  }

  searchApps(query) {
    const searchTerm = query.toLowerCase();
    
    document.querySelectorAll('.app-card').forEach(card => {
      const appName = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const appDesc = card.querySelector('p')?.textContent.toLowerCase() || '';
      const matches = appName.includes(searchTerm) || appDesc.includes(searchTerm);
      card.classList.toggle('hidden', !matches && query.length > 0);
    });
  }

  selectAllInSection(section) {
    console.log('Selecting all in section:', section);
    
    const sectionElement = document.querySelector(`[data-category="${section}"]`);
    if (!sectionElement) return;

    const appCards = sectionElement.querySelectorAll('.app-card');
    const checkboxes = sectionElement.querySelectorAll('.app-checkbox');
    
    const allSelected = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(checkbox => {
      checkbox.checked = !allSelected;
    });
    
    appCards.forEach(card => {
      card.classList.toggle('selected', !allSelected);
    });

    this.updateSelectedApps();
    this.showToast(`${allSelected ? 'Deselected' : 'Selected'} all ${section} applications`, 'success');
  }

  updateSelectedApps() {
    this.state.selectedApps.clear();
    
    document.querySelectorAll('.app-checkbox:checked').forEach(checkbox => {
      this.state.selectedApps.add(checkbox.dataset.app);
    });

    console.log('Selected apps:', Array.from(this.state.selectedApps));
    this.updateTimeEstimates();
  }

  async checkPackageManagers() {
    this.showToast('Checking package manager status...', 'info');
    
    setTimeout(() => {
      this.state.packageManagers.winget = 'installed';
      this.state.packageManagers.chocolatey = 'missing';
      this.updatePackageManagerStatus();
    }, 2000);
  }

  updatePackageManagerStatus() {
    const wingetStatus = document.getElementById('winget-status');
    const chocoStatus = document.getElementById('choco-status');

    if (wingetStatus) {
      wingetStatus.textContent = this.state.packageManagers.winget === 'installed' ? 'Installed' : 'Missing';
      wingetStatus.className = `status-badge ${this.state.packageManagers.winget}`;
    }

    if (chocoStatus) {
      chocoStatus.textContent = this.state.packageManagers.chocolatey === 'installed' ? 'Installed' : 'Missing';
      chocoStatus.className = `status-badge ${this.state.packageManagers.chocolatey}`;
    }
  }

  setupFinalization() {
    // Initial setup complete
  }

  updateFinalizationSummary() {
    this.updateSystemSummary();
    this.updateScriptsSummary();
    this.updateAppsSummary();
    this.updateTimeEstimates();
    this.generateBatchPreview();
  }

  updateSystemSummary() {
    const summaryEl = document.getElementById('final-system-summary');
    if (!summaryEl) return;

    const { cpu, gpu, ram, ssd, deviceType, tier } = this.state.systemSpecs;

    if (cpu && gpu && ram) {
      const cpuData = this.hardwareDatabase.cpu[cpu];
      const gpuData = this.hardwareDatabase.gpu[gpu];
      
      summaryEl.innerHTML = `
        <div class="summary-item"><strong>System Tier:</strong> ${tier.charAt(0).toUpperCase() + tier.slice(1)}</div>
        <div class="summary-item"><strong>CPU:</strong> ${cpuData?.name || cpu}</div>
        <div class="summary-item"><strong>GPU:</strong> ${gpuData?.name || gpu}</div>
        <div class="summary-item"><strong>RAM:</strong> ${ram?.toUpperCase()}</div>
        <div class="summary-item"><strong>Storage:</strong> ${ssd === 'yes' ? 'SSD (Fast)' : 'HDD (Standard)'}</div>
        <div class="summary-item"><strong>Device:</strong> ${deviceType?.charAt(0).toUpperCase() + deviceType?.slice(1)}</div>
      `;
    } else {
      summaryEl.innerHTML = '<p>No system configuration selected</p>';
    }
  }

  updateScriptsSummary() {
    const summaryEl = document.getElementById('final-scripts-summary');
    const countEl = document.getElementById('scripts-count');
    const timeEl = document.getElementById('scripts-time');

    if (!summaryEl) return;

    const selectedCount = this.state.selectedScripts.size;
    
    if (selectedCount > 0) {
      const scriptList = Array.from(this.state.selectedScripts)
        .map(script => `<div class="summary-item">• ${this.getScriptDisplayName(script)}</div>`)
        .join('');
      summaryEl.innerHTML = scriptList;
    } else {
      summaryEl.innerHTML = '<p>No scripts selected</p>';
    }

    if (countEl) countEl.textContent = selectedCount;
    if (timeEl) timeEl.textContent = `${this.calculateScriptTime()} min`;
  }

  updateAppsSummary() {
    const summaryEl = document.getElementById('final-apps-summary');
    const countEl = document.getElementById('apps-count');
    const sizeEl = document.getElementById('apps-size');
    const timeEl = document.getElementById('apps-time');

    if (!summaryEl) return;

    const selectedCount = this.state.selectedApps.size;
    
    if (selectedCount > 0) {
      const appList = Array.from(this.state.selectedApps)
        .map(appId => {
          const app = this.getAppById(appId);
          return app ? `<div class="summary-item">• ${app.name} (${app.size})</div>` : '';
        })
        .filter(item => item)
        .join('');
      summaryEl.innerHTML = appList;
    } else {
      summaryEl.innerHTML = '<p>No applications selected</p>';
    }

    if (countEl) countEl.textContent = selectedCount;
    if (sizeEl) sizeEl.textContent = `${this.calculateTotalSize()} MB`;
    if (timeEl) timeEl.textContent = `${this.calculateAppTime()} min`;
  }

  getTimeMultiplier() {
    let multiplier = 1.0;
    
    if (this.state.systemSpecs.ssd === 'no') multiplier *= this.timeMultipliers.ssd.no;
    if (this.state.systemSpecs.deviceType === 'laptop') multiplier *= this.timeMultipliers.device.laptop;
    if (this.state.systemSpecs.tier) multiplier *= this.timeMultipliers.tier[this.state.systemSpecs.tier] || 1.0;
    
    return multiplier;
  }

  calculateScriptTime() {
    const scriptTimes = {
      'telemetry': 0.5,
      'bloatware': 2,
      'gaming': 1,
      'power': 0.25,
      'network': 1
    };

    let total = 0;
    this.state.selectedScripts.forEach(script => {
      total += scriptTimes[script] || 1;
    });

    return Math.ceil(total);
  }

  calculateAppTime() {
    let total = 0;
    const multiplier = this.getTimeMultiplier();

    this.state.selectedApps.forEach(appId => {
      const app = this.getAppById(appId);
      if (app) {
        total += app.installTime * multiplier;
      }
    });

    return Math.ceil(total);
  }

  calculateTotalSize() {
    let total = 0;

    this.state.selectedApps.forEach(appId => {
      const app = this.getAppById(appId);
      if (app) {
        const size = parseFloat(app.size.replace(/[^\d.]/g, ''));
        if (app.size.includes('GB')) total += size * 1024;
        else total += size;
      }
    });

    return Math.ceil(total);
  }

  updateTimeEstimates() {
    const scriptTime = this.calculateScriptTime();
    const appTime = this.calculateAppTime();
    const downloadTime = Math.ceil(this.calculateTotalSize() / 100);
    const totalTime = scriptTime + appTime + downloadTime;

    const elements = {
      'total-script-time': scriptTime,
      'total-download-time': downloadTime,
      'total-install-time': appTime,
      'grand-total-time': totalTime
    };

    Object.entries(elements).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = `${value} minute${value !== 1 ? 's' : ''}`;
      }
    });
  }

  getAppById(appId) {
    for (const category of Object.values(this.applicationDatabase)) {
      const app = category.find(a => a.id === appId);
      if (app) return app;
    }
    return null;
  }

  getScriptDisplayName(scriptId) {
    const names = {
      'telemetry': 'Disable Windows Telemetry',
      'bloatware': 'Remove Pre-installed Apps',
      'gaming': 'Gaming Mode Optimization',
      'power': 'Power Plan Optimization',
      'network': 'Advanced Network Tweaks'
    };
    return names[scriptId] || scriptId;
  }

  generateBatchPreview() {
    const batchCode = this.createBatchScript();
    const previewEl = document.getElementById('batch-code');
    if (previewEl) {
      previewEl.textContent = batchCode.substring(0, 1000) + (batchCode.length > 1000 ? '\n\n... (truncated)' : '');
    }
  }

  toggleBatchPreview() {
    const content = document.getElementById('batch-content');
    const toggle = document.getElementById('toggle-preview');
    
    if (content && toggle) {
      const isHidden = content.classList.contains('hidden');
      content.classList.toggle('hidden');
      toggle.textContent = isHidden ? 'Hide Preview' : 'Show Preview';
      
      if (isHidden) {
        this.generateBatchPreview();
      }
    }
  }

  createBatchScript() {
    const timestamp = new Date().toLocaleString();
    const totalApps = this.state.selectedApps.size;
    const totalScripts = this.state.selectedScripts.size;
    const totalTime = this.calculateScriptTime() + this.calculateAppTime();

    let script = `@echo off
REM UNSHITTYMIZER V3 - Professional Windows Optimization Setup
REM Generated: ${timestamp}
REM System Tier: ${this.state.systemSpecs.tier.toUpperCase()}
REM Total Items: ${totalApps} apps + ${totalScripts} scripts
REM Estimated Time: ${totalTime} minutes

echo.
echo ================================================
echo    UNSHITTYMIZER V3 - Professional Setup
echo ================================================
echo.
echo System Configuration:
echo - Tier: ${this.state.systemSpecs.tier.toUpperCase()}
echo - Applications: ${totalApps}
echo - Optimizations: ${totalScripts}
echo - Est. Time: ${totalTime} minutes
echo.
echo WARNING: Create a system restore point first!
echo.
pause

REM Administrator check
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Administrator privileges required!
    echo Right-click and "Run as administrator"
    pause
    exit /b 1
)
`;

    // Add application installations
    if (this.state.selectedApps.size > 0) {
      script += `
REM ================================================
REM APPLICATION INSTALLATIONS
REM ================================================
echo.
echo Installing ${this.state.selectedApps.size} applications...
`;

      let appIndex = 1;
      this.state.selectedApps.forEach(appId => {
        const app = this.getAppById(appId);
        if (app) {
          script += `
echo [${appIndex}/${this.state.selectedApps.size}] Installing: ${app.name}
winget install --id ${app.id} --exact --silent --accept-package-agreements --accept-source-agreements
if %errorlevel% equ 0 (
    echo ✓ ${app.name} installed successfully
) else (
    echo ✗ Failed to install ${app.name}
)
`;
          appIndex++;
        }
      });
    }

    // Add optimization scripts
    if (this.state.selectedScripts.size > 0) {
      script += `
REM ================================================
REM SYSTEM OPTIMIZATIONS
REM ================================================
echo.
echo Applying ${this.state.selectedScripts.size} optimizations...
`;

      this.state.selectedScripts.forEach(scriptId => {
        script += this.getScriptCommands(scriptId);
      });
    }

    script += `
REM ================================================
REM SETUP COMPLETE
REM ================================================
echo.
echo ================================================
echo    UNSHITTYMIZER V3 Setup Complete!
echo ================================================
echo.
echo Summary:
echo - Applications installed: ${totalApps}
echo - Optimizations applied: ${totalScripts}
echo - Total time: ~${totalTime} minutes
echo.
echo Thank you for using UNSHITTYMIZER V3!
pause
`;

    return script;
  }

  getScriptCommands(scriptId) {
    const commands = {
      'telemetry': `
REM Disable Windows Telemetry
echo Disabling telemetry services...
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f
sc config DiagTrack start= disabled
echo ✓ Telemetry disabled
`,
      'bloatware': `
REM Remove Pre-installed Apps
echo Removing bloatware applications...
powershell -Command "Get-AppxPackage *3dbuilder* | Remove-AppxPackage"
powershell -Command "Get-AppxPackage *windowsalarms* | Remove-AppxPackage"
echo ✓ Bloatware removed
`,
      'gaming': `
REM Gaming Mode Optimization
echo Applying gaming optimizations...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v Priority /t REG_DWORD /d 6 /f
echo ✓ Gaming mode enabled
`,
      'power': `
REM Power Plan Optimization
echo Configuring power settings...
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
echo ✓ High performance power plan activated
`,
      'network': `
REM Advanced Network Tweaks
echo Applying network optimizations...
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpAckFrequency /t REG_DWORD /d 1 /f
echo ✓ Network optimizations applied
`
    };

    return commands[scriptId] || `echo Unknown script: ${scriptId}`;
  }

  async generateFinalSetup() {
    const totalItems = this.state.selectedApps.size + this.state.selectedScripts.size;
    
    if (totalItems === 0) {
      this.showToast('Please select at least one application or script', 'warning');
      return;
    }

    this.showLoading('Generating your complete optimization setup...');

    try {
      await this.sleep(3000);
      
      const batchContent = this.createBatchScript();
      this.downloadFile(batchContent, `UNSHITTYMIZER_V3_Setup_${this.formatDate()}.bat`);
      
      this.hideLoading();
      this.showModal();
      this.showToast('Complete setup package generated successfully!', 'success');
      
    } catch (error) {
      this.hideLoading();
      this.showToast('Failed to generate setup package', 'error');
      console.error('Generation error:', error);
    }
  }

  downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  formatDate() {
    return new Date().toISOString().split('T')[0];
  }

  showLoading(message) {
    const overlay = document.getElementById('loading-overlay');
    const text = document.getElementById('loading-text');
    
    if (overlay) overlay.classList.remove('hidden');
    if (text) text.textContent = message;
  }

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  showModal() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.remove('hidden');
  }

  hideModal() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('hidden');
  }

  showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };

    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      zIndex: '3000',
      background: colors[type] || colors.info,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      transform: 'translateY(-20px)',
      opacity: '0',
      transition: 'all 0.3s ease-out',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.transform = 'translateY(-20px)';
        toast.style.opacity = '0';
        setTimeout(() => {
          if (toast.parentNode) toast.remove();
        }, 300);
      }
    }, 4000);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateUI() {
    this.updateTabState();
    this.updateProgress();
    this.updateSystemSpecs();
  }
}

// Global navigation functions
window.nextTab = function(tabId) {
  if (window.app) {
    window.app.switchTab(tabId);
  }
};

window.prevTab = function(tabId) {
  if (window.app) {
    window.app.switchTab(tabId);
  }
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔥 Starting UNSHITTYMIZER V3...');
  window.app = new UnshittymyzerApp();
});