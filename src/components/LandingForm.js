import React, { useState, useEffect } from 'react';

const LandingForm = () => {
  const [formData, setFormData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchLandingData();
  }, []);

  const fetchLandingData = async () => {
    const baseUrl = 'http://localhost:5000';
    try {
      const response = await fetch(`${baseUrl}/api/landing`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data.formData);
      } else {
        console.error('Error fetching landing data');
      }
    } catch (error) {
      console.error('Error fetching landing data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = 'http://localhost:5000';
    try {
      const response = await fetch(`${baseUrl}/api/landing`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData([...formData, data.formData]);
        setTitle('');
        setContent('');
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="landing-page">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            {/* Profile Info */}
            <div className="profile-info">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile Picture"
                className="profile-picture"
              />
              <h2>John Doe</h2>
              <p>Bio: Web Developer</p>
            </div>
          </div>
          <div className="col-md-8">
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>

            {/* Posts */}
            <div className="posts">
              {formData.map((item, index) => (
                <div className="post" key={index}>
                  <p>Title: {item.title}</p>
                  <p>Content: {item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingForm;
