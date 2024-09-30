import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms } from '../../slice/programsSlice';
// import { fetchPrograms, addProgram, deleteProgram } from '../../slice/programsSlice'; fordashbord

const ProgramsPage = () => {
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.programs.programs);
  const programStatus = useSelector((state) => state.programs.status);
  const error = useSelector((state) => state.programs.error);

  useEffect(() => {
    if (programStatus === 'idle') {
      dispatch(fetchPrograms());
    }
  }, [programStatus, dispatch]);

  // const handleAddProgram = () => {
  //   const newProgram = {
  //     title: 'New Program',
  //     description: 'Description for new program.',
  //   };
  //   dispatch(addProgram(newProgram));
  // };

  // const handleDeleteProgram = (id) => {
  //   dispatch(deleteProgram(id));
  // };

  let content;

  if (programStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (programStatus === 'succeeded') {
    content = programs.map((program) => (
      <div key={program._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-2xl font-semibold mb-4">{program.title}</h2>
        <p className="text-gray-600">{program.description}</p>
        {/* <button
          onClick={() => handleDeleteProgram(program._id)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete Program
        </button> */}
      </div>
    ));
  } else if (programStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      {/* <h1 className="text-4xl font-bold text-center mb-12">Our Programs</h1>
      <button onClick={handleAddProgram} className="bg-blue-500 text-white px-4 py-2 rounded mb-8">
        Add Program
      </button> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{content}</div>
    </div>
  );
};

export default ProgramsPage;
