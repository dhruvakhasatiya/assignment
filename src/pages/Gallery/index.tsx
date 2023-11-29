import React, { useState, useEffect } from "react";
import imagesData from "../../mockData/images.json";
import { IGallery, IImageItem } from "../../utils/interfaces/gallery";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import ImageModal from "../ImageModal";

const Gallery = () => {
  const [images, setImages] = useState<IImageItem[]>([]);
  const [filteredImages, setFilteredImages] = useState<IImageItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
  const [selectedImgPath, setSelectedImgPath] = useState<string>("");

  useEffect(() => {
    const fetchedData: IGallery = imagesData;
    setImages(fetchedData.images);
    setFilteredImages(fetchedData.images);
  }, []);

  const getImagePath = (source: string) => {
    return require(`../../assets/${source}`);
  };

  const handleTabChange = (value: number, category: string) => {
    setSelectedTab(value);

    if (category === "All") {
      setFilteredImages(images);
    } else {
      const otherImages = images.filter((i) => i.category === category);
      setFilteredImages(otherImages);
    }
  };

  const handleImageModalOpen = (imgPath: string) => {
    setIsOpenImageModal(true);
    setSelectedImgPath(imgPath);
  };

  const handleImageModalClose = () => {
    setIsOpenImageModal(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} className="gallery-main-grid">
        <div className="gallery-main">
          <div className="top-left-header">
            <Typography className="top-gallery-header">Gallery</Typography>
            <Typography className="page-name">Pages - Gallery</Typography>
          </div>

          <h2>Photo Gallery</h2>
          <Typography className="gallery-sub-header">
            Lorem ipsum is placeholder text commonly used in graphic, print and
            publishing industries.
          </Typography>

          <Tabs
            value={selectedTab}
            centered
            className="gallery-tabs"
            TabIndicatorProps={{
              style: {
                background: "transparent",
              },
            }}
          >
            <Tab
              label="All"
              onClick={() => handleTabChange(0, "All")}
              className="gallery-tab"
            />
            <Tab
              label="Branding"
              onClick={() => handleTabChange(1, "Brand")}
              className="gallery-tab"
            />
            <Tab
              label="Design"
              onClick={() => handleTabChange(2, "Design")}
              className="gallery-tab"
            />
            <Tab
              label="Development"
              onClick={() => handleTabChange(3, "Development")}
              className="gallery-tab"
            />
          </Tabs>

          <Grid container columnSpacing={4} rowSpacing={4}>
            {filteredImages?.map((image: IImageItem) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                <img
                  src={getImagePath(image.source)}
                  alt={image.title}
                  className="gallery-image"
                  onClick={() =>
                    handleImageModalOpen(getImagePath(image.source))
                  }
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>

      <ImageModal
        isOpenImageModal={isOpenImageModal}
        handleImageModalClose={handleImageModalClose}
        imagesData={filteredImages}
        selectedImgPath={selectedImgPath}
      />
    </Grid>
  );
};

export default Gallery;
