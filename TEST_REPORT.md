
---

# 🧪 TEST_REPORT.md

```markdown
# Test Report

## What I Built
- **Stack:** Node.js/Express backend, MongoDB, React frontend, Playwright for UI automation.  
- **Architecture:** REST APIs for authentication and appointments; React components for login, appointment form, and list; Playwright tests with stable `data-testid` selectors.  
- **Key Decisions:** Added `data-testid` attributes for reliable automation; separated backend/frontend; used Playwright HTML reporter with screenshots for visibility.  

## What I Tested
- **Covered:** Login flows (valid, invalid, empty submission), appointment creation, form validation (empty fields, invalid date), staff marking appointments as served.  
- **Skipped:** Update/cancel flows (UI not yet implemented), role‑based access beyond staff/patient basics, resilience to backend downtime.  
- **Reason:** Focused on core patient and staff flows first; update/cancel requires additional UI work.  

## What I Automated
- **Automated:** Login scenarios, appointment creation, form validation, staff serving appointments.  
- **Manual:** Update/cancel (UI incomplete), visual styling checks.  
- **Line Drawn:** Automated flows with stable selectors and predictable backend responses; manual where UI is incomplete or unstable.  

## Bugs Found
- Login tests failed when users weren’t seeded — backend returned errors silently.  
- Appointment form timed out when login didn’t succeed, leaving form unavailable.  
- Invalid date input wasn’t blocked — frontend submitted anyway.  
- Playwright initially picked up Jest’s `App.test.js`, causing confusion.  
- System isn’t resilient to missing backend/frontend services — tests fail with connection errors instead of graceful handling.  

## What I Would Improve
- Add Update/Cancel buttons in frontend wired to backend APIs.  
- Implement stronger validation (date format, required fields).  
- Seed test users automatically before running Playwright.  
- Add role‑based tests (patient vs staff).  
- Improve error handling in UI (messages when backend is down).  
- Expand automation to cover filtering and appointment selection.  
- Refactor Playwright setup to use `beforeAll` hooks for clean test data.  
