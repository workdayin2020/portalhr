import { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Coins, Package, Search, Eye, Lock, AlertCircle, Plus, Minus, Clock, Mail, Phone, MapPin } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import { useSelector } from 'react-redux';
import axios from "axios";

// Temporary dummy data (replace with actual data fetching later)
const dummyData = {
  subscriptions: {},
  jobSeekers: [],
  viewedProfiles: new Set(),
};

const EmployerDashboard = () => {
  const { user1 } = useSelector(store => store.auth);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showTokenPurchase, setShowTokenPurchase] = useState(false);
  const [customTokens, setCustomTokens] = useState(1);
  const [paymentFormData, setPaymentFormData] = useState({
    packageId: null,
    paymentMethod: "",
    amount: 0,
    transactionId: "",
    tokensCount: 50,
  });
  const [subscription, setSubscription] = useState([]);
  const [JobSeekerUsers, setJobSeekerUsers] = useState([]);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [viewedProfiles, setViewedProfiles] = useState(new Set(dummyData.viewedProfiles));
  const [filteredJobSeekers, setFilteredJobSeekers] = useState([]); // To store filtered job seekers

  // Assuming employer ID 1
  const mySubscriptions = dummyData.subscriptions;
  const currentSubscription = mySubscriptions;
  const hasAvailableTokens = mySubscriptions.tokensAvailable > 0;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/getJobSeekerUsers`);
        let currentUserDetails = await axios.get(`${USER_API_END_POINT}/getCurrentUser`, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });
        if (currentUserDetails.data.success) {
          currentUserDetails = currentUserDetails.data.user;
        }
        if (res.data.success) {
          const users = res.data.user;

          // Map the API response to the dummyData structure
          const updatedJobSeekers = users.map((user) => ({
            id: user._id,
            title: user.fullname, // Assuming fullname is the title
            experienceYears: 0, // You can update this if you have experience data
            skills: user.profile.skills,
            summary: "No summary available", // You can update this if you have a summary
            email: user.email,
            phone: user.phoneNumber,
            location: user.addressdetails?.city || "Unknown", // Use city as location
          }));
          console.log(currentUserDetails);
          // Update subscriptions based on the user's subscription data
          const updatedSubscriptions = {
            id: currentUserDetails._id,
            employerId: 1, // Assuming employer ID 1
            tokensAvailable: currentUserDetails.subscription.tokensAvailable,
            tokensConsumed: currentUserDetails.subscription.tokensConsumed,
            paymentStatus: "approved", // Assuming all are approved
          };

          // Update dummyData
          dummyData.jobSeekers = updatedJobSeekers;
          dummyData.subscriptions = updatedSubscriptions;

          // Update state
          setJobSeekerUsers(updatedJobSeekers);
          setSubscription(updatedSubscriptions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleGetTokens = () => {
    setShowTokenPurchase(true);
  };

  const handlePackageSelection = () => {
    setSelectedPackage("custom");
  };

  const handlePurchase = () => {
    setPaymentFormData({
      ...paymentFormData,
      packageId: "custom",
      amount: customTokens * 50,
      tokensCount: customTokens,
    });
    setShowTokenPurchase(false);
    setShowQRCode(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    alert("Payment submitted for admin approval! You will receive an email confirmation once approved.");
    setShowPaymentForm(false);
    setShowQRCode(false);
    setSelectedPackage(null);
    setCustomTokens(1);
    setPendingApproval(true);
    console.log(paymentFormData);
    try {
      const res = await axios.post(`${USER_API_END_POINT}/payment`, paymentFormData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProfile = async (jobSeekerId) => {
    if (!hasAvailableTokens) {
      if (window.confirm("You need tokens to view contact details. Would you like to purchase tokens?")) {
        setShowTokenPurchase(true);
      }
      return;
    }

    if (viewedProfiles.has(jobSeekerId)) {
      alert("You have already viewed this profile.");
      return;
    }
    const body ={
    }
    try {
      // Make an API call to deduct the token
      const res = await axios.post(`${USER_API_END_POINT}/deductToken`,body,{
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Update the local state to reflect the token deduction
        const updatedSubscription = {
          ...currentSubscription,
          tokensAvailable: currentSubscription.tokensAvailable - 1,
          tokensConsumed: currentSubscription.tokensConsumed + 1,
        };

        // Update the viewed profiles
        setViewedProfiles(new Set(viewedProfiles).add(jobSeekerId));

        // Update the subscription in the dummyData
        // const updatedSubscriptions = dummyData.subscriptions.map((sub) =>
        //   sub.id === updatedSubscription.id ? updatedSubscription : sub
        // );
        dummyData.subscriptions = updatedSubscription;

        // Update the state
        setSubscription(updatedSubscription);

        alert("Contact details unlocked! One token has been deducted from your balance.");
      } else {
        alert("Failed to deduct token. Please try again.");
      }
    } catch (error) {
      console.error("Error deducting token:", error);
      alert("An error occurred while deducting the token. Please try again.");
    }
  };

  useEffect(() => {
    // Filter the job seekers whenever the search query changes
    const filtered = JobSeekerUsers.filter((seeker) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        seeker.title?.toLowerCase().includes(searchLower) ||
        seeker.skills.some((skill) => skill?.toLowerCase().includes(searchLower)) ||
        seeker.location.toLowerCase().includes(searchLower)
      );
    });
    setFilteredJobSeekers(filtered); // Set filtered job seekers
  }, [searchQuery, JobSeekerUsers]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Subscription Status */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">My Subscription</h2>
              <button
                onClick={handleGetTokens}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Buy Tokens
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <Coins className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Available Tokens</p>
                    <p className="text-2xl font-semibold text-indigo-600">
                      {mySubscriptions.tokensAvailable || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Consumed Tokens</p>
                    <p className="text-2xl font-semibold text-indigo-600">{mySubscriptions.tokensConsumed || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            {pendingApproval && (
              <div className="col-span-2 mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                  <p className="text-sm text-yellow-700">
                    Your token purchase is pending approval. You'll receive an email notification once approved.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Seeker Search */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium mb-4">Search Job Seekers</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by skills, title, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {filteredJobSeekers.map((seeker) => {
                const isViewed = viewedProfiles.has(seeker.id);
                return (
                  <div key={seeker.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{seeker.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{seeker.experienceYears} years experience</p>
                      </div>
                      {isViewed ? (
                        <Eye className="h-5 w-5 text-green-500" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    <p className="mt-3 text-sm text-gray-600">{seeker.summary}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {seeker.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {seeker.location}
                    </div>

                    {isViewed ? (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{seeker.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{seeker.phone}</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleViewProfile(seeker.id)}
                        disabled={!hasAvailableTokens}
                        className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                          hasAvailableTokens ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {hasAvailableTokens ? "View Contact Details (1 Token)" : "No Tokens Available"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Token Purchase Modal */}
        {showTokenPurchase && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Purchase Tokens</h3>
                <button onClick={() => setShowTokenPurchase(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <AlertCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {/* Custom Token Package */}
                  <div className="border rounded-lg p-4 cursor-pointer transition-all border-indigo-600 bg-indigo-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">Custom Package</h4>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => setCustomTokens(Math.max(1, customTokens - 1))}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="mx-2 text-lg font-medium">{customTokens}</span>
                          <button
                            onClick={() => setCustomTokens(customTokens + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-indigo-600">₹{customTokens * 50}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowTokenPurchase(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePurchase}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Scan QR Code to Pay</h3>
                <button onClick={() => setShowQRCode(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <AlertCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <img src="/src/assets/Gpay.jpg" alt="QR Code" className="h-48 w-48" />
                <p className="text-sm text-gray-500 text-center">
                  Scan this QR code using your preferred UPI app to complete the payment. Once payment is complete,
                  click the button below to submit your payment details.
                </p>
                <button
                  onClick={() => {
                    setShowQRCode(false);
                    setShowPaymentForm(true);
                  }}
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Enter Payment Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Complete Payment</h3>
                <button onClick={() => setShowPaymentForm(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <AlertCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {/* Custom Token Package */}
                  <div className="border rounded-lg p-4 cursor-pointer transition-all border-indigo-600 bg-indigo-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">Custom Package</h4>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => setCustomTokens(Math.max(1, customTokens - 1))}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="mx-2 text-lg font-medium">{customTokens}</span>
                          <button
                            onClick={() => setCustomTokens(customTokens + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-indigo-600">₹{customTokens * 50}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowTokenPurchase(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePurchase}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Scan QR Code to Pay</h3>
                <button onClick={() => setShowQRCode(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <AlertCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <img src="/src/assets/Gpay.jpg" alt="QR Code" className="h-48 w-48" />
                <p className="text-sm text-gray-500 text-center">
                  Scan this QR code using your preferred UPI app to complete the payment. Once payment is complete,
                  click the button below to submit your payment details.
                </p>
                <button
                  onClick={() => {
                    setShowQRCode(false)
                    setShowPaymentForm(true)
                  }}
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Enter Payment Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Complete Payment</h3>
                <button onClick={() => setShowPaymentForm(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <AlertCircle className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    required
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={paymentFormData.paymentMethod}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        paymentMethod: e.target.value,
                      })
                    }
                  >
                    <option value="">Select UPI Method</option>
                    <option value="google_pay">Google Pay</option>
                    <option value="phone_pe">PhonePe</option>
                    <option value="paytm">Paytm</option>
                    <option value="other_upi">Other UPI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid (₹)</label>
                  <input
                    type="number"
                    required
                    readOnly
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                    value={paymentFormData.amount}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UPI Transaction ID</label>
                  <input
                    type="text"
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={paymentFormData.transactionId}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        transactionId: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submit Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;