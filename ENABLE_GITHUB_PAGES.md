# 🚀 Enable GitHub Pages - Step by Step

## ⚠️ Current Issue: 404 Error

The 404 error means GitHub Pages hasn't been enabled yet. Follow these steps:

## 📋 Step-by-Step Instructions

### Step 1: Enable GitHub Pages

1. **Go to your repository:**
   https://github.com/aimbright/tsc-websiteapp

2. **Click on "Settings"** (top menu bar, next to Insights)

3. **Scroll down to "Pages"** (left sidebar, under "Code and automation")

4. **Under "Build and deployment":**
   - **Source**: Select **"GitHub Actions"**
   - (Do NOT select "Deploy from a branch")

5. **Click "Save"**

### Step 2: Check GitHub Actions

1. **Go to "Actions" tab** (top menu)

2. **You should see "Deploy to GitHub Pages" workflow**

3. **If it's not running, click "Run workflow"** → Select "main" branch → Click "Run workflow"

4. **Wait for the workflow to complete** (takes 2-3 minutes)

5. **Look for a green checkmark** ✅ when done

### Step 3: Verify Deployment

1. **Go back to Settings → Pages**

2. **You should see:**
   - "Your site is live at https://aimbright.github.io/tsc-websiteapp/"
   - A green checkmark ✅

3. **Click the link** to view your website

## 🔍 Troubleshooting

### If workflow fails:

1. Check the **Actions** tab for error messages
2. Common issues:
   - Missing dependencies → Check if `package.json` is correct
   - Build errors → Check the build logs
   - Permission issues → Make sure Pages permission is enabled

### If site shows 404 after deployment:

1. Wait 5-10 minutes (GitHub Pages can take time to propagate)
2. Clear your browser cache
3. Try incognito/private browsing mode
4. Check the Actions tab to ensure deployment succeeded

## ✅ Expected Result

After completing these steps, your website will be live at:

**https://aimbright.github.io/tsc-websiteapp/**

## 📝 Quick Checklist

- [ ] Enabled GitHub Pages in Settings
- [ ] Selected "GitHub Actions" as source
- [ ] Workflow ran successfully (green checkmark)
- [ ] Site URL shows in Settings → Pages
- [ ] Website loads at https://aimbright.github.io/tsc-websiteapp/

---

**Need Help?** Check the Actions tab for detailed logs if something goes wrong.

