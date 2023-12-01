import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import PageNotFound from "./Pages/PageNotFound";
// import Applayout from "./Pages/Applayout";
// import Login from "./Pages/Login";
import CityList from "./components/CityList";
import Form from "./components/Form";
import Countrieslist from "./components/Countrieslist";
import { CitiesProvider } from "./Contexts/CitiesContext";
import City from "./components/City";
import {AuthProvider} from './Contexts/FakeAuthContext';
import ProtectedRoute from "./Pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";


// dist/index.html                   0.46 kB │ gzip:   0.30 kB
// dist/assets/index-tYQU-ARR.css   31.76 kB │ gzip:   5.27 kB
// dist/assets/index-vuH-dkqL.js   533.18 kB │ gzip: 150.83 kB


const Homepage=lazy(()=>import('./Pages/Homepage'))
const Pricing=lazy(()=>import('./Pages/Pricing'))
const Product=lazy(()=>import('./Pages/Product'))
const PageNotFound =lazy(()=>import('./Pages/PageNotFound'))
const Login=lazy(()=>import('./Pages/Login'))
const Applayout=lazy(()=>import('./Pages/Applayout'))


function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
       <Suspense fallback={<SpinnerFullPage/>}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
         
          <Route path="/app" element={
            <ProtectedRoute>
          <Applayout/>
          </ProtectedRoute>
      }>
            {/* <Route index element={<CityList cities={cities} isloading={isloading}/>}/> */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<Countrieslist />} />
            
            <Route path="form" element={<Form />} />
            
          </Route>
          
        </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>

  );
}

export default App;
