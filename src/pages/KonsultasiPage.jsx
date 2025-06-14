// src/pages/KonsultasiPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../api/axios.js';

const KonsultasiPage = () => {
  // Ambil data pengguna dari localStorage, bukan dari Context
  const currentUser = JSON.parse(localStorage.getItem('auth_user')); 
  
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messageListRef = useRef(null);

  // Fungsi untuk scroll ke pesan paling bawah
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  // useEffect untuk memulai sesi
  useEffect(() => {
    // Pastikan ada pengguna yang login sebelum memulai sesi
    if (!currentUser) {
        setLoading(false);
        return;
    }

    const startSession = async () => {
      try {
        const response = await apiClient.post('/consultations');
        setSession(response.data);
      } catch (error) {
        console.error("Gagal memulai sesi:", error);
        alert("Tidak dapat memulai sesi konsultasi. Pastikan ada admin yang tersedia.");
        setLoading(false);
      }
    };
    startSession();
  }, [currentUser]); // Bergantung pada currentUser

  // useEffect untuk mengambil pesan secara berkala (polling)
  useEffect(() => {
    if (!session) return;

    const fetchMessages = async () => {
      try {
        const response = await apiClient.get(`/consultations/${session.id}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Gagal mengambil pesan:", error);
      } finally {
        if(loading) setLoading(false);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [session, loading]);

  // Auto-scroll saat ada pesan baru
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !session) return;

    const tempMessage = newMessage;
    setNewMessage('');

    try {
      const response = await apiClient.post(`/consultations/${session.id}/messages`, {
        message: tempMessage,
      });
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Gagal mengirim pesan.");
      setNewMessage(tempMessage);
    }
  };
  
  // Tampilkan pesan jika belum login
  if (!currentUser) {
      return <div className="container"><h2>Silakan login untuk memulai sesi konsultasi.</h2></div>;
  }

  if (loading) {
    return <div className="container"><h2>Mencari konsultan dan memulai sesi...</h2></div>;
  }

  if (!session && !loading) {
      return <div className="container"><h2>Tidak dapat memulai sesi konsultasi. Mohon coba lagi nanti.</h2></div>;
  }

  return (
    <div className="container">
      <h1>Konsultasi dengan Apoteker</h1>
      <div className="chat-container">
        <div className="message-list" ref={messageListRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender_id === currentUser.id ? 'sent' : 'received'}`}>
              <div className="message-bubble">
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="message-input-form" onSubmit={handleSendMessage}>
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Ketik pesan Anda..." />
          <button type="submit">Kirim</button>
        </form>
      </div>
    </div>
  );
};

export default KonsultasiPage;