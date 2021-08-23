<div align="center">
    <img src="gallery/logo.png" width=160 />
</div>

# **Project in Development**

Bare React Native App for (iOs and Android) to stream music from YouTube.

## **Note**

Although the app runs for iOS and Android, it can only stream music on Android devices. This is because in iOs it is not possible to reproduce from the link generated by the server. (I am looking for a way to solve this)

#### **What is using**

- Typescript
- react-navigation 5
- react-native-elements (UI library)
- react-native-track-player (Audio library)
- react-native-svg to handle Circle Slider
- momentjs for date handling (I will change it later for another maintained library)
- react-native-url-polyfill as a work-around to support URL in React Native
- Redux with redux-thunk to make async computations
- react-native-ytdl

#### **What is doing?**

- Keyword suggestions from Google. (No api required)
- Search videos from Youtube. (No api required)
- Play audio in background (Only Android)

#### **Install Dependencies**

```script
npm install
```

### **Install dependencies for iOs**

```script
npx pod-install
```

### **Run project on Android**

```script
npx react-native run-android
```

### **To Do**

- Placeholder when image not found
- Save playlist in device storage
- Display recently searched videos on home page
- Work on Settings page
- Add functionalities to Favorite, Repeat mode, Random mode to buttons in MediaPlayerScreen

### **Known Bugs**

- **_Hide keyboard when selecting a suggestion on SearchHeader (Keyboards needs to be dissmised in order to select option from dropdown)_**
- **_This video requires payment to watch (Need to catch this error in useMediaPlayer)_**
- **_Hide live videos from search response_**
- **_Allow repeat playlist when queue end up_ (Warning: There is not tracks left/right to play)**

### **Gallery**

<p float="left" align="center">
  <img src="gallery/urmusic_01.png" width=250 />
  <img src="gallery/urmusic_02.png" width=250 />
  <img src="gallery/urmusic_03.png" width=250 />
  <img src="gallery/urmusic_04.png" width=250 />
  <img src="gallery/urmusic_05.png" width=250 />
  <img src="gallery/urmusic_06.png" width=250 />
</p>
