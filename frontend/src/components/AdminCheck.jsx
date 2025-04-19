import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AdminCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Ensure the token is refreshed
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
      setIsLoading(false); // Stop loading after auth state changes
    });

    // Cleanup function to unsubscribe from auth state changes
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Provide feedback during loading
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
