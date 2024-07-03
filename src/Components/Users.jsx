import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search,setSearch] = useState('');
  


    const getUser=async()=>{

       try {
        const response =await fetch('https://api.github.com/users');
        const data =await response.json();
        setUsers(data);
        
       } catch (error) {
        console.log('error fetching data',error);
        
       }
        
    }

  useEffect(()=>{
    getUser();

  },[])

  const clearUsers =()=>{
    setUsers([]);
  }

  const handleDelete =(id)=>{
    const upDateUsers = users.filter(user=> user.id !== id)
    setUsers(upDateUsers);
  }

  const handleSearch =(e)=>{
    setSearch(e.target.value);
  }

  const filteredUsers = users.filter(user => 
    user.login.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div className='bg-orange-300'>
      <div className='container mx-auto'>
        <div className='py-10'>
          <h3 className='text-3xl text-center'>List of GitHub Users</h3>
          <div className='flex justify-center my-7'>
            <input value={search} onChange={handleSearch}className='py-2 w-[500px] border border-black' type="text" placeholder='Search For Users' />
            <button className='py-2 px-3 bg-black text-white'>Search</button>
          </div>
        </div>

        <div className='flex gap-12 flex-wrap justify-center '>
          {filteredUsers.map((user) => (
            <div key={user.id} className='p-4 bg-white w-[700px] flex rounded-2xl'>
              <div className='flex'>
                <div>
                  <img className='h-[200px] w-[200px] object-cover' src={user.avatar_url} alt={user.login} />
                </div>
                <div className='flex flex-col'>
                  <h2 className='text-2xl font-bold px-3'>{user.login}</h2>
                  <p className='pl-10 text-xl font-semibold'>Bio: {user.bio || 'No bio available'}</p>
                  <div className='flex justify-center gap-5 pl-20 py-5 text-xl bg-gray-200 ml-8 pe-8'>
                    <div>
                      <h3>Articles</h3>
                      <p>38</p>
                    </div>
                    <div>
                      <h3>Followers</h3>
                      <p>{user.followers || 'N/A'}</p>
                    </div>
                    <div>
                      <h3>Rating</h3>
                      <p>8.9</p>
                    </div>
                  </div>
                  <div onClick={()=>handleDelete(user.id)} className='flex justify-end'>
                    <MdDelete  className='text-3xl text-end' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 mb-6'>
      <button  onClick ={clearUsers}className='p-3 bg-red-800 ml-[1000px] text-white'>CLear ALL</button>
      </div>
    </div>
  );
};

export default Users;
