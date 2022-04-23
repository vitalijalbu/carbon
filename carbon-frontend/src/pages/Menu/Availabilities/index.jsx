import React, { useState, useEffect } from 'react';
import { Page, Navbar, NavTitle, Preloader } from 'framework7-react';
import { getAvailabilities } from '../../../actions/items';
import SectionList from '../../../components/Menu/Availabilities/SectionList';

const Availabilities = () => {
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
      <Navbar title="Disponibilità"></Navbar>
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

export default Availabilities;
