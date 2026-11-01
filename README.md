# Teams Morph 🎨

A Windows desktop application for customizing the appearance of Microsoft Teams. Create, preview, and manage beautiful themes for your Teams experience.

![Teams Morph](https://img.shields.io/badge/Platform-Windows-blue)
![Electron](https://img.shields.io/badge/Built%20with-Electron-47848F)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)

## ✨ Features

### 🎨 Custom Theme Editor
- **Full color customization** - Customize every aspect of the Teams interface
- **Live preview** - See changes instantly in a Teams-inspired preview
- **Color picker** - Intuitive color selection with hex input and presets
- **Font size options** - Choose from small, medium, large, or extra-large text

### 🌈 Predefined Themes
Ships with 7 beautiful built-in themes:
- **Midnight Purple** - Dark theme with elegant purple accents
- **Ocean Blue** - Calming blue tones inspired by the deep ocean
- **Pastel Pink** - Light and cheerful theme with soft pink colors
- **Neon Dark** - Ultra-dark theme with vibrant neon accents
- **Forest Green** - Nature-inspired theme with calming forest colors
- **Minimal White** - Clean and minimal light theme
- **Custom Theme** - Start from scratch with default colors

### 💾 Theme Management
- **Save custom themes** - Create and save unlimited custom themes
- **Import/Export** - Share themes as JSON files
- **Edit & Delete** - Full control over your saved themes

### 🔍 Teams Detection
- Automatically detects Microsoft Teams installation
- Shows Teams version information
- Clear status of integration capabilities

## 🖥️ Screenshots

The application features a three-panel layout:
1. **Left Panel** - Theme library with built-in and saved themes
2. **Center Panel** - Theme editor with organized color sections
3. **Right Panel** - Live preview of your customizations

## 🛠️ Technology Stack

- **Electron** - Cross-platform desktop application framework
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **electron-store** - Persistent theme storage

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Windows 10/11

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/teams-morph.git
cd teams-morph
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev:simple
```

4. Or build and package:
```bash
npm run package
```

## 🚀 Usage

### Creating a Custom Theme

1. Select a base theme from the Theme Library (left panel)
2. Use the Theme Editor (center panel) to customize colors:
   - **Sidebar** - Navigation bar colors
   - **Chat List** - Conversation list appearance
   - **Chat Area** - Main message area
   - **Messages** - Sent and received message bubbles
   - **Input** - Message input field
   - **Accents** - Buttons and highlights
3. Watch your changes in the Live Preview (right panel)
4. Click "Save Theme" to keep your creation

### Managing Themes

- **Save** - Click "Save Theme" to save your current customization
- **Export** - Export themes as `.teams-theme.json` files
- **Import** - Load themes from JSON files
- **Delete** - Remove custom themes (built-in themes cannot be deleted)

### Understanding Integration Status

Teams Morph detects your Microsoft Teams installation and shows:
- ✅ **Green** - Teams detected and ready
- 🟡 **Yellow** - Teams installed but limited integration
- ⚫ **Gray** - Teams not detected

> **Note:** Direct theme application to Microsoft Teams is not currently supported due to Teams' security architecture. Your themes are saved locally and can be previewed within the app.

## 📁 Project Structure

```
teams-morph/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── index.ts          # Main entry point
│   │   ├── window.ts         # Window management
│   │   ├── preload.ts        # Preload script (IPC bridge)
│   │   ├── ipc/              # IPC handlers
│   │   └── services/         # Backend services
│   │       ├── theme-storage.ts
│   │       ├── teams-detector.ts
│   │       └── integration-service.ts
│   │
│   ├── renderer/             # React application
│   │   ├── App.tsx           # Root component
│   │   ├── components/       # UI components
│   │   │   ├── common/       # Shared components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── theme-editor/ # Theme editing
│   │   │   ├── preview/      # Teams preview
│   │   │   ├── theme-library/# Theme management
│   │   │   └── status/       # Teams status
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── styles/           # CSS styles
│   │   └── utils/            # Utility functions
│   │
│   └── shared/               # Shared code
│       ├── types/            # TypeScript types
│       └── constants/        # Constants & themes
│
├── .kiro/                    # Kiro IDE configuration
│   └── specs/                # Project specifications
│
└── dist/                     # Built application
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:simple` | Build and run in development mode |
| `npm run build` | Build for production |
| `npm run package` | Create Windows installer |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |

## 🔒 Security & Limitations

### What Teams Morph Does:
- ✅ Provides a comprehensive theme editor
- ✅ Shows realistic Teams-inspired preview
- ✅ Saves themes locally
- ✅ Detects Teams installation
- ✅ Exports/imports theme configurations

### What Teams Morph Does NOT Do:
- ❌ Modify Microsoft Teams files
- ❌ Inject code into Teams processes
- ❌ Bypass Teams security protections
- ❌ Make unsupported API calls

Teams Morph is designed with safety in mind. Your themes are saved and previewed locally, ready for any future integration methods that may become available from Microsoft.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Microsoft Teams for the UI inspiration
- The Electron team for the amazing framework
- The React team for the powerful UI library

---

**Note:** Teams Morph is an independent project and is not affiliated with, endorsed by, or connected to Microsoft Corporation.
