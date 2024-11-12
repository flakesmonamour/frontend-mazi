import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostStoryPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [organization, setOrganization] = useState('');
  const [status, setStatus] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;

  // Fetch stories function
  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/stories?organization=${organization}&page=${currentPage}&limit=${storiesPerPage}`);
      if (Array.isArray(response.data)) {
        setStories(response.data);
      } else {
        console.error('Expected an array, but received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      setStatus('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stories when the component mounts or currentPage changes
  useEffect(() => {
    if (organization) fetchStories();
  }, [organization, currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/stories', {
        title,
        content,
        image_url: imageUrl,
        organization,
      });
      setStatus('Story posted successfully!');
      setTitle('');
      setContent('');
      setImageUrl('');
      fetchStories(); // Reload stories after posting a new one
    } catch (error) {
      setStatus('Error posting story');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-500 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Post a Story</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Organization Name</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              placeholder="Enter your organization name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter story title"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Enter story content"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="6"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Image URL (Optional)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold text-lg rounded-md hover:bg-green-700 transition duration-200"
          >
            Post Story
          </button>
        </form>

        {status && <p className="mt-4 text-center text-green-600 font-semibold">{status}</p>}

        <h3 className="text-2xl font-bold text-center text-green-700 mt-12 mb-6">Posted Stories</h3>

        {loading ? (
          <p className="text-center text-gray-600">Loading stories...</p>
        ) : (
          <div className="space-y-6">
            {stories.length === 0 ? (
              <p className="text-center text-gray-600">No stories available for this organization.</p>
            ) : (
              stories.map((story) => (
                <div key={story.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 space-y-4">
                  <h4 className="text-xl font-semibold text-green-600">{story.title}</h4>
                  <p className="text-gray-500">by {story.organization}</p>
                  <p className="text-gray-700">{story.content}</p>
                  {story.image_url && (
                    <img
                      src={story.image_url}
                      alt={story.title}
                      className="w-full h-auto mt-4 rounded-md shadow-md"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostStoryPage;
