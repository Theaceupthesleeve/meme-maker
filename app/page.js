'use client'

import { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [memes, setMemes] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [memeUrl, setMemeUrl] = useState('');

  // Get meme templates from Imgflip
  const fetchTemplates = async () => {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      setMemes(response.data.data.memes);
    } catch (error) {
      console.error('Error fetching memes', error);
    }
  };

  // Create meme using Imgflip API
  const createMeme = async () => {
    if (!selectedTemplate || !topText || !bottomText) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post('https://api.imgflip.com/caption_image', null, {
        params: {
          template_id: selectedTemplate,
          username: 'tfwhospanda',  // Replace with your Imgflip username
          password: 'tfwhospanda',  // Replace with your Imgflip password
          text0: topText,
          text1: bottomText,
        },
      });

      setMemeUrl(response.data.data.url);
    } catch (error) {
      console.error('Error creating meme', error);
    }
  };

  // Load meme templates on page load
  useState(() => {
    fetchTemplates();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Meme Generator</h1>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="meme-template">Choose a template:</label>
        <select
          id="meme-template"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Select a meme</option>
          {memes.map((meme) => (
            <option key={meme.id} value={meme.id}>
              {meme.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="top-text">Top Text:</label>
        <input
          id="top-text"
          type="text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          placeholder="Top Text"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="bottom-text">Bottom Text:</label>
        <input
          id="bottom-text"
          type="text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          placeholder="Bottom Text"
        />
      </div>

      <button onClick={createMeme}>Generate Meme</button>

      {memeUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>Your Meme:</h2>
          <img src={memeUrl} alt="Generated Meme" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
