import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

  export default function PaginationControlled(props) {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
      props.onChange(value);
    };
    

  return (
    <Stack spacing={2}>
      <Pagination count={props.count} defaultPage={1} siblingCount={1} onChange={handleChange} onClick={props.onClick}/>
    </Stack>
  );
}