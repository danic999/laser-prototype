import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      allowedDevOrigins: [
        "127.0.0.1",
        "0.0.0.0",
        "localhost",
        "cursor",
        "*.cursor.com",
        "**.cursor.com",
        "*.cursor.sh",
        "**.cursor.sh",
        "*.cursorvm.com",
        "**.cursorvm.com",
      ],
};

export default nextConfig;
