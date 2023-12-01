import { useSearchParams } from "react-router-dom";

export function useUrllocation() {
    const [searchparams, setsearchparams] = useSearchParams();
    const lat = searchparams.get("lat");
    const lng = searchparams.get("lng");

    return (
      [lat,lng]
    )
}

export default useUrllocation
