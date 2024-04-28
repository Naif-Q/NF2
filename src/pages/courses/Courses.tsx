import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./courses.scss";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [students, setStudents] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch courses with cookies for session authentication
        const response = await axios.get('https://gp-ooo8.onrender.com/courses', {
          withCredentials: true  // Ensures cookies are sent with the request
        });
        console.log('response', response);
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCourseClick = () => {
    setShowAddForm(!showAddForm);
  };

  const navigateToCoursePage = (courseId) => {
    history(`/courses/${courseId}`);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post a new course with cookies for session authentication
      const response = await axios.post('https://gp-ooo8.onrender.com/courses', {
        name: courseName,
        instructor: instructor,
        students: parseInt(students, 10)
      }, {
        withCredentials: true  // Ensures cookies are sent with the request
      });
      setCourses([...courses, response.data]);  // Assuming the API returns the added course
      setCourseName('');
      setInstructor('');
      setStudents('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses: {error.message}</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1 className="courses-title">List of Courses</h1>
        <div className="courses-toolbar">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">Search</button>
          </div>
          <button className="add-btn" onClick={handleAddCourseClick}>+</button>
        </div>
      </div>
      {showAddForm && (
        <form className="add-course-form" onSubmit={handleFormSubmit}>
          {/* Form fields */}
        </form>
      )}
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {courses.filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
              <tr key={course.id} onClick={() => navigateToCoursePage(course.id)} style={{cursor: 'pointer'}}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.instructor}</td>
                <td>{course.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
