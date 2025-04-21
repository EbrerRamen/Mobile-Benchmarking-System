import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AdminCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
    
          const tokenResult = await user.getIdTokenResult();
          console.log("Custom Claims:", tokenResult.claims);

          if (tokenResult.claims.admin) {
            setIsAdmin(true);
            console.log("✅ You are an admin!");
          } else {
            setIsAdmin(false);
            console.log("❌ You are NOT an admin.");
          }
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
      setIsLoading(false); 
    });

 
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h1>Admin Check</h1>
      {isAdmin ? (
        <p>✅ You are an admin!</p>
      ) : (
        <p>❌ You are NOT an admin.</p>
      )}
    </div>
  );
};

export default AdminCheck;
