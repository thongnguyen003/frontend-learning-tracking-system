import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-[#f5f7fa] min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 border-b border-purple-400 border-[3px] pb-2 mb-4">
          <Link to='/student' aria-label="Back" className="text-black text-xl">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1 className="text-black text-lg font-normal select-none">PNV26A</h1>
        </header>
        
        <main className="flex flex-col lg:flex-row gap-6">
          {/* Left side */}
          <section className="flex flex-col gap-6 lg:w-1/2">
            {/* Teachers block */}
            <div className="bg-white rounded-md shadow-md p-4">
              <h2 className="text-black font-semibold text-base mb-3 select-none">
                Teachers: <span>4</span>
              </h2>
              <ul className="space-y-3">
                {/* Example Teacher Row */}
                {[...Array(4)].map((_, index) => (
                  <li key={index} className="flex items-center justify-between bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-md px-3 py-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-black select-none">{index + 1}</span>
                      <span className="text-sm text-black select-none">Hồ Văn Hiệp</span>
                      <img
                        alt="Avatar"
                        className="w-6 h-6 rounded-full object-cover"
                        src="https://storage.googleapis.com/a1aa/image/f74ed75d-e174-43d6-201e-c033a8421d2d.jpg"
                      />
                    </div>
                    <button className="bg-green-500 text-white text-xs font-semibold rounded-md px-3 py-1 select-none" type="button">
                      Info
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* IT English cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Example Card */}
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-3">
                  <h3 className="text-green-600 font-semibold text-sm select-none">IT English</h3>
                  <p className="text-xs text-black select-none">By: Phan Thi Teacher</p>
                  <p className="text-xs text-black select-none">Start date: 21-04-2025</p>
                  <p className="text-xs text-black select-none">Class size: 21</p>
                </div>
              ))}
            </div>
          </section>

          {/* Right side */}
          <section className="lg:w-1/2 bg-white rounded-md shadow-md p-4">
            <h2 className="text-black font-semibold text-base mb-3 select-none">
              Students: <span>21</span>
            </h2>
            <ul className="space-y-3">
              {/* Example Student Row */}
              {[...Array(21)].map((_, index) => (
                <li key={index} className="flex items-center justify-between bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-md px-3 py-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-black select-none">{index + 1}</span>
                    <span className="text-sm text-black select-none">Hồ Văn Hiệp</span>
                    <img
                      alt="Avatar"
                      className="w-6 h-6 rounded-full object-cover"
                      src="https://storage.googleapis.com/a1aa/image/f74ed75d-e174-43d6-201e-c033a8421d2d.jpg"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white text-xs font-semibold rounded-md px-3 py-1 select-none" type="button">
                      Info
                    </button>
                    <button className="bg-green-500 text-white text-xs font-semibold rounded-md px-3 py-1 select-none" type="button">
                      LG
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;