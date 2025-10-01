# Component Structure Plan for Bidify Partners Page

## Overall Architecture

The redesigned partners page will follow a modular component architecture that promotes reusability, maintainability, and consistent styling. All components will be built using React functional components with modern hooks.

## Component Hierarchy

```
PartnersPage (Main Page Component)
├── HeroSection
├── PartnershipBenefits
├── FeeStructure
│   ├── FeeCards
│   └── EarningsCalculator
├── NftDiversity
│   ├── CategoryCards
│   └── FutureFeatures
├── GettingStarted
│   ├── StepJourney
│   └── SupportResources
└── FinalCta
```

## Individual Component Specifications

### 1. HeroSection
**Purpose**: Primary entry point that communicates the value proposition
**Props**: None (self-contained)
**Structure**:
- `div.hero-container`
  - `div.hero-content`
    - `h1` (headline)
    - `p` (subheading)
    - `div.hero-buttons`
      - Primary CTA button
      - Secondary "Learn More" button
  - `div.hero-visual`
    - SVG illustration (replacing current handshake icon)

**Styling**: Clean background with subtle gradient, centered content on mobile, split layout on desktop

### 2. PartnershipBenefits
**Purpose**: Showcase the three main partnership benefits
**Props**: None (uses static data)
**Structure**:
- `section.benefits-section`
  - `div.section-header`
  - `div.benefits-grid`
    - Three `InfoCard` components (reusing existing component with new styling)

**Note**: Will reuse the existing `InfoCards` component but with updated styling to match new design system

### 3. FeeStructure
**Purpose**: Present fee structure and interactive calculator
**Props**: None
**Structure**:
- `section.fee-section`
  - `div.section-header`
  - `div.fee-content`
    - `div.fee-cards-container`
      - Two `FeeCard` components
    - `EarningsCalculator` component

#### FeeCard Component
**Purpose**: Display individual fee structure details
**Props**: 
- `type`: "listing" | "sales"
- `percentage`: string
- `title`: string
- `description`: string
- `benefits`: string[]

**Structure**:
- `div.fee-card`
  - `div.fee-percentage`
  - `h3.title`
  - `p.description`
  - `ul.benefits-list`

#### EarningsCalculator Component
**Purpose**: Interactive calculator for potential earnings
**Props**: None
**Structure**:
- `div.calculator`
  - `h3` (title)
  - `div.input-group`
    - Three input fields (Monthly Listings, Average Sale Value, Success Rate)
  - `div.results`
    - Three result rows (Listing Revenue, Sales Revenue, Total Monthly)

**Functionality**: Real-time calculation using React state hooks

### 4. NftDiversity
**Purpose**: Showcase supported NFT types and future features
**Props**: None
**Structure**:
- `section.nft-section`
  - `div.section-header`
  - `div.nft-content`
    - `CategoryCards` component
    - `FutureFeatures` component

#### CategoryCards Component
**Purpose**: Display NFT category cards in responsive grid
**Props**: None (uses static data)
**Structure**:
- `div.category-grid`
  - Six `CategoryCard` components

#### CategoryCard Component
**Purpose**: Individual NFT category display
**Props**:
- `icon`: React.ReactNode (SVG icon)
- `title`: string
- `description`: string

**Structure**:
- `div.category-card`
  - `div.icon-container`
  - `h3.title`
  - `p.description`

#### FutureFeatures Component
**Purpose**: Highlight upcoming features as premium content
**Props**: None
**Structure**:
- `div.future-features`
  - `h3` (title)
  - `p` (description)

### 5. GettingStarted
**Purpose**: Guide users through the partnership process
**Props**: None
**Structure**:
- `section.getting-started-section`
  - `div.section-header`
  - `div.content-container`
    - `StepJourney` component
    - `SupportResources` component

#### StepJourney Component
**Purpose**: Display the 4-step partnership process
**Props**: None
**Structure**:
- `div.steps-container`
  - Four `StepCard` components

#### StepCard Component
**Purpose**: Individual step in the partnership journey
**Props**:
- `number`: number
- `title`: string
- `description`: string
- `ctaText`: string
- `onCtaClick`: () => void

**Structure**:
- `div.step-card`
  - `div.step-number`
  - `h3.title`
  - `p.description`
  - CTA button

#### SupportResources Component
**Purpose**: Display available support and resources
**Props**: None
**Structure**:
- `div.support-container`
  - `h3` (title)
  - `div.resources-grid`
    - Four `ResourceCard` components

#### ResourceCard Component
**Purpose**: Individual support resource
**Props**:
- `title`: string
- `description`: string

**Structure**:
- `div.resource-card`
  - `h4.title`
  - `p.description`

### 6. FinalCta
**Purpose**: Final call-to-action to convert visitors
**Props**: None
**Structure**:
- `section.final-cta`
  - `div.cta-content`
    - `h2` (headline)
    - `p` (subheading)
    - `div.cta-buttons`
      - Primary CTA button
      - Secondary CTA button

## Reusable Components

### InfoCard (Updated)
**Purpose**: Generic information card used throughout the site
**Enhancements**: 
- Modern styling with subtle hover effects
- Consistent spacing and typography
- Improved accessibility

### Button (Existing)
**Purpose**: Standard button component
**Usage**: All CTAs will use the existing Button component with appropriate variants

## Data Management

- **Static Content**: All content will remain as static JSX (no external API calls needed)
- **State Management**: Only the calculator will use React useState hooks for interactivity
- **Props**: Components will be self-contained with minimal prop requirements

## File Structure

```
src/pages/
  └── partnersPage.jsx (main page component)

src/patterns/
  └── partners/
      ├── HeroSection.jsx
      ├── PartnershipBenefits.jsx
      ├── FeeStructure.jsx
      │   ├── FeeCard.jsx
      │   └── EarningsCalculator.jsx
      ├── NftDiversity.jsx
      │   ├── CategoryCards.jsx
      │   ├── CategoryCard.jsx
      │   └── FutureFeatures.jsx
      ├── GettingStarted.jsx
      │   ├── StepJourney.jsx
      │   ├── StepCard.jsx
      │   ├── SupportResources.jsx
      │   └── ResourceCard.jsx
      └── FinalCta.jsx

src/styles/
  └── pages/
      └── partnersPage.scss (main stylesheet)
  └── patterns/
      └── partners/
          ├── heroSection.scss
          ├── partnershipBenefits.scss
          ├── feeStructure.scss
          ├── nftDiversity.scss
          ├── gettingStarted.scss
          └── finalCta.scss
```

This component structure ensures modularity, reusability, and maintainability while supporting the modern design aesthetic and improved user experience.