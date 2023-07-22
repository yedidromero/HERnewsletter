import { useContext } from 'react';
import { DataContext } from './Front';

export default function RecordedData() {
  // Obtenemos los datos del contexto
  const { data } = useContext(DataContext);

  return (
    <div>
      <h1>Recorded Data</h1>
      {data.length === 0 ? (
        <p>No recorded data available.</p>
      ) : (
        data.map((item, index) => (
          <div key={index}>
            <h2>Data {index + 1}</h2>
            <p>Email: {item.email}</p>
            <p>Name: {item.name}</p>
            <p>Occupation: {item.occupation}</p>
            <p>Categories: {item.category}</p>
            <p>Searching for: {item.searchingFor}</p>
            <p>Region: {item.region}</p>
            <p>Age: {item.age}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
