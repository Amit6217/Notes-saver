import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Pastes from './components/Pastes'
import ViewPaste from './components/ViewPaste'
import { Analytics } from "@vercel/analytics/react"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div className='min-h-screen w-full max-w-6xl mx-auto px-4 py-8'>
          <Navbar />
          <Home />
        </div>
    },

    {
      path: "/paste",
      element:
        <div className='min-h-screen w-full max-w-6xl mx-auto px-4 py-8'>
          <Navbar />
          <Pastes />
        </div>
    },

    {
      path: "/paste/:id",
      element:
        <div className='min-h-screen w-full max-w-6xl mx-auto px-4 py-8'>
          <Navbar />
          <ViewPaste />
        </div>
    },
  ]
)

function App() {
  return (
    <div className="min-h-screen w-full">
      <RouterProvider router={router} />
      <Analytics/>
    </div>
  )
}

export default App
