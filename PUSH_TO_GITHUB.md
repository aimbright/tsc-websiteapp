# Push to GitHub - Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/organizations/aimbright/repositories/new
   (Or go to GitHub → aimbright organization → New repository)

2. Repository name: `tsc-websiteapp` (or any name you prefer)
3. Description: "Sri Tirumala Sales Corporation - Premium Hardware Website"
4. Set as **Private** or **Public** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push Code to GitHub

After creating the repository, run these commands:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/aimbright/tsc-websiteapp.git

# Or if using SSH:
# git remote add origin git@github.com:aimbright/tsc-websiteapp.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Quick Setup Script

If you have GitHub CLI installed:

```bash
gh repo create aimbright/tsc-websiteapp --private --source=. --remote=origin --push
```

## That's it! 🎉

Your code will be pushed to the aimbright organization on GitHub.

