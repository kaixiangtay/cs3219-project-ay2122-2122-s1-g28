import express from "express";

const router = express.Router();

// Loopback API to return AWS EC2 health
router.get("/health", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "EC2 Instance is healthy",
  });
});

router.get("/api/chat", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "NUSociaLife Chat Microservice",
  });
});

export default router;
