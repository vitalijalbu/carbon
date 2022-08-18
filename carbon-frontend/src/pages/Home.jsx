import React from 'react';
import { Button, Link, TimePicker, TimePickerSelect, SelectItem } from '@carbon/react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';


const Home = () => {

  return(
<div className="cds--grid">
      <div className="cds--row">
      <Table
  size="lg"
>
  <TableHead>
    <TableRow>
      <TableHeader>
        Name
      </TableHeader>
      <TableHeader>
        Rule
      </TableHeader>
      <TableHeader>
        Status
      </TableHeader>
      <TableHeader>
        Other
      </TableHeader>
      <TableHeader>
        Example
      </TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        Load Balancer 1
      </TableCell>
      <TableCell>
        Round robin
      </TableCell>
      <TableCell>
        Starting
      </TableCell>
      <TableCell>
        Test
      </TableCell>
      <TableCell>
        22
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Load Balancer 2
      </TableCell>
      <TableCell>
        DNS delegation
      </TableCell>
      <TableCell>
        Active
      </TableCell>
      <TableCell>
        Test
      </TableCell>
      <TableCell>
        22
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Load Balancer 3
      </TableCell>
      <TableCell>
        Round robin
      </TableCell>
      <TableCell>
        Disabled
      </TableCell>
      <TableCell>
        Test
      </TableCell>
      <TableCell>
        22
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Load Balancer 4
      </TableCell>
      <TableCell>
        Round robin
      </TableCell>
      <TableCell>
        Disabled
      </TableCell>
      <TableCell>
        Test
      </TableCell>
      <TableCell>
        22
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Load Balancer 5
      </TableCell>
      <TableCell>
        Round robin
      </TableCell>
      <TableCell>
        Disabled
      </TableCell>
      <TableCell>
        Test
      </TableCell>
      <TableCell>
        22
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Load Balancer 6
      </TableCell>
      <TableCell>
        Round robin
      </TableCell>
      <TableCell>
        Disabled
      </TableCell>
      <TableCell>
        Test
      </TableCell>
      <TableCell>
        22
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        Load Balancer 7
      </TableCell>
      <TableCell>
        Round robin
      </TableCell>
      <TableCell>
        Disabled
      </TableCell>
      <TableCell>
        Test
      </TableCell>
      <TableCell>
        22
      </TableCell>
    </TableRow>
  </TableBody>
</Table>

<DataTable
  headers={[
    {
      header: 'Name',
      key: 'name'
    },
    {
      header: 'Protocol',
      key: 'protocol'
    },
    {
      header: 'Port',
      key: 'port'
    },
    {
      header: 'Rule',
      key: 'rule'
    },
    {
      header: 'Attached groups',
      key: 'attached_groups'
    },
    {
      header: 'Status',
      key: 'status'
    }
  ]}
  rows={[
    {
      attached_groups: 'Kevin’s VM Groups',
      id: 'a',
      name: 'Load Balancer 3',
      port: 3000,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link disabled>Disabled</Link>
    },
    {
      attached_groups: 'Maureen’s VM Groups',
      id: 'b',
      name: 'Load Balancer 1',
      port: 443,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link>Starting</Link>
    },
    {
      attached_groups: 'Andrew’s VM Groups',
      id: 'c',
      name: 'Load Balancer 2',
      port: 80,
      protocol: 'HTTP',
      rule: 'DNS delegation',
      status: <Link>Active</Link>
    },
    {
      attached_groups: 'Marc’s VM Groups',
      id: 'd',
      name: 'Load Balancer 6',
      port: 3000,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link disabled>Disabled</Link>
    },
    {
      attached_groups: 'Mel’s VM Groups',
      id: 'e',
      name: 'Load Balancer 4',
      port: 443,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link>Starting</Link>
    },
    {
      attached_groups: 'Ronja’s VM Groups',
      id: 'f',
      name: 'Load Balancer 5',
      port: 80,
      protocol: 'HTTP',
      rule: 'DNS delegation',
      status: <Link>Active</Link>
    }
  ]}
/>



</div>
</div>
)
};
export default Home;