import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';

function OrganizationProfileForm() {
  const [status, setStatus] = useState('pending');
  const [organization, setOrganization] = useState(null); // State to store the organization info

  // Fetch the organization data when the component mounts
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.get('/api/organization'); // Update this to your actual endpoint
        setOrganization(response.data); // Set the fetched organization data
        setStatus(response.data.status); // Set status from fetched data
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    fetchOrganization();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: organization ? organization.name : '',
      description: organization ? organization.description : '',
      userId: '', // Assuming you have the user ID from the authentication state
    },
    enableReinitialize: true, // Reinitialize form values if organization changes
    validationSchema: Yup.object({
      name: Yup.string().required('Organization name is required'),
      description: Yup.string().required('Description is required'),
      userId: Yup.string().required('User ID is required'), // Assume you capture user ID
    }),
    onSubmit: async (values) => {
      try {
        // POST or PUT request to save/update the organization
        const response = await axios.post('/api/organization', values); // Update this to your actual endpoint
        setOrganization(response.data); // Update state with submitted data
        console.log('Organization updated successfully:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  // Function to delete the organization
  const handleDelete = async () => {
    if (organization) {
      try {
        await axios.delete(`/api/organization/${organization.id}`); // Update this to your actual endpoint
        setOrganization(null); // Clear organization data from state
        console.log('Organization deleted successfully');
      } catch (error) {
        console.error('Error deleting organization:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-500 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">Create/Update Organization Profile</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Organization Name</label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              {...formik.getFieldProps('description')}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.description}</div>
            )}
          </div>

          <div>
            <label htmlFor="userId" className="block text-lg font-medium text-gray-700">User ID</label>
            <input
              id="userId"
              type="text"
              {...formik.getFieldProps('userId')}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {formik.touched.userId && formik.errors.userId && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.userId}</div>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">Organization Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold text-lg rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit Organization Profile
          </button>
        </form>

        {/* Display Organization Info if it exists */}
        {organization && (
          <div className="mt-12 bg-green-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-green-700">Organization Profile</h3>
            <p><strong className="font-medium text-gray-800">Name:</strong> {organization.name}</p>
            <p><strong className="font-medium text-gray-800">Description:</strong> {organization.description}</p>
            <p><strong className="font-medium text-gray-800">User ID:</strong> {organization.userId}</p>
            <p><strong className="font-medium text-gray-800">Status:</strong> {organization.status}</p>

            <button
              onClick={handleDelete}
              className="mt-6 w-full py-3 bg-red-600 text-white font-semibold text-lg rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Organization
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizationProfileForm;
