import {NextPage} from 'next';
import * as React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <img src="../assets/images/1.png" alt=""/>
      </div>
      <style jsx>{`
        .cover {
          width: 800px;
          height: 800px;
          background: pink;
        }
      `}</style>
    </>
  );
};

export default Home;
