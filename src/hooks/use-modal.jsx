import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const useModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (location.pathname !== "/") {
      navigate('/');
    }
    setIsModalOpen(false);
  }, [location.pathname, navigate]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
