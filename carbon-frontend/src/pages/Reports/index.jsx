import React, { useState, useEffect } from 'react';
import { Page, Navbar, NavTitle, Preloader, Block, BlockTitle, Row, Col, List, ListItem,  Link, Card,
    CardContent,
    CardFooter,
    f7} from 'framework7-react';
import { getSummary } from '../../actions/reports';
//import ReviewItem from '../../components/Reports/ReviewItem';
//import RatingProgress from '../../components/Reports/RatingProgress';
import TopSoldItems from '../../components/Reports/TopSoldItems';


const Reports = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        reviews: {
          rating_progress: [],
          data: [],
        },
        summary: {},
        top_sold_items: [],
      });
    
      useEffect(() => {
        getSummary().then(({ data }) => {
          setData(data);
        });
      }, []);

  return (
  <Page>
    <Navbar title="Analisi"></Navbar>
    <Row>
        <Col width="50">
          <BlockTitle>Ordini</BlockTitle>
          <Card outline>
            <CardContent padding={false}>
              <List noChevron={true}>
                <ListItem title="Totale delivery" link="#" after={data.summary.total_delivery ? data.summary.total_delivery : '-'}></ListItem>
                <ListItem title="Totale pickup" link="#" after={data.summary.total_pickup ? data.summary.total_pickup : '-'}></ListItem>
                <ListItem title="Totale ordini oggi" link="#" after={data.summary.total_count}></ListItem>
              </List>
            </CardContent>
          </Card>
        </Col>
        <Col width="50">
          <BlockTitle>Guadagni</BlockTitle>
          <Card outline> 
            <CardContent padding={false}>
              <List noChevron={true}>
                  <ListItem title="Totale contanti" link="#" after={data.summary.total_cash ? data.summary.total_cash : '-'}></ListItem>
                  <ListItem title="Totale digitale" link="#" after={data.summary.total_card ? data.summary.total_card : '-'}></ListItem>
                  <ListItem title="Totale guadagni oggi" link="#" after={data.summary.total_earns}></ListItem>
                </List>
            </CardContent>
          </Card>
        </Col>
      </Row>
    <Row>
    <Col width="100">
    <BlockTitle>Piatti più venduti</BlockTitle>
        <TopSoldItems data={data.top_sold_items} />
        </Col>
    </Row>
  </Page>
);
}

export default Reports;
