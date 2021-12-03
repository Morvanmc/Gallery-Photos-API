import React, { useReducer, useRef } from "react";

import { useFetch, useInfiniteScroll, useLazyLoading } from '../services/hooks';
import './Album.scss';
import { FcCompactCamera } from 'react-icons/fc';

function Album(props) {
    const query = props.query;

    const imgReducer = (state, action) => {
        switch (action.type) {
            case 'STACK_IMAGES':
                console.log(state)
                return { ...state, images: state.images.concat(action.images) }
            case 'STACK_CLEAN':
                return { images: [] }
            case 'FETCHING_IMAGES':
                return { ...state, fetching: action.fetching }
            default:
                return state;
        }
    }
    const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true });

    const pageReducer = (state, action) => {
        switch (action.type) {
            case 'ADVANCE_PAGE':
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }
    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 });


    let bottomBoundaryRef = useRef(null);
    useFetch(pager, imgDispatch, query);
    useLazyLoading('photo', imgData.images);
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

    return (
        <main>
            <div className="gallery">
                {imgData.images.map((image, i) => {
                    return (
                        <div className="gallery-photo">
                            <img key={i} className="photo" src={image.src.large} alt={image.url} />
                            <div className="info-photo">
                                <FcCompactCamera size={20} />
                                <a href={image.photographer_url} target="_blank" rel="noreferrer">
                                    <span className="name-photographer">{image.photographer}</span>
                                </a>
                            </div>
                        </div>
                    )
                })}
                <span id="page-bottom-boundary" ref={bottomBoundaryRef}></span>
            </div>
        </main>
    )
};

export default Album;