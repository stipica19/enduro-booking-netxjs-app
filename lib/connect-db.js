import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function registerListeners() {
  const conn = mongoose.connection;

  if (conn.listenerCount("connected") > 0) return;

  conn.on("connected", () =>
    console.log("[MongoDB] Connected")
  );
  conn.on("disconnected", () => {
    console.warn("[MongoDB] Disconnected — driver will auto-reconnect");
    cached.conn = null;
    cached.promise = null;
  });
  conn.on("reconnected", () =>
    console.log("[MongoDB] Reconnected")
  );
  conn.on("error", (err) =>
    console.error("[MongoDB] Connection error:", err.message)
  );
}

const connectMongo = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  const readyState = mongoose.connection.readyState;

  // 1 = connected, 2 = connecting
  if (cached.conn && readyState === 1) {
    return cached.conn;
  }

  // Disconnected or closed — reset cache so we open a fresh connection
  if (readyState === 0 || readyState === 3) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        // Pool
        maxPoolSize: 10,
        minPoolSize: 1,          // keeps ≥1 connection alive at all times

        // Timeouts
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,

        // Idle — 25 min, just under Atlas's default 30-min idle close
        maxIdleTimeMS: 1500000,

        // Heartbeat every 10 s keeps the TCP alive through Docker NAT
        heartbeatFrequencyMS: 10000,

        // Force IPv4 — avoids DNS/IPv6 issues inside Docker
        family: 4,
      })
      .then((m) => m);

    registerListeners();
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
};

export default connectMongo;
