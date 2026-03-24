Build a high-end, Dark Mode event management interface. The aesthetic is "Obsidian & Ember"—deep black/charcoal surfaces with vibrant red accents and glowing interactive elements.
1. Color Palette & Typography
• Primary Background: Deep Charcoal (#0a0a0a to #121212).
• Surface/Card Color: Slightly lighter grey (#1c1c1c) with a subtle 1px border in Dark Red.
• Accent Color: Vibrant Crimson (#dc2626) for primary buttons, notification badges, and active states.
• Typography: Bold, sans-serif (e.g., Inter or Montserrat). Headings in pure white, body text in muted silver/grey.
2. Layout & Components
A. Landing / Auth (The "Ember" Entry)
• Hero Section: Centered bold typography for [Insert App Name].
• Background: A dark, animated gradient mesh (moving from black to a very deep, subtle burgundy).
• Login Card: * Glassmorphism effect with a backdrop-blur.
• Input fields: Dark background, glowing Red border-bottom on focus.
• Button: Solid Red with a "Pulse" hover effect.
B. Dashboard (The "Command Center")
• Navigation Bar: * Sticky blur effect (bg-black/50).
• Cart/Favorites Icon: A minimalist heart or bookmark icon.
• Notification Badge: A bright Red circle with white text.
• Event Gallery: * Grid: 3-column layout (responsive).
• Cards: "Floating" style. Images should have a subtle Red overlay on hover.
• The Action: "Add to Favorites" button—when clicked, it triggers a Motion Trail (a red streak or ghost icon) that flies into the Cart icon.
• Event Creator (FAB): * A circular Red button in the bottom-right.
• Modal: Slides up from the bottom with a dark overlay (bg-black/80).
3. Interaction & "Stitch" Ready States
• Hover States: All buttons should have a soft red "outer glow" (box-shadow) when hovered.
• Loading States: Use "Skeleton Screens" with a dark-to-deep-red shimmer effect.
• Empty State: If no events exist, show a minimalist red wireframe icon with a "Start Creating" call to action.
4. Technical Implementation Notes (Tailwind CSS)
• Main Container: bg-neutral-950 text-neutral-100
• Primary Button: bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/20 transition-all
• Card Border: border border-neutral-800 hover:border-red-900/50
• Animation: Use framer-motion for the "Fly to Cart" transition using a parabolic path.