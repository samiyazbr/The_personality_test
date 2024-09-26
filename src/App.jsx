import UserForm from "./components/UserForm.jsx";
import Header from "./components/Header.jsx";
import { UserProvider } from "./components/UserContext.jsx";
import Question from './components/Question.jsx';
import Results from "./components/Result.jsx";
import {Routes, Route } from "react-router-dom";
import './App.css'
import { useState,useEffect } from "react";

export default function App() {

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    // Continue mapping all your possible options to a keyword
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  const API_KEY = "1HIgdyC53YAkOVQx4odrI3GvMyuc0a26ccvLyIoSIyzach26WOorA4tT";

  function fetchArtwork(element) {
    const url = `https://api.pexels.com/v1/search?query=${element}&per_page=1`;
  
    fetch(url, {
      headers: {
        Authorization: API_KEY, // Include your Pexels API key in the request header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.photos && data.photos.length > 0) {
          const photo = data.photos[0]; // Get the first photo from the result
          setArtwork({
            title: photo.alt, // Use the alt text as the title
            primaryImage: photo.src.large, // URL for the image
            artistDisplayName: photo.photographer, // Photographer's name
            objectDate: "N/A", // Pexels doesn't provide object date
          });
        } else {
          setArtwork(null); // If no photos are found
        }
      })
      .catch((error) => {
        console.error("Error fetching artwork:", error);
        setArtwork(null); // Handle any errors
      });
  }  

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <>
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
      </UserProvider>
    </>
  )
}