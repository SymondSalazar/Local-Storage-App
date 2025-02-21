# Local-Storage-App
This is my first project built with Node.js, using Express and React. It's also the first project I'm uploading to my GitHub! 🚀 It's a local storage app, and since I'm still a beginner, there's plenty of room for improvement. I'll keep refining it as I learn more! 🔧✨

# Installlation and Setup

To install al dependencies and strat de project, run the following commands:

```ssh
npm run install:all && npm start
```

# Important
Follow these steps to ensure **Local-Storage-App** runs properly on your local network:

1. Inside the `api` folder, create a new folder named `SaveData`.  
2. Modify the `Api.js` file to allow access from other devices on your network:  

   Replace:  
   ```js
   app.listen(PORT, () => {
       console.log(`Server running at http://localhost:${PORT}`);
   });
   ```
   With:
   ```js
   app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://your-local-ip:${PORT}`);
    });
   ```
3. In the client folder, update the const.js in ./src/const/ file:
    
    Replace:
    ```js
    export const VITE_API_KEY = http://localhost:3000'
    ```
    With:
    ```js
    export const VITE_API_KEY = 'http://your-local-device-ip:3000'
    ```
4. Modify the package.json file in the root folder:
    
    Replace:
    ```json
    "start": "concurrently \"cd Api && npm run start\" \"cd cliente && npm run dev\""
    ```
    With:
    ```json
    "start": "concurrently \"cd Api && npm run start\" \"cd cliente && npx vite --host\""
    ```

