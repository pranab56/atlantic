
import React from 'react';
import Link from 'next/link';

const TeamProfile = ({ name, title, imageUrl, linkedinUrl, twitterUrl, instagramUrl }) => {
  return (
    <div className="w-full bg-black text-white overflow-hidden shadow-lg rounded-md">
      {/* Profile Image */}
      <div className="relative h-72 w-full">
        <img 
          src={imageUrl} 
          alt={`${name} profile`} 
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      {/* Text Content */}
      <div className="p-5 bg-black">
        <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
        <p className="text-amber-500 font-medium mb-4">{title}</p>
        
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          {linkedinUrl && (
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <div className="border border-gray-600 p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
            </Link>
          )}
          
          {twitterUrl && (
            <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <div className="border border-gray-600 p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </div>
            </Link>
          )}
          
          {instagramUrl && (
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <div className="border border-gray-600 p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
