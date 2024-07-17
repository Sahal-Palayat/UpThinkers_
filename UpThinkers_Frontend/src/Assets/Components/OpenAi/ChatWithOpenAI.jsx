import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../../../config';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

const ChatWithOpenAI = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
        setInput('');

        try {
            const result = await axios.post(
                'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
                {
                    inputs: input,  // Format according to Hugging Face API requirements
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.HUGGINGFACE_API_KEY}`,  // Your Hugging Face API key
                    },
                }
            );

            const botMessage = { sender: 'bot', text: result.data.generated_text || 'No response from the model' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching data from Hugging Face:', error);

            if (error.response) {
                const { status, data } = error.response;
                console.error('Response data:', data);

                const errorMessage = status === 429
                    ? 'You have exceeded your API quota. Please try again later.'
                    : `Error: ${data?.error?.message || 'Something went wrong. Please try again.'}`;

                const botMessage = { sender: 'bot', text: errorMessage };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } else {
                const botMessage = { sender: 'bot', text: 'Network error. Please try again.' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Chat with Hugging Face</h1>
                    <div className="flex flex-col space-y-4 mb-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-md ${
                                    message.sender === 'user'
                                        ? 'bg-blue-500 text-white self-end'
                                        : 'bg-gray-200 text-black self-start'
                                }`}
                            >
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleFormSubmit} className="flex space-x-4">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask something..."
                            className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChatWithOpenAI;
