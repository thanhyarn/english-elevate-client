import React, { useState } from "react";
import axios from "axios";
import { Table, Button, Spin, message } from "antd";

const App = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomVocabularies = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3003/api/vocabulary/get-random",
        {
          count: 10,
        }
      );
      setVocabularies(response.data.data || []);
      message.success("Fetched 10 random vocabularies successfully!");
    } catch (error) {
      message.error("Failed to fetch vocabularies!");
      console.error("Error fetching vocabularies:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "English Word",
      dataIndex: "englishWord",
      key: "englishWord",
      render: (text) => <span className="text-blue-500">{text}</span>,
    },
    {
      title: "Vietnamese Meaning",
      dataIndex: "vietnameseMeaning",
      key: "vietnameseMeaning",
    },
    {
      title: "Part of Speech",
      dataIndex: "partOfSpeech",
      key: "partOfSpeech",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Example Sentence (EN)",
      dataIndex: ["exampleSentence", "english"],
      key: "exampleSentenceEnglish",
    },
    {
      title: "Example Sentence (VN)",
      dataIndex: ["exampleSentence", "vietnamese"],
      key: "exampleSentenceVietnamese",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Random Vocabulary
        </h1>
        <div className="flex justify-center mb-4">
          <Button
            type="primary"
            size="large"
            onClick={fetchRandomVocabularies}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? <Spin size="small" /> : "Get Random Vocabulary"}
          </Button>
        </div>
        <Table
          dataSource={vocabularies}
          columns={columns}
          rowKey="_id"
          pagination={false}
          bordered
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;
