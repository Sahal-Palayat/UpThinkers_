import React from 'react'

function Head() {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          
          <a href='/'>
            <div className='logo'>
            <h1 style={{ color: "white" }}>Easy Education Himatnagar</h1>
              <span style={{ color: "white" }}>UNITY | EXCELLENCE | SUCCESS</span>
            </div>
          </a>

          <div className='social'>

            <a href='https://m.facebook.com/story.php?story_fbid=122340196948376&id=105714251944304&locale2=hi_IN&_rdr'>
              <i className='fab fa-facebook-f icon'></i>
            </a>

            <a href='https://www.linkedin.com/in/easy-education-himatnagar-8a8245259/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in'>
              <i className='fab fa-linkedin icon'></i>
            </a>

            <a href='https://twitter.com/ezeducation'>
              <i className='fab fa-twitter icon'></i>
            </a>
            
            <a href='https://www.youtube.com/channel/UC0LiN6hry9BEAWYZZ5byfzg'>
              <i className='fab fa-youtube icon'></i>
            </a>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default Head
