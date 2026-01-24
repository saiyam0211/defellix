# Freelancer User Flow - Complete Journey
## Decentralized Freelancer Trust Platform

**Based on:** Backend APIs (Phase 1 & 2), Research Docs, System Architecture, User Flow Diagrams

---

## 🎯 Overview

This document outlines the **complete user journey** for a freelancer on the platform, from initial registration through project completion and reputation building. This flow will guide frontend development to ensure all features align with the freelancer's needs and the platform's value proposition.

---

## 📋 Table of Contents

1. [Onboarding & Profile Setup](#1-onboarding--profile-setup)
2. [Profile Enhancement & Verification](#2-profile-enhancement--verification)
3. [Client Discovery & Search](#3-client-discovery--search)
4. [Contract Creation & Management](#4-contract-creation--management)
5. [Project Execution & Milestones](#5-project-execution--milestones)
6. [Payment & Completion](#6-payment--completion)
7. [Reputation Building](#7-reputation-building)
8. [Ongoing Platform Usage](#8-ongoing-platform-usage)

---

## 1. Onboarding & Profile Setup

### 1.1 Landing & Registration

**User Journey:**
1. **Landing Page** → Freelancer visits platform
   - Value proposition: "Build portable reputation, secure payments, blockchain-verified contracts"
   - Key benefits: No platform fees, portable reputation, payment protection
   - CTA: "Get Started" / "Sign Up as Freelancer"

2. **Registration Page** → Create account
   - **Backend API:** `POST /api/v1/auth/register`
   - Form fields:
     - Email (required, validated)
     - Password (min 8 chars, strength indicator)
     - Full Name (required)
   - Success → Auto-login → Redirect to profile setup

**Frontend Components Needed:**
- Landing page with hero section
- Registration form component
- Email validation
- Password strength meter
- Success notification

---

### 1.2 Initial Profile Setup

**User Journey:**
1. **Profile Setup Wizard** (First-time user)
   - **Backend API:** `PUT /api/v1/users/me`
   - Step 1: Basic Information
     - Bio (textarea, max 500 chars)
     - Location (text input)
     - Timezone (dropdown)
     - Phone (optional)
     - Role selection: "Freelancer"
   
   - Step 2: Professional Details
     - Hourly Rate (number input, currency selector)
     - Availability (dropdown: full-time, part-time, available)
     - Skills (multi-select or tag input)
       - **Backend API:** `POST /api/v1/users/me/skills`
   
   - Step 3: Portfolio (Optional but recommended)
     - Add portfolio items
       - **Backend API:** `POST /api/v1/users/me/portfolio`
     - Each item: Title, Description, URL, Image URL, Technologies
   
   - Step 4: Profile Preview
     - Review all information
     - "Complete Setup" button
     - Redirect to dashboard

**Frontend Components Needed:**
- Multi-step wizard component
- Profile form with validation
- Skills input with autocomplete
- Portfolio form (add/edit items)
- Image upload/preview
- Profile preview component

**Key Features:**
- Progress indicator (Step 1 of 4)
- Save draft functionality
- Skip optional steps
- Validation at each step

---

## 2. Profile Enhancement & Verification

### 2.1 Profile Completion

**User Journey:**
1. **Dashboard** → "Complete Your Profile" banner (if incomplete)
   - Shows completion percentage
   - Missing fields highlighted
   - Quick links to add missing info

2. **My Profile Page** → Edit profile
   - **Backend API:** `GET /api/v1/users/me` (view)
   - **Backend API:** `PUT /api/v1/users/me` (update)
   - All fields editable
   - Real-time preview
   - Save changes

**Frontend Components Needed:**
- Profile completion indicator
- Profile edit form
- Inline editing capability
- Auto-save draft

---

### 2.2 Verification Process (Future - Phase 4)

**User Journey:**
1. **Verification Dashboard** → "Verify Your Profile"
   - Shows verification options:
     - ✅ Email (already verified)
     - ⏳ Phone (+20% reputation weight)
     - ⏳ LinkedIn (+50% reputation weight)
     - ⏳ GitHub (portfolio validation)
     - ⏳ Business Documents (for premium clients)

2. **Phone Verification**
   - Enter phone number
   - Receive OTP via SMS
   - Enter OTP
   - Verification complete → Badge added

3. **LinkedIn Verification**
   - Click "Verify LinkedIn"
   - OAuth flow
   - Profile fetched and validated
   - Verification complete → Badge added

4. **GitHub Verification**
   - Click "Verify GitHub"
   - OAuth flow
   - Repositories analyzed
   - Technical credibility score calculated

**Frontend Components Needed:**
- Verification dashboard
- OTP input component
- OAuth integration (LinkedIn, GitHub)
- Verification badges display
- Progress tracker

**Note:** Verification APIs not yet implemented (Phase 4), but UI can be prepared.

---

## 3. Client Discovery & Search

### 3.1 Freelancer Search (Reverse Search - Future)

**User Journey:**
1. **Search Clients Page** → Find potential clients
   - **Backend API:** `POST /api/v1/users/search` (with role="client")
   - Search filters:
     - Company name
     - Industry
     - Company size
     - Location
   - Results show client profiles
   - Click to view client profile
   - "Send Proposal" button (future feature)

**Frontend Components Needed:**
- Client search page
- Search filters sidebar
- Client profile cards
- Pagination

**Note:** Currently backend supports search, but client role profiles not yet common. This is for future when clients join.

---

### 3.2 Profile Visibility

**User Journey:**
1. **Public Profile View** → Freelancer's public profile
   - **Backend API:** `GET /api/v1/users/{id}`
   - URL: `/profile/{userId}` or `/freelancer/{username}`
   - Displays:
     - Name, bio, avatar
     - Skills (tags)
     - Portfolio items (grid)
     - Hourly rate
     - Availability status
     - Location
     - Verification badges
   - "Contact" button (future)
   - Share profile link

**Frontend Components Needed:**
- Public profile page
- Portfolio grid component
- Skills tags display
- Share functionality
- Contact form (future)

---

## 4. Contract Creation & Management

### 4.1 Create New Contract

**User Journey:**
1. **Dashboard** → "Create New Contract" button
   - **Backend API:** `POST /api/v1/contracts` (Phase 3 - not yet implemented)
   
2. **Contract Creation Wizard:**
   - Step 1: Project Details
     - Project Title
     - Description
     - Scope of Work
     - Project Type
   
   - Step 2: Timeline & Milestones
     - Start date
     - End date
     - Add milestones:
       - Milestone name
       - Deliverable description
       - Deadline
       - Payment amount
   
   - Step 3: Payment Terms
     - Total project value
     - Currency
     - Payment schedule (per milestone)
     - Payment method
   
   - Step 4: Terms & Conditions
     - IP Rights (work-for-hire)
     - Confidentiality clause
     - Termination terms
     - Dispute resolution
   
   - Step 5: Client Information
     - Client name
     - Client email
     - Company name (optional)
   
   - Step 6: Review & Send
     - Contract preview
     - PDF generation
     - "Send to Client" button
     - Contract saved as "Draft" → "Sent"

**Frontend Components Needed:**
- Contract creation wizard
- Milestone builder component
- Payment terms form
- Terms & conditions editor
- Contract preview component
- PDF generation (client-side or server-side)
- Contract status tracker

**Note:** Contract APIs (Phase 3) not yet implemented, but UI structure can be prepared.

---

### 4.2 Contract Management Dashboard

**User Journey:**
1. **Contracts Page** → View all contracts
   - **Backend API:** `GET /api/v1/contracts` (Phase 3)
   - Filter by status:
     - Draft
     - Sent (waiting for client)
     - Signed (active)
     - Active (in progress)
     - Completed
     - Cancelled
   - Each contract card shows:
     - Client name
     - Project title
     - Status badge
     - Total value
     - Progress
     - Next milestone
   - Click to view contract details

2. **Contract Details Page**
   - Full contract view
   - Milestones timeline
   - Payment history
   - Documents (contract PDF, deliverables)
   - Actions:
     - Edit (if draft)
     - Resend (if expired)
     - View on blockchain (if signed)

**Frontend Components Needed:**
- Contracts list page
- Contract status filters
- Contract card component
- Contract details page
- Milestone timeline component
- Document viewer
- Blockchain link (future)

---

### 4.3 Contract Negotiation

**User Journey:**
1. **Notification** → "Client requested changes to contract"
   - **Backend API:** `GET /api/v1/contracts/{id}` (Phase 3)
   - View client's requested changes
   - Comments/feedback displayed

2. **Edit Contract**
   - Make requested changes
   - Add response comments
   - "Resend to Client" button
   - Contract status: "Sent" → "Negotiating"

**Frontend Components Needed:**
- Change request viewer
- Contract edit form
- Comment/feedback display
- Version history (future)

---

## 5. Project Execution & Milestones

### 5.1 Active Project Dashboard

**User Journey:**
1. **Active Contracts** → Select contract
   - **Backend API:** `GET /api/v1/contracts/{id}` (Phase 3)
   - Project dashboard shows:
     - Contract details
     - Milestones list
     - Current milestone highlighted
     - Progress bar
     - Payment status

2. **Milestone View**
   - Current milestone details:
     - Deliverable description
     - Deadline (countdown timer)
     - Payment amount
     - Status (pending, in progress, submitted)

**Frontend Components Needed:**
- Project dashboard
- Milestone list component
- Progress indicators
- Countdown timer
- Status badges

---

### 5.2 Submit Milestone Work

**User Journey:**
1. **Submit Milestone** → Click "Submit Deliverable"
   - **Backend API:** `POST /api/v1/contracts/{id}/milestones/{mid}/submit` (Phase 3)
   
2. **Submission Form:**
   - Upload files (documents, images, code)
   - Submission notes (description of work)
   - Links (GitHub, demo URL, etc.)
   - "Submit for Review" button
   - Status changes: "In Progress" → "Submitted"

3. **Submission Confirmation**
   - Success message
   - Client notified automatically
   - Waiting for client approval

**Frontend Components Needed:**
- File upload component
- Multi-file upload
- Submission form
- Progress indicator
- Success notification

---

### 5.3 Handle Client Feedback

**User Journey:**
1. **Notification** → "Client requested changes"
   - View client feedback
   - Revision requirements listed

2. **Revise Work**
   - Make requested changes
   - Update files
   - Add revision notes
   - Resubmit milestone
   - Status: "Submitted" → "In Revision" → "Resubmitted"

**Frontend Components Needed:**
- Feedback viewer
- Revision form
- Change tracking
- Resubmission flow

---

### 5.4 Milestone Approval

**User Journey:**
1. **Notification** → "Milestone approved by client"
   - Milestone status: "Approved"
   - Payment request generated
   - Invoice created

2. **Payment Request**
   - View invoice
   - Payment details
   - "Mark as Paid" button (when payment received)
   - Upload payment proof (optional)

**Frontend Components Needed:**
- Approval notification
- Invoice viewer
- Payment status tracker
- Payment proof upload

---

## 6. Payment & Completion

### 6.1 Payment Tracking

**User Journey:**
1. **Payments Page** → View all payments
   - **Backend API:** `GET /api/v1/payments` (Phase 3 - future)
   - List of payments:
     - Milestone
     - Amount
     - Status (pending, paid, overdue)
     - Due date
     - Client name
   - Filter by status
   - Sort by date/amount

2. **Payment Details**
   - Invoice PDF
   - Payment method
   - Transaction history
   - Mark as received

**Frontend Components Needed:**
- Payments list page
- Payment filters
- Invoice viewer
- Payment status indicators
- Payment tracking timeline

---

### 6.2 Project Completion

**User Journey:**
1. **All Milestones Complete** → Project completion
   - System notification
   - "Complete Project" button
   - Final deliverables submitted
   - Final payment received

2. **Project Closure**
   - Project marked as "Completed"
   - Rating prompt appears
   - Contract archived

**Frontend Components Needed:**
- Completion confirmation
- Final submission form
- Project closure flow

---

## 7. Reputation Building

### 7.1 Rating & Review

**User Journey:**
1. **Rating Prompt** → After project completion
   - **Backend API:** `POST /api/v1/contracts/{id}/rate` (Phase 4)
   - Rate client on:
     - Communication (1-10)
     - Payment timeliness (1-10)
     - Clarity of requirements (1-10)
     - Overall experience (1-10)
   - Written feedback (optional)
   - "Submit Rating" button

2. **Reputation Update**
   - **Backend API:** `GET /api/v1/reputation/me` (Phase 4)
   - Reputation score updated
   - New tier/badge earned (if applicable)
   - Score breakdown displayed:
     - On-time delivery: 30%
     - Client ratings: 40%
     - Completion rate: 10%
     - Verification level: 10%
     - Experience: 10%

**Frontend Components Needed:**
- Rating form component
- Star rating input
- Reputation dashboard
- Score breakdown visualization
- Tier/badge display
- Reputation history chart

---

### 7.2 Reputation Dashboard

**User Journey:**
1. **Reputation Page** → View reputation details
   - **Backend API:** `GET /api/v1/reputation/me` (Phase 4)
   - Current reputation score
   - Tier level (Elite, Trusted, Established, Rising, New)
   - Badges earned
   - Score breakdown
   - Reputation history (graph)
   - Recent ratings received
   - Testimonials

2. **Public Reputation View**
   - **Backend API:** `GET /api/v1/reputation/{userId}` (Phase 4)
   - Visible on public profile
   - Builds trust with clients

**Frontend Components Needed:**
- Reputation dashboard
- Score visualization (charts)
- Tier badge component
- Reputation history graph
- Testimonials display
- Badge collection view

---

### 7.3 Portfolio Enhancement

**User Journey:**
1. **Add Completed Project to Portfolio**
   - After project completion
   - "Add to Portfolio" option
   - **Backend API:** `POST /api/v1/users/me/portfolio`
   - Pre-filled with project details
   - Add project images/screenshots
   - Link to live project (if applicable)
   - Technologies used
   - Save to portfolio

2. **Portfolio Management**
   - **Backend API:** `GET /api/v1/users/me`
   - View all portfolio items
   - Edit/delete items
   - Reorder items
   - Featured items

**Frontend Components Needed:**
- Portfolio management page
- Add project to portfolio form
- Portfolio grid/list view
- Drag-and-drop reordering
- Featured items selector

---

## 8. Ongoing Platform Usage

### 8.1 Dashboard Overview

**User Journey:**
1. **Main Dashboard** → After login
   - **Backend APIs:**
     - `GET /api/v1/users/me` (profile summary)
     - `GET /api/v1/contracts` (active contracts) - Phase 3
     - `GET /api/v1/reputation/me` (reputation summary) - Phase 4
   
   - Dashboard widgets:
     - Profile completion (if incomplete)
     - Active contracts count
     - Pending milestones
     - Recent payments
     - Reputation score
     - Quick actions:
       - Create new contract
       - Complete profile
       - View portfolio
       - Check reputation

**Frontend Components Needed:**
- Dashboard layout
- Widget components
- Quick action buttons
- Notification center
- Activity feed

---

### 8.2 Notifications & Alerts

**User Journey:**
1. **Notification Center** → Bell icon
   - Real-time notifications:
     - Contract signed
     - Milestone approved/rejected
     - Payment received
     - Client message
     - Rating received
     - Verification status update
   - Mark as read
   - Filter by type

**Frontend Components Needed:**
- Notification center component
- Notification list
- Real-time updates (WebSocket future)
- Notification badges
- Mark as read functionality

---

### 8.3 Settings & Preferences

**User Journey:**
1. **Settings Page** → Account management
   - Profile settings
   - Notification preferences
   - Privacy settings
   - Payment preferences
   - Security settings
   - Delete account

**Frontend Components Needed:**
- Settings page
- Preference toggles
- Security settings form
- Account deletion flow

---

## 🎨 Frontend Development Priority

### Phase 1: MVP (Current Backend Support)
1. ✅ **Authentication**
   - Registration
   - Login
   - Token management

2. ✅ **Profile Management**
   - Profile creation/editing
   - Skills management
   - Portfolio management
   - Public profile view

3. ✅ **Search**
   - Freelancer search (for clients)
   - Filter functionality

### Phase 2: Contract Management (Backend Phase 3)
4. ⏳ **Contract Creation**
   - Contract wizard
   - Milestone builder
   - Client invitation

5. ⏳ **Contract Management**
   - Contracts list
   - Contract details
   - Status tracking

6. ⏳ **Project Execution**
   - Milestone submission
   - File uploads
   - Client feedback handling

### Phase 3: Reputation & Payments (Backend Phase 4)
7. ⏳ **Reputation System**
   - Rating forms
   - Reputation dashboard
   - Score visualization

8. ⏳ **Payment Tracking**
   - Payments list
   - Invoice viewer
   - Payment status

### Phase 4: Advanced Features
9. ⏳ **Verification**
   - Phone verification
   - LinkedIn/GitHub OAuth
   - Verification badges

10. ⏳ **Notifications**
    - Real-time notifications
    - Email preferences

---

## 📱 Key User Flows Summary

### Flow 1: New Freelancer Onboarding
```
Landing → Register → Profile Setup → Skills → Portfolio → Dashboard
```

### Flow 2: Create & Send Contract
```
Dashboard → Create Contract → Add Milestones → Add Client → Review → Send
```

### Flow 3: Execute Project
```
Active Contract → View Milestones → Submit Work → Client Approval → Payment
```

### Flow 4: Build Reputation
```
Project Complete → Rate Client → Receive Rating → Reputation Updated → New Tier
```

---

## 🔗 API Endpoints Reference

### Currently Available (Phase 1 & 2)
- `POST /api/v1/auth/register` - Registration
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Token refresh
- `GET /api/v1/auth/me` - Current user
- `GET /api/v1/users/{id}` - Get profile
- `GET /api/v1/users/me` - My profile
- `PUT /api/v1/users/me` - Update profile
- `POST /api/v1/users/search` - Search
- `POST /api/v1/users/me/skills` - Add skill
- `DELETE /api/v1/users/me/skills` - Remove skill
- `POST /api/v1/users/me/portfolio` - Add portfolio
- `PUT /api/v1/users/me/portfolio/{id}` - Update portfolio
- `DELETE /api/v1/users/me/portfolio/{id}` - Delete portfolio

### Coming Soon (Phase 3 & 4)
- Contract APIs (Phase 3)
- Payment APIs (Phase 3)
- Reputation APIs (Phase 4)
- Verification APIs (Phase 4)

---

## ✅ Frontend Development Checklist

### Authentication & Onboarding
- [ ] Landing page
- [ ] Registration page
- [ ] Login page
- [ ] Profile setup wizard
- [ ] Profile completion indicator

### Profile Management
- [ ] Profile edit page
- [ ] Skills management UI
- [ ] Portfolio management UI
- [ ] Public profile page
- [ ] Image upload component

### Search & Discovery
- [ ] Search page
- [ ] Search filters
- [ ] Results display
- [ ] Pagination

### Contract Management (Phase 3)
- [ ] Contract creation wizard
- [ ] Contracts list page
- [ ] Contract details page
- [ ] Milestone builder
- [ ] Contract preview

### Project Execution (Phase 3)
- [ ] Project dashboard
- [ ] Milestone submission form
- [ ] File upload component
- [ ] Client feedback viewer

### Reputation (Phase 4)
- [ ] Rating form
- [ ] Reputation dashboard
- [ ] Score visualization
- [ ] Badge display

---

**Last Updated:** January 24, 2026  
**Backend Status:** Phase 1 (Auth) ✅ + Phase 2 (User) ✅  
**Next Backend Phase:** Phase 3 (Contract Service)
