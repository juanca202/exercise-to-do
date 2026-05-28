# Design System Inspired by Banco Bolivariano

## 1. Visual Theme & Atmosphere

Banco Bolivariano's design system embodies trust, stability, and financial sophistication through a carefully balanced palette of deep teals and professional neutrals. The aesthetic combines modern minimalism with institutional credibility, creating an interface that feels both approachable and authoritative. The design prioritizes clarity and accessibility, using generous whitespace and deliberate color contrast to guide users through complex financial transactions. The visual language reflects the bank's commitment to reliability while maintaining a contemporary, digital-first appearance that resonates with both personal and corporate clients.

**Key Characteristics**
- Professional teal accent color conveying trust and financial security
- Neutral gray foundation providing stability and legibility
- Clean typography with generous spacing for readability
- Rounded button elements softening institutional formality
- Minimal, functional design avoiding unnecessary ornamentation
- High contrast text ensuring accessibility across all devices

## 2. Color Palette & Roles

### Primary
- **Primary Teal** (`#008392`): Primary action buttons, links, navigation highlights, and key interactive elements throughout the interface
- **Deep Slate** (`#495057`): Secondary text, subtle UI elements, and supporting content

### Accent Colors
- **Teal Accent Light** (`#AACCCC`): Hover states, disabled backgrounds, and light interactive feedback
- **Deep Teal** (`#1B5255`): Deepened accent for primary emphasis and modal overlays

### Interactive
- **Action Teal** (`#008392`): Primary call-to-action buttons and linked content
- **Link Text Teal** (`#008392`): Hyperlinks and "Learn More" text with arrow indicators

### Neutral Scale
- **Dark Charcoal** (`#333333`): Primary body text and main content
- **Medium Gray** (`#606060`): Secondary text and supporting information
- **Light Gray** (`#9F9F9F`): Disabled states and tertiary text
- **Dark Gray Secondary** (`#424242`): Form labels and caption text
- **Very Dark** (`#212529`): Alternative dark neutral for specific use cases
- **Stone Gray** (`#6C757D`): Subtle borders and divider lines
- **Very Dark Blue** (`#17191F`): High-contrast headings and emphasis

### Surface & Borders
- **White** (`#FFFFFF`): Primary background, card surfaces, and modal overlays
- **Light Blue-Gray** (`#EBF5F6`): Light background sections and subtle container fills
- **Border Gray** (`#CED4DA`): Form input borders and container edges
- **Pure Black** (`#000000`): Text shadows and maximum contrast elements

## 3. Typography Rules

### Font Family
- **Primary Font:** Lexend, sans-serif
- **Fallback Stack:** `Lexend, Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Lexend | 12px | 500 | 0px | normal | Minimal display use; typically overridden contextually |
| Heading 2 | Lexend | 24px | 700 | 32px | normal | Section headings and major page titles |
| Heading 3 | Lexend | 16px | 500 | 24px | normal | Subsection headings and card titles |
| Body Regular | Lexend | 14px | 400 | 20px | normal | Default body copy and general content |
| Body Bold | Lexend | 14px | 600 | 30px | normal | Emphasized text and feature copy |
| Button / CTA | Lexend | 16px | 500 | normal | normal | Primary and secondary button text |
| Button Small | Lexend | 14px | 400 | 20px | normal | Tertiary buttons and compact actions |
| Input / Form | Lexend | 13px | 400 | normal | normal | Form field text and placeholder content |
| Caption / Small | Lexend | 12px | 400 | 18px | normal | Fine print, disclaimers, and metadata |

### Principles
- Use **Lexend** exclusively across all digital properties for consistent brand voice
- Maintain 20px minimum line height for body text to ensure readability and accessibility
- Apply bold weight (`600`–`700`) sparingly to create hierarchy without visual noise
- Reserve heading weights (`700`) for major sections; use `500` for subsections to reduce cognitive load
- Button text is always `16px` and bold (`500`) for interactive prominence and touch target clarity
- Caption and small text defaults to `400` weight to avoid visual strain at smaller sizes
- Ensure minimum `14px` size for all user-readable content to meet WCAG accessibility standards

## 4. Component Stylings

### Buttons

#### Primary Button (Solid Teal)
- **Background:** `rgb(0, 131, 146)` / `#008392`
- **Text Color:** `rgb(255, 255, 255)` / `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `500`
- **Padding:** `16px 32px`
- **Border Radius:** `36px`
- **Border:** `0px none`
- **Line Height:** `normal`
- **Hover State:** Darken to `#006B77` with slight shadow `0px 4px 12px rgba(0, 131, 146, 0.3)`
- **Active State:** Background `#005A63` with inset shadow `inset 0px 2px 4px rgba(0, 0, 0, 0.2)`
- **Disabled State:** Background `#AACCCC`, Text `#FFFFFF`, cursor `not-allowed`

#### Secondary Button (White with Teal Border)
- **Background:** `rgb(255, 255, 255)` / `#FFFFFF`
- **Text Color:** `rgb(66, 66, 66)` / `#424242`
- **Font Size:** `16px`
- **Font Weight:** `500`
- **Padding:** `16px 32px`
- **Border Radius:** `36px`
- **Border:** `2px solid #008392`
- **Line Height:** `normal`
- **Hover State:** Background `#F0F8F9` with border color `#006B77`
- **Active State:** Background `#E0F1F3` with border color `#005A63`
- **Disabled State:** Background `#FFFFFF`, Border `#CED4DA`, Text `#9F9F9F`

#### Ghost Button (Text-Only Teal)
- **Background:** `transparent`
- **Text Color:** `rgb(0, 131, 146)` / `#008392`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 0px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Line Height:** `20px`
- **Hover State:** Text color `#006B77` with bottom border `2px solid #008392`
- **Active State:** Text color `#005A63` with bottom border `2px solid #005A63`
- **Disabled State:** Text color `#9F9F9F`, cursor `not-allowed`

### Cards & Containers

#### Feature Card (Large Content Card)
- **Background:** `transparent` with subtle grid background when needed
- **Text Color:** `rgb(51, 51, 51)` / `#333333`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `26px 26px`
- **Border Radius:** `0px` (flat edge design for full-width sections)
- **Border:** `0px none`
- **Line Height:** `20px`
- **Min Height:** `392px` for content sections
- **Box Shadow:** None for flat cards; use `0px 4px 8px rgba(0, 0, 0, 0.1)` for lifted card variants

#### Service Card (Icon + Text Block)
- **Background:** `rgba(235, 245, 246, 0.5)` / Light blue-gray tint
- **Text Color:** `rgb(51, 51, 51)` / `#333333`
- **Padding:** `24px 20px`
- **Border Radius:** `20px`
- **Border:** `1px solid #CED4DA`
- **Line Height:** `20px`
- **Icon Color:** `#AACCCC` (light teal)
- **Link Text:** `rgb(0, 131, 146)` / `#008392`, weight `500`, underline on hover

#### Modal Container
- **Background:** `rgb(255, 255, 255)` / `#FFFFFF`
- **Text Color:** `rgb(51, 51, 51)` / `#333333`
- **Padding:** `32px 32px`
- **Border Radius:** `16px` (all corners) or `16px 16px 0px 0px` (top) and `0px 0px 16px 16px` (bottom) for slide-up variants
- **Box Shadow:** `0px 8px 32px rgba(0, 0, 0, 0.15)`
- **Overlay Backdrop:** `rgba(0, 0, 0, 0.4)` darkened teal filter

### Inputs & Forms

#### Text Input
- **Background:** `rgb(255, 255, 255)` / `#FFFFFF`
- **Text Color:** `rgb(51, 51, 51)` / `#333333`
- **Placeholder Color:** `rgb(159, 159, 159)` / `#9F9F9F`
- **Font Size:** `13.3px`
- **Font Weight:** `400`
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid #CED4DA`
- **Line Height:** `normal`
- **Focus State:** Border `2px solid #008392`, background `#F0F8F9`, box-shadow `0px 0px 0px 3px rgba(0, 131, 146, 0.1)`
- **Error State:** Border `2px solid #D32F2F`, background `#FFEBEE`
- **Disabled State:** Background `#F5F5F5`, Border `#CED4DA`, Text `#9F9F9F`, cursor `not-allowed`

#### Checkbox & Radio
- **Base Color:** `#008392`
- **Unchecked Border:** `2px solid #CED4DA`
- **Checked Background:** `#008392`
- **Checked Icon:** `#FFFFFF`
- **Focus State:** Box-shadow `0px 0px 0px 3px rgba(0, 131, 146, 0.2)`
- **Disabled State:** Background `#F5F5F5`, Border `#CED4DA`, cursor `not-allowed`

### Navigation

#### Primary Navigation Bar
- **Background:** `#008392` (teal full-width bar)
- **Text Color:** `rgb(255, 255, 255)` / `#FFFFFF`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `8px 24px`
- **Height:** `56px` (comfortable touch target)
- **Menu Items Padding:** `12px 16px` per item
- **Active Link:** Underline `3px solid #FFFFFF`, weight `600`
- **Hover State:** Background `#006B77` with smooth transition

#### Breadcrumb Navigation
- **Text Color:** `rgb(96, 96, 96)` / `#606060`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Separator:** ` / ` in `#9F9F9F`
- **Active Item:** Color `#008392`, weight `600`
- **Padding:** `8px 0px` with `16px` horizontal spacing between items

#### Tab Navigation
- **Inactive Tab Background:** `transparent`
- **Inactive Tab Text:** `rgb(96, 96, 96)` / `#606060`
- **Active Tab Border Bottom:** `3px solid #008392`
- **Active Tab Text:** `rgb(0, 131, 146)` / `#008392`, weight `600`
- **Tab Padding:** `12px 20px`
- **Font Size:** `14px`
- **Hover State:** Text `#008392` with bottom border preview

### Links
- **Default Link Color:** `rgb(0, 131, 146)` / `#008392`
- **Font Weight:** `700`
- **Font Size:** `14px`
- **Text Decoration:** `underline` on hover
- **Visited Color:** `#1B5255` (deep teal)
- **Hover State:** Underline active, color darkens to `#006B77`
- **Focus State:** Outline `2px solid #008392` offset `2px`

### Badges & Tags
- **Background:** `#AACCCC` (light teal)
- **Text Color:** `#1B5255` (deep teal)
- **Font Size:** `12px`
- **Font Weight:** `500`
- **Padding:** `4px 8px`
- **Border Radius:** `12px`
- **Success Badge:** Background `#C8E6C9`, Text `#2E7D32`
- **Warning Badge:** Background `#FFE0B2`, Text `#E65100`
- **Error Badge:** Background `#FFCDD2`, Text `#C62828`

## 5. Layout Principles

### Spacing System
- **Base Unit:** `4px`
- **Scale:** Multiples of `4px` throughout: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `48px`, `52px`
- **Usage Contexts:**
  - `4px` to `8px`: Icon spacing, tight component gaps
  - `12px` to `16px`: Component padding, list item margins
  - `20px` to `24px`: Section padding, card content spacing
  - `28px` to `36px`: Feature block spacing, card gaps in grids
  - `40px` to `52px`: Major section spacing, top/bottom margins for full-width blocks
  - `48px` to `52px`: Hero section spacing, page-level vertical rhythm

### Grid & Container
- **Max Width:** `1140px` (standard desktop container width)
- **Column Strategy:** 12-column grid system with `16px` gutters
- **Padding:** `24px` left/right on desktop, `16px` on tablet, `12px` on mobile
- **Section Pattern:** Alternating full-width colored sections (teal, white, light blue-gray) with contained content
- **Feature Blocks:** 4-column grid on desktop, 2-column on tablet, 1-column on mobile with `32px` gaps

### Whitespace Philosophy
Generous whitespace is fundamental to Banco Bolivariano's design. Sections are separated by consistent vertical spacing (`48px`–`52px`) to create visual breathing room and reduce cognitive load. Cards and content blocks maintain `24px` internal padding to ensure text remains easily scannable. Between related elements, use `16px`–`20px` spacing; between unrelated sections, increase to `32px`–`40px`. The hero section and key messaging areas benefit from even larger whitespace (`52px` top/bottom) to establish prominence.

### Border Radius Scale
- `0px`: Flat-edge sections, full-width containers, and modal top/bottom surfaces
- `8px`: Form inputs, small buttons, and compact UI components
- `12px`: Subtle rounded containers and secondary cards
- `16px`: Modal dialogs, elevated cards, and major component containers
- `20px`: Service feature cards and content block corners
- `36px`: Primary rounded buttons and pill-shaped interactive elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| **Flat (0)** | No shadow, `box-shadow: none` | Page background, large sections, flat card variants |
| **Small (1)** | `box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1)` | Subtle hover states, secondary cards, dropdown shadows |
| **Medium (2)** | `box-shadow: 0px 6px 4px 2px rgba(73, 74, 82, 0.15)` | Floating elements, sticky headers, elevated sections |
| **Large (3)** | `box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2)` | Modals, popovers, major overlays |
| **Extra Large (4)** | `box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.15)` | Full-screen modals, critical overlays, maximum emphasis |

**Shadow Philosophy:** Shadows are used sparingly and purposefully to indicate interactivity and depth layering. Small shadows (`0px 4px 8px`) appear on hover states and secondary components to create subtle feedback without visual noise. Medium shadows establish floating or sticky UI elements. Large shadows reserved exclusively for modals and major interactive overlays that demand user attention. All shadows use dark neutrals with controlled opacity to maintain consistency with the teal and gray palette. The approach favors flat design with selective elevation to keep interfaces clean and performance-optimized.

## 7. Do's and Don'ts

### Do
- **Use `#008392` teal** as the primary accent for all CTAs, links, and key interactive elements
- **Maintain minimum `14px` font size** for all readable content to meet WCAG AA accessibility standards
- **Apply `36px` border radius** to all primary action buttons for visual softness and brand recognition
- **Space major sections vertically by `48px`–`52px`** to establish clear visual hierarchy and breathing room
- **Use `16px` padding** inside form inputs and `12px` on compact buttons for comfortable touch targets
- **Combine Lexend font** exclusively across all digital touchpoints for consistent brand voice
- **Apply `#333333` dark gray** for primary body text on white backgrounds for optimal contrast and readability
- **Employ full-width colored sections** (teal, white, light blue-gray) to organize content into logical chunks
- **Add box-shadow on hover** to buttons and cards (`0px 4px 12px rgba(0, 131, 146, 0.3)`) for interactive feedback
- **Use light blue-gray background** (`#EBF5F6`) for feature card sections to subtly differentiate content zones

### Don't
- **Never use text smaller than `12px`** even in captions; prioritize readability over space savings
- **Avoid dark gray (`#606060`) for body text** on white; reserve for secondary or placeholder content only
- **Don't round all corners equally**; use `0px` for full-width sections and `36px` only for pill-shaped buttons
- **Avoid red or orange accent colors** as they conflict with the established teal color system
- **Never place button text in weight below `500`** to ensure visual hierarchy and prominence
- **Avoid shadows heavier than `rgba(0, 0, 0, 0.2)`** to prevent visual clutter and maintain modern aesthetic
- **Don't mix font families**; Lexend must remain the single typography foundation
- **Avoid padding below `12px`** on interactive elements; minimum `12px` ensures comfortable touch targets
- **Never disable hover/focus states** on interactive elements; all buttons, links, and inputs require clear affordances
- **Don't apply border-radius greater than `36px`** on non-button components unless explicitly required for brand expression

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|------------|
| **Mobile** | `320px`–`639px` | Single-column layout, `12px` padding, full-width buttons, `14px` headings, collapsed navigation |
| **Tablet** | `640px`–`1023px` | 2-column grid, `16px` padding, 2-column feature cards, sticky navigation, `16px` headings |
| **Desktop** | `1024px`–`1439px` | 12-column grid, `24px` padding, 4-column feature cards, full navigation, max-width `1140px` container |
| **Large Desktop** | `1440px`+ | Same as desktop with max-width constraint, additional horizontal padding for ultra-wide screens |

### Touch Targets
- **Minimum Touch Target:** `44px × 44px` (WCAG standard)
- **Button Minimum Height:** `44px` with `12px` vertical padding minimum
- **Interactive Icon Minimum:** `24px × 24px` with `8px` surrounding padding
- **Link Text:** No minimum size, but wrap in container with `44px` minimum vertical spacing
- **Spacing Between Touch Targets:** Minimum `8px` horizontal and vertical separation to prevent accidental selection

### Collapsing Strategy
- **Mobile (`< 640px`):** Stack all grid columns to 100% width, collapse navigation to hamburger menu, reduce all padding to `12px`, convert 4-column cards to single column, increase vertical spacing to `32px` for readability, reduce button width to full-width when possible
- **Tablet (`640px`–`1023px`):** Convert 4-column grids to 2-column, maintain 2-column feature cards, use `16px` padding, collapse deep navigation levels into dropdowns, scale heading sizes down by `2px`–`4px`, adjust button width to auto-fit
- **Desktop (`> 1024px`):** Full 12-column grid support, 4-column feature cards, `24px` padding, full horizontal navigation bar, maintain all heading sizes, buttons revert to `16px` font with `36px` border radius

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Teal (`#008392`) — All primary buttons, action links, and key interactive elements
- **Secondary CTA:** White with Teal border (`#FFFFFF` bg, `#008392` border) — Secondary buttons and alternate actions
- **Body Text:** Dark Charcoal (`#333333`) — Default text for all content
- **Secondary Text:** Medium Gray (`#606060`) — Supporting text, metadata, and descriptions
- **Disabled State:** Light Gray (`#9F9F9F`) — Disabled buttons, placeholder text, inactive elements
- **Background / Surface:** White (`#FFFFFF`) — Card backgrounds, modal overlays, main content areas
- **Light Section Background:** Light Blue-Gray (`#EBF5F6`) — Feature blocks, subtle background sections
- **Navigation Bar:** Teal (`#008392`) — Primary navigation background, full-width bars
- **Borders:** Border Gray (`#CED4DA`) — Form input borders, divider lines, container edges
- **Accent Light:** Teal Light (`#AACCCC`) — Hover states, disabled backgrounds, icon accents

### Iteration Guide
1. **Always use `#008392` for primary actions** — Every CTA button, link highlight, and primary navigation element must use this teal
2. **Font size hierarchy: Headings `24px`/`700`, Subheadings `16px`/`500`, Body `14px`/`400`, Buttons `16px`/`500`** — Maintain strict sizes for consistent scaling
3. **Button padding: `16px 32px` for regular, `12px 40px` for compact, `0px` for ghost/text buttons** — All buttons derive from these base measurements
4. **Border radius: `36px` for pill buttons, `8px` for inputs, `16px` for modals, `20px` for cards, `0px` for full-width sections** — Radius is context-dependent
5. **Spacing grid is multiples of `4px`** — Use only `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `48px`, `52px`
6. **Minimum font size is `12px`** for captions; never go smaller even in edge cases
7. **Minimum button/input height is `44px`** for mobile accessibility; desktop buttons may vary but should maintain at least `40px`
8. **All text color must meet WCAG AA contrast (4.5:1 minimum for normal text, 3:1 for large text)** — Test all color combinations before implementation
9. **Shadows only on hover/active states or elevated modals** — Flat design by default; use small shadows (`0px 4px 8px`) for feedback, large shadows (`0px 8px 32px`) for modals only
10. **Use Lexend font exclusively** — No Roboto, no system fonts; all typography must specify `font-family: Lexend, sans-serif` with fallback stack