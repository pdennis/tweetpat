
# Tweetpat 🐦

Tweetpat is a simple Electron app designed to display multiple Twitter 
lists or pages side by side. I'm trying to replicate my own usage of 
tweetdeck, not reimplement all of its features. I have never written an 
electron app before, so I'm sure this is a mess. 

## Features
- View up to five Twitter URLs in adjacent columns.
- Customize the URLs to display your preferred Twitter lists, profiles, or 
other pages.

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (with npm)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/YOUR_USERNAME/Tweetpat.git
   ```
2. Navigate to the project directory:
   ```
   cd Tweetpat
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the App
After installation, you can run Tweetpat using:
```
npm start
```

## Customizing Twitter URLs

To customize the Twitter URLs displayed by Tweetpat:

1. Open the `main.js` file.
2. Locate the `sites` array, which contains the default Twitter URLs:
   ```javascript
   const sites = [
       'https://twitter.com/i/lists/132220062',
       // ... other URLs ...
   ];
   ```
3. Replace the existing URLs with your desired Twitter URLs. Make sure to 
retain the structure of the array.
4. Save the file and run the app.

## Contributing

We welcome contributions! If you find a bug or would like to add a new 
feature, feel free to create a pull request.

## License

MIT License. See [LICENSE](LICENSE) for more information.

---

Please replace `YOUR_USERNAME` with your GitHub username in the `git 
clone` URL. You might also want to add or adjust any sections as needed to 
fit the specifics of your project or personal preferences.
