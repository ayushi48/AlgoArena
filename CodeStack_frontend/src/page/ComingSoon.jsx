import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ComingSoon = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-300 to-purple-200 text-gray-800 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-10 text-center border border-indigo-200">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-600 tracking-tight uppercase">
          Coming Soon
        </h1>

        <p className="text-gray-600 mb-8 text-lg md:text-xl leading-relaxed">
          A powerful new feature for practicing code is almost here.
          <br /> Stay tuned — we’re deploying something special! 🚀
        </p>

        {/* Terminal-style preview */}
        <div className="bg-gray-900 rounded-xl text-left p-5 font-mono text-sm text-green-400 leading-relaxed mb-8 shadow-inner border border-green-600">
          <p className="text-green-500">$</p>
          <p>$ git clone future-feature</p>
          <p>$ cd coding-platform</p>
          <p className="animate-pulse">$ building next-gen practice tools...</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            to="/"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 text-center"
          >
            🏠 Back to Home
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink
              to="/adminpage"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300 text-center"
            >
              ⚙️ Admin Panel
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
