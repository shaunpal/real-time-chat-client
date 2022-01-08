export const zoomState = (img) => {
    return {
        type: 'ZOOM',
        img: img,
        show: true
    }
}

export const normState = () => {
    return {
        type: 'NO_ZOOM',
        img: '',
        show: false
    }
}

const IsZoomReducer = (state={ img: '', show: false }, action) => {
    switch(action.type){
        case "ZOOM":
            return { img: action.img, show: action.show };
        case "NO_ZOOM":
            return { img: action.img, show: action.show };
        default:
            return state;
    }
}

export default IsZoomReducer;