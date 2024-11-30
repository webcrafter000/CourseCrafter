import { SignOutButton } from '@clerk/nextjs';

const LogoutPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh', // Keeps the overall height of the container
        backgroundImage: 'url("/logout.jpeg")', // Background image
        backgroundSize: 'contain', // Adjust image to fit within bounds
        backgroundRepeat: 'no-repeat', // Avoid image tiling
        backgroundPosition: 'center top', // Position the image
        paddingTop: '60%', // Adjusts vertical spacing for image height
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
            marginBottom: '20px', // Spacing from the bottom
          }}
        >
          Log out
        </button>
      </SignOutButton>
    </div>
  );
};

export default LogoutPage;
