import React from 'react'
import './mainheader.css'
const MainHeader = ({title}) => {
  return (
    <> 
        <main className = "dashboard-main-header bg-slate-800">
            <section className = "dashboard-section-header">
                <div className="dashboard-header-container">
                    <h2 className = "dashboard-header-container-title text-xl font-bold text-neutral-100">
                        {title}
                    </h2>
                </div>
            </section>
        </main>
    </>
  )
}

export default MainHeader