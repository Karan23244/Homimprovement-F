import { useEffect, useRef } from "react";
import axios from "axios";

const usePageTracker = (page) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://homimprovement.com";

  const didSendRequest = useRef(false); // Persist flag across renders

  useEffect(() => {
    if (!didSendRequest.current) {
      axios
        .post(
          `${baseUrl}/api/track-page`,
          { page },
          { withCredentials: true }
        ) // Send cookies with request
        .then((response) => {})
        .catch((error) => {
          console.error("Error tracking page view:", error);
        });

      didSendRequest.current = true; // Prevent further requests
    }
  }, [page]); // Re-run if 'page' changes
};

export default usePageTracker;
