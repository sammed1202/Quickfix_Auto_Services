import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTools,
  FaUser,
} from "react-icons/fa";
import Loader from "../CustomStyles/Loader";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BookingMap from "../shopOwnerLayout/BookingMap";
import { Button, Nav, Form, Modal, Collapse } from "react-bootstrap";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const BookButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  font-weight: 500;
  background: linear-gradient(to right, #3498db, #2ecc71);
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const GuidelinesBox = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const GuidelinesTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GuidelinesList = styled.ul`
  padding-left: 1.5rem;
  margin: 1.5rem 0;
`;

const GuidelinesItem = styled.li`
  margin-bottom: 1rem;
  color: #555;
  font-size: 0.95rem;

  strong {
    color: #2c3e50;
  }
`;

const WarningText = styled.p`
  color: #e74c3c;
  margin: 1.5rem 0;
  font-weight: 500;
`;

const GuidelineActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CancelLink = styled(NavLink)`
  color: #7f8c8d;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #555;
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const ReviewsModalContent = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
`;

const ReviewItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ReviewAuthor = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const ReviewRating = styled.span`
  color: #f39c12;
  font-weight: 600;
`;

const ReviewComment = styled.p`
  margin: 0;
  color: #555;
  font-style: italic;
`;

const ViewReviewsButton = styled(Button)`
  margin-top: 0.5rem;
  width: 100%;
`;

// ✅ STYLED COMPONENTS
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem auto;
  }
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #3498db, #2ecc71);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ShopsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ShopCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ShopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ShopName = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  flex: 1;
`;

const DistanceBadge = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const ShopContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div``;
const RightColumn = styled.div``;

const ShopDetail = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: #555;
  font-size: 0.95rem;

  strong {
    color: #2c3e50;
    font-weight: 500;
    margin-right: 0.5rem;
    min-width: 70px;
    display: inline-block;
  }

  svg {
    margin-right: 0.5rem;
    color: #3498db;
    min-width: 16px;
  }
`;

const ServicesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
  color: #2c3e50;
  font-weight: 500;

  svg {
    margin-right: 0.5rem;
  }
`;

const ServicesList = styled.ul`
  padding-left: 0;
  margin: 0.5rem 0 1rem;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3498db;
    border-radius: 3px;
  }
`;

const ServiceItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #eee;
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ServicePrice = styled.span`
  color: #27ae60;
  font-weight: 500;
`;

const CarouselContainer = styled.div`
  margin: 0.5rem 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: #555;

  svg {
    color: #f39c12;
    margin-right: 0.3rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const PrimaryButton = styled(Button)`
  width: 100%;
  padding: 0.75rem;
  font-weight: 500;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #2980b9, #27ae60);
  }
`;

const SecondaryButton = styled(Button)`
  width: 100%;
  padding: 0.75rem;
  font-weight: 500;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  color: rgb(13, 110, 253);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: rgb(13, 110, 253);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-weight: 500;
  color: #2c3e50;
  margin-right: 0.5rem;
`;

const FilterCheckbox = styled(Form.Check)`
  margin: 0;
  label {
    margin-left: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
    cursor: pointer;
  }

  input {
    cursor: pointer;
  }
`;

// Other styled components remain the same as in your original code...

// ✅ ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1 },
  exit: { y: "100vh", opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02 },
};

const UserHome = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [userAgreed, setUserAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [ratings, setRatings] = useState({});
  const [selectedShop, setSelectedShop] = useState(null);
  const [shopReviews, setShopReviews] = useState({});
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [currentShopReviews, setCurrentShopReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewComments, setReviewComments] = useState({});
  const [expandedServices, setExpandedServices] = useState({});

  const serviceOptions = ["Puncture", "Towing", "Engine", "Battery", "Oil"];

  const toggleServices = (shopId) => {
    setExpandedServices((prev) => ({
      ...prev,
      [shopId]: !prev[shopId],
    }));
  };

  const fetchShopsAndRatings = async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lng } = pos.coords;
          setUserCoords({ lat, lng });

          const shopRes = await axios.get(
            `http://localhost:8000/api/shop/nearby?lat=${lat}&lng=${lng}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const list = shopRes.data;
          setShops(list);
          setFilteredShops(list);

          const ratingsMap = {};
          const reviewsMap = {};

          await Promise.all(
            list.map(async (shop) => {
              const revRes = await axios.get(
                `http://localhost:8000/api/shop/review/${shop._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              const reviews = revRes.data.reviews || [];
              reviewsMap[shop._id] = reviews;

              const myReview = reviews.find(
                (r) => r.user?._id === user._id || r.user === user._id
              );
              if (myReview) {
                ratingsMap[shop._id] = myReview.rating;
                setReviewComments((prev) => ({
                  ...prev,
                  [shop._id]: myReview.comment || "",
                }));
              }
            })
          );

          setUserRatings(ratingsMap);
          setShopReviews(reviewsMap);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchShopsAndRatings();
  }, [token, user?._id]);

  const handleAgree = () => {
    setUserAgreed(true);
    localStorage.setItem("status", "true");
  };

  const handleFilterChange = (service) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
    setFilteredShops(
      updated.length === 0
        ? shops
        : shops.filter((shop) =>
            updated.every((sel) =>
              shop.services.some((s) =>
                s.name.toLowerCase().includes(sel.toLowerCase())
              )
            )
          )
    );
  };

  const handleShowReviews = async (shopId) => {
    setLoadingReviews(true);
    try {
      if (shopReviews[shopId]) {
        setCurrentShopReviews(shopReviews[shopId]);
      } else {
        const revRes = await axios.get(
          `http://localhost:8000/api/shop/review/${shopId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCurrentShopReviews(revRes.data);
        setShopReviews((prev) => ({ ...prev, [shopId]: revRes.data }));
      }
      setShowReviewsModal(true);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <style>
        {`
        #whatsapp{
        color:green;
        }
        #whatsapp:hover{
        background:green;
        color:white;
        }
        `}
      </style>
      {user && (
        <>
          <Container
            style={{
              minWidth: "100vw",
              borderRadius: "0px",
              marginTop: "-1px",
            }}
          >
            {loading ? (
              <LoadingContainer>
                <Loader size="50px" border="8px" color="#3498db" />
              </LoadingContainer>
            ) : (
              <>
                <Title>Nearby Service Shops</Title>
                <FilterSection>
                  <FilterLabel>Filter by Service:</FilterLabel>
                  {serviceOptions.map((opt) => (
                    <FilterCheckbox
                      key={opt}
                      type="checkbox"
                      id={`filter-${opt}`}
                      label={opt}
                      checked={selectedServices.includes(opt)}
                      onChange={() => handleFilterChange(opt)}
                    />
                  ))}
                </FilterSection>

                <ShopsGrid>
                  <AnimatePresence>
                    {filteredShops.map((shop) => (
                      <ShopCard
                        key={shop._id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        layout
                      >
                        <ShopHeader>
                          <ShopName>
                            {shop.shopName}
                            <DistanceBadge>
                              {(shop.distance / 1000).toFixed(2)} km
                            </DistanceBadge>
                          </ShopName>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setSelectedShop(shop)}
                          >
                            Map <FaMapMarkerAlt />
                          </Button>
                        </ShopHeader>

                        <ShopContent>
                          <LeftColumn>
                            {shop.photos?.length > 0 && (
                              <CarouselContainer>
                                <div
                                  id={`carousel-${shop._id}`}
                                  className="carousel slide"
                                  data-bs-ride="carousel"
                                  data-bs-interval="3000"
                                >
                                  <div className="carousel-inner">
                                    {shop.photos.map((photo, i) => (
                                      <div
                                        key={i}
                                        className={`carousel-item ${
                                          i === 0 ? "active" : ""
                                        }`}
                                      >
                                        <CarouselImage
                                          src={`http://localhost:8000/${photo}`}
                                          onError={(e) => {
                                            e.target.src =
                                              "https://via.placeholder.com/300x200?text=No+Image";
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  {shop.photos.length > 1 && (
                                    <>
                                      <button
                                        className="carousel-control-prev"
                                        data-bs-target={`#carousel-${shop._id}`}
                                        data-bs-slide="prev"
                                      >
                                        <span className="carousel-control-prev-icon"></span>
                                      </button>
                                      <button
                                        className="carousel-control-next"
                                        data-bs-target={`#carousel-${shop._id}`}
                                        data-bs-slide="next"
                                      >
                                        <span className="carousel-control-next-icon"></span>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </CarouselContainer>
                            )}

                            <RatingContainer>
                              ⭐<strong>Rating:</strong>{" "}
                              {shopReviews[shop._id]?.length > 0
                                ? `${(
                                    shopReviews[shop._id].reduce(
                                      (acc, curr) => acc + curr.rating,
                                      0
                                    ) / shopReviews[shop._id].length
                                  ).toFixed(1)} ★ (${
                                    shopReviews[shop._id].length
                                  } reviews)`
                                : shop.averageRating
                                ? `${shop.averageRating.toFixed(1)} ★ (${
                                    shop.reviewCount || 0
                                  } reviews)`
                                : "No ratings yet"}
                            </RatingContainer>
                          </LeftColumn>

                          <RightColumn>
                            <ShopDetail>
                              <FaUser />
                              <strong>Owner:</strong> {shop.name}
                            </ShopDetail>
                            <ShopDetail>
                              <FaEnvelope />
                              <strong>Email:</strong> {shop.owner.email}
                            </ShopDetail>
                            <ShopDetail>
                              <FaPhone />
                              <strong>Phone:</strong> {shop.contact}
                            </ShopDetail>
                            <SecondaryButton
                              style={{
                                border: "1px solid green",
                              }}
                              id="whatsapp"
                              onClick={() =>
                                window.open(
                                  `https://wa.me/${shop.contact.replace(
                                    /\D/g,
                                    ""
                                  )}?text=Hi%20${
                                    shop.name
                                  },%20I'm%20interested%20in%20your%20services.`,
                                  "_blank"
                                )
                              }
                            >
                              WhatsApp Me
                            </SecondaryButton>

                            <ShopDetail>
                              <FaMapMarkerAlt />
                              <strong>Location:</strong> {shop.location}
                            </ShopDetail>

                            <ServicesHeader
                              onClick={() => toggleServices(shop._id)}
                            >
                              <FaTools /> Services
                              {expandedServices[shop._id] ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </ServicesHeader>

                            <Collapse in={expandedServices[shop._id]}>
                              <div>
                                <ServicesList>
                                  {shop.services.map((s, i) => (
                                    <ServiceItem key={i}>
                                      <span>{s.name}</span>
                                      <ServicePrice>₹{s.price}</ServicePrice>
                                    </ServiceItem>
                                  ))}
                                </ServicesList>
                              </div>
                            </Collapse>
                          </RightColumn>
                        </ShopContent>

                        <ActionButtons>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <SecondaryButton
                              style={{ border: "1px solid rgb(13, 110, 253)" }}
                              onClick={() => handleShowReviews(shop._id)}
                              className="secondary"
                            >
                              View Reviews
                            </SecondaryButton>

                            <PrimaryButton
                              onClick={() =>
                                navigate(`/user/book/${shop._id}`, {
                                  state: { userCoords },
                                })
                              }
                            >
                              Book Now
                            </PrimaryButton>
                          </div>
                          {userRatings[shop._id] ? (
                            <div>
                              <p>
                                You rated:{" "}
                                <strong>{userRatings[shop._id]} ★</strong>
                              </p>
                              {reviewComments[shop._id] && (
                                <p>
                                  <strong>Your review:</strong> "
                                  {reviewComments[shop._id]}"
                                </p>
                              )}
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setRatings((prev) => ({
                                    ...prev,
                                    [shop._id]: userRatings[shop._id],
                                  }));
                                }}
                              >
                                Edit Review
                              </Button>
                            </div>
                          ) : (
                            <Form
                              onSubmit={async (e) => {
                                e.preventDefault();
                                const sel = ratings[shop._id];
                                if (!sel) return alert("Select a rating");

                                try {
                                  await axios.post(
                                    `http://localhost:8000/api/shop/${shop._id}/review`,
                                    {
                                      rating: sel,
                                      comment: reviewComments[shop._id] || "",
                                    },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  );
                                  alert("Review submitted!");
                                  setReviewComments((prev) => ({
                                    ...prev,
                                    [shop._id]: "",
                                  }));
                                  fetchShopsAndRatings();
                                } catch (err) {
                                  alert(err.response?.data?.message || "Error");
                                }
                              }}
                            >
                              <div
                                style={{
                                  border: "2px solid rgba(0, 0, 0, 0.06)",
                                  borderRadius: "10px",
                                  padding: "5px",
                                  display: "flex",
                                }}
                              >
                                <div style={{ width: "30%" }}>
                                  <Form.Label>Rate this shop:</Form.Label>
                                  <div style={{ display: "flex", gap: "8px" }}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                      <span
                                        key={s}
                                        onClick={() =>
                                          setRatings((prev) => ({
                                            ...prev,
                                            [shop._id]: s,
                                          }))
                                        }
                                        style={{
                                          fontSize: "1.5rem",
                                          cursor: "pointer",
                                          color:
                                            s <= (ratings[shop._id] || 0)
                                              ? "#f39c12"
                                              : "#ccc",
                                        }}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div style={{ width: "70%" }}>
                                  <Form.Group>
                                    <Form.Label>Your Review:</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      placeholder="Share your experience..."
                                      value={reviewComments[shop._id] || ""}
                                      onChange={(e) =>
                                        setReviewComments((prev) => ({
                                          ...prev,
                                          [shop._id]: e.target.value,
                                        }))
                                      }
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                              <Button
                                type="submit"
                                className="mt-2"
                                style={{ float: "right" }}
                              >
                                Submit Review
                              </Button>
                            </Form>
                          )}
                        </ActionButtons>
                      </ShopCard>
                    ))}
                  </AnimatePresence>
                </ShopsGrid>
              </>
            )}
          </Container>

          {/* Reviews Modal */}
          <Modal
            show={showReviewsModal}
            onHide={() => setShowReviewsModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Customer Reviews:{" "}
                {currentShopReviews.length > 0 && (
                  <>
                    {"⭐".repeat(
                      Math.round(
                        currentShopReviews.reduce(
                          (acc, curr) => acc + curr.rating,
                          0
                        ) / currentShopReviews.length
                      )
                    )}
                  </>
                )}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {loadingReviews ? (
                <div className="text-center">
                  <Loader size="40px" border="6px" color="#3498db" />
                </div>
              ) : currentShopReviews.length > 0 ? (
                <ReviewsModalContent>
                  {currentShopReviews.map((review) => (
                    <ReviewItem key={review._id}>
                      <ReviewHeader>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {review.user?.profilePicture ? (
                            <img
                              src={`http://localhost:8000/${review.user.profilePicture}`}
                              alt={review.user.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#3498db",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {review.user?.name?.charAt(0) || "U"}
                            </div>
                          )}
                          <ReviewAuthor>
                            {review.user?.name ||
                              review.user?.email ||
                              "Anonymous"}
                          </ReviewAuthor>
                        </div>
                        <ReviewRating>
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </ReviewRating>
                      </ReviewHeader>
                      {review.comment && (
                        <ReviewComment>"{review.comment}"</ReviewComment>
                      )}
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#777",
                          marginTop: "5px",
                        }}
                      >
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </ReviewItem>
                  ))}
                </ReviewsModalContent>
              ) : (
                <p className="text-center">No reviews yet for this shop.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowReviewsModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Map Modal */}
          {selectedShop && userCoords && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.8)",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "80%",
                  background: "white",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <h3>{selectedShop.shopName} Location</h3>
                <div
                  style={{
                    height: "90%",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <BookingMap
                    userCoords={userCoords}
                    shopCoords={{
                      lat: selectedShop.coordinates.coordinates[1],
                      lng: selectedShop.coordinates.coordinates[0],
                    }}
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedShop(null)}
                  style={{ marginTop: "10px" }}
                >
                  Close Map
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default UserHome;
