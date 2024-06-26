/* eslint-disable react/prop-types */
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow p-8">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <Outlet/>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
