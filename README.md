# **🌌 AsciiByHeart**

**AsciiByHeart** is a high-performance, real-time camera-to-ASCII art converter designed with a futuristic "Cyberpunk Terminal" aesthetic. Beyond simple visual filtering, it integrates **Gemini AI** to perform live "Neural Analysis" on the video feed—identifying subjects, assessing threat levels, and generating tactical descriptions in real-time.

## **✨ Key Features**

* **Real-time ASCII Rendering**: High-frequency conversion of live camera streams into intricate character-based art with temporal smoothing to reduce jitter.  
* **Neural Analysis (AI)**: Powered by Gemini 1.5 Flash to analyze visual snapshots, providing robotic assessments and security-style threat levels (LOW to CRITICAL).  
* **Tactical HUD & Controls**: A sophisticated interface allowing real-time adjustments of gain, contrast, font size, and character density.  
* **Cinematic Modes**: Multiple specialized visual profiles including **Matrix Green**, **Retro Amber**, **Full Color**, and classic **Monochrome**.  
* **Procedural Audio**: An immersive soundscape featuring a low-frequency ambient drone and tactical UI feedback generated via the Web Audio API.  
* **Data Export**: Integrated snapshot system to capture and save the generated ASCII art as high-resolution images.

## **🛠️ Tech Stack**

* **Core**: React 19 & TypeScript  
* **Build Tool**: Vite 6  
* **AI Engine**: Google Generative AI (Gemini 1.5 Flash)  
* **Styling**: Tailwind CSS  
* **Icons**: Lucide React  
* **Sound**: Web Audio API (Custom Oscillators & LFOs)

## **📂 Project Structure**

* components/AsciiCanvas.tsx: The heart of the application; manages the camera stream and canvas-based ASCII rendering loop.  
* services/geminiService.ts: Handles secure communication with the Gemini API for vision-based analysis.  
* utils/soundEffects.ts: Procedural audio engine for the ambient sci-fi atmosphere.  
* utils/asciiConverter.ts: Core algorithms for luminosity conversion and character mapping.  
* types.ts: Centralized type definitions and density map configurations.

## **📜 License**

This project is licensed under the **MIT License**.

**Designed and Built with ❤️ by [Anuj Tiwari](https://anujtiwari.vercel.app/)**
