import { useState } from 'react';
import DonationForm from '../components/DonationForm';

function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState(2500); // default in Ksh
  const [frequency, setFrequency] = useState('monthly');
  const [isMember, setIsMember] = useState(false); // Ensure this is false initially
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    email: '',
    password: '',
  }); // Store form data

  const donationOptions = [
    { amount: 1000, description: 'Plants 20 trees in affected areas' },
    { amount: 2500, description: 'Protects 1 acre of rainforest' },
    { amount: 5000, description: 'Funds water conservation projects' },
    { amount: 10000, description: 'Supports wildlife preservation' },
  ];

  const handleBecomeMember = (e) => {
    e.preventDefault();
    // Basic validation check
    if (formData.fullName && formData.surname && formData.email && formData.password) {
      setIsMember(true); // Only set to true if form data is valid
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-500 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Protect Our Planet's Future
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your recurring donation helps us combat environmental degradation and preserve our planet for future generations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {/* Show the form to become a member if the user is not a member */}
            {!isMember ? (
              <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                  Become a Member
                </h2>
                <form onSubmit={handleBecomeMember} className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Surname"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {donationOptions.map((option) => (
                    <button
                      key={option.amount}
                      onClick={() => setSelectedAmount(option.amount)}
                      className={`p-6 rounded-lg border-2 ${
                        selectedAmount === option.amount
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="text-2xl font-bold text-green-700">Ksh {option.amount}</div>
                      <p className="text-gray-600 mt-2">{option.description}</p>
                    </button>
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Donation Frequency</h3>
                  <div className="flex space-x-4">
                    {['Monthly', 'Quarterly', 'Yearly'].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setFrequency(freq.toLowerCase())}
                        className={`px-6 py-2 rounded-full ${
                          frequency === freq.toLowerCase()
                            ? 'bg-green-600 text-white'
                            : 'border border-gray-300'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donation Form */}
                <DonationForm amount={selectedAmount} frequency={frequency} />
              </>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Why Support Environmental Conservation?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span role="img" aria-label="bell">🔔</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Immediate Action</h3>
                  <p className="text-gray-600">
                    Your support helps us take immediate action against environmental degradation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span role="img" aria-label="shield">🛡️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Transparent Impact</h3>
                  <p className="text-gray-600">
                    Track your contribution's direct impact on environmental projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span role="img" aria-label="globe">🌍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Global Community</h3>
                  <p className="text-gray-600">
                    Join thousands of environmental defenders worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationPage;
