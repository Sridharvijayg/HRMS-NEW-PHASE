import React from 'react';
import { Pagination } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import "../styles/Page.css";

const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return (
      <a className="page-start">
        <ArrowLeftOutlined />
        <span>Previous</span> 
      </a>
    );
  }
  if (type === 'next') {
    return (
      <a className="page-end">
        <span>Next</span> {/* Text will be hidden on mobile screens */}
        <ArrowRightOutlined />
      </a>
    );
  }
  return originalElement;
};

const Page = () => (
  <div className="pagination-wrapper">
    <Pagination total={500} itemRender={itemRender} />
  </div>
);

export default Page;
