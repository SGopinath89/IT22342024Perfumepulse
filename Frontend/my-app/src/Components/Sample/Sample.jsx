import React from 'react'
import './Sample.css'
import sample_image from '../Assests/sample_image.png'
import { SearchBar } from '../SearchBar/SearchBar'
import Typical from 'react-typical'

const Sample = () => {
  return (
    <div className='sample'>
      
        <div className="sample-left">
           
           <div className="sample-moto">
           <p style={{ fontSize: '80px'}}>
              <Typical
                steps={[
                  'Uncover Your Fragrance Journey', 1000
                ]}
                loop={1}
                wrapper="span"
              />
            </p>
           </div>
        </div>
        <div className="sample-right">
            <img src={sample_image} alt="Sample" />
        </div>
    </div>
  )
}

export default Sample
