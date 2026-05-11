# Chatbot Application - Testing & Deployment Checklist

## ✅ Fixed Issues

1. **Twilio Phone Number Format** ✅
   - Changed from: `(218) 562-9357`
   - Changed to: `+12185629357` (E.164 format)
   
2. **Twilio Call API Implementation** ✅
   - Updated to use webhook URL instead of inline TwiML
   - Added `VERCEL_URL` fallback for domain detection

3. **Bot Response Route** ✅
   - Fixed corrupted syntax
   - Added proper error handling
   - Supports DTMF (keypad) input
   - Added `<Hangup/>` to properly end calls

4. **Environment Configuration** ✅
   - Merged `.env` and `.env.local` into single `.env` file
   - All credentials ready for Vercel

---

## 📋 Pre-Deployment Testing Checklist

### 1. Local Testing (DEV_MODE = true)
- [ ] Start dev server: `npm run dev`
- [ ] Chat widget opens at `http://localhost:3000`
- [ ] Send a message and verify bot responds
- [ ] Click "Register" button and enter phone
- [ ] Verify NO real Twilio call is placed (DEV_MODE=true)
- [ ] Check browser console for errors

### 2. Test Each API Endpoint
```bash
# Test Chat API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Admission Process","chatHistory":[]}'

# Test Call API (will be mocked in DEV_MODE)
curl -X POST http://localhost:3000/api/call \
  -H "Content-Type: application/json" \
  -d '{"phone":"+91XXXXXXXXXX","name":"Test User"}'

# Test Bot Response
curl -X POST http://localhost:3000/api/bot-response \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "SpeechResult=yes"
```

### 3. Firebase Connection
- [ ] Verify Firebase Admin SDK is initialized
- [ ] Check that leads/conversations can be saved to Firestore
- [ ] Monitor Firestore console for new documents

---

## 🚀 Production Deployment (Vercel)

### Before Deploying:
1. [ ] Change `DEV_MODE=false` in `.env`
2. [ ] Ensure `VERCEL_URL` is set in Vercel dashboard
3. [ ] Verify all environment variables are added to Vercel
4. [ ] Test all credentials are valid and active

### Deploy Steps:
```bash
# 1. Commit changes
git add .
git commit -m "Fix Twilio integration and bot response"

# 2. Push to Vercel (connected repo)
git push

# 3. Vercel auto-deploys
# Monitor at https://vercel.com/dashboard
```

### After Deployment:
1. [ ] Test chat widget on production URL
2. [ ] Verify calls are being placed (not mocked)
3. [ ] Check Firestore for new records
4. [ ] Monitor Vercel logs for errors

---

## ⚙️ Twilio Configuration in Console

1. Log in to Twilio: https://www.twilio.com/console
2. Go to **Phone Numbers** → **Active Numbers**
3. Click on your number `+12185629357`
4. Scroll to "Voice Configuration"
5. Set **"A Call Comes In"** webhook:
   - URL: `https://your-vercel-url.vercel.app/api/bot-response`
   - Method: POST
6. Save

---

## 🔍 Troubleshooting

### Call Not Being Placed
- [ ] Check if DEV_MODE is false in Vercel
- [ ] Verify Twilio credentials are correct
- [ ] Check phone number format (must start with +)
- [ ] Ensure phone number is valid E.164 format
- [ ] Check Twilio account balance/limits

### Bot Response Not Working
- [ ] Verify webhook URL is set in Twilio console
- [ ] Check if response is returning valid TwiML XML
- [ ] Monitor Vercel logs for errors
- [ ] Test with curl to see response format

### Firebase Not Saving
- [ ] Check Firebase Admin Key is valid
- [ ] Verify Firestore rules allow writes
- [ ] Check network tab in browser for failed requests

---

## 📊 Monitoring

### Twilio Logs
- Go to https://www.twilio.com/console/phone-numbers
- Check call history and logs

### Vercel Logs
- Go to your project dashboard
- View real-time logs for API calls

### Firebase/Firestore
- Check collections: `leads`, `conversations`, `escalations`
- Verify new documents are being created

---

## 🎯 Next Steps

1. **Test in Dev Mode First**
   - Ensure everything works locally
   - No real costs incurred

2. **Deploy to Vercel**
   - Set DEV_MODE=false
   - Deploy with production environment variables

3. **Configure Twilio Webhook**
   - Set the webhook URL in Twilio console
   - This enables voice call interactions

4. **Monitor & Debug**
   - Check logs regularly
   - Test full flow with real phone

5. **Optimize**
   - Add more conversation flows
   - Integrate Gemini AI for smarter responses
   - Set up analytics/monitoring
