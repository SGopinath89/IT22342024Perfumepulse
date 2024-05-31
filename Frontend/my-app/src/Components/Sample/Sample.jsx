import sample_image from '../Assests/sample_image.png'
import { SearchBar } from '../SearchBar/SearchBar'
import './Sample.css'

const Sample=()=>{
    return (
        <div className='sample'> 

            <div className='sample-left'>

                <div className='sample-moto'>
                        <p><i>"Uncover Your Fragrance Journey"</i></p>
                </div>
            </div>
            <div className='sample-right'>
                <img src={sample_image} alt=""/>

            </div>
            
        </div>

)
}

export default Sample






