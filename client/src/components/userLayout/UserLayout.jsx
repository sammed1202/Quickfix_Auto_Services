import React from 'react'; 
import UserHeader from './UserHeader'; 
import { Outlet } from 'react-router-dom'; 
import UserFooter from './UserFooter';
const UserLayout = () => { 
return ( 
<div style={{ display: 'flex', flexDirection: 'column', minHeight: 
'100vh' }}> 
{/* Fixed Header */} 
<div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 
100 }}> 
                <UserHeader /> 
            </div> 
 
            {/* Main Content (Outlet) */} 
            <div style={{ flex: 1, paddingTop: '75px'
}}> 
                <Outlet /> 
               
                 {/* <CustomCursor color="rgb(255, 255, 255)" index='1000' size='40px'/> */}
            </div> 
 
            {/* Fixed Footer */} 
            <div style={{ 
                position: 'float', 
                bottom: 0, 
                width: '100%', 
                zIndex: 100, 
                backgroundColor: 'black', 
                color: 'white' 
            }}> 
 
                <UserFooter /> 
            </div> 
        </div> 
    ); 
}; 
 
export default UserLayout; 
