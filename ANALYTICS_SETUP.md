# Analytics & Conversion Optimization Setup

## Google Analytics Integration

All pages now include Google Analytics tracking. To activate:

### 1. Get Your Google Analytics ID
- Go to: https://analytics.google.com
- Create a property for ObsidianAI
- Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Update All HTML Files
Replace `G-XXXXXXXXXX` in each file with your actual ID:
- `index.html`
- `contact.html`
- `solutions.html`
- `pricing.html`
- `roadmap.html`

Search for this snippet in each file:
```javascript
gtag('config', 'G-XXXXXXXXXX');
```

Replace with your actual ID:
```javascript
gtag('config', 'G-XXXXXXXXX');
```

## Google Ads Conversion Tracking

Google Ads conversion tracking is enabled on **contact.html** only to capture lead generation conversions.

### Configuration
- **Account ID**: `AW-17916804799`
- **Conversion Label**: `lead_conversion`
- **Implementation**: Tracking code already added to contact.html

### How It Works
1. User fills out assessment form
2. Form submission triggers `gtag('event', 'conversion')`
3. Conversion is sent to Google Ads with:
   - `send_to`: AW-17916804799/lead_conversion
   - `value`: 1
   - `currency`: USD
   - `transaction_id`: Unique ID per submission

### Google Ads Setup
1. No additional setup needed - conversion code is already installed
2. Go to: https://ads.google.com
3. Navigate to Tools → Conversions
4. You should see conversion data appearing within 24 hours

### Track Lead Quality
- **Dashboard**: Ads → Conversions
- **Metric**: "cost per lead" and "CPA (cost per acquisition)"
- **ROI**: Calculate from form submissions vs. ad spend

## Tracked Events

### CTA Click Events
- **Event Name**: `cta_click`
- **Data Captured**:
  - `cta_text`: Button text clicked
  - `page`: Which page (home, solutions, pricing, roadmap, contact)
  - `section`: Which section on the page
  - `pricing_plan`: (For pricing.html) Which tier clicked
  - Additional context varies by page

### Form Submission Events
- **Event Name**: `form_submit`
- **Data Captured**:
  - `company`: Company name
  - `deployment_type`: Deployment preference (On-Site, Hybrid, SaaS)
  - `page`: "contact"

### Exit Intent Events
- **Event Name**: `exit_intent_popup_shown` - When exit popup appears
- **Event Name**: `exit_intent_cta_click` - When user clicks exit popup CTA
- **Data Captured**:
  - `action`: "schedule_now" or "view_pricing"
  - `page`: "contact"

## Backend Lead Tracking

When a form is submitted, data is also sent to your backend (if running):

### Endpoint
`POST https://obsidianai-evtu.onrender.com/lead`

### Payload
```json
{
  "source": "contact_form",
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Acme Corp",
  "phone": "(555) 123-4567",
  "challenges": "User description of needs",
  "deployment": "Obsidian Core",
  "timestamp": "2026-03-29T18:00:00Z"
}
```

### Backend Setup (optional)
Update your `app.py` to add this endpoint:

```python
@app.post("/lead")
async def receive_lead(data: dict):
    """Receive and log leads from contact form"""
    # Log to database or email service
    logger.info(f"New lead: {data}")
    # Optional: Send to Slack, email, CRM, etc.
    return {"status": "received"}
```

## Formspree Webhook Setup

For backend notifications when forms are submitted:

### 1. Log into Formspree
- Go to: https://formspree.io
- Navigate to your form (form ID: `mbdkongb`)
- Settings → Webhooks

### 2. Add Webhook
- **Webhook URL**: `https://obsidianai-evtu.onrender.com/lead`
- **Event**: Form submission
- **Content-Type**: JSON

### 3. Test
Submit a test form on contact.html and verify webhook is received in your backend logs.

## Exit-Intent Popup

### How It Works
- Triggers when user moves mouse to top of page (exit intent detected)
- Only triggers once per session
- Can be dismissed (X button)
- Includes two CTAs:
  1. "Schedule Assessment Now" - Scrolls to form
  2. "View Pricing First" - Redirects to pricing.html

### Customization
Edit in `contact.html`, lines ~150-170:
- Change popup text
- Adjust styling in `styles.css` (search for `.exit-popup`)
- Modify CTA text or actions

### Disable (if needed)
Comment out the exit popup code in contact.html:
```javascript
// document.addEventListener('mouseleave', (e) => {
//     if (e.clientY <= 0 && !exitPopupShown && form) {
//         showExitPopup();
```

## Conversion Funnel

Track these metrics in Google Analytics:

1. **Page Views** - Who visits each page
2. **CTA Clicks** - Which sections convert best
3. **Form Submissions** - How many assessments requested
4. **Exit Intent** - How many people try to leave

### GA Dashboard Setup
1. Go to Analytics
2. Create custom report
3. Add dimensions: Page, Event Name
4. Add metrics: Event Count, Users

### Goals to Set
1. **Goal**: Form Submission
   - Event: `form_submit`
2. **Goal**: CTA Click (Any)
   - Event: `cta_click`
3. **Goal**: Exit Intent Engagement
   - Event: `exit_intent_cta_click`

## Formspree Redirect (Optional)

After form submission, redirect to success page:

In `contact.html`, update form action:
```html
<form action="https://formspree.io/f/mbdkongb?redirectTo=https://obsidianai.org/thank-you.html" method="POST">
```

Then create `thank-you.html` with success message.

## Campaign Tracking

Add UTM parameters to track campaigns:

```
https://obsidianai.org/?utm_source=email&utm_medium=newsletter&utm_campaign=limited_slots
https://obsidianai.org/pricing.html?utm_source=twitter&utm_campaign=founder_pricing
```

## Testing

### Test Google Analytics Locally
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "collect"
4. Click a CTA button
5. You should see network request to `google-analytics.com`

### Test Form Submission
1. Fill out contact form
2. Check Google Analytics → Events → `form_submit`
3. Check backend logs for lead webhook

### Test Exit Intent
1. Open contact.html
2. Move mouse to top of page
3. Exit popup should appear

## Privacy & Compliance

### GDPR
- Popup appears on all pages informing about analytics
- Users can opt out in GA settings
- No personally identifiable data sent to GA automatically

### CCPA
- Formspree terms: https://formspree.io/privacy
- Lead data stored for 30 days by default

### Implementation
Add GDPR banner to `index.html` if serving EU users:
```html
<div style="position: fixed; bottom: 0; background: #111; padding: 20px; color: #888; font-size: 0.9rem;">
This site uses Google Analytics. <a href="#" style="color: var(--accent);">Learn more</a> or manage preferences.
</div>
```

## Next Steps

1. [ ] Get Google Analytics ID
2. [ ] Update all `.html` files with GA ID
3. [ ] **Monitor Google Ads conversions** at https://ads.google.com
4. [ ] Test GA events locally
5. [ ] Set up Formspree webhook (optional)
6. [ ] Create GA dashboard
7. [ ] Monitor for first 2 weeks
8. [ ] Optimize CTAs based on data and conversion costs

## Support

For questions:
- GA Issues: https://support.google.com/analytics
- Formspree Issues: https://help.formspree.io
- ObsidianAI: team@obsidianai.org
