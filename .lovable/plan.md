

# Remote Sensing Video Tracking Dashboard

A polished, interactive web dashboard that demonstrates a tracking-by-detection framework for remote sensing video analysis. This serves as the frontend interface for the project, with simulated tracking results for demonstration purposes.

---

## Page 1: Landing / Home Page
- Project title and description
- System architecture diagram showing the modular pipeline (Video Input → Detection → Feature Extraction → Tracking → Output)
- Key metrics overview (e.g., objects tracked, frames processed, accuracy)
- Navigation to all modules

## Page 2: Video Input Module
- Video file upload interface (drag & drop)
- Frame extraction preview showing individual frames from an uploaded video
- Preprocessing controls (resize, noise reduction sliders)
- Display extracted frames in a grid gallery

## Page 3: Object Detection Module
- Display video frames with simulated YOLO bounding boxes overlaid
- Confidence scores shown on each detection
- Detection statistics panel (object count, average confidence, class distribution)
- Frame-by-frame navigation with play controls

## Page 4: Feature Extraction & Fusion Dashboard
- Visual breakdown of feature types:
  - **Spatial features**: position coordinates, bounding box dimensions
  - **Appearance features**: CNN embedding visualization (simulated)
  - **Motion features**: velocity vectors, direction arrows
- Feature fusion visualization showing how features combine

## Page 5: Multi-Object Tracking View
- Main video playback area with tracked objects (unique colored IDs)
- Trajectory lines drawn over video frames
- Identity tracking table showing object IDs across frames
- Tracking metrics: ID switches, MOTA score, track continuity
- Algorithm comparison panel (Deep SORT vs ByteTrack simulated results)

## Page 6: Results & Export
- Final tracking results summary with statistics
- Trajectory visualization on a map/canvas view
- CSV export of tracking data (object ID, frame, position, confidence)
- Downloadable annotated video placeholder
- Performance metrics charts (processing time, accuracy over frames)

## Page 7: System Architecture
- Interactive module diagram showing the full pipeline
- Technology stack breakdown
- Literature references section
- Future work roadmap (transformer modeling, cross-camera matching, edge optimization)

---

## Design Style
- Clean, professional dashboard with a dark theme suitable for technical/academic presentation
- Sidebar navigation between modules
- Charts and visualizations using Recharts
- Responsive layout

## Data Approach
- All tracking results, bounding boxes, and trajectories use realistic mock data
- Simulates real-time processing with animated transitions
- No actual ML processing (would require a separate Python backend)

