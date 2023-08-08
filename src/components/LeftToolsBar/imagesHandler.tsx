import search from "../../assets/icons/search.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { onAddImg } from "../../utils/helpers/canvasFuncs";
import { Loader } from "../Loader";
import CanvasesContext from "../../contexts/CanvasesContext";
import { IPhoto } from "../../utils/types";



export const ImagesHandler = () => {
  const { canvas } = useContext(CanvasesContext);
  const PER_PAGE = 12;
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");


  useEffect(() => {
    setLoading(true);
    setPhotos([]);
    setPage(1);
    const delay = setTimeout(() => {
      fetchPhotos(searchQuery);
    },1000)
    return () => clearTimeout(delay);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      fetchPhotos(searchQuery);
    },1000)
    return () => clearTimeout(delay);
  }, [page]);

  useEffect(() => {
    const currentLoaderRef = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }
    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [searchQuery]);

  const fetchPhotos = (query: string) => {
    let endpoint = query
        if(query.trim() === ""){
            endpoint = `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${page}`;
        }else{
          endpoint = `https://api.pexels.com/v1/search?query=${query}&per_page=${PER_PAGE}&page=${page}`
        }

    fetch(endpoint, {
      headers: {
        Authorization: process.env.REACT_APP_PEXELS_KEY ?? "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        setPhotos((prevPhotos) =>  [...prevPhotos, ...data.photos]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (

    <div className="images-handler">

      <div className="unsplash-images">
        <h4>Pick from library</h4>
        <div className="search">
          <img src={search} alt="search" />
          <input
            type={"text"}
            placeholder="Search for picture (Pexels)"
            onChange={handleSearch}
          />
        </div>
        <ul className="gallery" style={{ height: "82vh", overflowY: "auto" }}>
          {photos.filter((tag, index, array) => array.findIndex(t => t.id === tag.id && t.photographer === tag.photographer) === index).map((photo) => (
            <li key={photo.id} 
              onClick={() => onAddImg(canvas!, photo.src.original)}
              > 
              <img
                key={photo.id}
                src={photo.src.medium}
                alt={photo.photographer}
              
              />
            </li>
          ))}
          <li style={{
            background:'transparent',
            cursor:'default'
          }}><div ref={loaderRef}>{loading && <Loader/>}</div></li>
        </ul>
      </div>
    </div>

  );
};
