const fetchLinks = async () => {
    try {
      const res = await fetch(`${process.env.MIDDLEWARE_API_URL}links`);
    const data = await res.json();
    return data;
    } catch (error) {
      console.error('Error fetching links:', error);
    }
    
  };

export {fetchLinks};