import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";



import { MyProvider } from "./Contexts/MoviesContext";
import { MyProvider2 } from "./Contexts/UserSideMoviesContex";

import Login from "./Pages/Login/Login";

//Admin
import HomePage from './Pages/Admin/Home';
import UserPage from './Pages/Admin/User';
import TheatrePage from './Pages/Admin/Theatre';
import MailPage from './Pages/Admin/Mail';
import MoviesPage from './Pages/Admin/Movies';

//theatre
import Theatredashboard from './Components/Theatre/theatredashboard/theatredashboard'
import TMovies from './Pages/Theatre/Movies';
import TSchedule from "./Components/Theatre/Schedule/TSchedule";
import Usertheatreinfo from './Components/Theatre/About Theatre/usertheatreinfo'
import TSnacks from "./Pages/Theatre/Snacks";
import ProfilePage from "./Pages/Theatre/ProfilePage"


//user
import UserProfilePage from "./Pages/UserProfile/UserProfile";
import UserProfileEditPage from './Pages/UserProfile/UserProfileEdit';
import SnacksPage from "./Pages/Snacks/SnacksPage";
import Register from "./Pages/Register/Register";
import Home from './Pages/Home/Home';
import Movies from "./Pages/Movies/Movies";
import IndividualPage from './Pages/IndividualMoviePage/Individual';
import Timings from './Pages/Timing/Timing'
import SeatArrangementPage from "./Pages/SeatArrangement/SeatArrangement";
import RecentBookings from "./Pages/RecentBooking/RecentBooking";
import ReviewPage from "./Pages/Review/ReviewPage";
import ContactUsPage from "./Pages/ContactUs/ContactUsPage";
import UserViewTheatreProfile from "./Pages/UserViewTheatreProfile/UserViewTheatreProfile";

import NewsPage from "./Components/News/MovieNews"
import Aboutus from "./Components/AboutUs/AboutUs"
import LandingPage from "./Components/LandingPage/LandingPage";
import TheatreReview from "./Components/Review/TheatreReview";
import Error from "./Components/Error/Error";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <LandingPage/>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/Admin",
    element: <HomePage />
  },
  {
    path: "/Admin/MoviesPage",
    element: <MoviesPage />
  },
  {
    path: "/Admin/UserPage",
    element: <UserPage />
  },
  {
    path: "/Admin/TheatrePage",
    element: <TheatrePage />
  },
  {
    path: "/Admin/MailPage",
    element: <MailPage />
    // <MailPage />
  },


  //theatre routes


  {
    path: "Theatre/Theatredashboard",
    element: <Theatredashboard />
  },
  {
    path: "Theatre/MoviesPage",
    element: <TMovies />
  },
  {
    path: "Theatre/TSchedule",
    element: <TSchedule />
  },
  {
    path: "Theatre/Usertheatreinfo",
    element: <Usertheatreinfo />
  },

  {
    path: "Theatre/Snacks",
    element: <TSnacks/>
  },
  {
    path: "Theatre/Profile",
    element:<ProfilePage/>

  },


  //User Routes

  {
    path: "User/HomePage",
    element: <Home />
  },
  {
    path: "User/MoviesPage",
    element: <Movies />
  },
  {
    path: "User/SnacksPage",
    element: <SnacksPage />
  },
  {
    path: "User/IndividualPage",
    element: <IndividualPage />
  },
  {
    path: "User/Timings",
    element: <Timings />
  },
  {
    path: "User/SeatArrangementPage",
    element: <SeatArrangementPage />
  },
  {
    path: "User/RecentBookings",
    element: <RecentBookings />
  },

  {
    path: "User/Profile",
    element: <UserProfilePage/>
  },

  {
    path: "User/EditProfile",
    element: <UserProfileEditPage/>
  },

  {
    path: "User/MovieReview",
    element: <ReviewPage/>
  },
  {
    path: "User/News",
    element: <NewsPage/>
  }
  ,{
    path:"User/Aboutus",
    element:<Aboutus/>
  },

  {
    path:"User/Contactus",
    element:<ContactUsPage/>
  },

  {
    path:"User/ViewTheatreProfile",
    element:<UserViewTheatreProfile/>
  },

  {
    path:"User/Treview",
    element:<TheatreReview/>
  },
  {
    path:"User/Registor",
    element:<Register type="user"/>
  
  },
  {
    path:"Theatre/Registor",
    element:<Register type="theatre"/>
  },


  {
    path:"*",
    element:<Error/>
  }



]);

function App() {
  return (
    <>
      <MyProvider>
        <MyProvider2>
          <RouterProvider router={router} />
        </MyProvider2>
      </MyProvider>
    </>
  );
}

export default App;
