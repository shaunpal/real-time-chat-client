import React from "react";

const ZoomWindow = ({ img, isOpen }) => {

    return (
        <div style={isOpen? styles.container : styles.noDisplay}>
            {img.includes("data:text/plain") || img.includes("data:application/pdf")? 
            <embed 
                src={img}
                style={{ backgroundColor: "white",height: "100%", width: "80%" }}
            />
            :
            <img
                style={{ objectFit: "contain" }}
                src={img}
                width={"500px"}
                loading={"loading"}
                alt={'img'}
            />
            }
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2e302f',
        zIndex: 5,
        height: "inherit"
    },
    noDisplay: {
        display: "none",
        visibility: "hidden"
    },
    
}

export default ZoomWindow;