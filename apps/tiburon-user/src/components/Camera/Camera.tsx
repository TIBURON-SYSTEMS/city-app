import { useRef, useEffect, useState } from "react";

export default function Camera() {
  // 1. **videoRef 的类型定义**:
  // 我们明确告诉 TypeScript，这个 ref 将连接到一个 HTMLVideoElement，
  // 并且初始值是 null。
  const videoRef = useRef<HTMLVideoElement>(null);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const currentVideoElement = videoRef.current;

    const getCameraStream = async () => {
      try {
        // 请求视频流的 constraints
        const constraints: MediaStreamConstraints = {
          video: {
            // "environment" 表示后置摄像头 (对着环境/外面)
            // "user" 表示前置摄像头 (对着用户/人脸)
            facingMode: "environment",
          },
          audio: false,
        };

        // 尝试获取媒体流
        const stream: MediaStream =
          await navigator.mediaDevices.getUserMedia(constraints);

        // 2. **Ref 的类型检查**:
        // 在访问 videoRef.current 之前，必须确保它存在且是一个 HTMLVideoElement 实例
        if (currentVideoElement) {
          // 使用快照变量
          currentVideoElement.srcObject = stream;
          currentVideoElement.play().catch((playError) => {
            console.error("Video playback failed:", playError);
          });
        }
      } catch (err) {
        // 3. **Error 的类型断言和处理**:
        // 捕获到的 error 在 TypeScript 中默认是 unknown 类型，
        // 我们断言它是一个 MediaStreamError 来安全访问 name/message 属性。
        const mediaError = err as DOMException;

        console.error("Error accessing camera:", mediaError);

        let errorMessage = `无法访问摄像头：${mediaError.name}`;

        // 针对常见的错误类型给出更具体的提示
        if (
          mediaError.name === "NotAllowedError" ||
          mediaError.name === "SecurityError"
        ) {
          errorMessage =
            "摄像头访问被拒绝。请检查浏览器权限设置或确认您正在使用 HTTPS。";
        } else if (mediaError.name === "NotFoundError") {
          errorMessage = "未找到可用的摄像头设备。";
        } else {
          errorMessage += ` - ${mediaError.message}`;
        }

        setError(errorMessage);
      }
    };

    // 检查 navigator.mediaDevices 是否存在
    if (navigator.mediaDevices) {
      getCameraStream();
    } else {
      setError("您的浏览器不支持访问媒体设备（getUserMedia）。");
    }

    // 清理函数：在组件卸载时停止视频流
    return () => {
      // 必须检查 videoRef.current 是否存在，以及 srcObject 是否被设置
      if (currentVideoElement && currentVideoElement.srcObject) {
        // 断言 srcObject 是 MediaStream 类型
        const stream = currentVideoElement.srcObject as MediaStream;

        // 停止所有的 tracks
        stream.getTracks().forEach((track) => track.stop());
        console.log("Camera stream stopped.");
      }
    };
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* video 标签，和之前一样，使用 playsInline 是移动端关键 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "100%", maxWidth: "400px", border: "1px solid black" }}
      />
    </div>
  );
}
