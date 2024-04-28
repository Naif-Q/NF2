import React, { useState } from 'react';
import "./democourse.scss"; // Assuming this stylesheet contains all your styles

const DemoCourse = () => {
  // State for search terms
  const [searchTermQuizzes, setSearchTermQuizzes] = useState('');
  const [searchTermSummaries, setSearchTermSummaries] = useState('');
  const [searchTermFlashcards, setSearchTermFlashcards] = useState('');

  // State for form visibility
  const [showAddFormQuizzes, setShowAddFormQuizzes] = useState(false);
  const [showAddFormSummaries, setShowAddFormSummaries] = useState(false);
  const [showAddFormFlashcards, setShowAddFormFlashcards] = useState(false);

  // State for form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formDetail, setFormDetail] = useState('');

  // Dummy data for quizzes, summaries, and flashcards
  const quizzesData = [
    { id: 1, title: 'Quiz 1', questions: 10 },
    // ... more quizzes
  ];
  const summariesData = [
    { id: 1, title: 'Summary 1', pages: 5 },
    // ... more summaries
  ];
  const flashcardsData = [
    { id: 1, title: 'Flashcard Set 1', cards: 20 },
    // ... more flashcards
  ];

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    // Logic to handle form submission based on the type (Quizzes, Summaries, or Flashcards)
    console.log(`Adding new ${type}: Title: ${formTitle}, Detail: ${formDetail}`);
    // Reset form fields after submission
    setFormTitle('');
    setFormDetail('');
    if(type === "Quiz") setShowAddFormQuizzes(false);
    else if(type === "Summary") setShowAddFormSummaries(false);
    else if(type === "Flashcard") setShowAddFormFlashcards(false);
  };

  interface TableComponentProps {
    title: string;
    data: Array<{
      id: number;
      title: string;
      questions?: number;
      pages?: number;
      cards?: number;
    }>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    showAddForm: boolean;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const TableComponent: React.FC<TableComponentProps> = ({ title, data, searchTerm, setSearchTerm, showAddForm, setShowAddForm }) => {
    // Form type derived from title for submission logic
    const formType = title; // "Quizzes" -> "Quiz", etc.

    return (
      <>
        <div className="courses-header">
          <h2>{title}</h2>
          <div className="courses-toolbar">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={`${title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">Search</button>
            </div>
            <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>+</button>
          </div>
        </div>

        {showAddForm && (
          <div className="add-course-form">
            <form onSubmit={(e) => handleSubmit(e, formType)}>
              <div className="form-field">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="detail">{formType} Detail:</label>
                <input
                  type="number"
                  id="detail"
                  value={formDetail}
                  onChange={(e) => setFormDetail(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Add {formType}</button>
            </form>
          </div>
        )}

        <div className="courses-table-container">
          <table className="courses-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                <tr key={item.id} style={{cursor: 'pointer'}}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.questions || item.pages || item.cards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="courses-container">
      <h1 className="courses-title">Demo Course Page</h1>
      {/* Quizzes TableComponent */}
      <TableComponent
        title="Quiz"
        data={quizzesData}
        searchTerm={searchTermQuizzes}
        setSearchTerm={setSearchTermQuizzes}
        showAddForm={showAddFormQuizzes}
        setShowAddForm={setShowAddFormQuizzes}
      />
      {/* Summaries TableComponent */}
      <TableComponent
        title="Summary"
        data={summariesData}
        searchTerm={searchTermSummaries}
        setSearchTerm={setSearchTermSummaries}
        showAddForm={showAddFormSummaries}
        setShowAddForm={setShowAddFormSummaries}
      />
      {/* Flashcards TableComponent */}
      <TableComponent
        title="Flashcard"
        data={flashcardsData}
        searchTerm={searchTermFlashcards}
        setSearchTerm={setSearchTermFlashcards}
        showAddForm={showAddFormFlashcards}
        setShowAddForm={setShowAddFormFlashcards}
      />
    </div>
  );
};

export default DemoCourse;
