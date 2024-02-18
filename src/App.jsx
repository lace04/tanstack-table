import Table from './components/Table';
import data from './data.json';

function HomePage() {
  const columns = [
    {
      header: 'Id',
      accessorKey: 'id',
      // footer: 'My id',
    },
    {
      header: 'Name',
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
    },
    {
      header: 'IP Address',
      accessorKey: 'ip_address',
    },
  ];

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
}

export default HomePage;
