# UNSHITTYMIZER

**A comprehensive Windows 11 optimization and application installation tool designed to help users customize, clean, and enhance their PC performance with precision and safety.**

![Windows 11](https://img.shields.io/badge/Windows-11-0078d4?style=for-the-badge&logo=windows&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Features

### 🖥️ **System Specification Detection**
- **Hardware Configuration**: Select your CPU, GPU, RAM, storage type, and device type
- **Performance Analysis**: Get personalized recommendations based on your system specifications
- **Smart Recommendations**: AI-assisted optimization suggestions tailored to your hardware

### ⚡ **Comprehensive Optimization Scripts**
- **Essential Tweaks** (Low Risk): Privacy enhancements, bloatware removal, interface improvements
- **Performance Optimizations** (Medium Risk): Gaming mode, power plans, network optimizations
- **Advanced Modifications** (High Risk): System-level changes with detailed warnings
- **Script Preview**: View actual PowerShell/Registry commands before execution
- **Risk Assessment**: Color-coded safety indicators for every optimization

### 📦 **Extensive Application Installer**
- **57+ Popular Applications** across 6 categories:
  - 📊 **Productivity**: Office suites, note-taking, collaboration tools
  - 🌐 **Browsers**: Chrome, Firefox, Edge, Brave, Tor, and more
  - 💻 **Development**: VS Code, Git, Node.js, Docker, IDEs
  - 🎬 **Media**: VLC, OBS, Audacity, GIMP, Blender
  - 🎮 **Gaming**: Steam, Epic Games, Discord, GPU utilities
  - 🔧 **Utilities**: 7-Zip, PowerToys, system monitoring tools
- **Package Manager Integration**: Automatic Winget and Chocolatey support
- **Installation Time Estimates**: Hardware-specific completion time calculations

### 🎯 **Smart Recommendation Engine**
- **AI-Assisted Mode**: Automatically suggests optimizations based on your hardware
- **Manual Override**: Full control over script selection for advanced users
- **Context-Aware**: Different recommendations for Desktop vs Laptop users
- **Performance Tier Logic**: Optimizations tailored to Budget/Mainstream/High-End/Enthusiast systems

### 🛡️ **Safety & Reliability**
- **Risk Assessment**: Clear Low/Medium/High risk indicators
- **Code Transparency**: "Reveal Code" buttons show exact commands
- **Safety Warnings**: Comprehensive notices before dangerous operations
- **System Restore Reminders**: Built-in safety checkpoint recommendations

## 🎨 **User Interface**

- **Professional Dark Theme**: Modern, clean interface with neon accents
- **Step-by-Step Workflow**: Intuitive tab-based navigation
- **Real-Time Updates**: Live time estimates and recommendations as you select options
- **Responsive Design**: Works perfectly on all screen sizes
- **Visual Feedback**: Progress indicators and performance tier displays

## 🛠️ **Technical Stack**

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Package Managers**: Windows Package Manager (Winget), Chocolatey
- **Script Types**: PowerShell, Registry modifications, Batch commands
- **Architecture**: Modular, client-side application with no server dependencies

## 📋 **Prerequisites**

- Windows 11 (primary target)
- Administrator privileges (for script execution)
- Internet connection (for application downloads)
- Recommended: System restore point created before use

## 🚀 **Getting Started**

### Option 1: Direct Use
1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. Follow the step-by-step interface

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/REGEN-HALOGEN/UNSHITTYMIZER.git
   cd UNSHITTYMIZER
   ```
2. Open with VS Code and use Live Server extension for development
3. Modify `unshittymizer_v3_data.json` to customize scripts and applications

## 📖 **How to Use**

### Step 1: System Specification
- Select your CPU tier (Intel i3/i5/i7/i9/Xeon or AMD Ryzen 3/5/7/9)
- Choose your GPU category (NVIDIA Series or AMD RX/Vega)
- Configure RAM, storage type, and device type
- Review auto-calculated performance tier

### Step 2: Optimization Scripts
- Choose between AI-Assisted or Manual selection mode
- Review recommended optimizations based on your system
- Preview script code using "Reveal Code" buttons
- Select desired optimizations with risk awareness

### Step 3: Application Selection
- Browse applications by category
- Use search and filters to find specific apps
- Select applications for automatic installation
- Review download sizes and installation times

### Step 4: Finalization
- Review complete selection summary
- Check total estimated completion time
- Generate and download comprehensive batch script
- Follow safety instructions for execution

## ⚠️ **Important Safety Information**

### Before Running Generated Scripts:
1. **Create a System Restore Point**
2. **Close all running applications**
3. **Run Command Prompt as Administrator**
4. **Have system backups available**
5. **Review script contents carefully**

### Risk Levels:
- 🟢 **Low Risk**: Safe for all users, minimal system impact
- 🟠 **Medium Risk**: Moderate changes, recommended for experienced users
- 🔴 **High Risk**: Advanced modifications, experts only

## 🔧 **Customization**

### Adding New Applications
Edit `unshittymizer_v3_data.json`:
```json
{
  "application_catalog": {
    "YourCategory": [
      {
        "name": "App Name",
        "winget": "Publisher.AppName",
        "choco": "app-name",
        "description": "App description",
        "size": "100MB",
        "install_time": 60
      }
    ]
  }
}
```

### Adding New Optimization Scripts
```json
{
  "optimization_scripts": {
    "category": {
      "Script Name": {
        "description": "What this script does",
        "risk": "Low|Medium|High",
        "category": "Performance|Privacy|Gaming|etc",
        "recommended_for": ["all|Desktop|Laptop|Budget|Enthusiast"],
        "execution_time": 30,
        "script": "registry or powershell commands"
      }
    }
  }
}
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

### Contribution Guidelines:
- Test all scripts thoroughly before submission
- Include proper risk assessments
- Provide clear descriptions and documentation
- Follow existing code style and structure

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ **Acknowledgments**

- Inspired by [Chris Titus Tech's WinUtil](https://github.com/ChrisTitusTech/winutil)
- Community-tested optimization scripts and tweaks
- Windows optimization community feedback and contributions

## 🐛 **Known Issues & Roadmap**

### Current Limitations:
- Requires manual execution of generated batch files
- Windows 11 focused (Windows 10 compatibility in progress)
- Package manager dependencies for application installation

### Planned Features:
- [ ] More Optimisation Scripts
- [ ] AI Assited Suggestions
- [ ] Configuration import/export
- [ ] Automatic System Spec Detection
- [ ] Optimisation Tips thread

## 📞 **Support**

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/REGEN-HALOGEN/UNSHITTYMIZER/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/REGEN-HALOGEN/UNSHITTYMIZER/discussions)
- 📧 **Contact**: ashhhwin2003@gmail.com

---

**⚠️ Disclaimer**: This tool modifies Windows system settings. Use at your own risk. Always create backups before making system changes. The authors are not responsible for any system damage or data loss.

**Made with ❤️ by REGEN-HALOGEN**