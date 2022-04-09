
import LeftNav from '../components/LeftNav';


import ContentPostQuestion from '../components/ContentPostQuestion';
import withUser from '../components/withUser';

const Postquestion = () => {

    
    return(
        <> 
       
        
        <LeftNav />
        <ContentPostQuestion />
       
        
        </>
    )
}


export default withUser(Postquestion);
