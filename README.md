# 🚀 Berlin Tour Stack 🚀

### Your ultimate companion for exploring the vibrant city of Berlin!

---

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/github/stars/carcme/vite-btown-tstack?style=social" alt="GitHub Stars">
</p>

<p align="center">
  <em>Light Mode</em><br>
  <img src="[PATH_TO_LIGHT_MODE_SCREENSHOT]" alt="Light Mode Screenshot" width="400">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <em>Dark Mode</em><br>
  <img src="[PATH_TO_DARK_MODE_SCREENSHOT]" alt="Dark Mode Screenshot" width="400">
</p>

---

## ✨ Highlights

- **Interactive Map:** Explore Berlin's attractions on a beautiful, interactive map.
- **Language:** Available in both English and German.
- **Custom Tours:** Create and customize your own tours of the city.
- **Rich Attraction Info:** Get detailed information, images, and history for each location.
- **Dark/Light Mode:** A stunning UI that looks great in any lighting.
- **Fast and Modern:** Built with Vite, React, and TanStack for a snappy experience.

---

## 🤔 Why This Exists

Navigating a new city can be overwhelming. We wanted to create a tool that wasn't just a map, but a personalized guide to the heart of Berlin. Berlin Tour Stack is designed to be your go-to companion for discovering the city's hidden gems and iconic landmarks, all in a beautiful, easy-to-use interface.

---

## 📋 Features

| Feature                       | Description                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------- |
| **Interactive Map**           | A fully interactive Leaflet map with custom markers and popups.               |
| <del>**Tour Creation** </del> | <del>Plan your journey by creating custom tours with multiple stops.</del>    |
| **Attraction Details**        | View rich details for each stop in Berlin, including images and descriptions. |
| **Nearby Places**             | Find interesting points of interest near your selected location.              |
| **Dark/Light Mode**           | Switch between dark and light themes for optimal viewing.                     |
| **Responsive Design**         | Primarily designed for mobile but looks great desktop too                     |

---

## 🚀 Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/carcme/btown-react.git
    ```
2.  **Install dependencies:**
    ```bash
    cd vite-btown-tstack
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file and add your API keys:
    ```
    VITE_LOCATION_IQ_API_KEY=your_location_iq_api_key
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 💻 Code Example

Here's a glimpse of how we create a custom map marker in our React components:

```tsx
import { Marker } from "react-leaflet";
import { createMarkerIcon } from "@/components/map/CustomMarkerIcon";

const CustomMarker = ({ position, title, color }) => {
  return (
    <Marker
      position={position}
      title={title}
      icon={createMarkerIcon(color, "")}
      riseOnHover={true}
    />
  );
};
```

---

## 🙌 Contributing

We love contributions! Whether it's a bug fix, a new feature, or just some feedback, we'd love to hear from you. Feel free to open an issue or submit a pull request.

And if you like the project, please give it a ⭐!

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Site View Stats

[Stats from Umami](https://cloud.umami.is/share/Uw3ufQ3YXvh6M8Pi)
