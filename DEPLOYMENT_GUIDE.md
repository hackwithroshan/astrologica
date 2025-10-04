# astrologica - Vercel पर डिप्लॉय करने की गाइड

यह गाइड आपको astrologica एप्लिकेशन को Vercel पर डिप्लॉय करने के लिए स्टेप-बाय-स्टेप निर्देश देगी।

---

### 🚨 500 एरर को कैसे ठीक करें? हेल्थ चेक का उपयोग करें! 🚨

अगर आपकी लाइव वेबसाइट (जैसे लॉगिन) काम नहीं कर रही है और **500 Internal Server Error** दिखा रही है, तो इसका 99% कारण Vercel में गलत या छूटे हुए एनवायरनमेंट वैरिएबल (Environment Variables) हैं।

**समस्या का सटीक कारण जानने के लिए यह करें:**

1.  अपनी लाइव वेबसाइट का URL खोलें और उसके अंत में `/api/health` जोड़ें।
    उदाहरण: `https://your-project-name.vercel.app/api/health`

2.  यह आपको एक JSON रिपोर्ट दिखाएगा। अगर कोई समस्या है, तो वह इस तरह दिखेगी:
    ```json
    {
      "status": "error",
      "message": "Backend has critical configuration errors that must be fixed.",
      "checks": {
        "environmentVariables": {
          "status": "error",
          "message": "The server is missing 2 required environment variable(s).",
          "missing": [
            "MONGO_URI",
            "JWT_SECRET"
          ]
        },
        "databaseConnection": {
          "status": "error",
          "message": "Database is disconnected. Check your MONGO_URI value..."
        }
      }
    }
    ```

3.  **कैसे ठीक करें:**
    -   `missing` लिस्ट में जो भी वैरिएबल (`MONGO_URI`, `JWT_SECRET`, आदि) दिख रहे हैं, उन्हें अपने **Vercel प्रोजेक्ट की सेटिंग्स -> Environment Variables** में जाकर जोड़ें।
    -   अगर `databaseConnection` में `error` है, तो इसका मतलब है कि आपका `MONGO_URI` गलत है, या आपने MongoDB Atlas में अपनी IP को व्हाइटलिस्ट नहीं किया है।

4.  सभी वैरिएबल को ठीक करने के बाद, Vercel में एक नया **"Redeploy"** करें।

**जब सब कुछ ठीक हो जाएगा, तो `/api/health` लिंक पर यह दिखाई देगा:**
```json
{
  "status": "ok",
  "message": "Backend is running and configured correctly.",
  "checks": {
    "environmentVariables": { "status": "ok", ... },
    "databaseConnection": { "status": "ok", ... }
  }
}
```

---

### आपको क्या चाहिए:

1.  **GitHub अकाउंट**: आपका सारा कोड एक GitHub रिपॉजिटरी में होना चाहिए।
2.  **Vercel अकाउंट**: आप अपने GitHub अकाउंट से साइन अप कर सकते हैं।
3.  **MongoDB डेटाबेस**: आप MongoDB Atlas (फ्री) या Railway का डेटाबेस इस्तेमाल कर सकते हैं। आपको बस कनेक्शन स्ट्रिंग (URI) चाहिए होगी।
4.  **Razorpay अकाउंट**: आपको लाइव `Key ID` और `Key Secret` की आवश्यकता होगी।
5.  **PhonePe अकाउंट**: आपको (टेस्ट या लाइव) `Merchant ID` और `Salt Key` की आवश्यकता होगी।

---

## डिप्लॉयमेंट के स्टेप्स

### स्टेप 1: कोड को GitHub पर डालें

अगर आपका कोड पहले से GitHub पर नहीं है, तो एक नई रिपॉजिटरी बनाएं और अपना पूरा प्रोजेक्ट (फ्रंटएंड और बैकएंड फाइलों के साथ) वहां पुश करें।

### स्टेप 2: Vercel पर नया प्रोजेक्ट बनाएं

1.  अपने [Vercel Dashboard](https://vercel.com/dashboard) पर लॉग इन करें।
2.  **"Add New... -> Project"** पर क्लिक करें।
3.  **"Import Git Repository"** सेक्शन में, अपनी GitHub रिपॉजिटरी को चुनें और **"Import"** पर क्लिक करें।

### स्टेप 3: प्रोजेक्ट को कॉन्फ़िगर करें

Vercel आपके कोड को एनालाइज करेगा। आपको कुछ सेटिंग्स बतानी होंगी:

-   **Framework Preset**: Vercel शायद इसे पहचान नहीं पाएगा, इसलिए **"Other"** चुनें।
-   **Root Directory**: इसे **रूट (`./`)** पर ही रहने दें। `vercel.json` फाइल के कारण, Vercel समझ जाएगा कि फ्रंटएंड और बैकएंड को कैसे हैंडल करना है।

बाकी सेटिंग्स को डिफ़ॉल्ट छोड़ दें।

### स्टेप 4: एनवायरनमेंट वैरिएबल (Environment Variables) जोड़ें (सबसे ज़रूरी स्टेप)

यह आपकी वेबसाइट के गोपनीय (secret) कीज़ और सेटिंग्स हैं। इन्हें सीधे कोड में नहीं लिखा जाता है।

**"Environment Variables"** सेक्शन में, नीचे दिए गए सभी वैरिएबल एक-एक करके जोड़ें:

1.  `MONGO_URI`:
    -   **Key**: `MONGO_URI`
    -   **Value**: अपने MongoDB Atlas डेटाबेस की कनेक्शन स्ट्रिंग यहाँ पेस्ट करें।
2.  `JWT_SECRET`:
    -   **Key**: `JWT_SECRET`
    -   **Value**: एक बहुत ही लंबा और रैंडम सीक्रेट टेक्स्ट यहाँ डालें। आप इसे बनाने के लिए एक ऑनलाइन पासवर्ड जनरेटर का उपयोग कर सकते हैं। यह आपकी वेबसाइट की सुरक्षा के लिए बहुत महत्वपूर्ण है।
3.  `RAZORPAY_KEY_ID`:
    -   **Key**: `RAZORPAY_KEY_ID`
    -   **Value**: अपने Razorpay डैशबोर्ड से **लाइव** Key ID यहाँ पेस्ट करें।
4.  `RAZORPAY_KEY_SECRET`:
    -   **Key**: `RAZORPAY_KEY_SECRET`
    -   **Value**: अपने Razorpay डैशबोर्ड से **लाइव** Key Secret यहाँ पेस्ट करें।
5.  `PHONEPE_MERCHANT_ID`:
    -   **Key**: `PHONEPE_MERCHANT_ID`
    -   **Value**: अपने PhonePe मर्चेंट डैशबोर्ड से Merchant ID यहाँ पेस्ट करें।
6.  `PHONEPE_SALT_KEY`:
    -   **Key**: `PHONEPE_SALT_KEY`
    -   **Value**: अपने PhonePe डैशबोर्ड से Salt Key यहाँ पेस्ट करें।
7.  `FRONTEND_URL`:
    -   **Key**: `FRONTEND_URL`
    -   **Value**: Vercel द्वारा डिप्लॉयमेंट के बाद दी गई आपकी वेबसाइट की पूरी URL (जैसे `https://your-project-name.vercel.app`)। यह पेमेंट रीडायरेक्ट के लिए ज़रूरी है।


**ध्यान दें:** सुनिश्चित करें कि आपने गलती से `Test` कीज़ के बजाय `Live` कीज़ का उपयोग किया है।

### स्टेप 5: डिप्लॉय (Deploy) करें

सभी एनवायरनमेंट वैरिएबल जोड़ने के बाद, **"Deploy"** बटन पर क्लिक करें।

Vercel अब आपके प्रोजेक्ट को बनाना शुरू कर देगा। इसमें कुछ मिनट लग सकते हैं।
-   यह पहले आपके फ्रंटएंड (`npm run build`) को बनाएगा।
-   फिर यह आपके बैकएंड (`/backend` डायरेक्टरी) को सर्वरलेस फंक्शन के रूप में सेट करेगा।

### स्टेप 6: वेबसाइट को लाइव देखें!

डिप्लॉयमेंट पूरा होने पर, Vercel आपको बधाई देगा और आपकी लाइव वेबसाइट का एक लिंक देगा। उस पर क्लिक करें और आपकी astrologica वेबसाइट अब पूरी दुनिया के लिए लाइव है!
