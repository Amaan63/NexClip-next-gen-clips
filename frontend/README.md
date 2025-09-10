# NexClip - Social Media Platform

A modern social media platform built with React, Redux, and Tailwind CSS. NexClip allows users to share posts, watch reels, interact with content through comments and polls, and discover content through categories and search.

## 🚀 Features

### User Features

- **Authentication**: Secure login with JWT tokens
- **Posts Feed**: Browse and interact with posts from all users
- **Reels**: Watch short-form video content with smooth playback
- **Search**: Find posts, users, and content with debounced search
- **Categories**: Browse content by categories
- **Comments**: Add comments to posts and view existing discussions
- **Polls**: Participate in interactive polls within posts
- **Profile Management**: View user profiles and personal content
- **Mobile Responsive**: Optimized for mobile and desktop usage

### Admin Features

- **Content Management**: Create, edit, and delete posts and reels
- **Category Management**: Manage content categories
- **Media Upload**: Upload images and videos via Cloudinary
- **Poll Creation**: Create interactive polls with multiple options
- **Content Visibility**: Control post and reel visibility

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **State Management**: Redux with redux-thunk
- **Styling**: Tailwind CSS v4.1+
- **Build Tool**: Vite
- **HTTP Client**: Axios with interceptors
- **File Upload**: Cloudinary integration
- **Notifications**: react-hot-toast
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (Fantasy Hub API)
- Cloudinary account for media uploads

## ⚙️ Installation

1. **Clone the repository**
   git clone <repository-url>
   cd nexclip

text

2. **Install dependencies**
   npm install

text

3. **Environment Setup**

Create a `.env` file in the root directory:
API Configuration
VITE_API_URL=http://localhost:5000/api/fantasyHub

Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here

App Configuration
VITE_APP_NAME=NexClip
VITE_APP_VERSION=1.0.0

text

4. **Cloudinary Setup**

- Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
- Get your Cloud Name from the dashboard
- Create an unsigned upload preset:
  - Go to Settings → Upload
  - Add upload preset
  - Set signing mode to "Unsigned"
  - Configure folder and transformations as needed
  - Copy the preset name to your `.env` file

## 🚀 Running the Application

### Development Mode

npm run dev

text
The application will start at `http://localhost:3000`

### Build for Production

npm run build

text

### Preview Production Build

npm run preview

text

## 👤 Demo Accounts

For testing purposes, you can use these demo accounts:

- **Username**: `Ahmed619` | **Password**: `Ahmed#619`
- **Username**: `Amaan619` | **Password**: `Amaan#619`

## 🏗️ Project Structure

src/
├── api/ # API integration
│ ├── axiosClient.js # Axios configuration
│ ├── authApi.js # Authentication APIs
│ ├── postApi.js # Post-related APIs
│ ├── reelApi.js # Reel-related APIs
│ └── categoryApi.js # Category APIs
├── components/ # React components
│ ├── common/ # Reusable components
│ ├── layout/ # Layout components
│ ├── posts/ # Post-related components
│ ├── reels/ # Reel-related components
│ └── search/ # Search components
├── pages/ # Page components
├── redux/ # Redux state management
│ ├── actions/ # Action creators
│ ├── actionTypes/ # Action type constants
│ ├── reducers/ # Reducers
│ ├── store.js # Redux store
│ └── rootReducer.js # Root reducer
├── utils/ # Utility functions
│ ├── constants.js # App constants
│ └── cloudinary.js # Cloudinary integration
├── App.jsx # Main App component
├── main.jsx # Entry point
└── index.css # Global styles

text

## 🔧 Configuration

### API Integration

The app uses axios interceptors for:

- Automatic JWT token attachment
- 401 error handling with auto-logout
- Request/response logging
- Network error handling

### State Management

Redux store manages:

- Authentication state
- Posts data
- Reels data
- Categories data
- Loading states
- Error handling

### Styling

- Tailwind CSS v4+ with Vite plugin integration
- Mobile-first responsive design
- Custom component styling with clsx
- Dark mode ready (can be extended)

## 📱 Mobile Features

- **Bottom Navigation**: Mobile-optimized navigation
- **Touch Gestures**: Swipe support for reels
- **Responsive Design**: Adapts to all screen sizes
- **Performance Optimized**: Skeleton loaders and lazy loading

## 🔒 Security Features

- JWT token-based authentication
- Automatic session management
- Protected routes
- Input validation and sanitization
- File type and size validation
- XSS protection through proper escaping

## 🚨 Error Handling

- Global error boundaries
- Toast notifications for user feedback
- Network error detection
- Graceful fallbacks for missing data
- Loading states for all async operations

## 🎨 UI/UX Features

- **Loading States**: Skeleton loaders for better perceived performance
- **Empty States**: Meaningful messages when no content is available
- **Error States**: User-friendly error messages
- **Toast Notifications**: Real-time feedback for user actions
- **Modal System**: Consistent modal behavior
- **Form Validation**: Real-time input validation

## 🔄 API Endpoints

The application integrates with the following API endpoints:

### Authentication

- `POST /auth/login` - User login
- `GET /user/profile` - Get user profile

### Posts

- `GET /User/Post/getAllPublicPosts` - Get public posts
- `POST /admin/Post/createPost` - Create new post (admin)
- `PUT /admin/Post/updatePost/:id` - Update post (admin)
- `DELETE /admin/Post/deletePost/:id` - Delete post (admin)

### Comments

- `POST /user/Comment/addComment` - Add comment
- `GET /user/Comment/getComments/:postId` - Get post comments

### Reels

- `GET /User/Reel/getAllPublicReels` - Get public reels
- `POST /admin/Reel/createReel` - Create new reel (admin)
- `PUT /admin/Reel/updateReel/:id` - Update reel (admin)
- `DELETE /admin/Reel/deleteReel/:id` - Delete reel (admin)

### Categories

- `GET /user/getAllCategory` - Get all categories
- `POST /admin/Category/createCategory` - Create category (admin)
- `PUT /admin/Category/updateCategory/:id` - Update category (admin)
- `DELETE /admin/Category/deleteCategory/:id` - Delete category (admin)

### Search

- `GET /User/search?searchQuery=` - Search posts and users

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**

   - Ensure all variables start with `VITE_`
   - Restart development server after adding new variables

2. **Cloudinary Upload Fails**

   - Verify cloud name and upload preset
   - Check if upload preset is set to "unsigned"
   - Ensure file size is under limit (10MB)

3. **API Connection Issues**

   - Verify backend server is running
   - Check API URL in environment variables
   - Ensure CORS is configured on backend

4. **Authentication Issues**
   - Clear localStorage and login again
   - Check if JWT token is valid
   - Verify backend token validation

## 📈 Performance Optimization

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Cloudinary auto-optimization
- **Bundle Size**: Optimized with Vite bundling
- **Caching**: Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built by **Amaan Sayyed** - A full-stack developer passionate about creating modern web applications.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first styling approach
- Cloudinary for media management
- All open-source contributors

---

**NexClip** - Share your moments, discover amazing content, and connect with the world! 🌟
