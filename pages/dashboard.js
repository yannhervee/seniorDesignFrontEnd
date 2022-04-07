
import LeftNav from '../components/LeftNav';
import Header from '../components/Header';
import ContentDashboard from '../components/ContentDashboard';
import withUser from '../components/withUser';

const Dashboard = () => {

    
    return(
        <>
       
        
        <LeftNav />
        
        <Header />
        <ContentDashboard />
        
        </>
    )
}



export default withUser(Dashboard);
