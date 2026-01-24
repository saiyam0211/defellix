# Frontend Features - Based on Current Backend APIs

This document outlines all frontend features that can be built using the current backend implementation (Phase 1: Auth Service + Phase 2: User Service).

---

## 🔐 Authentication & Authorization Features

### 1. User Registration Page
**Backend API:** `POST /api/v1/auth/register`

**Features:**
- Registration form with fields:
  - Email (with validation)
  - Password (min 8 characters, strength indicator)
  - Full Name
- Email format validation
- Password strength meter
- Success message after registration
- Auto-login after successful registration
- Redirect to profile setup

**UI Components:**
- Registration form component
- Email input with validation
- Password input with show/hide toggle
- Submit button with loading state
- Error message display

---

### 2. Login Page
**Backend API:** `POST /api/v1/auth/login`

**Features:**
- Login form with email and password
- "Remember me" checkbox (store token in localStorage)
- "Forgot password" link (placeholder for future)
- Error handling for invalid credentials
- Success redirect to dashboard
- Store JWT tokens (access + refresh) in localStorage/sessionStorage

**UI Components:**
- Login form component
- Password input with show/hide toggle
- Submit button with loading state
- Error message display
- Link to registration page

---

### 3. Token Management
**Backend API:** `POST /api/v1/auth/refresh`

**Features:**
- Automatic token refresh before expiration
- Token storage in localStorage/sessionStorage
- Logout functionality (clear tokens)
- Token expiration handling
- Redirect to login on token expiration

**Implementation:**
- Axios interceptor for automatic token refresh
- Token expiration check before API calls
- Logout function to clear tokens

---

### 4. Protected Routes
**Backend API:** `GET /api/v1/auth/me`

**Features:**
- Route guards for protected pages
- Check authentication status
- Redirect to login if not authenticated
- Display current user info in header/navbar

**UI Components:**
- Protected route wrapper component
- User context/provider
- Navigation bar with user info

---

## 👤 User Profile Features

### 5. Profile View Page
**Backend API:** `GET /api/v1/users/{id}`

**Features:**
- Display user profile information:
  - Full name, bio, avatar
  - Location, timezone
  - Skills list
  - Portfolio items
  - Hourly rate (for freelancers)
  - Availability status
  - Company info (for clients)
- Public profile view (no auth required)
- Share profile link
- Contact button (placeholder)

**UI Components:**
- Profile header with avatar and name
- Bio section
- Skills tags display
- Portfolio grid/cards
- Contact information section

---

### 6. My Profile Page (Edit View)
**Backend API:** 
- `GET /api/v1/users/me` - Get profile
- `PUT /api/v1/users/me` - Update profile

**Features:**
- View and edit own profile
- Form fields:
  - Full Name
  - Bio (textarea, max 500 chars)
  - Avatar URL (with image preview)
  - Location
  - Timezone (dropdown)
  - Phone number
  - Hourly Rate (for freelancers)
  - Availability (dropdown: full-time, part-time, available, unavailable)
  - Company Name (for clients)
  - Company Size (dropdown: startup, small, medium, large)
- Save changes button
- Real-time character count for bio
- Image preview for avatar
- Success/error notifications

**UI Components:**
- Profile edit form
- Image upload/preview component
- Dropdown selectors
- Save button with loading state
- Toast notifications

---

### 7. Skills Management
**Backend APIs:**
- `POST /api/v1/users/me/skills` - Add skill
- `DELETE /api/v1/users/me/skills` - Remove skill

**Features:**
- Add skills input with autocomplete/suggestions
- Display skills as tags/chips
- Remove skill by clicking X on tag
- Skill validation (2-50 characters)
- Prevent duplicate skills
- Visual feedback on add/remove

**UI Components:**
- Skills input with autocomplete
- Skills tags/chips display
- Add/remove skill buttons
- Skill suggestions dropdown

---

### 8. Portfolio Management
**Backend APIs:**
- `POST /api/v1/users/me/portfolio` - Add portfolio item
- `PUT /api/v1/users/me/portfolio/{itemId}` - Update portfolio item
- `DELETE /api/v1/users/me/portfolio/{itemId}` - Delete portfolio item

**Features:**
- Add portfolio item form:
  - Title (required, 2-100 chars)
  - Description (required, 10-1000 chars)
  - URL (required, valid URL)
  - Image URL (optional, with preview)
  - Technologies (multi-select tags)
- Display portfolio items in grid/list
- Edit portfolio item (modal or separate page)
- Delete portfolio item with confirmation
- Portfolio item cards with:
  - Thumbnail image
  - Title and description
  - Technologies tags
  - Link to project
  - Edit/Delete buttons

**UI Components:**
- Portfolio form (add/edit)
- Portfolio grid/cards
- Image preview component
- Technologies multi-select
- Confirmation modal for delete
- Portfolio item card component

---

## 🔍 Search & Discovery Features

### 9. Freelancer Search Page
**Backend API:** `POST /api/v1/users/search`

**Features:**
- Search form with filters:
  - Search query (text input)
  - Role filter (freelancer, client, both)
  - Skills filter (multi-select)
  - Location filter (text input)
  - Hourly rate range (min/max sliders or inputs)
  - Availability filter (dropdown)
- Search results display:
  - Profile cards with key info
  - Pagination controls
  - Results count
  - "No results" message
- Sort options (by rate, newest, etc.)
- Clear filters button
- URL query parameters for shareable search links

**UI Components:**
- Search form with filters
- Filter sidebar or top bar
- Search results grid/list
- Profile card component
- Pagination component
- Loading skeleton/state
- Empty state component

---

### 10. Search Results Page
**Features:**
- Display search results in grid or list view
- Each result shows:
  - Avatar and name
  - Bio preview
  - Skills (first 5-6)
  - Hourly rate
  - Location
  - Availability badge
  - "View Profile" button
- Click to view full profile
- Pagination at bottom
- Results per page selector (10, 20, 50)
- Loading states
- Error handling

**UI Components:**
- Search results container
- Profile card component
- Pagination component
- View toggle (grid/list)
- Loading spinner

---

## 🎨 UI/UX Components Needed

### Core Components
1. **Button** - Primary, secondary, danger variants with loading states
2. **Input** - Text, email, password, textarea with validation
3. **Select/Dropdown** - Single and multi-select
4. **Modal/Dialog** - For confirmations and forms
5. **Toast/Notification** - Success, error, info messages
6. **Card** - For profile cards, portfolio items
7. **Tag/Chip** - For skills display
8. **Avatar** - User profile picture
9. **Loading Spinner** - For async operations
10. **Pagination** - For search results

### Layout Components
1. **Header/Navbar** - With user menu, logout
2. **Sidebar** - Navigation menu (if needed)
3. **Footer** - Site footer
4. **Container** - Page wrapper
5. **Grid** - For portfolio, search results

### Form Components
1. **Form Input** - With label, validation, error messages
2. **Form Select** - Dropdown with search
3. **Image Upload** - With preview
4. **Multi-select** - For technologies, skills
5. **Range Slider** - For hourly rate filter

---

## 📱 Pages/Screens to Build

### Public Pages (No Auth Required)
1. **Landing Page** - Homepage with hero, features, CTA
2. **Login Page** - User login form
3. **Register Page** - User registration form
4. **Public Profile Page** - View any user's profile
5. **Search Page** - Search freelancers/clients

### Protected Pages (Auth Required)
1. **Dashboard** - User's main dashboard
2. **My Profile** - View/edit own profile
3. **Profile Settings** - Profile management
4. **Portfolio Management** - Add/edit/delete portfolio items
5. **Skills Management** - Manage skills

---

## 🔄 User Flows

### Registration Flow
1. User visits landing page
2. Clicks "Sign Up" → Registration page
3. Fills registration form
4. Submits → Backend creates account
5. Receives JWT tokens
6. Redirected to profile setup
7. Completes profile → Dashboard

### Login Flow
1. User visits login page
2. Enters email and password
3. Submits → Backend validates
4. Receives JWT tokens
5. Redirected to dashboard
6. Tokens stored for future requests

### Profile Setup Flow
1. After registration/login
2. Check if profile exists
3. If not, show profile setup form
4. User fills basic info
5. Adds skills
6. Adds portfolio items (optional)
7. Saves → Profile created

### Search Flow
1. User visits search page
2. Enters search query or applies filters
3. Submits search
4. Results displayed
5. Clicks on profile card
6. Views full profile
7. Can contact (future feature)

---

## 🎯 Priority Features (MVP)

### Must Have (Phase 1)
1. ✅ User Registration
2. ✅ User Login
3. ✅ Profile View (Public)
4. ✅ Profile Edit (Own Profile)
5. ✅ Basic Search

### Should Have (Phase 2)
6. ✅ Skills Management
7. ✅ Portfolio Management
8. ✅ Advanced Search with Filters
9. ✅ Token Refresh
10. ✅ Protected Routes

### Nice to Have (Future)
11. Image upload (instead of URL)
12. Real-time search suggestions
13. Profile analytics
14. Save/bookmark profiles
15. Social sharing

---

## 🔌 API Integration Points

### Base URLs
- **Auth Service:** `http://localhost:8080`
- **User Service:** `http://localhost:8081`

### API Client Setup
```javascript
// Example with Axios
const authAPI = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

const userAPI = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
});

// Add token interceptor
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Error Handling
- Handle 401 (Unauthorized) → Redirect to login
- Handle 400 (Bad Request) → Show validation errors
- Handle 404 (Not Found) → Show not found message
- Handle 500 (Server Error) → Show generic error

---

## 📊 State Management

### Recommended Approach
- **React Context** for auth state (user, tokens)
- **React Query / SWR** for server state (profiles, search results)
- **Local State** for forms and UI state

### State to Manage
1. **Auth State:**
   - Current user
   - Access token
   - Refresh token
   - Is authenticated

2. **Profile State:**
   - Current user profile
   - Viewing profile (for public view)
   - Search results
   - Filters

3. **UI State:**
   - Loading states
   - Error messages
   - Modal open/close
   - Form data

---

## 🎨 Design Considerations

### Color Scheme
- Primary: Brand color
- Success: Green
- Error: Red
- Warning: Orange
- Info: Blue

### Typography
- Headings: Bold, larger sizes
- Body: Regular, readable size
- Labels: Medium weight

### Spacing
- Consistent padding/margins
- Card spacing
- Form field spacing

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Mobile navigation
- Responsive grid

---

## 🚀 Getting Started with Frontend

### Recommended Tech Stack
- **Framework:** React (with TypeScript)
- **Styling:** Tailwind CSS (already in project)
- **HTTP Client:** Axios
- **State Management:** React Context + React Query
- **Form Handling:** React Hook Form
- **Routing:** React Router

### Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── profile/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   └── PortfolioCard.tsx
│   │   ├── search/
│   │   │   ├── SearchForm.tsx
│   │   │   └── SearchResults.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   └── Search.tsx
│   ├── services/
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   └── utils/
│       └── api.ts
```

---

## ✅ Checklist for Frontend Development

### Authentication
- [ ] Registration page
- [ ] Login page
- [ ] Token storage and management
- [ ] Token refresh logic
- [ ] Logout functionality
- [ ] Protected route wrapper
- [ ] Auth context/provider

### Profile Management
- [ ] Public profile view
- [ ] Profile edit form
- [ ] Skills management UI
- [ ] Portfolio management UI
- [ ] Image preview components
- [ ] Form validation

### Search
- [ ] Search form with filters
- [ ] Search results display
- [ ] Pagination
- [ ] Filter persistence (URL params)
- [ ] Empty states
- [ ] Loading states

### UI/UX
- [ ] Responsive design
- [ ] Loading indicators
- [ ] Error handling
- [ ] Success notifications
- [ ] Form validation feedback
- [ ] Accessibility (a11y)

---

**Last Updated:** January 24, 2026  
**Backend APIs:** Phase 1 (Auth Service) + Phase 2 (User Service)

