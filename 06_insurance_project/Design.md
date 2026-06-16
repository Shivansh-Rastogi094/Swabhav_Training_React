# Insurance Policy & Claims Management System — Design Document

## Overview

A multi-role web application for managing insurance policies, products, plans, payments, claims, and claim histories. Three distinct user roles — **User (Policyholder)**, **Agent**, and **Admin** — each operate within tailored dashboards with scoped access and responsibilities.

---

## 1. Design System

### 1.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#1A3C5E` | Primary actions, headers, nav backgrounds |
| `--primary-light` | `#2563A8` | Hover states, active links |
| `--accent` | `#0FA89E` | Badges, highlights, success states |
| `--warning` | `#F59E0B` | Pending status, alerts |
| `--danger` | `#DC2626` | Rejected claims, errors, cancellations |
| `--success` | `#16A34A` | Approved claims, active policies |
| `--surface` | `#F8FAFC` | Page background |
| `--card` | `#FFFFFF` | Card/panel backgrounds |
| `--border` | `#E2E8F0` | Dividers, input borders |
| `--text-primary` | `#0F172A` | Headings, primary text |
| `--text-secondary` | `#64748B` | Labels, subtitles, metadata |
| `--sidebar-bg` | `#0F2540` | Sidebar background (all roles) |
| `--sidebar-text` | `#CBD5E1` | Sidebar menu items |
| `--sidebar-active` | `#0FA89E` | Active sidebar item indicator |

### 1.2 Typography

| Role | Font | Usage |
|---|---|---|
| Display | `Inter` 700–800 | Dashboard headings, stat cards |
| Body | `Inter` 400–500 | Paragraphs, table content, labels |
| Mono | `JetBrains Mono` | Policy IDs, claim numbers, amounts |

**Type Scale:**

```
h1: 28px / 700
h2: 22px / 600
h3: 18px / 600
body: 14px / 400
label: 12px / 500 uppercase tracked
mono: 13px / 400
```

### 1.3 Component Tokens

```
Border Radius:  card=12px, button=8px, badge=999px, input=8px
Shadow:         card=0 1px 4px rgba(0,0,0,0.07)
Spacing Unit:   4px base, scale ×2 ×4 ×6 ×8 ×12 ×16
Sidebar Width:  240px (collapsed: 64px)
Topbar Height:  60px
```

### 1.4 Status Badge System

| Status | Color | Usage |
|---|---|---|
| `ACTIVE` | `--success` | Active policy / approved claim |
| `PENDING` | `--warning` | Under review, awaiting payment |
| `REJECTED` | `--danger` | Rejected claim / cancelled policy |
| `EXPIRED` | `--text-secondary` | Lapsed policies |
| `PROCESSING` | `--primary-light` | Payment or claim in progress |
| `DRAFT` | `--border` | Unsaved / incomplete records |

---

## 2. Layout Architecture

### 2.1 Shell Layout (All Roles)

```
┌──────────────────────────────────────────────────┐
│  TOPBAR (60px): Logo | Role badge | User avatar  │
├──────────┬───────────────────────────────────────┤
│          │                                       │
│ SIDEBAR  │           MAIN CONTENT                │
│ (240px)  │           (fluid)                     │
│          │                                       │
│ Nav menu │  Breadcrumb > Page Title              │
│          │  ─────────────────────────────        │
│          │  Page Body (cards, tables, forms)     │
│          │                                       │
└──────────┴───────────────────────────────────────┘
```

### 2.2 Sidebar Navigation per Role

**User (Policyholder)**
```
 Dashboard
 My Policies
 Products & Plans
 Payments
 My Claims
 Claim History
 Profile
```

**Agent**
```
 Dashboard
 Clients
 Policies
 Products & Plans
 Payments
 Claims
 Claim History
 Reports
 Profile
```

**Admin**
```
 Dashboard
 Users
 Agents
 Products
 Plans
 Policies
 Payments
 Claims
 Claim History
 Reports & Analytics
 Settings
```

---

## 3. Dashboards

### 3.1 User Dashboard

**Purpose:** Give the policyholder an instant health-check of their policies, upcoming renewals, and open claims.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Good morning, Shivansh 👋                 [+ Buy Policy]   │
├──────────┬──────────┬──────────┬──────────────────────────-─┤
│ Active   │ Pending  │ Total    │ Next Renewal               │
│ Policies │ Claims   │ Premium  │ 22 Jul 2026                │
│   3      │   1      │ ₹48,000  │ Health Shield Pro          │
├──────────┴──────────┴──────────┴────────────────────────────┤
│ My Policies (quick view)          │ Recent Claims            │
│ ─────────────────────────────     │ ──────────────────────── │
│ [Policy Card × 3 with status]     │ [Claim row × 3]          │
├───────────────────────────────────┴──────────────────────────┤
│ Upcoming Premium Payments (timeline strip)                    │
└──────────────────────────────────────────────────────────────┘
```

**Stat Cards:** Active Policies | Pending Claims | Total Annual Premium | Next Renewal Date

**Sections:**
- My Policies — compact card list with policy name, type, status badge, expiry date, and quick-action (View / Renew)
- Recent Claims — last 3 claim entries with claim ID, amount, status badge
- Upcoming Payments — horizontal timeline showing payment due dates for next 60 days

---

### 3.2 Agent Dashboard

**Purpose:** Give the agent a productivity view: how many clients they manage, policy conversion, claims they're tracking.

**Layout:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Agent Portal — Rajesh Kumar         [+ Add Client]             │
├──────────┬─────────────┬────────────┬───────────────────────────┤
│  Clients │ Policies    │ Claims     │ Monthly Commission         │
│    24    │ Managed: 61 │ Open: 8    │ ₹12,400                   │
├──────────┴─────────────┴────────────┴───────────────────────────┤
│  Recent Client Activity               │ Claims Requiring Action  │
│  ────────────────────────             │ ──────────────────────── │
│  [Client rows: name, policy, status]  │ [Claim rows with urgency]│
├───────────────────────────────────────┴─────────────────────────┤
│  Policy Expiry Alerts (next 30 days)                            │
│  [Scrollable horizontal cards of soon-expiring policies]        │
└─────────────────────────────────────────────────────────────────┘
```

**Stat Cards:** Total Clients | Policies Managed | Open Claims | Monthly Commission

**Sections:**
- Recent Client Activity — table of clients with last action, policy status
- Claims Requiring Action — sorted by urgency; shows claim ID, client name, days pending
- Policy Expiry Alerts — strip of soon-expiring policies with "Notify Client" quick action

---

### 3.3 Admin Dashboard

**Purpose:** System-wide analytics, operational health, revenue, and management controls.

**Layout:**

```
┌────────────────────────────────────────────────────────────────────┐
│  Admin Overview              Period: [This Month ▼]   [Export]     │
├──────────┬──────────┬──────────┬──────────┬────────────────────────┤
│  Users   │  Agents  │ Policies │  Claims  │ Revenue                │
│  1,204   │    38    │  3,490   │   142    │ ₹2.4 Cr               │
├──────────┴──────────┴──────────┴──────────┴────────────────────────┤
│  Revenue Trend (Line Chart)     │  Claims by Status (Donut Chart)  │
│  ──────────────────────────     │  ────────────────────────────    │
│  [Monthly premium income line]  │  [Pie: Approved/Pending/Rejected]│
├─────────────────────────────────┴──────────────────────────────────┤
│  Recent Registrations          │  Flagged Claims                   │
│  ─────────────────────────     │  ─────────────────────────────    │
│  [New users/agents this week]  │  [High-value or suspicious claims]│
└────────────────────────────────────────────────────────────────────┘
```

**Stat Cards:** Total Users | Active Agents | Total Policies | Open Claims | Monthly Revenue

**Charts:**
- Revenue Trend — 12-month line chart (premium collected vs claims paid out)
- Claims Distribution — donut chart by status (Approved / Pending / Rejected / Processing)
- Policy Type Breakdown — bar chart by product category

**Sections:**
- Recent Registrations — new users/agents with role, date, status
- Flagged Claims — high-value or anomaly-detected claims needing admin review

---

## 4. Screen Designs

### 4.1 Products Screen

**Accessible by:** Admin (CRUD), Agent (Read), User (Browse & Buy)

**Purpose:** Catalog of insurance product categories (Health, Life, Motor, Travel, etc.)

**Layout:**

```
Products                                         [+ Add Product]  (Admin only)
─────────────────────────────────────────────────────────────────────────────
Search: [___________________]   Filter: [Category ▼]  [Status ▼]

┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────────┐
│  🏥 Health Insurance│  │  🚗 Motor Insurance  │  │  ✈️ Travel Insurance  │
│  ─────────────────  │  │  ─────────────────   │  │  ─────────────────── │
│  12 Plans Available │  │  8 Plans Available   │  │  5 Plans Available   │
│  From ₹3,000/yr     │  │  From ₹5,500/yr      │  │  From ₹800/trip      │
│  [ACTIVE]           │  │  [ACTIVE]            │  │  [ACTIVE]            │
│  [View Plans]       │  │  [View Plans]        │  │  [View Plans]        │
└─────────────────────┘  └─────────────────────┘  └──────────────────────┘
```

**Fields (Admin Create/Edit):**
- Product Name, Category (dropdown), Description, Status (Active/Inactive), Cover Image, Tags

---

### 4.2 Plans Screen

**Accessible by:** Admin (CRUD), Agent (Read + Recommend), User (Browse & Compare)

**Purpose:** List of specific plans under each product, with coverage details and pricing.

**Layout:**

```
Plans — Health Insurance                          [+ Add Plan]  (Admin only)
───────────────────────────────────────────────────────────────────────────
← Back to Products

Filter: [Sum Insured ▼]  [Premium Range ▼]  [Tenure ▼]

 Plan Name            Sum Insured    Premium/yr    Tenure    Status    Actions
 ─────────────────────────────────────────────────────────────────────────────
 Health Shield Basic  ₹3,00,000      ₹3,200        1 yr     ACTIVE    [View] [Edit]
 Health Shield Pro    ₹10,00,000     ₹7,800        1/2/3 yr ACTIVE    [View] [Edit]
 Health Shield Elite  ₹25,00,000     ₹14,500       1/3/5 yr ACTIVE    [View] [Edit]
 Senior Care Plus     ₹5,00,000      ₹11,200       1 yr     ACTIVE    [View] [Edit]
```

**Plan Detail Drawer / Modal:**
- Plan Name, Product, Sum Insured, Premium Breakdown, Coverage Details (rich text), Exclusions, Eligibility Criteria, Tenure Options, Riders Available

**User View — Plan Comparison:**
```
[Compare Plans] → side-by-side table of selected plans (max 3)
Columns: Coverage / Exclusions / Premium / Claim Process / Ratings
[Buy Now] button per plan
```

---

### 4.3 Policies Screen

**Accessible by:** Admin (all), Agent (assigned clients), User (own policies)

**Purpose:** Manage issued insurance policies, view policy details, renew, or cancel.

**Layout:**

```
My Policies                                              [+ Buy New Policy]
──────────────────────────────────────────────────────────────────────────
Search: [_______________________]   Filter: [Type ▼]  [Status ▼]

 Policy No.        Product           Plan            Start       Expiry     Status     Actions
 ──────────────────────────────────────────────────────────────────────────────────────────────
 POL-2024-00182   Health Insurance  Shield Pro      01 Jan 24   31 Dec 24  ACTIVE     [View] [Renew]
 POL-2024-00091   Motor Insurance   Comprehensive   15 Mar 24   14 Mar 25  ACTIVE     [View]
 POL-2023-00340   Travel Insurance  World Cover     01 Oct 23   30 Sep 23  EXPIRED    [View] [Rebuy]
```

**Policy Detail View:**

```
Policy: POL-2024-00182                                  [Download PDF]  [Renew]
────────────────────────────────────────────────────────────────────────────
┌──────────────────────────────┬─────────────────────────────────────────┐
│  Policy Summary              │  Policyholder Details                   │
│  ──────────────────────────  │  ───────────────────────────────────── │
│  Product: Health Insurance   │  Name: Shivansh Gupta                  │
│  Plan: Health Shield Pro     │  DOB: 12 Aug 2002                      │
│  Sum Insured: ₹10,00,000     │  Nominee: Chetna Sharma                │
│  Premium: ₹7,800/yr          │  Relation: Partner                     │
│  Start: 01 Jan 2024          │                                         │
│  Expiry: 31 Dec 2024         │                                         │
│  Status: [ACTIVE]            │                                         │
├──────────────────────────────┴─────────────────────────────────────────┤
│  Coverage Details    │  Exclusions    │  Documents    │  Claim History  │
│  (tab navigation)                                                       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 4.4 Payments Screen

**Accessible by:** Admin (all), Agent (view for clients), User (own payments)

**Purpose:** View payment history, make premium payments, download receipts.

**Layout:**

```
Payments                                              [+ Make Payment]  (User)
─────────────────────────────────────────────────────────────────────────────
Filter: [Policy ▼]  [Status ▼]  [Date Range: _____ to _____]

 Payment ID      Policy No.       Amount     Date          Mode     Status     Actions
 ────────────────────────────────────────────────────────────────────────────────────────
 PAY-2024-0082   POL-2024-00182  ₹7,800     01 Jan 2024   UPI      SUCCESS    [Receipt]
 PAY-2024-0031   POL-2024-00091  ₹12,400    15 Mar 2024   NetBkg   SUCCESS    [Receipt]
 PAY-2024-0110   POL-2024-00182  ₹7,800     01 Jan 2025   —        PENDING    [Pay Now]
```

**Payment Flow (User):**

```
Step 1: Select Policy       → dropdown of active/renewal-due policies
Step 2: Confirm Amount      → auto-filled premium + tax breakdown
Step 3: Choose Method       → UPI / Net Banking / Credit Card / Debit Card
Step 4: Confirm & Pay       → redirect to payment gateway
Step 5: Success Screen      → confetti + receipt download + email confirmation
```

**Payment Detail Modal:**
- Payment ID, Policy No., Plan, Premium Amount, GST (18%), Total Paid, Payment Date, Mode, Transaction Reference, Status, [Download Receipt]

---

### 4.5 Claims Screen

**Accessible by:** Admin (all), Agent (assigned clients), User (raise + track own)

**Purpose:** Submit new claims, track status, upload supporting documents.

**Layout:**

```
My Claims                                              [+ Raise Claim]
───────────────────────────────────────────────────────────────────────
Search: [__________________]   Filter: [Policy ▼]  [Status ▼]  [Type ▼]

 Claim ID         Policy No.       Type         Amount Claimed   Date        Status        Actions
 ─────────────────────────────────────────────────────────────────────────────────────────────────
 CLM-2024-00042   POL-2024-00182   Cashless     ₹45,000         12 Mar 24   APPROVED      [View]
 CLM-2024-00078   POL-2024-00182   Reimbursement ₹12,500        20 May 24   PENDING       [View] [Update]
 CLM-2024-00091   POL-2024-00091   Third Party  ₹80,000         02 Jun 24   PROCESSING    [View]
```

**Raise Claim Form:**

```
Raise New Claim
────────────────────────────────────────────────────────────────
Select Policy*:      [POL-2024-00182 — Health Shield Pro ▼]
Claim Type*:         [Cashless ▼ / Reimbursement / Third-Party]
Incident Date*:      [Date Picker]
Incident Description*: [Textarea — min 50 chars]
Claimed Amount*:     [₹ ____________]
Hospital / Garage:   [_______________] (context-dependent)
Supporting Documents: [Upload: PDF/JPG max 5MB each]
  → Medical bills, discharge summary, FIR, repair estimate, etc.

[Save as Draft]    [Submit Claim →]
```

**Claim Detail View:**

```
Claim: CLM-2024-00078                                [Download Claim Form]
────────────────────────────────────────────────────────────────────────
Status Timeline:
  [●] Submitted → [●] Under Review → [○] Decision → [○] Settlement

┌──────────────────────────────┬─────────────────────────────────────────┐
│  Claim Summary               │  Documents Submitted                    │
│  ──────────────────          │  ───────────────────────────────────── │
│  Policy: POL-2024-00182      │  📄 Medical_Bill.pdf          [View]   │
│  Type: Reimbursement         │  📄 Discharge_Summary.pdf     [View]   │
│  Amount: ₹12,500             │  📄 Lab_Reports.pdf           [View]   │
│  Date: 20 May 2024           │                                [+ Add] │
│  Assigned Agent: Rajesh K.   │                                         │
├──────────────────────────────┴─────────────────────────────────────────┤
│  Admin / Agent Notes (if any)                                          │
│  "Awaiting discharge summary from hospital. Reminder sent."            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 4.6 Claim History Screen

**Accessible by:** Admin (all), Agent (assigned clients), User (own history)

**Purpose:** Full audit trail of all past claims with settlement details.

**Layout:**

```
Claim History                                          [Export CSV]
─────────────────────────────────────────────────────────────────────
Filter: [Year ▼]  [Policy ▼]  [Status ▼]   Search: [Claim ID / Policy]

 Claim ID          Policy            Type           Claimed    Approved   Status     Settled On
 ────────────────────────────────────────────────────────────────────────────────────────────────
 CLM-2024-00042    Health Shield Pro  Cashless       ₹45,000    ₹43,200   APPROVED   15 Mar 2024
 CLM-2023-00118    Health Shield Pro  Reimbursement  ₹8,200     ₹7,500    APPROVED   09 Nov 2023
 CLM-2023-00055    Health Shield Pro  Reimbursement  ₹3,000     —         REJECTED   22 Aug 2023
 CLM-2022-00210    Motor Compreh.     Own Damage     ₹32,000    ₹28,500   APPROVED   10 Dec 2022
```

**Claim History Detail Side Panel:**

Clicking any row opens a right slide-in panel with:
- Full timeline of status changes with timestamps
- Agent notes at each stage
- Documents submitted and decisions
- Rejection reason (if applicable)
- Settlement breakdown (approved amount, deductions, TDS)

**Admin/Agent Extended View:**
- Additional column: Assigned Agent, Processing Time (days), SLA breach indicator
- Bulk export with date range
- Audit log tab per claim

---

## 5. Role-Based Access Control (RBAC) Summary

| Screen / Action | User | Agent | Admin |
|---|---|---|---|
| View own dashboard | ✅ | ✅ | ✅ |
| View products | ✅ Read | ✅ Read | ✅ CRUD |
| View plans | ✅ Read | ✅ Read | ✅ CRUD |
| View policies | ✅ Own only | ✅ Assigned clients | ✅ All |
| Buy / issue policy | ✅ Self | ✅ For client | ✅ |
| View payments | ✅ Own only | ✅ Assigned clients | ✅ All |
| Make payment | ✅ Own | — | ✅ Manual |
| Raise claim | ✅ Own | — | ✅ |
| Update claim | ✅ Own (pre-review) | ✅ Assigned | ✅ All |
| Approve / reject claim | ❌ | ❌ | ✅ |
| View claim history | ✅ Own | ✅ Assigned clients | ✅ All |
| Manage users | ❌ | ❌ | ✅ |
| Manage agents | ❌ | ❌ | ✅ |
| View reports | ❌ | ✅ Own performance | ✅ System-wide |
| Export data | ❌ | ✅ Limited | ✅ Full |

---

## 6. Navigation Flow Diagrams

### 6.1 User Journey — Buy a Policy

```
Login → User Dashboard
  → Products Screen (browse categories)
    → Plans Screen (compare plans under a product)
      → Plan Detail Modal (review coverage)
        → Buy Now → Policyholder Details Form
          → Premium Summary + Payment Screen
            → Payment Gateway → Success
              → Policy Issued → Email confirmation
                → Redirected to My Policies
```

### 6.2 User Journey — Raise a Claim

```
User Dashboard → My Claims
  → [+ Raise Claim]
    → Select Policy → Claim Type → Incident Details
      → Upload Documents → Review & Submit
        → Claim ID Generated → Status: PENDING
          → Agent Notified → Admin Review
            → Decision (Approve / Reject / Request more info)
              → User Notified (email + in-app)
                → If Approved: Settlement processed → Claim History updated
```

### 6.3 Admin Journey — Process a Claim

```
Admin Dashboard → Claims → [Flagged / Pending filter]
  → Open Claim Detail
    → Review documents, policyholder info, plan coverage
      → Add internal notes
        → [Approve with amount] / [Reject with reason] / [Request Documents]
          → Status updated → User + Agent notified
            → If Approved: trigger settlement workflow
              → Claim History updated
```

---

## 7. API Endpoint Mapping (Design Reference)

| Screen | Method | Endpoint |
|---|---|---|
| Products list | GET | `/api/products` |
| Product detail | GET | `/api/products/{id}` |
| Plans by product | GET | `/api/products/{id}/plans` |
| Plan detail | GET | `/api/plans/{id}` |
| Policies list (user) | GET | `/api/policies?userId={id}` |
| Policy detail | GET | `/api/policies/{id}` |
| Issue policy | POST | `/api/policies` |
| Renew policy | PUT | `/api/policies/{id}/renew` |
| Payments list | GET | `/api/payments?userId={id}` |
| Make payment | POST | `/api/payments` |
| Payment receipt | GET | `/api/payments/{id}/receipt` |
| Claims list | GET | `/api/claims?userId={id}` |
| Raise claim | POST | `/api/claims` |
| Claim detail | GET | `/api/claims/{id}` |
| Update claim | PUT | `/api/claims/{id}` |
| Approve claim | PUT | `/api/claims/{id}/approve` |
| Reject claim | PUT | `/api/claims/{id}/reject` |
| Claim history | GET | `/api/claims/history?userId={id}` |
| User dashboard | GET | `/api/dashboard/user/{id}` |
| Agent dashboard | GET | `/api/dashboard/agent/{id}` |
| Admin dashboard | GET | `/api/dashboard/admin` |

---

## 8. Notification & Alerts System

| Event | Channel | Recipient |
|---|---|---|
| Policy issued | Email + In-app | User |
| Payment success | Email + In-app | User |
| Payment due (7 days) | Email + In-app | User |
| Policy expiry (30 days) | Email + In-app | User + Agent |
| Claim submitted | Email + In-app | User + Agent |
| Claim status update | Email + In-app | User |
| Document requested | Email + In-app | User + Agent |
| Claim approved | Email + In-app | User |
| Claim rejected | Email + In-app | User + Agent |
| New user registered | In-app | Admin |
| High-value claim raised | In-app | Admin |

---

## 9. Responsive Design Notes

- **Desktop (≥1280px):** Full sidebar expanded (240px), multi-column grids
- **Tablet (768–1279px):** Sidebar collapses to icon-only (64px), 2-column grids
- **Mobile (<768px):** Sidebar becomes bottom nav (5 tabs), single-column stack, modals become full-screen sheets

**Mobile Bottom Nav (User):**

```
[ Home ] [ Policies ] [ Claims ] [ Payments ] [ Profile ]
```

---

## 10. Empty States

| Screen | Empty State Message | CTA |
|---|---|---|
| My Policies | "You don't have any active policies yet." | Browse Products |
| Payments | "No payment history found." | Make First Payment |
| My Claims | "No claims filed yet." | Raise a Claim |
| Claim History | "Your claim history will appear here." | — |
| Admin Users | "No users match your filters." | Clear Filters |
| Agent Clients | "No clients assigned yet." | Contact Admin |

---

*Document Version: 1.0 | Project: Insurance Policy & Claims Management System | Last Updated: June 2026*