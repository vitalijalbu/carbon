import React from "react";
import {
  Page,
  Block,
  BlockTitle,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  List,
  ListItem,
  Icon
} from "framework7-react";


const Navigation = [
  {
    id: 'account',
    title: 'Account',
    links: [
      {
        exact: true,
        label: 'Il mio account',
        url: '/settings/account',
        icon: 'person_crop_circle'
      },
      {
        exact: true,
        label: 'Piano',
        url: '/settings/billing',
        icon: 'money_euro_circle'
      },
      {
        exact: false,
        label: 'Il mio ristorante',
        url: '/settings/listings',
        icon: 'compass'
      },
      {
        exact: false,
        label: 'Zone di consegna',
        url: '/settings/areas',
        icon: 'skew'
      },
    ],
  },
  {
    id: 'general',
    title: 'Generale',
    links: [
      {
        label: 'Hardware',
        url: '/settings/hardware',
        icon: 'printer'
      },
    ],
  },
  {
    id: 'other',
    title: 'Altro',
    links: [
      {
        label: 'Assistenza',
        url: '/settings/support',
        icon: 'question_circle'
      },
      {
        label: 'Feedback',
        url: 'mailto:partner@ceebo.com?subject=Feedback Ceebo Partner',
        external: true,
        icon: 'exclamationmark_circle'
      }
    ]
  }
];


const Settings = () => (
  <Page>
    <Navbar title="Impostazioni">
    </Navbar>
    {Navigation.map((nav, i) => (
      <>
        <BlockTitle key={i}>{nav.title}</BlockTitle>
            <List id={nav.id} key={i}>
              {nav.links.map((link, l) =>
                link.external === true ? (
                  <ListItem title={link.label} href="#" onClick={link.onClick} key={l}>
                   <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                ) : link.action ? (
                  <ListItem title={link.label} href={link.url} key={l}>
                    <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                ) : (
                  <ListItem title={link.label} href={link.url} key={l}>
                    <Icon slot="media" f7={link.icon}></Icon>
                  </ListItem>
                )
              )}
            </List>
            </>
      ))}
      <BlockTitle>Disconnetti</BlockTitle>
                <List>
                  <ListItem title="Logout" href="#">
                   <Icon slot="media" f7="bars"></Icon>
                  </ListItem>
            </List>
  </Page>
);

export default Settings;
