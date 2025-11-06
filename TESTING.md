# Testing The Last Bounce Website

## Quick Test - Verification Page

### 1. Open the Website

```bash
cd /Users/nelson/projects/thelastbounce-website
open verify.html
```

Or start a local server:

```bash
# Python
python3 -m http.server 8000

# Then open: http://localhost:8000/verify.html
```

### 2. Test the Verification Flow

1. Click **"Load Sample Data"** button
2. Click **"Verify Product"** button
3. Watch the verification happen in real-time

**Note:** The API endpoint is configured to use `https://api.thelastbounce.com`. For local testing before deploying the API, update [verify.js](verify.js#L9):

```javascript
// Change this:
const API_URL = 'https://api.thelastbounce.com';

// To this:
const API_URL = 'http://localhost:3000';
```

### 3. What to Test

**Form Validation:**
- Try submitting with empty fields
- Try invalid hex format for root/nullifier
- Try invalid base64 for proof/signature

**API Integration:**
- Load sample data and verify
- Check browser console for API calls
- Verify CORS headers in Network tab

**UI/UX:**
- Loading states during verification
- Success/error result display
- "Verify Another" functionality
- Mobile responsiveness

**Navigation:**
- Test links between index.html, problem.html, verify.html
- Active state on verify page

## Testing Checklist

### Visual Testing

- [ ] Home page loads with complex backgrounds
- [ ] Problem page displays all statistics
- [ ] Verify page form is usable
- [ ] Navigation works across all pages
- [ ] Mobile view is responsive (test at 375px, 768px, 1024px)

### Functional Testing

- [ ] "Load Sample Data" fills form correctly
- [ ] Form validation shows errors
- [ ] API call succeeds (check Network tab)
- [ ] Result displays with correct status
- [ ] "Verify Another" resets form
- [ ] All links work

### Performance Testing

- [ ] Page loads in < 2 seconds
- [ ] Animations run at 60fps
- [ ] No console errors
- [ ] No 404s in Network tab

### Browser Testing

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

## Expected API Response

When testing with sample data, you should see:

```json
{
  "success": true,
  "authentic": true,
  "timestamp": "2025-01-15T10:30:00Z",
  "details": {
    "proofValid": true,
    "tagAuthValid": true,
    "rootValid": true
  }
}
```

**Note:** Until the API is deployed, you'll see a network error. This is expected.

## Local API Testing

To test with the API locally before deploying to Vercel:

### 1. Set Up API Locally

```bash
cd /Users/nelson/projects/thelastbounce-api
npm install
npm run dev
```

API will run at `http://localhost:3000`

### 2. Update Website to Use Local API

In [verify.js](verify.js), uncomment:

```javascript
const API_URL = 'http://localhost:3000';
```

### 3. Test CORS

The API is configured for `https://thelastbounce.com`. For local testing, temporarily update [thelastbounce-api/vercel.json](../thelastbounce-api/vercel.json):

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"  // Allow all origins for testing
        }
      ]
    }
  ]
}
```

**Important:** Change this back to `https://thelastbounce.com` before deploying!

## Troubleshooting

### CORS Error

**Error:** `Access-Control-Allow-Origin header is missing`

**Solution:**
1. Use local server (not file://)
2. Update API CORS settings
3. Check browser console for exact origin

### Network Error

**Error:** `Failed to fetch`

**Solution:**
1. Check API is running (`curl http://localhost:3000/api/health`)
2. Verify API_URL in verify.js
3. Check browser Network tab for details

### Form Validation Errors

**Error:** Invalid format messages

**Solution:**
- Root/Nullifier must be `0x` + 64 hex characters
- Proof/Signature/Challenge must be valid base64
- All fields are required

### Result Not Displaying

**Solution:**
1. Check browser console for errors
2. Verify API response format matches expected
3. Test with sample data first

## Browser DevTools

### Network Tab

Check:
- Request URL: Should be `{API_URL}/api/verify`
- Request Method: POST
- Status: 200 OK
- Response: JSON with `success` field

### Console Tab

Should show:
```
API Health: {status: 'ok', ...}
```

No errors should appear.

### Performance Tab

Record and check:
- Page load: < 2s
- Animations: 60fps
- No layout shifts

## Next Steps

1. **Deploy API** to Vercel (see [thelastbounce-api/DEPLOYMENT.md](../thelastbounce-api/DEPLOYMENT.md))
2. **Update API URL** in verify.js to production URL
3. **Test CORS** from production domain
4. **Deploy Website** to hosting provider
5. **Test end-to-end** in production

## Files to Test

- [index.html](index.html) - Home page
- [problem.html](problem.html) - Problem deep-dive
- [verify.html](verify.html) - Verification demo
- [verify.js](verify.js) - API client
- [styles.css](styles.css) - Main styles
- [verify-styles.css](verify-styles.css) - Verify page styles
- [problem-styles.css](problem-styles.css) - Problem page styles

---

**Testing Time:** 15-20 minutes
**Required:** Modern browser, local server
**Optional:** thelastbounce-api running locally
