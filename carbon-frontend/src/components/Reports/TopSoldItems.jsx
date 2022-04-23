import React from 'react';
import {
  Card,
  CardContent,
  Block,
  List,
  ListItem
} from "framework7-react";

const TopSoldItems = ({ data }) => {
  if (!data.length) return (<Block strong className="empty-state">Non ci sono dati da mostrare</Block>);

  return (
      <Card outline>
            <CardContent padding={false}>
              <List noChevron={true}>
              {data.map((item, i) => (
                <ListItem key={i} title={item.name} link="#" after={item.tot_sold}/>
                ))}
              </List>
            </CardContent>
          </Card>
  );
};

export default TopSoldItems;
