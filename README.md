# **📸 Vinted Academy Infinite Scroll**

Welcome to the **Infinite Scroll Image Gallery**! This project fetches images from the Pexels API and is a responsive web application that allows users to explore curated images with infinite scrolling and save their favorite picks. Built with **React**, **TypeScript**, **Vite**, and styled with modern CSS.

---

## **✨ Features**
- 🌟 **Infinite Scrolling**: Seamlessly load more images as you scroll down.
- ❤️ **Favorite Images**: Save your favorite images to localStorage and manage them easily.
- 📱 **Responsive Design**: Works beautifully on all screen sizes.
- ⚡ **Optimized Performance**: Built with Vite for fast development and production builds.

---

## **🛠️ Tech Stack**
- **Frontend**: React 19 + TypeScript
- **Styling**: Modern CSS (CSS Modules)
- **Backend API**: Pexels API
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

---

## **🚀 How to Run the Project**

### **Step 1: Clone the Repository**
- git clone https://github.com/vinted-hw/academy-web-homework-Kareem-kb
- cd academy-web-homework-Kareem-kb

### **Step 2: Install Dependencies**
- npm install

### **Step 3: Set Up Environment Variables**
Create a `.env` file in the root of your project and add your Pexels API key:
- VITE_PEXELS_API=your_api_key_here

### **Step 4: Start the Development Server**
- npm run dev
- The app should be available at `http://localhost:5173`, provided nothing else is running on that port.

---

## **🧪 Testing**

I have implemented tests to ensure everything works as expected!

### To Run Tests:
- npm run test Or for a more visual testing experience npm run test:ui

### What We Test:
1. 🖼️ Rendering of images and titles.
2. 💾 Correct handling of favorites (add/remove).
3. 🔄 Proper infinite scrolling behavior.
4. 🧹 Cleanup of resources like IntersectionObserver.

---

## **✅ Completed Merges**

Here are the branches we worked on and merged into `main`:

1. `fetch-scroll`  
   - Implemented fetching data from the Pexels API and infinite scrolling using IntersectionObserver.

2. `responsive-and-favoriting-images`  
   - Added lazy loading for images based on screen size and implemented functionality to save favorite images to localStorage.

3. `styling-ui`  
   - Styled all elements in the project using CSS Modules for a clean, modular design.

4. `testing`  
   - Created and successfully passed tests for all core functionalities of the project.

5. `bonus-features`  
   - Added a splash screen and a favorites page, complete with their respective styles.






