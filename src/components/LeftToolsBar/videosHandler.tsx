import { useEffect, useRef, useState } from "react";
import search from "../../assets/icons/search.svg";
import { Loader } from "../Loader";
import { IVideo } from "../../utils/types";





const VideosHandler = () => {

    const loaderRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [page, setPage] = useState<number>(1);



    useEffect(() => {
      setLoading(true);
      setVideos([]);
      setPage(1);
      const delay = setTimeout(() => {
        fetchVideos(searchQuery);
      },1000)
      return () => clearTimeout(delay);
    }, [searchQuery]);
  
    useEffect(() => {
      setLoading(true);
      const delay = setTimeout(() => {
        fetchVideos(searchQuery);
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



    const handleSearch = (event: any) => {
        event.preventDefault();
        const query = event.target.value;
        setSearchQuery(query);
      };


      const fetchVideos = async (query:string) => {
        let endpoint:string = '';
        if(!query){
            endpoint = `https://api.pexels.com/videos/popular?per_page=${6}&page=${page}`
        }else{
            endpoint =`https://api.pexels.com/videos/search?query=${query}&per_page=10&page=${page}`
        }
        await fetch(
            endpoint,
            {
              headers: {
                Authorization: process.env.REACT_APP_PEXELS_KEY ?? '',
              },
            }
          ).then((res) => res.json()).then((data) => {
              setVideos((prevVideos) => [...prevVideos, ...data.videos])
          }
          )
          
          .catch((err) => console.log(err));
        };
    

      const handleVideoClick = (id: number) => {
        const videoElement = document.getElementById(`video-${id}`) as HTMLVideoElement;
        if (videoElement) {
            videoElement.play();
        }
      };
    
    return(
      <div className="images-handler">

      <div className="unsplash-images">
        <h4>Pick from library</h4>
        <div className="search">
          <img src={search} alt="search" />
          <input
            type={"text"}
            placeholder="Search for videos (Pexels)"
            onChange={handleSearch}
          />
        </div>
        <ul className="gallery" style={{ height: "82vh", overflowY: "auto" }}>
        {videos.filter((tag, index, array) => array.findIndex(t => t.id === tag.id && t.video_files[0].id === tag.video_files[0].id) === index).map((video) => (
            <li key={video.id}
                onClick={() => handleVideoClick(video.id)}
              >
                <img src={video.image} alt=""/>
              {/* <video
                src={video.video_files[1].link}
                // autoPlay
                muted
                id={`video-${video.id}`}
              /> */}
            </li>
          ))}
          <div ref={loaderRef}>{loading && <Loader/>}</div>
        </ul>
      </div>
    </div>
    )
}

export default VideosHandler;