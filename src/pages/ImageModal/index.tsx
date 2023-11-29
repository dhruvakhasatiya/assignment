import React, { useEffect, useState } from "react";
import { Grid, Modal } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IImageItem } from "../../utils/interfaces/gallery";

interface IImageModalProps {
  isOpenImageModal: boolean;
  handleImageModalClose: any;
  imagesData: Array<IImageItem>;
  selectedImgPath: string;
}

const ImageModal: React.FC<IImageModalProps> = ({
  isOpenImageModal,
  handleImageModalClose,
  imagesData,
  selectedImgPath,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (selectedImgPath) {
      setSelectedImage(selectedImgPath);
    }
  }, [selectedImgPath]);

  const handleCarouselImgClick = (imgPath: string) => {
    setSelectedImage(imgPath);
  };

  const getImagePath = (source: string) => {
    return require(`../../assets/${source}`);
  };

  return (
    <>
      <Modal
        open={isOpenImageModal}
        onClose={handleImageModalClose}
        className="modal-main"
      >
        <div className="common-modal">
          <Grid className="carousel-main-image-div">
            <img
              src={selectedImage}
              alt="slide"
              className="carousel-main-image"
            />
          </Grid>

          <Slider {...settings}>
            {imagesData?.map((image: IImageItem, index: number) => (
              <div key={index} className="carousel-image-div">
                <img
                  src={getImagePath(image.source)}
                  alt={`slide-${index}`}
                  className="carousel-image"
                  onClick={() =>
                    handleCarouselImgClick(getImagePath(image.source))
                  }
                />
              </div>
            ))}
          </Slider>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
