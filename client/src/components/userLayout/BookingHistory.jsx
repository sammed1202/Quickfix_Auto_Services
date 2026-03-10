import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
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
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.95rem;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 500;
`;

const TableRow = styled(motion.tr)`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #f1f7fe;
    transform: scale(1.01);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.01,
    transition: { duration: 0.2 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/booking/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch booking history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <LoadingContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (!history.length) {
    return (
      <EmptyState
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3>No booking history found</h3>
        <p>You haven't made any bookings yet.</p>
      </EmptyState>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Container>
        <Title>Booking History</Title>
        
        <TableContainer>
          <StyledTable>
            <TableHeader>
              <tr>
                <TableHeaderCell>Vehicle</TableHeaderCell>
                <TableHeaderCell>Shop</TableHeaderCell>
                <TableHeaderCell>Booked At</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Message</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              <AnimatePresence>
                {history.map((b) => {
                  const createdTime = new Date(b.createdAt);
                  const now = new Date();
                  const hoursPassed = (now - createdTime) / (1000 * 60 * 60);

                  let statusLabel = b.status;
                  let badgeColor = "#6c757d"; // default secondary

                  if (b.status === "Cancelled") {
                    badgeColor = "#dc3545"; // danger
                  } else if (b.status === "Approved") {
                    badgeColor = "#28a745"; // success
                  } else if (b.status === "Delayed") {
                    badgeColor = "#ffc107"; // warning
                    statusLabel = "Delayed";
                  } else if (b.status === "Rejected") {
                    badgeColor = "#dc3545"; // danger
                  } else if (b.status === "Pending" && hoursPassed >= 3) {
                    statusLabel = "Not Responded";
                    badgeColor = "#343a40"; // dark
                  }

                  return (
                    <TableRow
                      key={b._id}
                      variants={rowVariants}
                      whileHover="hover"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <TableCell>{b.vehicleName}</TableCell>
                      <TableCell>{b.shopId?.name || "N/A"}</TableCell>
                      <TableCell>{createdTime.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge style={{ backgroundColor: badgeColor, color: "#fff" }}>
                          {statusLabel}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{b.statusDetails?.message || "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </StyledTable>
        </TableContainer>
      </Container>
    </motion.div>
  );
};

export default BookingHistory;