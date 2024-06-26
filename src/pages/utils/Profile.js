const fetchProfile = async () => {
  try {
    const res = await fetch(`${process.env.MIDDLEWARE_API_URL}profile`);
  const data = await res.json();
  return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
  
};

const updateProfile = async (profile) => {
  try {
    const res = await fetch(`${process.env.MIDDLEWARE_API_URL}profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  });
  const data = await res.json();
  return data;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
  
};

export { fetchProfile, updateProfile };
