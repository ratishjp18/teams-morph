# Teams Morph - Design Document

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Teams Morph Application                      │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    Electron Main Process                      │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │    │
│  │  │   Window     │  │    IPC       │  │   Teams          │   │    │
│  │  │   Manager    │  │   Handler    │  │   Detector       │   │    │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │    │
│  │  │   Theme      │  │    File      │  │   Integration    │   │    │
│  │  │   Storage    │  │   System     │  │   Service        │   │    │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              │ IPC                                    │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                   Electron Renderer Process                   │    │
│  │  ┌─────────────────────────────────────────────────────┐    │    │
│  │  │                    React Application                  │    │    │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │    │    │
│  │  │  │  Theme     │  │  Preview   │  │   Theme    │     │    │    │
│  │  │  │  Editor    │  │  Panel     │  │   Library  │     │    │    │
│  │  │  └────────────┘  └────────────┘  └────────────┘     │    │    │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │    │    │
│  │  │  │  Color     │  │  Theme     │  │   Status   │     │    │    │
│  │  │  │  Pickers   │  │  Manager   │  │   Panel    │     │    │    │
│  │  │  └────────────┘  └────────────┘  └────────────┘     │    │    │
│  │  └─────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── main/                          # Electron Main Process
│   ├── index.ts                   # Main entry point
│   ├── window.ts                  # Window management
│   ├── ipc/                       # IPC handlers
│   │   ├── index.ts
│   │   ├── theme-handlers.ts
│   │   └── teams-handlers.ts
│   ├── services/
│   │   ├── theme-storage.ts       # Theme persistence
│   │   ├── teams-detector.ts      # Teams detection
│   │   └── integration-service.ts # Teams integration
│   └── preload.ts                 # Preload script
│
├── renderer/                      # React Application
│   ├── index.tsx                  # React entry
│   ├── App.tsx                    # Root component
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainContent.tsx
│   │   ├── theme-editor/
│   │   │   ├── ThemeEditor.tsx
│   │   │   ├── ColorSection.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── GradientEditor.tsx
│   │   │   └── FontSizeSelector.tsx
│   │   ├── preview/
│   │   │   ├── TeamsPreview.tsx
│   │   │   ├── PreviewSidebar.tsx
│   │   │   ├── PreviewChatList.tsx
│   │   │   ├── PreviewMessages.tsx
│   │   │   └── PreviewHeader.tsx
│   │   ├── theme-library/
│   │   │   ├── ThemeLibrary.tsx
│   │   │   ├── ThemeCard.tsx
│   │   │   └── SavedThemes.tsx
│   │   ├── status/
│   │   │   ├── TeamsStatus.tsx
│   │   │   └── IntegrationStatus.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       └── Tooltip.tsx
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useTeamsStatus.ts
│   │   └── useToast.ts
│   ├── contexts/
│   │   ├── ThemeContext.tsx
│   │   └── ToastContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── color-utils.ts
│   │   └── theme-utils.ts
│   └── styles/
│       ├── index.css
│       └── themes.css
│
├── shared/                        # Shared between main/renderer
│   ├── types/
│   │   ├── theme.ts
│   │   ├── teams.ts
│   │   └── ipc.ts
│   └── constants/
│       ├── themes.ts              # Predefined themes
│       └── channels.ts            # IPC channels
│
└── assets/
    └── icons/
```

---

## Data Models

### Theme Schema

```typescript
interface Theme {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isBuiltIn: boolean;
  colors: ThemeColors;
  fonts: ThemeFonts;
}

interface ThemeColors {
  // Sidebar
  sidebarBackground: ColorValue;
  sidebarText: string;
  sidebarActiveItem: string;
  sidebarHoverItem: string;
  sidebarIcon: string;
  
  // Chat List
  chatListBackground: ColorValue;
  chatListText: string;
  chatListSecondaryText: string;
  chatListActiveItem: string;
  chatListHoverItem: string;
  chatListUnreadBadge: string;
  
  // Chat Area
  chatBackground: ColorValue;
  chatHeaderBackground: string;
  chatHeaderText: string;
  
  // Messages
  sentMessageBackground: string;
  sentMessageText: string;
  receivedMessageBackground: string;
  receivedMessageText: string;
  messageTimestamp: string;
  
  // Input
  inputBackground: string;
  inputText: string;
  inputBorder: string;
  inputPlaceholder: string;
  
  // Accents
  primaryAccent: string;
  secondaryAccent: string;
  buttonBackground: string;
  buttonText: string;
  buttonHover: string;
  
  // General
  borderColor: string;
  dividerColor: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
}

interface ColorValue {
  type: 'solid' | 'gradient';
  value: string;                    // For solid colors
  gradient?: GradientValue;         // For gradients
}

interface GradientValue {
  type: 'linear' | 'radial';
  angle?: number;                   // For linear gradients
  stops: GradientStop[];
}

interface GradientStop {
  color: string;
  position: number;                 // 0-100
}

interface ThemeFonts {
  baseFontSize: 'small' | 'medium' | 'large' | 'extra-large';
  fontFamily?: string;
}
```

### Teams Detection Schema

```typescript
interface TeamsInfo {
  isInstalled: boolean;
  version?: string;
  installPath?: string;
  variant: 'new' | 'classic' | 'unknown';  // New Teams vs Classic
  integrationStatus: IntegrationStatus;
}

interface IntegrationStatus {
  canApplyTheme: boolean;
  method?: 'none' | 'experimental';
  limitations: string[];
  supportedFeatures: string[];
}
```

### IPC Channels

```typescript
// Theme Operations
'theme:get-all'         // Get all themes
'theme:get-by-id'       // Get theme by ID
'theme:save'            // Save/update theme
'theme:delete'          // Delete theme
'theme:export'          // Export theme to file
'theme:import'          // Import theme from file
'theme:reset-defaults'  // Reset to default themes

// Teams Operations
'teams:detect'          // Detect Teams installation
'teams:get-status'      // Get current Teams status
'teams:apply-theme'     // Attempt to apply theme
'teams:check-integration' // Check integration capabilities
```

---

## UI Design

### Main Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─ Header ──────────────────────────────────────────────────────────┐ │
│  │  🎨 Teams Morph                    Teams Status: ✅ Detected v2.x │ │
│  └───────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ ┌─ Sidebar ─┐  ┌─ Main Content ─────────────────────────────────────┐ │
│ │           │  │                                                      │ │
│ │ 📚 Themes │  │  ┌─ Theme Editor ──────┐  ┌─ Live Preview ────────┐ │ │
│ │           │  │  │                      │  │                        │ │ │
│ │ • Midnight│  │  │  Sidebar Colors     │  │  ┌──────┬───────────┐ │ │ │
│ │ • Ocean   │  │  │  ├─ Background      │  │  │      │           │ │ │ │
│ │ • Pastel  │  │  │  ├─ Text            │  │  │ Side │  Chat     │ │ │ │
│ │ • Neon    │  │  │  └─ Active Item     │  │  │ bar  │  List     │ │ │ │
│ │ • Forest  │  │  │                      │  │  │      │           │ │ │ │
│ │ • Minimal │  │  │  Chat Colors        │  │  ├──────┼───────────┤ │ │ │
│ │ • Custom  │  │  │  ├─ Background      │  │  │      │           │ │ │ │
│ │           │  │  │  ├─ Sent Messages   │  │  │      │ Messages  │ │ │ │
│ │ ───────── │  │  │  └─ Received Msgs   │  │  │      │           │ │ │ │
│ │           │  │  │                      │  │  │      │           │ │ │ │
│ │ 💾 Saved  │  │  │  Accent Colors      │  │  │      ├───────────┤ │ │ │
│ │ • My Dark │  │  │  ├─ Primary         │  │  │      │  Input    │ │ │ │
│ │ • Work    │  │  │  └─ Buttons         │  │  │      │           │ │ │ │
│ │           │  │  │                      │  │  └──────┴───────────┘ │ │ │
│ │           │  │  └──────────────────────┘  └────────────────────────┘ │ │
│ │           │  │                                                      │ │
│ │           │  │  ┌─ Actions ─────────────────────────────────────────┐ │
│ │           │  │  │  [Save Theme]  [Export]  [Reset]  [Apply Theme*] │ │
│ │           │  │  │  * Only enabled when integration is available     │ │
│ │           │  │  └──────────────────────────────────────────────────┘ │
│ └───────────┘  └─────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Color Picker Component

```
┌─ Color Picker ────────────────────┐
│  ┌────────────────────────────┐   │
│  │                            │   │
│  │      Color Spectrum        │   │
│  │        Selector            │   │
│  │                            │   │
│  └────────────────────────────┘   │
│                                    │
│  ┌─────────────────┐  Opacity     │
│  │  Hue Slider     │  ████████    │
│  └─────────────────┘              │
│                                    │
│  HEX: #6B5CE7    RGB: 107,92,231  │
│                                    │
│  Recent Colors:                    │
│  [■][■][■][■][■][■][■][■]         │
│                                    │
│  [Solid] [Gradient]               │
└───────────────────────────────────┘
```

### Teams Preview Component

```
┌─ Teams Preview ──────────────────────────────────────────┐
│ ┌─────┬──────────────┬──────────────────────────────────┐│
│ │ 🏠  │ Activity     │ ⋮  General Chat           ☐ ☐ ✕  ││
│ │ 💬  │ ○ John Doe   │──────────────────────────────────││
│ │ 📅  │   Hey team!  │                                   ││
│ │ 📞  │ ○ Jane Smith │  ┌──────────────────────────┐     ││
│ │ 📁  │   Meeting... │  │  Hey everyone! How's the │     ││
│ │     │ ● Dev Team   │  │  project going?          │     ││
│ │     │   New update │  └──────────────────────────┘     ││
│ │     │              │              10:30 AM  John Doe   ││
│ │     │              │                                   ││
│ │     │              │       ┌──────────────────────────┐││
│ │     │              │       │  Going great! Almost    │││
│ │     │              │       │  done with the feature. │││
│ │     │              │       └──────────────────────────┘││
│ │     │              │  10:32 AM  You                    ││
│ │     │              │                                   ││
│ │     │              │──────────────────────────────────││
│ │ ⚙️  │              │  📎 Type a message...      😊 📤  ││
│ └─────┴──────────────┴──────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

---

## Integration Strategy

### Teams Detection Approach

1. **Registry Check**: Query Windows Registry for Teams installation
   - `HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall\Teams`
   - `HKLM\Software\Microsoft\Teams`

2. **File System Check**: Look for Teams installation paths
   - `%LocalAppData%\Microsoft\Teams` (Classic)
   - `%LocalAppData%\Packages\MSTeams_*` (New Teams from Store)
   - `%ProgramFiles%\WindowsApps\MSTeams*`

3. **Process Check**: Check for running Teams process
   - `ms-teams.exe` (New Teams)
   - `Teams.exe` (Classic Teams)

### Integration Capabilities Research

**Current Status: Limited Integration Available**

Microsoft Teams does not officially support third-party theme customization. The following constraints apply:

1. **What IS Possible:**
   - Detect Teams installation and version
   - Save theme configurations locally
   - Preview themes in the application
   - Export/import theme configurations
   - Prepare themes for potential future integration

2. **What IS NOT Possible (Safely):**
   - Directly modify Teams appearance
   - Inject CSS into Teams
   - Modify Teams configuration files
   - Override Teams styles at runtime

3. **Experimental Considerations:**
   - Document any unofficial methods found during research
   - Mark clearly as experimental
   - Provide warnings about potential risks
   - Allow users to opt-in to experimental features

### Integration Architecture

```typescript
interface IntegrationMethod {
  id: string;
  name: string;
  status: 'supported' | 'experimental' | 'unsupported';
  teamsVersions: string[];
  apply: (theme: Theme) => Promise<IntegrationResult>;
  revert: () => Promise<void>;
  description: string;
  warnings: string[];
}

// Registry of integration methods
class IntegrationRegistry {
  private methods: Map<string, IntegrationMethod>;
  
  registerMethod(method: IntegrationMethod): void;
  getAvailableMethods(teamsVersion: string): IntegrationMethod[];
  getBestMethod(teamsVersion: string): IntegrationMethod | null;
}
```

---

## State Management

### Theme Context State

```typescript
interface ThemeState {
  // Current editing state
  currentTheme: Theme;
  originalTheme: Theme;
  hasUnsavedChanges: boolean;
  
  // Library state
  builtInThemes: Theme[];
  savedThemes: Theme[];
  
  // Teams state
  teamsInfo: TeamsInfo | null;
  isDetectingTeams: boolean;
  
  // UI state
  selectedThemeId: string | null;
  activeColorSection: string;
}

interface ThemeActions {
  // Theme editing
  setColor: (path: string, value: string) => void;
  setGradient: (path: string, gradient: GradientValue) => void;
  setFontSize: (size: ThemeFonts['baseFontSize']) => void;
  
  // Theme management
  selectTheme: (themeId: string) => void;
  saveTheme: (name?: string) => Promise<void>;
  deleteTheme: (themeId: string) => Promise<void>;
  resetToDefault: () => void;
  
  // Import/Export
  exportTheme: () => Promise<void>;
  importTheme: () => Promise<void>;
  
  // Teams integration
  detectTeams: () => Promise<void>;
  applyToTeams: () => Promise<IntegrationResult>;
}
```

---

## Error Handling Strategy

### Error Categories

1. **Validation Errors**: Invalid color values, missing required fields
2. **Storage Errors**: Failed to save/load themes
3. **Integration Errors**: Teams detection/application failures
4. **System Errors**: File system, registry access issues

### Error Display

```typescript
interface AppError {
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  recoverable: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}
```

### Toast Notifications

- Success: Green, auto-dismiss after 3s
- Warning: Yellow, requires manual dismiss
- Error: Red, shows action to retry/dismiss

---

## Security Considerations

1. **No Elevated Privileges**: App runs without admin rights
2. **Sandboxed Operations**: Electron context isolation enabled
3. **Input Validation**: Sanitize all imported JSON
4. **No Network Calls**: All operations are local
5. **Safe Defaults**: Never auto-apply themes

---

## Performance Optimizations

1. **Debounced Updates**: Color picker changes debounced (50ms)
2. **Memoized Components**: Preview components memoized
3. **Lazy Loading**: Theme library loaded on demand
4. **CSS Variables**: Instant theme switching via CSS vars
5. **Virtual Scrolling**: For large saved theme lists

---

## Testing Strategy

### Unit Tests
- Color utility functions
- Theme validation logic
- State management reducers

### Integration Tests
- Theme save/load operations
- Teams detection service
- IPC communication

### E2E Tests
- Complete theme creation flow
- Export/import workflow
- Theme switching

---

## Build & Deployment

### Development
```bash
npm run dev        # Start with hot reload
npm run test       # Run tests
npm run lint       # Run linter
```

### Production
```bash
npm run build      # Build application
npm run package    # Create installer
npm run make       # Create distributable
```

### Output
- `dist/` - Compiled application
- `out/` - Packaged installer (NSIS/Squirrel)
