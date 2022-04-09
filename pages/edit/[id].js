
import LeftNav from '../../components/LeftNav';


import ContentEditPost from '../../components/ContentEditPost';
import withUser from '../../components/withUser';

const EditPost = () => {

    
    return(
        <> 
       
        
        <LeftNav />
        <ContentEditPost />
       
        
        </>
    )
}

export default withUser(EditPost);