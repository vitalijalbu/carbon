import React, { useState, useEffect } from 'react';
import { Page, Navbar, Preloader } from 'framework7-react';


const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [data, setItems] = useState([]);

  useEffect(() => {
    getAvailabilities()
      .then(({ data }) => {
        setItems(data ? data : []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
  <Page>
    <Navbar title="Recensioni" title="Recensioni"></Navbar>
    {loading ? (
          <Preloader/>
        ) : (
          <>
            {data.map((section) => (
              <SectionList data={section} key={section.id} />
            ))}
          </>
        )}
  </Page>
);
}

export default Reviews;
