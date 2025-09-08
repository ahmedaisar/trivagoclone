
import React from 'react';
import Link from 'next/link';
import { HeartIcon, EyeIcon, UserCircleIcon, MenuIcon } from '@heroicons/react/outline';

const Header = () => {
  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            trivago
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <EyeIcon className="h-6 w-6" />
              <span>Recently viewed</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <HeartIcon className="h-6 w-6" />
              <span>Favourites</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <UserCircleIcon className="h-6 w-6" />
            <span>Log in</span>
          </Link>
          <button className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <MenuIcon className="h-6 w-6" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
