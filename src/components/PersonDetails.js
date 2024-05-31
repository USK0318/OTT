import React, { useEffect, useState } from 'react';
import { fetchPersonDetails } from '../api/tmdb';

const PersonDetails = ({ id }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPersonDetails = async () => {
      try {
        const personData = await fetchPersonDetails(id);
        setPerson(personData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching person details:', error);
        setError(error);
        setLoading(false);
      }
    };

    getPersonDetails();
  }, [id]);

  if (loading) return <p>Loading person details...</p>;
  if (error) return <p>Error fetching person details: {error.message}</p>;

  return (
    <div className="person-details">
      {person && (
        <>
          <h2>{person.name}</h2>
          <div className="person-info">
            <img
              src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
              alt={person.name}
            />
            <div className="person-bio">
              <h3>Biography</h3>
              <p>{person.biography}</p>
              <h3>Details</h3>
              <p><strong>Birthday:</strong> {person.birthday}</p>
              <p><strong>Place of Birth:</strong> {person.place_of_birth}</p>
              {person.deathday && <p><strong>Deathday:</strong> {person.deathday}</p>}
              <p><strong>Known For:</strong> {person.known_for_department}</p>
            </div>
          </div>
        </>
      )}
      <style jsx>{`
        .person-details {
          margin-top: 30px;
          padding: 0 20px;
        }

        .person-details h2 {
          font-size: 24px;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        .person-info {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .person-info img {
          width: 300px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .person-bio {
          flex-grow: 1;
        }

        .person-bio h3 {
          font-size: 20px;
          color: #333;
          margin: 10px 0;
        }

        .person-bio p {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default PersonDetails;
