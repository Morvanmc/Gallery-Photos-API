import { useEffect, useCallback, useRef } from 'react';

export const useFetch = (data, dispatch, query) => {
  useEffect(() => {
    if (!query) {
      dispatch({ type: 'FETCHING_IMAGES', fetching: true })
      fetch(`https://api.pexels.com/v1/curated?page=${data.page}&per_page=15`, {
        headers: {
          Authorization: '563492ad6f9170000100000180b20cfc905943b88466006888bb88f8'
        }
      })
        .then(response => response.json())
        .then(res => res.photos)
        .then(images => {
          dispatch({ type: 'STACK_IMAGES', images })
          dispatch({ type: 'FETCHING_IMAGES', fetching: false })
        })
        .catch(e => {
          dispatch({ type: 'FETCHING_IMAGES', fetching: false })
          return e
        })
    } else {
      dispatch({ type: 'FETCHING_IMAGES', fetching: true })
      fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=80`, {
        headers: {
          Authorization: '563492ad6f9170000100000180b20cfc905943b88466006888bb88f8'
        }
      })
        .then(response => response.json())
        .then(res => res.photos)
        .then(images => {
          dispatch({ type: 'STACK_CLEAN' })
          dispatch({ type: 'STACK_IMAGES', images })
          dispatch({ type: 'FETCHING_IMAGES', fetching: false })
        })
        .catch(e => {
          dispatch({ type: 'FETCHING_IMAGES', fetching: false })
          return e
        })
    }
  }, [dispatch, data.page, query]);
};

export const useInfiniteScroll = (scrollRef, dispatch) => {
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};

export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback(node => {
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;

          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    })
    intObs.observe(node);
  }, []);
  const imagesRef = useRef(null);
  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);
    if (imagesRef.current) {
      imagesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items])
};