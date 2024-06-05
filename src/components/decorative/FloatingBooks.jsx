import React from 'react';

const FloatingBooks = () => (
  <div className="absolute inset-0 w-full h-full z-10">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <foreignObject x="3%" y="58%" width="80" height="120" className='book' enableBackground="true" color='#1E3A8A' fill="#1E3A8A">
        <div className="bg-[#28479b] h-[120px] rounded-lg flex items-center">
            <div className='w-1 absolute ml-2 py-12 bg-white'/>
        </div>
      </foreignObject>
      <foreignObject x="1%" y="20%" width="80" height="120" className='book' enableBackground="true" color='#1E3A8A' fill="#1E3A8A">
        <div className="bg-orange-500 h-[120px] rounded-lg flex items-center">
            <div className='w-1 absolute ml-2 py-12 bg-white'/>
        </div>
      </foreignObject>
      <foreignObject x="88%" y="58%" width="80" height="120" className='book' enableBackground="true" color='#1E3A8A' fill="#1E3A8A">
        <div className="bg-green-500 h-[120px] rounded-lg flex items-center">
            <div className='w-1 absolute ml-2 py-12 bg-white'/>
        </div>
      </foreignObject>
      <foreignObject x="90%" y="20%" width="80" height="120" className='book' enableBackground="true" color='#1E3A8A' fill="#1E3A8A">
        <div className="bg-red-500 h-[120px] rounded-lg flex items-center">
            <div className='w-1 absolute ml-2 py-12 bg-white'/>
        </div>
      </foreignObject>
    </svg>
  </div>
);

export default FloatingBooks;





