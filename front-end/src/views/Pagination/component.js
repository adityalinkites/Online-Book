import React, { useState } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // You can perform your data fetching or other actions here based on the new page
    console.log("Fetching data for page:", page);
  }

  return (
    <div>
      <h1>Page Content</h1>
      
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={50} // Total number of items/pages
        pageSize={10} // Number of items per page
      />
    </div>
  );
}

export default PaginationComponent;
