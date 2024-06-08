import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/login.tsx'
import Signup from './pages/auth/signup.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider } from './components/landing/theme-provider.tsx'
import Dashboard from './pages/dashboad/dashboard.tsx'
import { Training } from './pages/training/training.tsx'
import Learning from './pages/learning/learning.tsx'
import Battle from './pages/battle/battle.tsx'
import ProtectedRoute from './components/auth/protected-route.tsx'
import DashboardLayout from './components/dashboard/dashboard.tsx'
import TrainingNumber from './pages/training/number/random-number.tsx'
import { TrainingList } from './pages/training/training-list.tsx'
import { Provider } from "react-redux";
import store from "@/redux/store"
import CheckNumber from './pages/training/number/check-number.tsx'
import UserInput from './pages/training/number/user-input.tsx'
import RandomWords from './pages/training/words/random-words.tsx'
import InputWords from './pages/training/words/user-input.tsx'
import CheckWords from './pages/training/words/check-words.tsx'
import RandomFace from './pages/training/face-and-name/random-face.tsx'
import UserInputName from './pages/training/face-and-name/user-input-name.tsx'
import CheckFace from './pages/training/face-and-name/check-face.tsx'
import RandomCard from './pages/training/card/random-card.tsx'
import UserInputCard from './pages/training/card/user-input-card.tsx'
import CheckCard from './pages/training/card/check-card.tsx'
import RandomDate from './pages/training/date/random-date.tsx'
import UserInputDate from './pages/training/date/user-input-date.tsx'
import CheckDate from './pages/training/date/check-date.tsx'
const router = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
  },
  {
    path: `/dashboard`,
    element: <ProtectedRoute children={<Dashboard />}/>,
    children: [
      {
        path: 'home',
        element: <DashboardLayout/>
      },
      {
        path: 'training', 
        element: <Training/>,
        children: [
          {
            index: true,
            element: <Navigate to={'list'}/>
          },
          {
            path: 'list',
            element: <TrainingList/>
          },
          {
            path: 'number',
            element: <Outlet/>,
            children: [
              {
                path: 'read',
                element: <TrainingNumber/>
              },
              {
                path: 'user-input',
                element: <UserInput/>
              },
              {
                path: 'check',
                element: <CheckNumber/>
              }
            ]
          },
          {
            path: 'words',
            element: <Outlet/>,
            children: [
              {
                path: 'read',
                element: <RandomWords/>
              },
              {
                path: 'user-input',
                element: <InputWords/>
              },
              {
                path: 'check',
                element: <CheckWords/>
              },
            ]
          },
          {
            path: 'face',
            element: <Outlet/>,
            children: [
              {
                path: 'read',
                element: <RandomFace/>
              },
              {
                path: 'user-input',
                element: <UserInputName/>
              },
              {
                path: 'check',
                element: <CheckFace/>
              }
            ]
          },
          {
            path: 'card',
            element: <Outlet/>,
            children: [
              {
                path: 'read',
                element: <RandomCard/>
              },
              {
                path: 'user-input',
                element:<UserInputCard/>
              },
              {
                path: 'check',
                element: <CheckCard/>
              }
            ]
          },
          {
            path: 'date',
            element: <Outlet/>,
            children: [
              {
                path: 'read',
                element: <RandomDate/>
              },
              {
                path: 'user-input',
                element:<UserInputDate/>
              },
              {
                path: 'check',
                element: <CheckDate/>
              }
            ]
          }
        ]
      },
      {
        path: 'learning',
        element: <Learning/>
      },
      {
        path: 'battle',
        element: <Battle/>
      }
    ]
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: 'signup',
    element: <Signup/>
  }
])


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <ThemeProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router}/>
      </ClerkProvider>
     </ThemeProvider>
  </Provider>
)
