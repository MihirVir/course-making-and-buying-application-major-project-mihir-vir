import React from 'react'
import './mainheader.css'
const MainHeader = ({title}) => {
  return (
    <> 
        <main>
            <div className="dashboard-information-container">
                <div className="dashboard-aligner-container">
                    <section>
                        <h4 className = "dashboard-section-title">{title}</h4>
                    </section>
                </div>
            </div>
        </main>
    
    </>
  )
}

export default MainHeader