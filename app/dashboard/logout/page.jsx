import {SignOutButton} from '@clerk/nextjs';

const LogoutPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '80vh',
        backgroundImage: 'url("/logout.jpeg")', // Assuming logout.jpg is in the public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SignOutButton>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px', // Add spacing from the bottom
          }}
        >
          Log out
        </button>
      </SignOutButton>
    </div>
  );
};

export default LogoutPage;
