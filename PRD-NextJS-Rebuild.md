# Product Requirements Document (PRD)
## Better Bets - Next.js Rebuild

### Document Information
- **Project**: Better Bets Arbitrage Calculator
- **Version**: 2.0
- **Framework Migration**: Vite + React → Next.js 16
- **Date**: December 2024
- **Status**: Planning Phase

---

## 1. Executive Summary

### 1.1 Project Overview
Better Bets is a sophisticated arbitrage betting calculator that helps users identify profitable betting opportunities across multiple bookmakers. The current Vite + React implementation will be rebuilt using Next.js 16 to leverage better serverless function support, improved SEO, enhanced developer experience, and the latest performance optimizations including Turbopack.

### 1.2 Migration Goals
- **Primary**: Migrate from Vite + React to Next.js 16 with App Router
- **Secondary**: Improve serverless function performance and reliability
- **Tertiary**: Enhance SEO capabilities and user experience

### 1.3 Success Metrics
- ✅ Zero downtime migration
- ✅ 100% feature parity with current implementation
- ✅ Improved page load times (< 2s)
- ✅ Better Core Web Vitals scores
- ✅ Reduced serverless function cold starts
- ✅ Leverage Turbopack for 5-10x faster builds
- ✅ Utilize new Cache Components for instant navigation

---

## 2. Current State Analysis

### 2.1 Existing Architecture
```
Current Stack:
├── Frontend: Vite + React 19 + TypeScript
├── Backend: Vercel Serverless Functions
├── Database: MongoDB
├── Authentication: Clerk
├── Styling: Tailwind CSS
├── Deployment: Vercel
```

### 2.2 Key Features (Current)
- **Arbitrage Calculator**: Complex betting optimization algorithm
- **Multi-Customer Support**: Manage multiple betting scenarios
- **CSV Import/Export**: Bulk odds data management
- **Bet Type Management**: Qualifying vs Bonus bets
- **Calculation History**: Save and retrieve past calculations
- **Authentication**: User management with Clerk

### 2.3 Technical Debt
- Mixed UI and business logic in React components
- Manual serverless function configuration
- Limited SEO optimization
- No server-side rendering capabilities

---

## 3. Target Architecture

### 3.1 Next.js 16 App Router Structure
```
src/
├── app/                          # App Router (Next.js 16)
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── calculator/               # Main calculator page
│   ├── history/                  # Calculation history
│   ├── api/                      # API routes
│   │   ├── calculations/
│   │   │   ├── route.ts          # POST /api/calculations
│   │   │   ├── [id]/route.ts     # GET/PUT/DELETE /api/calculations/[id]
│   │   │   └── list/route.ts     # GET /api/calculations/list
│   │   └── auth/
│   │       └── callback/route.ts # Clerk auth callback
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── calculator/               # Calculator-specific components
│   └── auth/                     # Authentication components
├── lib/                          # Business logic & utilities
│   ├── calculator.ts             # ✅ Already extracted
│   ├── auth.ts                   # Clerk integration
│   ├── db.ts                     # MongoDB connection
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript definitions
│   └── index.ts
└── proxy.ts                      # Next.js 16 proxy (replaces middleware)
```

### 3.2 Technology Stack
```typescript
// Core Framework
- Next.js 16 (App Router)
- React 19
- TypeScript 5.3+
- Turbopack (default bundler)

// Styling & UI
- Tailwind CSS 3.4
- Radix UI (optional)
- Lucide React (icons)

// Backend & Database
- Next.js API Routes
- MongoDB (existing)
- Mongoose (optional)

// Authentication
- Clerk (existing)
- Next.js 16 proxy integration

// Development
- ESLint + Prettier
- Husky (git hooks)
- TypeScript strict mode
```

---

## 4. Feature Requirements

### 4.1 Core Calculator Features

#### 4.1.1 Arbitrage Calculation Engine
- **Priority**: P0 (Critical)
- **Description**: Migrate the complex arbitrage calculation algorithm
- **Acceptance Criteria**:
  - ✅ Use existing `calculator.ts` module (already extracted)
  - Support qualifying and bonus bet types
  - Handle all bookmaker bonus types (freebet, matchingBonus)
  - Maintain exact calculation accuracy
  - Support "bonus only if lost" logic

#### 4.1.2 Multi-Customer Management
- **Priority**: P0 (Critical)
- **Description**: Allow users to manage multiple betting scenarios
- **Acceptance Criteria**:
  - Create/edit/delete customers
  - Switch between customers seamlessly
  - Persist customer data in MongoDB
  - Support team name customization

#### 4.1.3 Odds Input & Management
- **Priority**: P0 (Critical)
- **Description**: Input and manage odds from multiple bookmakers
- **Acceptance Criteria**:
  - Manual odds input for each bookmaker
  - CSV import/export functionality
  - Bookmaker activation/deactivation
  - Minimum odds validation
  - Real-time calculation updates

### 4.2 Data Management Features

#### 4.2.1 Calculation History
- **Priority**: P1 (High)
- **Description**: Save and retrieve calculation results
- **Acceptance Criteria**:
  - Save calculations with metadata
  - List all saved calculations
  - View detailed calculation results
  - Delete old calculations
  - Export calculation data

#### 4.2.2 CSV Import/Export
- **Priority**: P1 (High)
- **Description**: Bulk data management capabilities
- **Acceptance Criteria**:
  - Download CSV template
  - Upload CSV with odds data
  - Support Danish/English column names
  - Validate CSV format
  - Handle decimal separators (comma/period)

### 4.3 User Experience Features

#### 4.3.1 Authentication & Authorization
- **Priority**: P0 (Critical)
- **Description**: Secure user access and data isolation
- **Acceptance Criteria**:
  - Clerk authentication integration
  - Protected routes
  - User-specific data isolation
  - Session management
  - Logout functionality

#### 4.3.2 Responsive Design
- **Priority**: P1 (High)
- **Description**: Mobile-first responsive interface
- **Acceptance Criteria**:
  - Mobile-optimized calculator interface
  - Touch-friendly controls
  - Responsive data tables
  - Optimized for tablets
  - Progressive Web App (PWA) capabilities

---

## 5. Technical Requirements

### 5.1 Performance Requirements
- **Page Load Time**: < 2 seconds (First Contentful Paint)
- **Time to Interactive**: < 3 seconds
- **API Response Time**: < 500ms for calculations
- **Bundle Size**: < 500KB initial bundle
- **Core Web Vitals**: All metrics in "Good" range

### 5.2 Security Requirements
- **Authentication**: Clerk-based user authentication
- **Authorization**: Route-level and API-level protection
- **Data Validation**: Server-side input validation
- **CORS**: Properly configured for production
- **Environment Variables**: Secure secret management

### 5.3 Scalability Requirements
- **Concurrent Users**: Support 1000+ concurrent users
- **Database**: MongoDB Atlas with proper indexing
- **CDN**: Vercel Edge Network for static assets
- **Caching**: Implement appropriate caching strategies

### 5.4 Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

---

## 6. Migration Strategy

### 6.1 Phase 1: Foundation Setup (Week 1)
- [ ] Initialize Next.js 16 project with App Router
- [ ] Configure TypeScript, ESLint, Prettier
- [ ] Set up Tailwind CSS
- [ ] Configure Clerk authentication
- [ ] Set up MongoDB connection
- [ ] Create basic project structure

### 6.2 Phase 2: Core Logic Migration (Week 2)
- [ ] ✅ Migrate `calculator.ts` (already completed)
- [ ] Create API routes for calculations
- [ ] Implement database models
- [ ] Set up authentication proxy (Next.js 16)
- [ ] Test core calculation accuracy

### 6.3 Phase 3: UI Components Migration (Week 3)
- [ ] Migrate Calculator component
- [ ] Migrate CalculationHistory component
- [ ] Migrate AuthButton component
- [ ] Create reusable UI components
- [ ] Implement responsive design

### 6.4 Phase 4: Advanced Features (Week 4)
- [ ] Implement CSV import/export
- [ ] Add calculation history management
- [ ] Implement PWA features
- [ ] Add error handling and loading states
- [ ] Performance optimization

### 6.5 Phase 5: Testing & Deployment (Week 5)
- [ ] Comprehensive testing (unit, integration, e2e)
- [ ] Performance testing and optimization
- [ ] Security audit
- [ ] Production deployment
- [ ] Monitoring and analytics setup

---

## 7. API Design

### 7.1 Calculation API Endpoints

#### POST /api/calculations
```typescript
// Request
{
  customerName: string;
  teamNames: { team1: string; team2: string };
  betType: 'qualifying' | 'bonus';
  bookmakers: BookmakerInfo[];
}

// Response
{
  success: boolean;
  id: string;
  message: string;
}
```

#### GET /api/calculations/list
```typescript
// Response
{
  calculations: Array<{
    id: string;
    customerName: string;
    teamNames: TeamNames;
    betType: string;
    createdAt: Date;
    results: ArbitrageResult;
  }>;
  total: number;
  page: number;
  limit: number;
}
```

#### GET /api/calculations/[id]
```typescript
// Response
{
  id: string;
  customerName: string;
  teamNames: TeamNames;
  betType: string;
  bookmakers: BookmakerInfo[];
  results: ArbitrageResult;
  createdAt: Date;
  updatedAt: Date;
}
```

### 7.2 Authentication Integration
```typescript
// proxy.ts (Next.js 16)
import { clerkMiddleware } from '@clerk/nextjs';

export default clerkMiddleware({
  publicRoutes: ['/', '/login', '/register'],
  ignoredRoutes: ['/api/webhooks/clerk']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

---

## 8. Database Schema

### 8.1 Calculations Collection
```typescript
interface CalculationDocument {
  _id: ObjectId;
  userId: string;                    // Clerk user ID
  customerName: string;
  teamNames: {
    team1: string;
    team2: string;
  };
  betType: 'qualifying' | 'bonus';
  bookmakers: BookmakerInfo[];
  results: ArbitrageResult;
  createdAt: Date;
  updatedAt: Date;
}
```

### 8.2 Indexes
```javascript
// MongoDB Indexes
db.calculations.createIndex({ userId: 1, createdAt: -1 });
db.calculations.createIndex({ userId: 1, customerName: 1 });
db.calculations.createIndex({ createdAt: -1 });
```

---

## 9. User Stories

### 9.1 Core User Stories

#### US-001: Arbitrage Calculation
**As a** betting enthusiast  
**I want to** calculate optimal bet distributions across bookmakers  
**So that** I can maximize my guaranteed profit  

**Acceptance Criteria:**
- I can input odds from multiple bookmakers
- I can specify bet types (qualifying/bonus)
- I can see the optimal bet distribution
- I can see guaranteed profit calculations

#### US-002: Customer Management
**As a** user  
**I want to** manage multiple betting scenarios  
**So that** I can track different matches and customers  

**Acceptance Criteria:**
- I can create new customers with team names
- I can switch between customers
- I can edit customer information
- I can delete customers

#### US-003: Data Import/Export
**As a** user  
**I want to** import odds data from CSV files  
**So that** I can quickly input large amounts of data  

**Acceptance Criteria:**
- I can download a CSV template
- I can upload a CSV with odds data
- I can see validation errors for invalid data
- I can export my calculations to CSV

### 9.2 Advanced User Stories

#### US-004: Calculation History
**As a** user  
**I want to** save and retrieve my calculations  
**So that** I can reference past results  

**Acceptance Criteria:**
- I can save calculations with a name
- I can view a list of saved calculations
- I can open and review past calculations
- I can delete old calculations

#### US-005: Mobile Experience
**As a** mobile user  
**I want to** use the calculator on my phone  
**So that** I can calculate bets on the go  

**Acceptance Criteria:**
- The interface works on mobile devices
- Touch controls are responsive
- Data tables are scrollable
- The app works offline (PWA)

---

## 10. Risk Assessment

### 10.1 Technical Risks

#### High Risk
- **Calculation Accuracy**: Ensuring the migrated algorithm produces identical results
- **Performance**: Maintaining fast calculation times with complex algorithms
- **Data Migration**: Safely migrating existing user data

#### Medium Risk
- **Authentication**: Clerk integration with Next.js 16 proxy
- **Database**: MongoDB connection and query optimization
- **Deployment**: Vercel deployment configuration

#### Low Risk
- **UI Migration**: Component migration is straightforward
- **Styling**: Tailwind CSS works identically in Next.js
- **TypeScript**: Type definitions can be reused

### 10.2 Mitigation Strategies
- **Comprehensive Testing**: Unit tests for all calculation functions
- **Gradual Migration**: Feature-by-feature migration approach
- **Rollback Plan**: Keep current system running during migration
- **Performance Monitoring**: Continuous monitoring during migration

---

## 11. Success Criteria

### 11.1 Technical Success
- ✅ 100% feature parity with current implementation
- ✅ All calculations produce identical results
- ✅ Page load times improved by 20%
- ✅ Zero critical bugs in production
- ✅ 99.9% uptime during migration

### 11.2 User Experience Success
- ✅ User satisfaction maintained or improved
- ✅ Mobile experience significantly enhanced
- ✅ Faster calculation response times
- ✅ Improved error handling and user feedback

### 11.3 Business Success
- ✅ Zero revenue loss during migration
- ✅ Improved SEO capabilities
- ✅ Better analytics and monitoring
- ✅ Reduced maintenance overhead

---

## 12. Timeline & Resources

### 12.1 Development Timeline
- **Week 1**: Foundation & Setup
- **Week 2**: Core Logic Migration
- **Week 3**: UI Components Migration
- **Week 4**: Advanced Features
- **Week 5**: Testing & Deployment

**Total Duration**: 5 weeks

### 12.2 Resource Requirements
- **Lead Developer**: 1 (Full-time)
- **Frontend Developer**: 1 (Part-time, Weeks 3-4)
- **QA Engineer**: 1 (Part-time, Week 5)
- **DevOps Engineer**: 1 (Part-time, Week 5)

### 12.3 Budget Estimate
- **Development**: 5 weeks × $8,000/week = $40,000
- **Testing**: 1 week × $5,000/week = $5,000
- **Deployment**: 1 week × $3,000/week = $3,000
- **Contingency**: 20% = $9,600

**Total Estimated Cost**: $57,600

---

## 13. Appendices

### 13.1 Current File Structure
```
better-bets/
├── src/
│   ├── components/
│   │   ├── Calculator.tsx          # ✅ Ready for migration
│   │   ├── CalculationHistory.tsx   # ✅ Ready for migration
│   │   └── AuthButton.tsx          # ✅ Ready for migration
│   ├── calculator.ts               # ✅ Already extracted
│   └── main.ts                     # Can be deprecated
├── api/
│   ├── calculations/                # ✅ Ready for migration
│   └── lib/                        # ✅ Ready for migration
└── package.json                    # Needs Next.js update
```

### 13.2 Migration Checklist
- [ ] Initialize Next.js 16 project
- [ ] Configure authentication with Clerk
- [ ] Set up MongoDB connection
- [ ] Migrate API routes
- [ ] Migrate React components
- [ ] Implement responsive design
- [ ] Add PWA capabilities
- [ ] Set up monitoring and analytics
- [ ] Deploy to production
- [ ] Decommission old system

---

**Document Status**: Draft v1.0  
**Last Updated**: October 2025
**Next Review**: After Phase 1 completion  
**Approval Required**: Technical Lead, Product Manager
