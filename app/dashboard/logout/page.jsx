import {SignOutButton}from'@clerk/nextjs';

const LogoutPage=()=>{
  return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <SignOutButton>
        <button style={{padding:'10px 20px',fontSize:'16px',backgroundColor:'#0070f3',color:'#fff',border:'none',borderRadius:'5px',cursor:'pointer'}}>
            Log out
        </button>
      </SignOutButton>
    </div>
  );
};

export default LogoutPage;
