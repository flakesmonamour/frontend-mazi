import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useState } from 'react';

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState('Donate to an Organization');
  const [hasSubmittedMembership, setHasSubmittedMembership] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownSelect = (item) => {
    setSelectedDropdownItem(item);
    setDropdownOpen(false);
  };

  const renderRoleLinks = () => {
    if (user?.role === 'admin') {
      return (
        <>
          <Link to="/review-applications" className="text-gray-600 hover:text-gray-900">
            Review Applications
          </Link>
          <Link to="/impact" className="text-gray-600 hover:text-gray-900">Impact</Link>
        </>
      );
    } else if (user?.role === 'organization') {
      return (
        <>
          <Link to="/organization-profile" className="text-gray-600 hover:text-gray-900">
            Organization Profile
          </Link>
          <Link to="/manage-donations" className="text-gray-600 hover:text-gray-900">
            Manage Donations
          </Link>
          <Link to="/post-story" className="text-gray-600 hover:text-gray-900">
            Post a Story
          </Link>
          <Link to="/beneficiary-list" className="text-gray-600 hover:text-gray-900">
            Beneficiaries & Inventory
          </Link>
        </>
      );
    } else {
      return (
        <>
          <div className="relative">
            <button onClick={toggleDropdown} className="text-gray-600 hover:text-gray-900">
              {selectedDropdownItem}
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                <Link
                  to="/donate"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleDropdownSelect('Donate to an Organization')}
                >
                  {!hasSubmittedMembership ? 'Donate to an Organization' : 'View Organization'}
                </Link>
                <Link
                  to="/organization-profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleDropdownSelect('Organization Profile')}
                >
                  Organization Profile
                </Link>
                <Link
                  to="/post-story"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleDropdownSelect('Post a Story')}
                >
                  Post a Story
                </Link>
                <Link
                  to="/beneficiary-list"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleDropdownSelect('Beneficiaries & Inventory')}
                >
                  Beneficiaries & Inventory
                </Link>
              </div>
            )}
          </div>
          <Link to="/impact" className="text-gray-600 hover:text-gray-900">Impact</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
        </>
      );
    }
  };

  // Render the navbar only if the user is authenticated
  if (!isAuthenticated) {
    return null; // Or you could return <Link to="/login">Sign In</Link> if you want a minimal option
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-green-600 text-xl font-semibold">🌿 EcoGuard</span>
          </Link>
          <div className="flex items-center space-x-4">
            {renderRoleLinks()}
            <>
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Sign Out
              </button>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
