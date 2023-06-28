import React, { useState } from 'react'
import data from './FloorsMapData'
import ImageMapper from 'reactjs-img-mapper'

const ImageMap = (props) => {
    const [hoveredArea, setHoveredArea] = useState(null)

    const handleMouseEnter = (area, evt) => {
        const { clientX, clientY } = evt
        setHoveredArea({ ...area, clientX, clientY })
        props.setCurrentIndex(prevIndex => (prevIndex + 1) % data.length)
    }

    const handleMouseLeave = () => {
        setHoveredArea(null)
    }

    return (
        <>
            <div className="relative">
                <ImageMapper
                    src={props.item && props.item.imgUrl}
                    map={props.map}
                    responsive={true}
                    currentIndex={props.currentIndex}
                    parentWidth={window.innerWidth * 0.8}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                {hoveredArea && (
                    <div
                        style={{
                            width: "100%",
                            padding: '5px',
                            fontWeight: 'bold',
                            textAlign: "center",
                            zIndex: "99",
                            position: 'absolute',
                            background:
                                hoveredArea.preFillColor || 'rgba(0, 0, 0, 0.7)',
                            color: hoveredArea.fillColor || 'white',
                        }}
                    >
                        {hoveredArea.name}
                    </div>
                )}
            </div>
        </>
    )

}

export default ImageMap