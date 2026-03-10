import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
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

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
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

const History = () => {
  const { token } = useAuth();
  const [oldBookings, setOldBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOldBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/shop/oldbookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      setOldBookings(res.data);
    } catch (err) {
      console.error("Error fetching old bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOldBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "#28a745"; // green
      case "cancelled":
        return "#dc3545"; // red
      case "pending":
        return "#ffc107"; // yellow
      case "in progress":
        return "#17a2b8"; // teal
      default:
        return "#6c757d"; // gray
    }
  };

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

  if (!oldBookings.length) {
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container>
        <Title>📜 Booking History</Title>

        <div style={{ overflowX: "auto" }}>
          <StyledTable>
            <TableHeader>
              <tr>
                <TableHeaderCell>Vehicle</TableHeaderCell>
                <TableHeaderCell>Issue</TableHeaderCell>
                <TableHeaderCell>Towing</TableHeaderCell>
                <TableHeaderCell>User</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Revenue</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              <AnimatePresence>
                {oldBookings.map((b, idx) => (
                  <TableRow
                    key={idx}
                    variants={rowVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TableCell>{b.vehicleName}</TableCell>
                    <TableCell>{b.issue || "N/A"}</TableCell>
                    <TableCell>{b.towingNeeded ? "Yes" : "No"}</TableCell>
                    <TableCell>{b.user?.firstName || "User"}</TableCell>
                    <TableCell>{b.user?.email}</TableCell>
                    <TableCell>
                      {new Date(b.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{b.shopOwnerEarning}</TableCell>
                    <TableCell>
                      <StatusBadge
                        style={{
                          backgroundColor: getStatusColor(b.status),
                          color: "#fff",
                        }}
                      >
                        {b.status}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </tbody>
          </StyledTable>
        </div>
      </Container>
    </motion.div>
  );
};

export default History;
