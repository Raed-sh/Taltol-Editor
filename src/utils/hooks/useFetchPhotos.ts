import { useCallback, useState } from "react";

interface Photo {
    id: number;
    src: {
      medium: string;
      large2x:string;
      large:string;
      landscape:string;
      original:string;
      portrait:string;
    };
    photographer: string;
  }
  
  interface FetchPhotosOptions {
    query?: string;
    page?: number;
    perPage?: number;
  }
  
  const API_KEY = '9ozcKwuxKDYGMzaCfNyQgZRq7cIUN3mLFs3KyOvTZbwKjUle3ldhcvof';
  
 const useFetchPhotos = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
  
    const fetchPhotos = useCallback(({ query, page = 1, perPage = 10 }: FetchPhotosOptions) => {
      setLoading(true);
  
      let endpoint:string;
      if(query){
        endpoint = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`
      }else{
        endpoint = `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`
      }
  
      fetch(endpoint, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (query) {
            setPhotos(data.photos);
            setPage(1);
          } else {
            setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
            setPage(page + 1);
          }
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }, []);
  
    return { photos, loading, fetchPhotos };
  };

  export default useFetchPhotos